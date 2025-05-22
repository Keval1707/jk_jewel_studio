const { sendMail } = require('../services/mailService');

/**
 * Send a custom email using POST /mail/send
 * @route POST /mail/send
 */
const sendCustomEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, and text or html.' });
  }

  try {
    const result = await sendMail({ to, subject, text, html });
    res.status(200).json({ message: 'Email sent successfully', info: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
};

module.exports = { sendCustomEmail };
