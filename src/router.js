express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
    res.send("Waiting For You Request");
});

// login user
router.post("/loginUser", userController.loginUser);

// add user
router.post("/addUser", userController.addUser);

// delete user
router.get("/deleteUser", userController.deleteUser);

// get all users
router.get("/users", userController.users);

module.exports = router;
