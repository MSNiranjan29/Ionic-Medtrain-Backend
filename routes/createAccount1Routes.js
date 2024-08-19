const express = require('express');
const router = express.Router();
const CreateAccount1 = require('../models/CreateAccount1');

// Route to create an account with mobile number
router.post('/create-an-account1', async (req, res) => {
  try {
    console.log(req.body); // Log the incoming request body to see what data is being sent
    const { mobNumber } = req.body;
    if (!mobNumber) {
      return res.status(400).json({ message: 'Mobile number is required' });
    }
    const newAccount1 = new CreateAccount1({ mobNumber });
    await newAccount1.save();
    res.status(201).json({ message: 'Account with mobile number created successfully' });
  } catch (err) {
    console.error('Error creating account with mobile number:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
