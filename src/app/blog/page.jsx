import PostCard from "@/components/postCards/postCard";
import styles from "./blog.module.css";
// import { getPosts } from "@/lib/data";

// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {next:{revalidate:3000}});

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const BlogPage = async () => {

  // FETCH DATA WITH AN API
  const posts = await getData();

  // FETCH DATA WITHOUT AN API
  // const posts = await getPosts();
  // console.log(posts , 'I am Post')

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;


// import PostCard from "@/components/postCards/postCard";
// import styles from "./blog.module.css";
// import dynamic from "next/dynamic";

// // FETCH DATA WITH AN API
// const getData = async () => {
//   const res = await fetch("http://localhost:3000/api/blog", {
//     next: { revalidate: 3000 },
//   });

//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// };

// const PostCardWithLazyLoading = dynamic(() => import("@/components/postCards/postCard"));

// const BlogPage = async () => {
//   // FETCH DATA WITH AN API
//   const posts = await getData();

//   return (
//     <div className={styles.container}>
//       {posts.map((post) => (
//         <div className={styles.post} key={post.id}>
//           <PostCardWithLazyLoading post={post} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BlogPage;