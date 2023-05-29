const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../DB/users.json");

// Function to read users from file
const readUsersFromFile = () => {
  const usersData = fs.readFileSync(usersFilePath, "utf8");
  const users = JSON.parse(usersData).users;
  return users;
};
// Function to write users to file
const writeUsersToFile = (users) => {
  const data = JSON.stringify({ users: users });
  fs.writeFileSync(usersFilePath, data, "utf8");
};

// Get Users
const users = (req, res) => {
  try {
    return res.status(200).json(readUsersFromFile());
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while retrieving the users." });
  }
};

// Function for creating a user
const createUser = (req, res) => {
  try {
    const users = readUsersFromFile();
    const newUser = req.body;

    // Check if a user with the same email already exists
    const existingUser = users.find((user) => user.email === newUser.email);
    if (existingUser) {
      return res.status(400).json({
        error: "A user with the same email already exists.",
      });
    }

    // Generate a unique ID for the new user
    const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
    newUser.id = lastUserId + 1;

    // Add the new user to the existing users array
    users.push(newUser);
    writeUsersToFile(users);

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while creating the user." });
  }
};

// Controller function to delete a user
const deleteUser = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const users = readUsersFromFile();

    // Find the index of the user to delete
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    // Remove the user from the users array
    const deletedUser = users.splice(userIndex, 1)[0];
    writeUsersToFile(users);

    return res.status(200).json({
      message: "User deleted successfully.",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "An error occurred while deleting the user.",
    });
  }
};

module.exports = { users, createUser, deleteUser };
