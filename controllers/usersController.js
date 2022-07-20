require("../db");
const User = require("../models/Users");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  const users = await User.find();
  return res.json(users);
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    return res.json(user);
  } catch (error) {
    res.status(404).json({ success: false, message: "User not found" });
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    return res.json({ success: true, message: "User successfully deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "User not found" });
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_phone: req.body.user_phone,
        start_date: req.body.start_date,
        occupation: req.body.occupation,
        status: req.body.status,
        user_image: req.body.user_image,
        password: bcrypt.hashSync(req.body.password, 5),
      }
    );
    return res.json({ success: true, message: "User successfully updated" });
  } catch (error) {
    res.status(404).json({ success: false, message: "User not found" });
    console.log(error);
  }
};

const newUser = async (req, res) => {
  try {
    const newUser = new User({
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      user_phone: req.body.user_phone,
      start_date: req.body.start_date,
      occupation: req.body.occupation,
      status: req.body.status,
      user_image: req.body.user_image,
      password: bcrypt.hashSync(req.body.password, 5),
    });
    await newUser.save();
    return res.json({ success: true, message: "User successfully added" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  newUser,
};
