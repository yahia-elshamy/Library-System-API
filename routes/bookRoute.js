const express = require("express");
const router = express.Router();

const {createBook, getBook} = require("../controllers/bookController");

router.post("/books", createBook);

router.get("/books", getBook);

module.exports = router;