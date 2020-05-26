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
      let character = { "player": this.props.currentUser._id }
      this.props.createCharacter(character).then(char => {
        let attributes = [
          { title: "Acrobatics", body: '', pos: "335px|210px", character: char._id },
          { title: "Animal_Handling", body: '', pos: "360px|210px", character: char._id },
          { title: "Arcana", body: '', pos: "385px|210px", character: char._id },
          { title: "Armor_Class", body: '', pos: "125px|210px", character: char._id },
          { title: "Athletics", body: '', pos: "410px|210px", character: char._id },
          { title: "Charisma", body: '', pos: "663px|91px", character: char._id },
          { title: "Charisma_Saving", body: '', pos: "300px|210px", character: char._id },
          { title: "Constitution", body: '', pos: "300px|91px", character: char._id },
          { title: "Constitution_Saving", body: '', pos: "225px|210px", character: char._id },
          { title: "Deception", body: '', pos: "435px|210px", character: char._id },
          { title: "Dexterity", body: '', pos: "178px|91px", character: char._id },
          { title: "Dexterity_Saving", body: '', pos: "200px|210px", character: char._id },
          { title: "History", body: '', pos: "460px|210px", character: char._id },
          { title: "Hit_Dice", body: '', pos: "75px|574px", character: char._id },
          { title: "Hit_Points", body: '', pos: "100px|565px", character: char._id },
          { title: "Initiative", body: '', pos: "75px|210px", character: char._id },
          { title: "Insight", body: '', pos: "485px|210px", character: char._id },
          { title: "Intelligence", body: '', pos: "421px|91px", character: char._id },
          { title: "Intelligence_Saving", body: '', pos: "250px|210px", character: char._id },
          { title: "Intimidation", body: '', pos: "510px|210px", character: char._id },
          { title: "Investigation", body: '', pos: "535px|210px", character: char._id },
          { title: "Medicine", body: '', pos: "560px|210px", character: char._id },
          { title: "Nature", body: '', pos: "585px|210px", character: char._id },
          { title: "Passive_Perception", body: '', pos: "100px|210px", character: char._id },
          { title: "Perception", body: '', pos: "610px|210px", character: char._id },
          { title: "Performance", body: '', pos: "635px|210px", character: char._id },
          { title: "Persuasion", body: '', pos: "660px|210px", character: char._id },
          { title: "Proficiency_Bonus", body: '', pos: "75px|357px", character: char._id },
          { title: "Religion", body: '', pos: "685px|210px", character: char._id },
          { title: "Sleight_of_Hand", body: '', pos: "710px|210px", character: char._id },
          { title: "Speed", body: '', pos: "100px|435px", character: char._id },
          { title: "Stealth", body: '', pos: "735px|210px", character: char._id },
          { title: "Strength", body: '', pos: "57px|91px", character: char._id },
          { title: "Strength_Saving", body: '', pos: "175px|210px", character: char._id },
          { title: "Survival", body: '', pos: "760px|210px", character: char._id },
          { title: "Wisdom", body: '', pos: "542px|91px", character: char._id },
          { title: "Wisdom_Saving", body: '', pos: "275px|210px", character: char._id }
        ]
        this.props.dumpAttributes(attributes)
      })
      // .then(res => this.props.history.push(`/characters/${char._id}`))
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