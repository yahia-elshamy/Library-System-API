const Author = require("../models/Author");

const createAuthor = async (req, res) =>{
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
};

module.exports = {createAuthor};