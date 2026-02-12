//require mongoose
const mongoose = require("mongoose");

//create Book schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // link the author model to the book model
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true
    }
}, {timestamps: true});

//create Book model
const Book = mongoose.model("Book", bookSchema);

//export Book model
module.exports = Book;