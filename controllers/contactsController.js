const { connection } = require("../db");

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
  );
};

const newContact = (req, res) => {
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
  );
};

module.exports = {
  deleteContact,
  getContact,
  getContacts,
  updateContact,
  newContact,
};
