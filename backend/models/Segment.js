const mongoose = require('mongoose');

const segmentSchema = new mongoose.Schema({
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
,
  name: String,
  rules: [
    {
      field: String,         // "spend", "visits", "lastActive"
      operator: String,      // ">", "<", "=", ">=", "<=", "!="
      value: mongoose.Schema.Types.Mixed
    }
  ],
  logic: String,            // "AND", "OR"
}, { timestamps: true });

module.exports = mongoose.model('Segment', segmentSchema);
