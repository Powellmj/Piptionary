const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
      type: String,
      required: false
    },
    body: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    tags: {
      type: Array
    },
    author:
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    created_at:
    {
      type: Date, default: Date.now
    }
  });

module.exports = Note = mongoose.model('Note', NoteSchema);