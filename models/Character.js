const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  attributes: [
    {
      type: String,
    }
  ],
  player:
  {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  created_at:
  {
    type: Date, default: Date.now
  }
});

module.exports = Character = mongoose.model('Character', CharacterSchema);