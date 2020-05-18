const express = require("express");
const router = express.Router();
const passport = require('passport');
const Character = require('../../models/Character');

router.post("/",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const newCharacter = new Character(req.body);
    newCharacter.save().then(character => res.json(character));
    return res
  }
);

router.patch("/update", (req, res) => {
  const filter = { _id: req.body._id };
  const update = req.body;
  Character.findOneAndUpdate(filter, update, { new: true })
    .then(character => res.json(character))
    .catch(err => res.status(400).json({ unabletoupdate: err }))
})

router.get("/index/:userId", (req, res) => {
  Character.find({ "author": `${req.params.userId}` })
    .then(character => res.json(character))
    .catch(err => res.status(404).json({ noCharacterFound: err }))
});

router.get("/show/:characterId", (req, res) => {
  Character.findOne({ "_id": `${req.params.characterId}` })
    .populate({
      path: 'author',
      select: ['username']
    })
    .then(character => res.json(character))
    .catch(err => res.status(404).json({ charactersFound: err }))
});

module.exports = router