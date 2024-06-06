import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {     // Server-side route handler for GET requests
  const { slug } = params;   // Destructure the slug parameter from the params object

  try {
    connectToDb();

    const post = await Post.findOne({ slug });  // Find a post document in the database that matches the provided slug
    return NextResponse.json(post);   // Return the post as JSON
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};

export const DELETE = async (request, { params }) => {
  const { slug } = params;

  try {
    connectToDb();

    await Post.deleteOne({ slug });
    return NextResponse.json("Post deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete post!");
  }
};