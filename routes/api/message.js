const express = require("express");
const router = express.Router();
const passport = require('passport');
const validateMessageInput = require('../../validation/message');
const Message = require('../../models/Message');

router.post("/",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMessageInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newMessage = new Message({
      body: req.body.body,
      author: req.body.author_id
    });
    newMessage.save().then(message => res.json(message));
    return res
  }
);

router.patch("/update", (req, res) => {
  const filter = { _id: req.body._id };
  const update = req.body;
  Message.findOneAndUpdate(filter, update, { new: true })
    .then(message => res.json(message))
    .catch(err => res.status(400).json({ unabletoupdate: err }))
})

router.get("/index/:userId", (req, res) => {
  Note.find({ "author": `${req.params.userId}` })
    .then(notes => res.json(notes))
    .catch(err => res.status(404).json({ noNotesFound: err }))
});

router.get("/show/:messageId", (req, res) => {
  Message.findOne({ "_id": `${req.params.messageId}` })
    .then(message => res.json(message))
    .catch(err => res.status(404).json({ noMessagesFound: err }))
});

router.delete("/:id", (req, res) => {
  const filter = { "_id": `${req.params.id}` };
  Message.deleteOne(filter)
    .then(result => console.log(`Deleted ${result.deletedCount} item.`))
    .catch(err => console.error(`Delete failed with error: ${err}`))
  return req.params.id
});

module.exports = router