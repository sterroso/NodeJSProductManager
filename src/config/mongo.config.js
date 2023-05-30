import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI, (error) => {
  if (error) {
    console.error("🛑 MongoDB Connection could not be established!");
    console.error(error);
  } else {
    console.info("🟢 Successfull MongoDB connection!");
  }
});
