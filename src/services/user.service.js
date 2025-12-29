const User = require("../models/user.model");

exports.create = (data) => User.create(data);

exports.findAll = () => User.find();

exports.findById = (id) => User.findById(id);

exports.update = (id, data) =>
  User.findByIdAndUpdate(id, data, { new: true });

exports.remove = (id) => User.findByIdAndDelete(id);
