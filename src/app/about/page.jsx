import Image from "next/image";
import styles from "./about.module.css";
// import dynamic from "next/dynamic";
import Video from "@/components/video/video";

// const VideoComponent = dynamic(() => import('../../components/video/video'), { ssr: false });

export const metadata = {
  title: "About Page",
  description: "About description",
};

const AboutPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.textContainer}>
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
              <p>Years of experience</p>
            </div>
            <div className={styles.box}>
              <h1>10 K+</h1>
              <p>Years of experience</p>
            </div>
            <div className={styles.box}>
              <h1>10 K+</h1>
              <p>Years of experience</p>
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
      <div>
        <Video></Video>
      </div>
    </>
  );
};

export default AboutPage;
