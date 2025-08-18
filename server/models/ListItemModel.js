const mongoose = require('mongoose');

const ListItemSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: Number, required: true },
  notes: { type: String },
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('ListItem', ListItemSchema);