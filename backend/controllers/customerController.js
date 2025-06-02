const Customer = require('../models/Customer');

const addCustomer = async (req, res) => {
  try {
    const { name, email, totalSpend, visits, lastActive } = req.body;

    const customer = await Customer.create({
      name,
      email,
      totalSpend,
      visits,
      lastActive,
      userId: req.user._id  // ✅ associate with logged-in user
    });

    res.status(201).json({ message: 'Customer added', customer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ userId: req.user._id });  // ✅ fetch only logged-in user’s data
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
};

module.exports = { addCustomer, getCustomers };
