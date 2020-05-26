import React from 'react';
import './character.scss'

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.location.pathname.split('/')[2],
    };
    this.renderFields = this.renderFields.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dragElement = this.dragElement.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.props.requestCharacter(this.state._id).then(() => {
      this.setState(this.props.characters[this.state._id])
      this.setupDrag()
    })
  }

  update(field) {
    let posState = this.state[`${field}`].split("|").slice(0, 3)
    return e => this.setState({
      [field]: posState.join("|") + "|" + e.currentTarget.value
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
    elmnt.style.top = `${this.state[`${elmnt.id}`].split('|')[1]}`
    elmnt.style.left = `${this.state[`${elmnt.id}`].split('|')[2]}`
  }

  renderFields() {
    return this.props.fields.map((field, idx) => {
      if (idx < 6) {
        return (
          <div key={`input-${idx}`} className="character-sheet-input-attr-field-container" id={`${field}`}>
            <label className="character-sheet-attr-input-label">{`${field}`}</label>
            <input type="text"
              value={this.state[`${field}`].split("|")[3]}
              onChange={this.update(`${field}`)}
              className="character-sheet-attr-input"
            />
            <input type="text"
              value={this.state[`${field}`].split("|")[3]}
              onChange={this.update(`${field}`)}
              className="character-sheet-attr-input-secondary"
            />
            <div className="character-sheet-input-field-header" id={`${field}header`}>|||</div>
          </div>
        )
      } else {
        return (
          <div key={`input-${idx}`} className="character-sheet-input-field-container" id={`${field}`}>
            <div className="character-sheet-input-field-header" id={`${field}header`}>|||</div>
            <input type="text"
              value={this.state[`${field}`].split("|")[3]}
              onChange={this.update(`${field}`)}
              className="character-sheet-input"
            />
            <label className="character-sheet-input-label">{`${field}`}</label>
          </div>
        )
      }
    })
  }

  setupDrag() {
    this.props.fields.forEach(field => {
      if (document.getElementById(field)) {
        this.dragElement(document.getElementById(field))
      }
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
        {this.state.Strength ? this.renderFields() : null}
        <input
          type="submit"
          value="Submit"
          className="btn btn-primary btn-lg session-submit"
        />
      </form>
    );
  }
}

export default Character;