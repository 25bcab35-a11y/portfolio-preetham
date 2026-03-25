const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGO_URI;

if (!uri) {
  console.log("❌ MONGO_URI not found");
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error:", err));

// Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model("Contact", ContactSchema);

// Routes
app.post("/contact", async (req, res) => {
  try {
    const data = new Contact(req.body);
    await data.save();
    res.json({ message: "Saved ✅" });
  } catch (err) {
    res.status(500).json({ error: "Error saving" });
  }
});

app.get("/contacts", async (req, res) => {
  const data = await Contact.find();
  res.json(data);
});

app.delete("/contact/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted ✅" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});