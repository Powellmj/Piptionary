import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { requestCharacter, updateCharacter } from '../../actions/character_actions';
import './character.scss'

const CharacterForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const _id = location.pathname.split('/')[2];
  const currentUser = useSelector(state => state.session.user);

  const [state, setState] = useState(() => {
    dispatch(requestCharacter(_id)).then(payload => {
      setState(payload.character)
    })
  })

  if (!state) return null

  const update = (idx) => {
    return e => {
      let value = state.attributes[idx].split("|").slice(0, 3)
      value = value.join('|') + "|" + e.currentTarget.value
      let attributes = state.attributes
      attributes.splice(idx, 1, value)
      setState(prevState => ({ ...prevState, attributes: attributes }));
    }
  }

  const dragElement = (elmnt) => {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    let dragMouseDown = (e) => {
      e = e || window.event;
      e.preventDefault();
 
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    let elementDrag = (e) => {
      e = e || window.event;
      e.preventDefault();

      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      let newPos = state.attributes[parseInt(elmnt.getAttribute('idx'))].split('|')
      newPos[1] = `${elmnt.style.top}`;
      newPos[2] = `${elmnt.style.left}`;
      newPos = newPos.join('|')
      state.attributes[parseInt(elmnt.getAttribute('idx'))] = newPos
    }

    let closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    }

    if (document.getElementById((elmnt.id) + "header")) {
      document.getElementById((elmnt.id) + "header").onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }

    elmnt.style.top = `${state.attributes[`${parseInt(elmnt.getAttribute('idx'))}`].split('|')[1]}`
    elmnt.style.left = `${state.attributes[`${parseInt(elmnt.getAttribute('idx'))}`].split('|')[2]}`
  }

  const posElements = () => {
    state.attributes.forEach(field => {
      if (document.getElementById(field.split('|')[0])) {
        dragElement(document.getElementById(field.split('|')[0]))
      }
    })
  }

  const renderFields = () => {
    return state.attributes.map((field, idx) => {
      if ('Strength Constitution Dexterity Wisdom Intelligence Charisma'.includes(field.split('|')[0])) {
        return (
          <div key={`input-${idx}`} className="character-sheet-input-attr-field-container" idx={`${idx}`} id={`${field.split('|')[0]}`}>
            <label className="character-sheet-attr-input-label">{`${field.split('|')[0]}`}</label>
            <input type="text"
              value={state.attributes[idx].split("|")[3]}
              onChange={update(idx)}
              className="character-sheet-attr-input"
            />
            <input type="text"
              value={state.attributes[idx].split('|')[3]}
              onChange={update(idx)}
              className="character-sheet-attr-input-secondary"
            />
            <div className="character-sheet-input-field-header" id={`${field.split('|')[0]}header`}>|||</div>
          </div>
        )
      } else if ('Armor Class Passive Perception Hit Points Hit Dice Speed Initiative'.includes(field.split('|')[0])) {
        return (
          <div key={`input-${idx}`} className="character-sheet-input-attr-field-container" idx={`${idx}`} id={`${field.split('|')[0]}`}>
            <input type="text"
              value={state.attributes[idx].split("|")[3]}
              onChange={update(idx)}
              className="character-sheet-attr-input"
            />
            <label className="character-sheet-attr-input-label">{`${field.split('|')[0]}`}</label>
            <div className="character-sheet-input-field-header" id={`${field.split('|')[0]}header`}>|||</div>
          </div>
        )
      } else {
        return (
          <div key={`input-${idx}`} className="character-sheet-input-field-container" idx={`${idx}`} id={`${field.split('|')[0]}`}>
            <div className="character-sheet-input-field-header" id={`${field.split('|')[0]}header`}>|||</div>
            <input type="text"
              value={state.attributes[idx].split('|')[3]}
              onChange={update(idx)}
              className="character-sheet-input"
            />
            <label className="character-sheet-input-label">{`${field.split('|')[0]}`}</label>
          </div>
        )
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let character = state;
    character.player = currentUser.id
    dispatch(updateCharacter(character))
  }

  const toggleDrag = () => {
    let sheet = document.createElement('style')
    sheet.innerHTML = ".character-sheet-input-field-header {display: flex;}";
    document.body.appendChild(sheet);
  }

  const untoggleDrag = () => {
    let sheet = document.createElement('style')
    sheet.innerHTML = ".character-sheet-input-field-header {display: none;}";
    document.body.appendChild(sheet);
  }

  return (
    <form onSubmit={handleSubmit} className="character-form">
      { renderFields() }
      { setTimeout(() => { posElements() }, 1000) }
      <input
        type="submit"
        value="Submit"
        className="btn btn-primary btn-lg session-submit"
      />
      <div onClick={toggleDrag}>do it</div>
      <div onClick={untoggleDrag}>undo it</div>
    </form>
  );
}

export default CharacterForm;