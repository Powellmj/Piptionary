const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  author:
  {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  created_at:
  {
    type: Date, default: Date.now
  }
});

module.exports = Message = mongoose.model('Message', MessageSchema);