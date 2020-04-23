const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "notes"
    }
  ],
  theme: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('User', UserSchema);