import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../app/models/products.models.js';
import products from '../data/products.js'; 

dotenv.config();

const seedData = async () => {
  try {

    const dbUri = process.env.MONGO_URI;
    if (!dbUri) {
      throw new Error("MONGODB_URI not found in the .env file.");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(dbUri);
    console.log("Connection successful!");

    console.log("Deleting old data...");
    await Product.deleteMany({});
    
    console.log(`Preparing to add ${products.length} products...`);
    
    await Product.create(products);

    console.log(`SUCCESS! ${products.length} products have been added.`);

  } catch (error) {
    console.error(" ERROR:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Connection closed.");
    process.exit();
  }
};

seedData();