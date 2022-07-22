require("../db");
const Contact = require("../models/Contacts");

const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  return res.json(contacts);
};

const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id });
    return res.json(contact);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id });
    return res.json({ success: true, message: "Contact successfully deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id },
      {
        contact_name: req.body.contact_name,
        contact_email: req.body.contact_email,
        contact_phone: req.body.contact_phone,
        contact_date: req.body.contact_date,
        subject: req.body.subject,
        comment: req.body.comment,
        viewed: req.body.viewed,
        archived: req.body.archived,
      }
    );
    return res.json({ success: true, message: "Contact successfully updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const newContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    return res.json({ success: true, message: "Contact successfully added" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  deleteContact,
  getContact,
  getContacts,
  updateContact,
  newContact,
};
