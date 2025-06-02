const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
,
  name: String,
  email: { type: String, unique: true },
  phone: String,
  totalSpend: Number,
  visits: Number,
  lastActive: Date
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
