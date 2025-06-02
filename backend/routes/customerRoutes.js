const express = require('express');
const router = express.Router();
const { addCustomer, getCustomers } = require('../controllers/customerController.js');
const ensureAuth = require('../middleware/ensureAuth');

// Add a customer
router.post('/', ensureAuth, addCustomer);

// Get all customers for the logged-in user
router.get('/', ensureAuth, async (req, res) => {
  try {
    const Customer = require('../models/Customer');
    const customers = await Customer.find({ userId: req.user._id });
    res.json(customers);
  } catch (err) {
    console.error("Error fetching customers:", err);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

router.get('/', ensureAuth, getCustomers);

module.exports = router;
