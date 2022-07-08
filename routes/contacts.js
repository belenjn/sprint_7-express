var express = require("express");
var router = express.Router();
let contacts = require("../controllers/contactsController");

router.get("/", contacts.getContacts);
router.post("/", contacts.newContact);
router.get("/:id", contacts.getContact);
router.put("/:id", contacts.updateContact);
router.delete("/:id", contacts.deleteContact);

module.exports = router;
