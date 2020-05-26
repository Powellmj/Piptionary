const express = require("express");
const router = express.Router();
const passport = require('passport');
const Attribute = require('../../models/Attribute');
const Character = require('../../models/Character');

router.post("/",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const newAttribute = new Attribute(req.body);
    newAttribute.save().then(attribute => res.json(attribute));
    return res
  }
);

router.post("/dump",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Attribute.insertMany(req.body).then(attributes => {
      let attributeIds = attributes.map(attr => {
        return attr._id
      })
      Character.findOneAndUpdate({ _id: attributes[0].character }, {
        "$set": { attributes: attributeIds } }, { new: true }).then(res => {console.log(res)})
    })
  }
);

router.patch("/update", (req, res) => {
  const filter = { _id: req.body._id };
  const update = req.body;
  Attribute.findOneAndUpdate(filter, update, { new: true })
    .then(attribute => res.json(attribute))
    .catch(err => res.status(400).json({ unabletoupdate: err }))
})

// router.get("/index/:userId", (req, res) => {
//   Attribute.find({ "player": `${req.params.userId}` })
//     .then(attributes => { res.json(attributes) })
//     .catch(err => res.status(404).json({ noAttributeFound: err }))
// });

// router.get("/show/:attributeId", (req, res) => {
//   Attribute.findOne({ "_id": `${req.params.attributeId}` })
//     .populate({
//       path: 'author',
//       select: ['username']
//     })
//     .then(attribute => res.json(attribute))
//     .catch(err => res.status(404).json({ AttributesFound: err }))
// });

module.exports = router