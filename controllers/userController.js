const Book = require("../models/books");

const index = async (req, res) => {
  res.send("Waiting For You Request");
};
// get all users
const users = async (req, res) => {
  try {
    const book = await Book.find();
    if (book) {
      res.json(book);
    } else {
      res.send("Something went wrong.");
    }
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while retrieving the users." });
  }
};

module.exports = { index, users };
