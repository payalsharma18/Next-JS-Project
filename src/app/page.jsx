import Image from "next/image";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Unlocking Possibilities</h1>
        <p className={styles.desc}>
          Explore the boundless realms of creativity and intellect through our curated 
          collection of articles, essays, and stories. Join us on a journey of discovery, 
          inspiration, and transformation as we delve into the depths of human creativity 
          and inspire you to unleash your own creative genius.
        </p>
        <div className={styles.buttons}>
          <button className={styles.button}>Learn More</button>
          {/* <button className={styles.button}>Contact</button> */}
        </div>
        {/* <div className={styles.brands}>
          <Image src="/brands.png" alt="" fill className={styles.brandImg} />
        </div> */}
      </div>
      <div className={styles.imgContainer}>
        <Image src="/hero.png" alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" className={styles.heroImg} />
      </div>
    </div>
  );
};

export default Home;