express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.index);

// get all users
router.get("/users", userController.users);

module.exports = router;
