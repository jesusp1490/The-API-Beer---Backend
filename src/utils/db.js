const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dataBase = await mongoose.connect(process.env.MONGO_URI, {
        });

        console.log(`MongoDB Conectado: ${dataBase.connect.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
