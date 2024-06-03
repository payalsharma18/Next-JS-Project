import mongoose from "mongoose"

const connection = {}; //everytime we refresh app it going to create a new 
                       //connection to prevent it wewill check if we have existing connection or not

export const connectToDb = async () => {
  try {
    if(connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState; //we are gonna take the first connection [0]
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};