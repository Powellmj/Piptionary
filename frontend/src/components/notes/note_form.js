import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { createNote, requestNote, updateNote } from '../../actions/note_actions';
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './note.scss'

const NoteForm = () => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const currentUserID = useSelector(state => state.session.user.id);
  const [state, setState] = useState(() => ({ editorState: '', contentState: '', title: '', tags: '' }))

  useEffect(() => {
    location.pathname === '/notes/create' ? setState(prevState => ({...prevState, editorState: EditorState.createEmpty() })) :
    dispatch(requestNote(location.pathname.split('/')[2])).then(payload => {
      const note = payload.note
      const blocksFromHtml = htmlToDraft(note.body);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);

      setState(() => ({ title: note.title, contentState: contentState, editorState: editorState, tags: note.tags.join(' ')}))
    })
  }, [dispatch, location]);

  const onEditorStateChange = editorState => {
    setState(prevState => ({ ...prevState, editorState: editorState }))
  };

  const onContentStateChange = contentState => {
    setState(prevState => ({ ...prevState, contentState: contentState }))
  };

  const handleSubmit = () => {
    console.log("hi")
    const contentState = state.editorState.getCurrentContent();
    let content = JSON.stringify(convertToRaw(contentState))
    let title = state.title

    if (!title) title = 'Untitled Note'

    const note = {
      title,
      body: draftToHtml(JSON.parse(content)),
      content: compileContentState(),
      tags: state.tags.split(' '),
      author_id: currentUserID
    };

    if (location.pathname === '/notes/create') {
      dispatch(createNote(note))
    } else {
      note._id = location.pathname.split('/')[2]
      dispatch(updateNote(note))
    }

    const editorState = EditorState.push(state.editorState, ContentState.createFromText(''));
    setState({ editorState, tags: '', title: '' })
    history.push('/notes/index')
  }

  const compileContentState = () => {
    let content = '';
    if (state.contentState.blocks) state.contentState.blocks.forEach(block => content += block.text)
    return content
  }

  const update = (value, field) => {
    setState(prevState => ({ ...prevState, [field]: value }))
  }

  return (
    <div className="notes-form-container">
      <div className="notes-create-note-card card text-center">
        <div className="card-header">
          <input
            type="text"
            className="note-title-input form-control"
            aria-label="Title Input"
            onChange={e => update(e.currentTarget.value, 'title')}
            placeholder="Give me a name!"
            value={state.title} />
          </div>
        <div className="notes-create-note-body card-body">
          <Editor
            editorState={state.editorState}
            onEditorStateChange={onEditorStateChange}
            onContentStateChange={onContentStateChange}
            toolbarClassName="notes-toolbar"
            wrapperClassName="notes-editor-wrapper"
            editorClassName="notes-editor"
            toolbar={{
              options: ['inline', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link'],
              inline: { inDropdown: false },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              colorPicker: { colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                  'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                  'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                  'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                  'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)', 'rgb(255,255,255)',
                  'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)', 'rgba(0, 0, 0, 0)'] },
              link: { inDropdown: true }
            }} />
        </div>
        <div className="notes-create-note-footer card-footer">
          <div className="notes-tag-group input-group mb-3">
            <div className="input-group-prepend">
              <span className="note-tag-text input-group-text" id="inputGroup-sizing-default">Tags</span>
            </div>
            <input
              type="text"
              className="note-tag-input form-control"
              aria-label="Tag Input"
              onChange={e => update(e.currentTarget.value, 'tags')}
              value={state.tags} />
            <button type="button" onClick={handleSubmit} className="notes-submit btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteForm;