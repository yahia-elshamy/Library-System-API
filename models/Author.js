// require mongoose
const mongoose = require("mongoose");

// create Author schema
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {timestamps: true});

// create Author model
const Author = mongoose.model("Author", authorSchema);

//export Author model
module.exports = Author;