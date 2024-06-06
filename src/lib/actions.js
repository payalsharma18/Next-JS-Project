"use server"; 

import { revalidatePath } from "next/cache"; // Used for revalidating paths (pages) after data changes
import { Post, User } from "./models"; 
import { connectToDb } from "./utils"; 
import { signIn, signOut } from "./auth"; // Import functions for authentication
import bcrypt from "bcryptjs"; 

// Function to add a new post
export const addPost = async (prevState, formData) => {
  // Destructure the necessary data from the formData object
  const { title, desc, slug, userId, img } = Object.fromEntries(formData);

  try {
    connectToDb();

    // Create a new Post instance with the provided data
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
      img,
    });

    // Save the new post to the database
    await newPost.save();

    // Reset the formData object
    formData = {};

    console.log("saved to db");

    // Revalidate the '/blog' and '/admin' paths (pages) after adding a new post
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// Function to delete a post
export const deletePost = async (formData) => {
  // Destructure the 'id' from the formData object
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    // Find the post by its ID and delete it from the database
    await Post.findByIdAndDelete(id);

    console.log("deleted from db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// Function to add a new user
export const addUser = async (prevState, formData) => {
  // Destructure the necessary data from the formData object
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDb();

    // Create a new User with the provided data
    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    // Save the new user to the database
    await newUser.save();

    // Reset the formData object
    formData = {};

    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// Function to delete a user 
export const deleteUser = async (formData) => {
  // Destructure the 'id' from the formData object
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    // Delete all posts associated with the user
    await Post.deleteMany({ userId: id });

    // Delete the user from the database
    await User.findByIdAndDelete(id);

    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// Function to handle GitHub login
export const handleGithubLogin = async () => {
  "use server"; 
  await signIn("github"); // Sign in with GitHub provider
};

// Function to handle logout
export const handleLogout = async () => {
  "use server";
  await signOut(); // Sign out the current user
};

// Function to register a new user
export const register = async (previousState, formData) => {
  // Destructure the necessary data from the formData object
  const { username, email, password, passwordRepeat } = formData;

  // Check if the passwords match
  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    // Check if the username already exists
    const user = await User.findOne({ username });
    if (user) {
      return { error: "Username already exists" };
    }

    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User instance with the provided data and hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();
    console.log("saved to db");

    // Return a success message
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// Function to handle user login
export const login = async (prevState, formData) => {
  // Destructure the username and password from the formData object
  const { username, password } = formData;

  try {
    // Sign in with the provided credentials
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);

    // Check if the error is related to invalid credentials
    if (err.message.includes("credentialssignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};