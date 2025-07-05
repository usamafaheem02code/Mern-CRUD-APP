require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Models/users.js");
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err.message);
  });


// get
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(201).send(users);
});

// findsingleproduct

app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  res.send({ message: "User found", user });
});

// post

app.post("/users", async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).send({ message: "User successfully posted", user: newUser });
});

// update

app.put("/users/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);

  res.send({ message: "User updated successfully", user: updatedUser });
});
// delete

app.delete("/users/:id", async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.send({ message: "User deleted", user: deletedUser });
});

app.listen(port, () => {
  console.log(`the server is running on the port ${port}`);
});