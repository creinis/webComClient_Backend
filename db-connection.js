import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, './.env') });

const connectDB = async () => {
  try {
    const mongoURI = process.env.DB;
    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in the .env file");
    }
    await mongoose.connect(mongoURI, {});
    console.log("=====>>>> App is connected to the DB.");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
