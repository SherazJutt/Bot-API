express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// get all users
router.get("/users", userController.users);
// create user
router.post("/users/create", userController.createUser);

router.delete("/users/remove/:id", userController.deleteUser);
module.exports = router;
