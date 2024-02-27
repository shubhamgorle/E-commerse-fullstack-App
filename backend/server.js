const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

// Handling Uncaught Exception
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`)
    process.exit(1);
})

// config
dotenv.config({path:"backend/config/config.env"});
// connect to database
connectDatabase();
const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost/${process.env.PORT}`)
})

// unhandles Promise Rejection

process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhndles promise rejection`)
    server.close(()=>{
        process.exit(1);
    })
})