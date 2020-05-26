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

  update(idx) {
    return e => {
      let value = this.state.attributes[idx].split("|").slice(0, 3)
      value = value.join('|') + "|" + e.currentTarget.value
      let attributes = this.state.attributes
      attributes.splice(idx, 1, value)
      this.setState({
        attributes
      });
    }
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
      let newPos = this.state.attributes[parseInt(elmnt.getAttribute('idx'))].split('|')
      newPos[1] = `${elmnt.style.top}`;
      newPos[2] = `${elmnt.style.left}`;
      newPos = newPos.join('|')
      console.log(newPos)
      this.state.attributes[parseInt(elmnt.getAttribute('idx'))] = newPos
    }

    let closeDragElement = () => {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }

    if (document.getElementById((elmnt.id) + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById((elmnt.id) + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
    elmnt.style.top = `${this.state.attributes[`${parseInt(elmnt.getAttribute('idx'))}`].split('|')[1]}`
    elmnt.style.left = `${this.state.attributes[`${parseInt(elmnt.getAttribute('idx'))}`].split('|')[2]}`
  }

  renderFields() {
    console.log(this.state.attributes)
    return this.state.attributes.map((field, idx) => {
      if ('Strength Constitution Dexterity Wisdom Intelligence Charisma'.includes(field.split('|')[0])) {
        return (
          <div key={`input-${idx}`} className="character-sheet-input-attr-field-container" idx={`${idx}`} id={`${field.split('|')[0]}`}>
            <label className="character-sheet-attr-input-label">{`${field.split('|')[0]}`}</label>
            <input type="text"
              value={this.state.attributes[idx].split("|")[3]}
              onChange={this.update(idx)}
              className="character-sheet-attr-input"
            />
            <input type="text"
              value={this.state.attributes[idx].split('|')[3]}
              onChange={this.update(idx)}
              className="character-sheet-attr-input-secondary"
            />
            <div className="character-sheet-input-field-header" id={`${field.split('|')[0]}header`}>|||</div>
          </div>
        )
      } else {
        return (
          <div key={`input-${idx}`} className="character-sheet-input-field-container" idx={`${idx}`} id={`${field.split('|')[0]}`}>
            <div className="character-sheet-input-field-header" id={`${field.split('|')[0]}header`}>|||</div>
            <input type="text"
              value={this.state.attributes[idx].split('|')[3]}
              onChange={this.update(idx)}
              className="character-sheet-input"
            />
            <label className="character-sheet-input-label">{`${field.split('|')[0]}`}</label>
          </div>
        )
      }
    })
  }

  setupDrag() {
    this.state.attributes.forEach(field => {
      if (document.getElementById(field.split('|')[0])) {
        this.dragElement(document.getElementById(field.split('|')[0]))
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let character = this.state;
    character.player = this.props.currentUser.id
    this.props.updateCharacter(character)
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

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="character-form">
        {this.state.attributes ? this.renderFields() : null}
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