const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/polling-api';

mongoose.connect(mongoUrl, {
}).then(() => {
    console.log("Connection is successful");
}).catch((e) => {
    console.log("No connection: ", e);
})
