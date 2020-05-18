const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  Strength: { type: String },
  Dexterity: { type: String },
  Constitution: { type: String },
  Intelligence: { type: String },
  Wisdom: { type: String },
  Charisma: { type: String },
  Strength_Saving: { type: String },
  Dexterity_Saving: { type: String },
  Constitution_Saving: { type: String },
  Intelligence_Saving: { type: String },
  Wisdom_Saving: { type: String },
  Charisma_Saving: { type: String },
  Acrobatics: { type: String },
  Animal_Handling: { type: String },
  Arcana: { type: String },
  Athletics: { type: String },
  Deception: { type: String },
  History: { type: String },
  Insight: { type: String },
  Intimidation: { type: String },
  Investigation: { type: String },
  Medicine: { type: String },
  Nature: { type: String },
  Perception: { type: String },
  Performance: { type: String },
  Persuasion: { type: String },
  Religion: { type: String },
  Sleight_of_Hand: { type: String },
  Stealth: { type: String },
  Survival: { type: String },
  Armor_Class: { type: String },
  Hit_Points: { type: String },
  Hit_Dice: { type: String },
  Speed: { type: String },
  Passive_Perception: { type: String },
  Initiative: { type: String },
  Proficiency_Bonus: { type: String },
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