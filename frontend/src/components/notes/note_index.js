import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { requestAllUserNotes } from '../../actions/note_actions';
import './note.scss'

const NoteIndex = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const notes = useSelector(state => state.entities.notes)
  const currentUser = useSelector(state => state.session.user);
  const [state, setState] = useState(() => ({ search: '', notes: [], title: '', tags: '' }))

  useEffect(() => { dispatch(requestAllUserNotes(currentUser.id)) }, [dispatch, currentUser]);

  const handleClick = note => {
    if (!note) return history.push('/notes/create')
    history.push(`/notes/${note._id}`)
  }

  const update = (value, field) => {
    setState(prevState => ({ ...prevState, [field]: value }))
  }

  const renderNotes = () => {
    let filteredNotes = Object.values(notes).filter(note => {
      return note.content.toLowerCase().includes(state.search.toLowerCase()) ||
        note.tags.join('').toLowerCase().includes(state.search.toLowerCase()) ||
        note.title.toLowerCase().includes(state.search.toLowerCase())
    })

    return Object.values(filteredNotes).reverse().map(note => (
      <div key={note._id} onClick={() => handleClick(note)} className="note-card card">
        <div className="note-background">
          <div className="note-body card-body">
            {attachNote(note)}
          </div>
        </div>
        <div className="input-group-prepend">
          <div className="notes-tags">
            <div>
              {note.title}
            </div>
            <div className="note-tags-text">
              {note.tags.join(', ')}
            </div>
          </div>
        </div>
      </div>
    ))
  }

  const attachNote = note => {
    return <div dangerouslySetInnerHTML={{ __html: note.body }}></div>
  }

  return (
    <div className="notes-index">
      <div className="notes-container">
        <input
          className="notes-search form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={e => update(e.currentTarget.value, 'search')}
          value={state.search} />
        { !state.search ? <div onClick={() => handleClick()} className="note-card card">
          <div className="note-body card-body">
            Hurry! Write it down before you forget it!
          </div>
          <div className="input-group-prepend">
            <div className="notes-tags">
              <div>Create a note</div>
              <div className="note-tags-text">Ya know you wanna!</div>
            </div>
          </div>
        </div> : null}
          {renderNotes()}
      </div>
    </div>
  );
}

export default NoteIndex;