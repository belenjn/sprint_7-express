let contacts = require("../data/contacts.json");

const getContacts = (req, res) => {
  return res.json(contacts);
};

const getContact = (req, res) => {
  const contact = contacts.find((cont) => String(cont.id) === req.params.id);
  return res.json(contact);
};

const deleteContact = (req, res) => {
  const contactId = contacts.find(
    (contact) => String(contact.id) === req.params.id
  );

  return res.json({ success: true, message: "Contact deleted" });
};

const updateContact = (req, res) => {
  contacts.forEach((contact, index) => {
    if (String(contact.id) === req.params.id) {
      return console.log((contacts[index] = req.body));
    }
  });

  return res.json({ success: true, message: "Contact updated" });
};

const newContact = (req, res) => {
  contacts = [...contacts, req.body];
  return res.json({ success: true, message: "New contact created" });
};

module.exports = {
  deleteContact,
  getContact,
  getContacts,
  updateContact,
  newContact,
};
