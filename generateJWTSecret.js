const crypto = require('crypto');

// Generate a random 64-byte hex string (128 characters long)
const jwtSecret = crypto.randomBytes(64).toString('hex');

console.log("Generated JWT Secret Key:", jwtSecret);
