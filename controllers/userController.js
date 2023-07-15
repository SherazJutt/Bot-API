const Users = require("../models/books");

const index = async (req, res) => {
  res.send("Waiting For You Request");
};
// get all users
const users = async (req, res) => {
  try {
    const user = await Users.find();
    if (user) {
      res.json(user);
    } else {
      res.send("Something went wrong.");
    }
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while retrieving the users." });
  }
};

module.exports = { index, users };
