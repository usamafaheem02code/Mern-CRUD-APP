const mongoose = require("mongoose");

// Step 1: Batana ke har document (user) mein kya fields honi chahiye
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Step 2: Ye schema ko use karke model banaya
const User = mongoose.model("User", userSchema);

// Step 3: Export kiya taake index.js mein use ho
module.exports = User;
