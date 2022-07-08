var express = require("express");
var router = express.Router();
let users = require("../controllers/usersController");

router.get("/", users.getUsers);
router.post("/", users.newUser);
router.get("/:id", users.getUser);
router.put("/:id", users.updateUser);
router.delete("/:id", users.deleteUser);

module.exports = router;
