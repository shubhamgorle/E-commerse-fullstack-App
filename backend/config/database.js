const mongoose = require("mongoose");
// process.env.DB_URI 
const connectDatabase = () => {
    mongoose.connect("mongodb://localhost:27017/Ecommerse").then((data) => {
        console.log(`mongodb connected with server ${data.connection.host}`);
    }).catch((error) => {
        console.log(error)
    })
}
module.exports = connectDatabase;