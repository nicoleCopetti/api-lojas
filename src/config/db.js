import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()

const connectToDB = async () => {
    const connectionString = process.env.DB_STRING;
  
    try {
      await mongoose.connect(connectionString, {
        autoIndex: true
      });
      console.log('Connected to MongoDB successfully!');
    } catch (error) {
      console.error('Connection to MongoDB failed:', error);
      process.exit(1);
    }
};

export default connectToDB;
