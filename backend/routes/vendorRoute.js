const express = require('express');
const router = express.Router();
const CommunicationLog = require('../models/CommunicationLog');

router.post('/send', async (req, res) => {
  try {
    const { customerId, campaignId, message } = req.body;

    // Simulate 90% success
    const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';

    // Call delivery receipt internally
    await fetch('http://localhost:5000/api/vendor/receipt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId, campaignId, message, status })
    });

    res.status(200).json({ status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/receipt', async (req, res) => {
  try {
    const { customerId, campaignId, message, status } = req.body;

    await CommunicationLog.create({
      customerId,
      campaignId,
      message,
      status
    });

    res.status(200).json({ message: 'Delivery status recorded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
