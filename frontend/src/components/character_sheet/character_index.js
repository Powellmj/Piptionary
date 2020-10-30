import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createCharacter, requestAllUserCharacters } from '../../actions/character_actions';
import { useHistory } from "react-router-dom";
import './character.scss'

const CharacterIndex = () => {
  const dispatch = useDispatch();
  const currentUserID = useSelector(state => state.session.user.id);
  const characters = useSelector(state => state.entities.characters);
  const history = useHistory();

  useEffect(() => {
    dispatch(requestAllUserCharacters(currentUserID))
  }, [dispatch, currentUserID]);

  const handleClick = char => {
    if (char) {
      history.push(`/characters/${char._id}`)
    } else {
        let attributes = [
          "Acrobatics|335px|210px|",
          "Animal Handling|360px|210px|",
          "Arcana|385px|210px|",
          "Armor Class|125px|210px|",
          "Athletics|410px|210px|",
          "Charisma|663px|91px|",
          "Charisma Saving|300px|210px|",
          "Constitution|300px|91px|",
          "Constitution Saving|225px|210px|",
          "Deception|435px|210px|",
          "Dexterity|178px|91px|",
          "Dexterity Saving|200px|210px|",
          "History|460px|210px|",
          "Hit Dice|75px|574px|",
          "Hit Points|100px|565px|",
          "Initiative|75px|210px|",
          "Insight|485px|210px|",
          "Intelligence|421px|91px|",
          "Intelligence Saving|250px|210px|",
          "Intimidation|510px|210px|",
          "Investigation|535px|210px|",
          "Medicine|560px|210px|",
          "Nature|585px|210px|",
          "Passive Perception|100px|210px|",
          "Perception|610px|210px|",
          "Performance|635px|210px|",
          "Persuasion|660px|210px|",
          "Proficiency Bonus|75px|357px|",
          "Religion|685px|210px|",
          "Sleight of Hand|710px|210px|",
          "Speed|100px|435px|",
          "Stealth|735px|210px|",
          "Strength|57px|91px|",
          "Strength Saving|175px|210px|",
          "Survival|760px|210px|",
          "Wisdom|542px|91px|",
          "Wisdom Saving|275px|210px|"
        ]
      let character = { "player": currentUserID, "attributes": attributes }
      dispatch(createCharacter(character)).then(char => history.push(`/characters/${char._id}`))
    }
  }

  const renderCharacters = () => {
    return Object.values(characters).map(character => (
      <div key={character._id} onClick={() => handleClick(character)} className="note-card card">
        <div className="note-background">
          <div className="note-body card-body">
            {character._id}
          </div>
        </div>
        <div className="input-group-prepend">
          <div className="notes-tags">
            <div>
              character name here
            </div>
            <div className="note-tags-text">
              maybe something else here
            </div>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <div className="notes-form-container">
      <div className="create-character" onClick={() => handleClick(null)}>Create new character</div>
      { renderCharacters() }
    </div>
  );
}

export default CharacterIndex;