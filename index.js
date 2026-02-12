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

//import models
const Author = require("./models/Author");
const Book = require("./models/Book");

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

// create POST routes
// Author - /api/authors
app.post("/api/authors", async (req, res) =>{
    try {
        //get data
        const {name} = req.body;

        //validate data
        if(!name) {
            return res.status(400).json({msg: "Name is required"});
        }
        else {
            // create new author
            const newAuthor = new Author({name});
            await newAuthor.save();
            return res.status(201).json({msg: "Author created", data: newAuthor});
        }
    }
    catch(error) {
        res.status(500).json({msg: "Failed to create author due to server error", error});
    }
});

// Book - /api/books
app.post("/api/books", async (req, res) =>{
    try {
        //get data
        const {title, author} = req.body;

        // validate data
        if(!title || !author) {
            return res.status(400).json({msg: "Title and Author are required"});
        }
        else {
            // create new book
            const newBook = new Book({title, author});
            await newBook.save();
            return res.status(201).json({msg: "Book created", data: newBook});
        }
    }
    catch(error) {
        res.status(500).json({msg: "Failed to create book due to server error", error});
    }
});


// create GET routes to get the book with the author
app.get("/api/books", async (req, res) =>{
    try {
        const books = await Book.find().populate("author");
        return res.status(200).json({msg: "Books found", data: books});
    }
    catch(error){
        res.status(500).json({msg: "Failed to get books due to server error", error});
    }
});

dbConnection();

//listen to port
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});