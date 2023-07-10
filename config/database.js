const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology : true, 
        useNewUrlParser : true, 
        useCreateIndex : true,
        useFindAndModify : false
    });

    const db = mongoose.connection;

    db.once('open', () => {
        console.log('Successfully connected to MongoDB...');
    });

    mongoose.Promise = global.Promise;
};


module.exports = connectDB;