import React from 'react';
import { withRouter } from 'react-router'
import './character_index.scss'

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.requestAllUserCharacters(this.props.currentUser.id)
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleClick(char) {
    if (char) {
      this.props.history.push(`/characters/${char._id}`)
    } else {
        let attributes = [
          "Acrobatics|335px|210px|",
          "Animal_Handling|360px|210px|",
          "Arcana|385px|210px|",
          "Armor_Class|125px|210px|",
          "Athletics|410px|210px|",
          "Charisma|663px|91px|",
          "Charisma_Saving|300px|210px|",
          "Constitution|300px|91px|",
          "Constitution_Saving|225px|210px|",
          "Deception|435px|210px|",
          "Dexterity|178px|91px|",
          "Dexterity_Saving|200px|210px|",
          "History|460px|210px|",
          "Hit_Dice|75px|574px|",
          "Hit_Points|100px|565px|",
          "Initiative|75px|210px|",
          "Insight|485px|210px|",
          "Intelligence|421px|91px|",
          "Intelligence_Saving|250px|210px|",
          "Intimidation|510px|210px|",
          "Investigation|535px|210px|",
          "Medicine|560px|210px|",
          "Nature|585px|210px|",
          "Passive_Perception|100px|210px|",
          "Perception|610px|210px|",
          "Performance|635px|210px|",
          "Persuasion|660px|210px|",
          "Proficiency_Bonus|75px|357px|",
          "Religion|685px|210px|",
          "Sleight_of_Hand|710px|210px|",
          "Speed|100px|435px|",
          "Stealth|735px|210px|",
          "Strength|57px|91px|",
          "Strength_Saving|175px|210px|",
          "Survival|760px|210px|",
          "Wisdom|542px|91px|",
          "Wisdom_Saving|275px|210px|"
        ]
      let character = { "player": this.props.currentUser._id, "attributes": attributes }
      this.props.createCharacter(character).then(char => this.props.history.push(`/characters/${char._id}`))
    }
  }

  renderCharacters() {
    return Object.values(this.props.characters).map(character => (
      <div key={character._id} onClick={() => this.handleClick(character)} className="note-card card">
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

  render() {
    return (
      <div className="notes-form-container">
        <div className="create-character" onClick={() => this.handleClick(null)}>Create new character</div>
        { this.renderCharacters() }
      </div>
    );
  }
}

export default withRouter(Character);