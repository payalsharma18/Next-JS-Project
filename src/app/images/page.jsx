"use client"

import React, { useState, useEffect, useRef } from 'react';

const ImagesPage = () => {
  const [images, setImages] = useState([]);  // State to store the fetched images
  const imageContainerRef = useRef(null); // Reference to the container div element

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/photos");
        if (!response.ok) {
          throw new Error("Unable to fetch data");
        }  
        const allImages = await response.json();
        setImages(allImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
     // Create IntersectionObserver with specified root margin
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Load the image when it comes into view
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px 0px 0px" }); // Adjust the rootMargin as needed

    // Observe image elements within the container
    if (imageContainerRef.current) {
      const imageElements = imageContainerRef.current.querySelectorAll("img[data-src]");
      imageElements.forEach((img) => observer.observe(img));
    }

    // Cleanup function to unobserve image elements when component unmounts
    return () => {
      if (imageContainerRef.current) {
        const imageElements = imageContainerRef.current.querySelectorAll("img[data-src]");
        imageElements.forEach((img) => observer.unobserve(img));
      }
    };
  }, [images]);// Run this effect whenever the images state changes

  return (
    <div ref={imageContainerRef} style={{display:'flex', flexWrap:'wrap',margin: "20px"}}>
      {images.map((image) => (
        <div key={image.id} style={{width: "200px", height: "200px"}}>
          <img data-src={image.thumbnailUrl} alt={image.title} loading="lazy"  />
          {/* <p>{image.title}</p> */}
        </div>
      ))}
    </div>
  );
};

export default ImagesPage;
