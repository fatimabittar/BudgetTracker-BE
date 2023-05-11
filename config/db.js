import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
    });

    console.log("Connected successfully to database.");
  } catch (error) {
    console.error(`Connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;