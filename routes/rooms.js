var express = require("express");
var router = express.Router();
let rooms = require("../controllers/roomsController");

router.get("/", rooms.getRooms);
router.post("/", rooms.newRoom);
router.get("/:id", rooms.getRoom);
router.put("/:id", rooms.updateRoom);
router.delete("/:id", rooms.deleteRoom);

module.exports = router;
