const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  id: { type: String },
  timestamp: { type: Date, default: Date.now },
  stressLevel: { type: Number },
  duration: { type: Number },
  notes: { type: String },
  raw: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

module.exports = mongoose.models.Session || mongoose.model('Session', SessionSchema);
