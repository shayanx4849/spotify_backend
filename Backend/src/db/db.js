import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected sucessfully");
  } catch (err) {
    console.log(err);
  }
}

export default connectDB;
