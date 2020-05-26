const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttributeSchema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  pos: {
    type: String,
  },
  character:
  {
    type: Schema.Types.ObjectId,
    ref: "Character"
  },
  created_at:
  {
    type: Date, default: Date.now
  }
});

module.exports = Attribute = mongoose.model('Attribute', AttributeSchema);