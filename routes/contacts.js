var express = require("express");
var router = express.Router();
let contacts = require("../controllers/contactsController");

router.get("/", contacts.getContacts);
router.get("/:id", contacts.getContact);
router.post("/:id", contacts.newContact);
router.put("/:id", contacts.updateContact);
router.delete("/:id", contacts.deleteContact);

module.exports = router;
