import { connect } from 'react-redux';
import { requestCharacter, updateCharacter } from '../../../actions/character_actions';
import Character from './character';

const mapStateToProps = (state) => {
  return {
    characters: state.entities.characters,
    currentUser: state.session.user,
    fields: [
      "Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma", 
      "Strength_Saving", "Dexterity_Saving", "Constitution_Saving", "Intelligence_Saving", "Wisdom_Saving", "Charisma_Saving", 
      "Acrobatics", "Animal_Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight_of_Hand", "Stealth", "Survival", 
      "Armor_Class", "Hit_Points", "Hit_Dice", "Speed", "Passive_Perception", "Initiative", "Proficiency_Bonus"]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestCharacter: charId => dispatch(requestCharacter(charId)),
    updateCharacter: character => dispatch(updateCharacter(character)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Character);