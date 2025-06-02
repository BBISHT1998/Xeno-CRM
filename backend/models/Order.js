const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
,
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  amount: Number,
  items: [String],
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
// This code defines a Mongoose schema for an Order model in a Node.js application.
// The schema includes fields for customerId, amount, items, and date, with timestamps enabled.
// The customerId field references the Customer model, allowing for relationships between orders and customers.
