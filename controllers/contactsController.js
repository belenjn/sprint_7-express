const { connection } = require("../db");
const Joi = require("joi");

const contactSchema = Joi.object({
  contact_name: Joi.string().max(100).required(),
  contact_email: Joi.string().email().required(),
  contact_phone: Joi.string()
    .length(11)
    .pattern(/^[0-9-]+$/)
    .required(),
  contact_date: Joi.date().required(),
  subject: Joi.string().max(500),
  comment: Joi.string(),
  viewed: Joi.number().min(0).max(1).required(),
  archived: Joi.number().min(0).max(1).required(),
});

const getContacts = (req, res) => {
  connection.query("SELECT * FROM contacts", (error, results, fields) => {
    return res.json({ contacts: results });
  });
};

const getContact = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * from contacts WHERE contact_id = ?",
    [id],
    (error, results, fields) => {
      return res.json({ contacts: results });
    }
  );
};

const deleteContact = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE from contacts WHERE contact_id = ?",
    [id],
    (err, results) => {
      return !results
        ? res.status(404).json({ success: false, message: "Contact not found" })
        : res.json({ success: true, message: "Contact successfully deleted" });
    }
  );
}

const updateContact = (req, res) => {
  const id = req.params.id;
  const { error } = contactSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ sucess: false, message: error.message });
  } else {
  connection.query(
    "UPDATE contacts SET contact_name = ?, contact_email = ?, contact_phone = ?, contact_date = ?, subject = ?, comment = ?, viewed = ?, archived = ? WHERE contact_id = ?",
    [
      req.body.contact_name,
      req.body.contact_email,
      req.body.contact_phone,
      req.body.contact_date,
      req.body.subject,
      req.body.comment,
      req.body.viewed,
      req.body.archived,
      id,
    ],
    (err, results) => {
      console.log(err);
      return !results
        ? res.status(404).json({ success: false, message: "Contact not found" })
        : res.json({ success: true, message: "Contact successfully updated" });
    }
  )};
};

const newContact = (req, res) => {
  const { error } = contactSchema.validate(req.body, { abortEarly: false });
  const newContactData = [
    req.body.contact_name,
    req.body.contact_email,
    req.body.contact_phone,
    req.body.contact_date,
    req.body.subject,
    req.body.comment,
    req.body.viewed,
    req.body.archived,
  ];
  if (error) {
    return res.status(400).json({ sucess: false, message: error.message });
  } else {
  connection.query(
    "INSERT INTO contacts(contact_name, contact_email, contact_phone, contact_date, subject, comment, viewed, archived) VALUES(?)",
    [newContactData],
    (err, results) => {
      console.log(err);
      return res.json({
        success: true,
        message: "Contact successfully created",
      });
    }
  )};
};

module.exports = {
  deleteContact,
  getContact,
  getContacts,
  updateContact,
  newContact,
};
