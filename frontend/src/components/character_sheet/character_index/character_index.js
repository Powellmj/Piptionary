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
      let character = { player: this.props.currentUser._id }
      this.props.createCharacter(character).then(char => { console.log(char); this.props.history.push(`/characters/${char._id}`)})
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