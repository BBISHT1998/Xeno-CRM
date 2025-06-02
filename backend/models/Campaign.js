const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  segmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Segment',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sentTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Campaign', campaignSchema);
