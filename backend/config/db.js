const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let connectionPromise = null;

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined');
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (mongoose.connection.readyState === 2 && connectionPromise) {
        return connectionPromise;
    }

    try {
        connectionPromise = mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });

        const conn = await connectionPromise;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn.connection;
    } catch (error) {
        connectionPromise = null;
        console.error(`MongoDB connection error: ${error.message}`);
        throw error;
    }
};

module.exports = connectDB;
