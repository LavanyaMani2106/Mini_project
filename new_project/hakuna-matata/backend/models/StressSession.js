const mongoose = require('mongoose');

const stressSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stressLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  emotions: [{
    type: String,
  }],
  timestamp: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number, // in seconds
    default: 0,
  },
});

module.exports = mongoose.model('StressSession', stressSessionSchema);