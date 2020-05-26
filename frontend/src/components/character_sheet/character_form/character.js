import React from 'react';
import './character.scss'
import Attribute from './attribute'

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.location.pathname.split('/')[2],
    };
    this.renderFields = this.renderFields.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.props.requestCharacter(this.state._id).then(() => {
      this.setState(this.props.characters[this.state._id])
    })
  }

  update(field) {
    console.log(field)
    let body = field.body
    return e => this.setState({
      body: e.currentTarget.value
    });
  }

  toggleDrag() {
    let sheet = document.createElement('style')
    sheet.innerHTML = ".character-sheet-input-field-header {display: flex;}";
    document.body.appendChild(sheet);
  }

  untoggleDrag() {
    let sheet = document.createElement('style')
    sheet.innerHTML = ".character-sheet-input-field-header {display: none;}";
    document.body.appendChild(sheet);
  }

  renderFields() {
    return this.state.attributes.map((attribute) => {
      return <Attribute attribute={attribute} />
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let character = this.state;
    character.player = this.props.currentUser.id
    this.props.updateCharacter(character)
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} className="character-form">
        { this.state.attributes ? this.renderFields() : null }
        <input
          type="submit"
          value="Submit"
          className="btn btn-primary btn-lg session-submit"
        />
        <div onClick={this.toggleDrag}>do it</div>
        <div onClick={this.untoggleDrag}>undo it</div>
      </form>
    );
  }
}

export default Character;