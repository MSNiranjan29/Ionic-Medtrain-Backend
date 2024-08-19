const express = require('express');
const router = express.Router();
const CreateAccount = require('../models/CreateAccount');

// Route to create an account
router.post('/create-an-account', async (req, res) => {
  try {
    const { name, email, password, rePassword } = req.body;
    if (!name || !email || !password || !rePassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const existingAccount = await CreateAccount.findOne({ email });
    if (existingAccount) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const newAccount = new CreateAccount({ name, email, password, rePassword });
    await newAccount.save();
    res.status(201).json({ message: 'Account created successfully' });
  } catch (err) {
    console.error('Error creating account:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
