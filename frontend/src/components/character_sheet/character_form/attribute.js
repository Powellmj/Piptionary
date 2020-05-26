import React from 'react';
import './character.scss'

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.renderFields = this.renderFields.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dragElement = this.dragElement.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.setState(this.props.attribute)
  }

  update() {
    return e => this.setState({
      body: e.currentTarget.value
    });
  }

  dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    let dragMouseDown = (e) => {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    let elementDrag = (e) => {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      this.state[`${elmnt.id}`] = `${elmnt.style.top}|${elmnt.style.left}|`
    }

    let closeDragElement = () => {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }

    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
    elmnt.style.top = `${this.state.pos.split('|')[0]}`
    elmnt.style.left = `${this.state.pos.split('|')[1]}`
  }

  renderFields() {
    if ('Strength Constitution Dexterity Wisdom Intelligence Charisma'.includes(this.state.title)) {
      return (
        <div key={this.state._id} className="character-sheet-input-attr-field-container" id={this.state.title}>
          <label className="character-sheet-attr-input-label">{`${this.state.title}`}</label>
          <input type="text"
            value={this.state.body}
            onChange={this.update(this.state)}
            className="character-sheet-attr-input"
          />
          <input type="text"
            value={this.state.body}
            onChange={this.update(this.state)}
            className="character-sheet-attr-input-secondary"
          />
          <div className="character-sheet-input-field-header" id={`${this.state.title}header`}>|||</div>
        </div>
      )
    } else {
      return (
        <div key={this.state._id} className="character-sheet-input-field-container" id={this.state.title}>
          <div className="character-sheet-input-field-header" id={`${this.state.title}header`}>|||</div>
          <input type="text"
            value={this.state.body}
            onChange={this.update(this.state)}
            className="character-sheet-input"
          />
          <label className="character-sheet-input-label">{`${this.state.title}`}</label>
        </div>
      )
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let character = this.state;
    character.player = this.props.currentUser.id
    this.props.updateCharacter(character)
  }


  render() {
    if (this.state.pos) {
      return (
        <div>
          {this.renderFields()}
          {setTimeout(() => this.dragElement(document.getElementById(this.state.title)), 1)}
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

export default Character;