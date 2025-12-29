const userService = require("../services/user.service");

exports.createUser = async (req, res) => {
  const user = await userService.create(req.body);
  res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
  res.json(await userService.findAll());
};

exports.getUserById = async (req, res) => {
  const user = await userService.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const user = await userService.update(req.params.id, req.body);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const user = await userService.remove(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
};
