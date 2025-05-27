// controllers/ContactController.js
const Contact = require('../models/Contact');

const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();
    res.status(201).json({ success: true, data: newContact });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save contact.' });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).select('-createdAt -updatedAt -__v ');
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch contacts.' });
  }
};

module.exports = {
  createContact,
  getAllContacts,
};
