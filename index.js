//require dotenv config
require("dotenv").config();

//require express and use it
const express = require("express");
const app = express();

//require mongoose
const mongoose = require("mongoose");

//initialize port and mongoURL from .env file
const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL;

//use middleware
app.use(express.json());

//connect to database
const dbConnection = async () =>{
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected successfully to database");
    }
    catch(error) {
        console.log("Failed to connect to database", error);
    }
}

dbConnection();

const authorRoute = require("./routes/authorRoute");
const bookRoute = require("./routes/bookRoute");

app.use("/api", authorRoute);
app.use("/api", bookRoute);

//listen to port
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});