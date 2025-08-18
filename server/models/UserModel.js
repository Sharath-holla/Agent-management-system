const mongoose = require('mongoose');

// For simplicity, we'll have one admin. In a real app, you might have a role-based system.
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);