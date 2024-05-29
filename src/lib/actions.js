"use server";


import { revalidatePath } from "next/cache";
import { Post } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";


export const addPost = async (formData)=>{
    "use server";

const {title, desc, slug, userId} = Object.fromEntries(formData)
try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });

    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData)=>{
const {id} = Object.fromEntries(formData)
connectToDb();
try {
    connectToDb();
   
    

    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/blog");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
}

export const handleGithubLogin = async () => {
    "use server";
    await signIn("github");
  };

  export const handleLogout = async () => {
    "use server";
    await signOut("github");
  };