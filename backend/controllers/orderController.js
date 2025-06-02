const Order = require('../models/Order');

const addOrder = async (req, res) => {
  try {
    const { customerId, amount, items } = req.body;

    if (!customerId || !amount) {
      return res.status(400).json({ error: 'customerId and amount are required' });
    }

    const order = await Order.create({ customerId, amount, items });
    res.status(201).json({ message: 'Order added', order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { addOrder };
