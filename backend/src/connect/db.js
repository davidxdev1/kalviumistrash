const { connect } = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URL);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error("error connecting to MongoDB", error);
    }
}

module.exports = connectDB;