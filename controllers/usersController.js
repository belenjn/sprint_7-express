let users = require("../data/users.json");

const getUsers = (req, res) => {
  return res.json(users);
};

const getUser = (req, res) => {
  // const user = users.find((u) => String(u.id) === req.params.id);
  return res.json(user);
};

const deleteUser = (req, res) => {
  // const userId = users.find((u) => String(u.id) === req.params.id);
  // users.splice(userId, 1);

  return res.json({success: true, message: "User deleted"});
};

const updateUser = (req, res) => {
  // users.forEach((user, index) => {
  //   if (user.id === req.params.id) {
  //     return (users[index] = req.body);
  //   }
  // });

  return res.json({success: true, message: "User updated"});
};

const newUser = (req, res) => {
  // users = [...users, req.body];
  return res.json({success: true, message: "New user created"});
};

module.exports = {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  newUser,
};
