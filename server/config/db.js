// Database config: exports a helper to connect Mongoose with useful logging.
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME || undefined,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Mongo connection error', error);
    process.exit(1);
  }
};

module.exports = connectDB;
