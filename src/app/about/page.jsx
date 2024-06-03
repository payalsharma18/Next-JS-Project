import Image from "next/image";
import styles from "./about.module.css";

export const metadata = {
  title: "About Page",
  description: "About description",
};


const AboutPage = () => {

  // console.log("lets check where it works")
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        {/* <h2 className={styles.subtitle}>About Agency</h2> */}
        <h1 className={styles.title}>
          Welcome to our blog app! We're thrilled to have you here.

        </h1>
        <p className={styles.desc}>
          Our mission is to provide a platform where individuals can 
          share their thoughts, ideas, and stories with the world. 
          We believe in the power of storytelling and its ability to 
          inspire, educate, and connect people from all walks of life.       
           </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src="/about.png"
          alt="About Image"
          loading="lazy"
          fill
          className={styles.img}
        />
      </div>
    </div>
  );
};

export default AboutPage;