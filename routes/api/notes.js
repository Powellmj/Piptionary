const express = require("express");
const router = express.Router();
const passport = require('passport');
const validateNoteInput = require('../../validation/note');
const Note = require('../../models/Note');

router.post("/",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNoteInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newNote = new Note({
      title: req.body.title,
      body: req.body.body,
      content: req.body.content,
      tags: req.body.tags,
      author: req.body.author_id
    });
    newNote.save().then(note => res.json(note));
    return res
  }
);

router.patch("/update", (req, res) => {
  const filter = { _id: req.body._id };
  const update = req.body;
  Note.findOneAndUpdate(filter, update, { new: true })
    .then(note => res.json(note))
    .catch(err => res.status(400).json({ unabletoupdate: err}))
})

router.get("/index/:userId", (req, res) => {
  Note.find({ "author": `${req.params.userId}`})
    .then(notes => res.json(notes))
    .catch(err => res.status(404).json({ noNotesFound: err }))
});

router.get("/show/:noteId", (req, res) => {
  Note.findOne({ "_id": `${req.params.noteId}` })
    .then(note => res.json(note))
    .catch(err => res.status(404).json({ noNotesFound: err }))
});

router.delete("/:id", (req, res) => {
  const filter = { "_id": `${req.params.id}` };
  Note.deleteOne(filter)
  .then(result => console.log(`Deleted ${result.deletedCount} item.`))
  .catch(err => console.error(`Delete failed with error: ${err}`))
  return req.params.id
});

module.exports = router