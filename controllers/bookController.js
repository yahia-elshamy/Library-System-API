const Book = require("../models/Book");
const Author = require("../models/Author");

const createBook = async (req, res) =>{
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
};

const getBook = async (req, res) =>{
    try {
        const books = await Book.find().populate("author");
        return res.status(200).json({msg: "Books found", data: books});
    }
    catch(error){
        res.status(500).json({msg: "Failed to get books due to server error", error});
    }
};

module.exports = {
    createBook,
    getBook
}