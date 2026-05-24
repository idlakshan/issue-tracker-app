import mongoose from 'mongoose';
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1"]);

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGODB_URL;
    
    if (!MONGO_URI) {
      throw new Error("MONGODB_URL is not defined in the environment variables");
    }

    await mongoose.connect(MONGO_URI);
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};

export default connectDB;