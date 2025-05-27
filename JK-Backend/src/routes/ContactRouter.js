// routes/ContactRouter.js
const express = require('express');
const router = express.Router();
const { createContact, getAllContacts } = require('../controllers/ContactController');
const adminAuth = require("../middleware/adminAuth");


router.post('/', createContact); // Save contact form
router.get('/',adminAuth, getAllContacts); // Get all contact messages

module.exports = router;