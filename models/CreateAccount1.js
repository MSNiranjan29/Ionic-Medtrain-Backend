const mongoose = require('mongoose');

// Define the schema
const createAccount1Schema = new mongoose.Schema({
  mobNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create the model
const CreateAccount1 = mongoose.model('CreateAccount1', createAccount1Schema);

module.exports = CreateAccount1;
