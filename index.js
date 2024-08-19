const express = require('express');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// Initialize Firebase Admin SDK
try {
  const serviceAccount = require('./firebase-adminsdk.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase Admin SDK initialized');
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
}

// MongoDB connection
const mongoUri = 'mongodb://127.0.0.1:27017/medtrain';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log(`Connected to MongoDB at ${mongoUri}`))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const createAccountRoutes = require('./routes/createAccountRoutes');
const createAccount1Routes = require('./routes/createAccount1Routes');

app.use('/api', createAccountRoutes);
app.use('/api', createAccount1Routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
