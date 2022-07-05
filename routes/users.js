var express = require("express");
var router = express.Router();
let users = require("../controllers/usersController");

router.get("/", users.getUsers);
router.get("/id", users.getUser);
router.post("/id", users.newUser);
router.put("/id", users.updateUser);
router.delete("/id", users.deleteUser);

module.exports = router;
