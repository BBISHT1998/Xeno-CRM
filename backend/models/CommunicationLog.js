const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}, customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Segment' },
  message: String,
  status: { type: String, enum: ['SENT', 'FAILED'], default: 'SENT' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CommunicationLog', logSchema);
