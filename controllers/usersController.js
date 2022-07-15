const { connection } = require("../db");
const Joi = require("joi");
const bcrypt = require("bcrypt");



const userSchema = Joi.object({
  user_name: Joi.string().max(30).required(),
  user_email: Joi.string().email().required(),
  user_phone: Joi.string()
    .length(11)
    .pattern(/^[0-9-]+$/)
    .required(),
  start_date: Joi.date().required(),
  occupation: Joi.string().valid("manager", "reception", "room_service"),
  status: Joi.number().min(0).max(1),
  photo: Joi.string(),
  password: Joi.string().min(6).max(25),
});

const getUsers = (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    return res.json({ users: results });
  });
};

const getUser = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    [id],
    (err, results) => {
      return !results
        ? res.status(404).json({ success: false, message: "User not found" })
        : res.json({ user: results });
    }
  );
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM users WHERE user_id = ?",
    [id],
    (err, results) => {
      return !results
        ? res.status(404).json({ success: false, message: "User not found" })
        : res.json({ success: true, message: "User successfully deleted" });
    }
  );
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ sucess: false, message: error.message });
  } else {
    connection.query(
      "UPDATE users SET user_name = ?, user_email = ?, user_phone = ?, start_date = ?, occupation = ?, user_image = ?, status = ?, password = ? WHERE user_id = ?",
      [
        req.body.user_name,
        req.body.user_email,
        req.body.user_phone,
        req.body.start_date,
        req.body.occupation,
        req.body.user_image,
        req.body.status,
        bcrypt.hashSync(req.body.password, 5),
        id,
      ],
      (err, results) => {
        console.log(err);
        return !results
          ? res.status(404).json({ success: false, message: "User not found" })
          : res.json({ success: true, message: "User successfully updated" });
      }
    );
  }
};

const newUser = (req, res) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });

  const newUser = [
    req.body.user_name,
    req.body.user_email,
    req.body.user_phone,
    req.body.start_date,
    req.body.occupation,
    req.body.user_image,
    req.body.status,
    bcrypt.hashSync(req.body.password, 5),
  ];
  if (error) {
    return res.status(400).json({ sucess: false, message: error.message });
  } else {
    connection.query(
      "INSERT INTO users (user_name, user_email, user_phone, start_date, occupation, user_image,status, password) VALUES (?)",
      [newUser],
      (err, results) => {
        if (err) throw err;
        return res.json({ success: true, message: "User successfully added" });
      }
    );
  }
};

module.exports = {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  newUser,
};
