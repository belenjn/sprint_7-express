let contacts = require("../data/contacts.json");

const getContacts = (req, res) => {

  return res.json(contacts);

};

const getContact = (req, res) => {
  const contact = contacts.find((cont) => cont.id == req.params.id);
  return res.json(contact);
};

const deleteContact = (req, res) => {
  const contactId = contacts.find((contact) => contact.id == req.params.id);
  contacts.splice(contactId, 1);

  return res.json("contact deleted");
};

// TODO: revisar estas dos funciones para ver que funcionan correctamente en postman
const updateContact = (req, res) => {
  contacts.forEach((contact, index) => {
    if (contact.id === req.params.id) {
      return (contacts[index] = req.body);
    }
  });

  return res.json("contact updated");
};

const newContact = (req, res) => {
  contacts = [...contacts, req.body];
  return res.json("contact added");
};

module.exports = {
  deleteContact,
  getContact,
  getContacts,
  updateContact,
  newContact,
};
