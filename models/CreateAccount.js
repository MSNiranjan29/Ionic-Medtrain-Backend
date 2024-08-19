const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema
const createAccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rePassword: {
    type: String,
    required: true,  // this should match the password but not stored in DB
  }
});

// Pre-save hook to check if passwords match and hash the password
createAccountSchema.pre('save', async function (next) {
  if (this.password !== this.rePassword) {
    const err = new Error('Passwords do not match');
    return next(err);
  }

  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.rePassword = undefined;  // Do not store rePassword in DB
    next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare entered password with hashed password
createAccountSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create the model
const CreateAccount = mongoose.model('CreateAccount', createAccountSchema);

module.exports = CreateAccount;
