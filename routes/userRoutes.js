const express = require('express');
const router = express.Router();
const CreateAccount = require('../models/CreateAccount');
const CreateAccount1 = require('../models/CreateAccount1'); // Import the second model
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to authenticate JWT

// Get user details
router.get('/user', authMiddleware, async (req, res) => {
  try {
    // Try to find the user in the CreateAccount collection first
    let user = await CreateAccount.findById(req.userId);
    
    // If not found, try to find the user in the CreateAccount1 collection
    if (!user) {
      user = await CreateAccount1.findById(req.userId);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
