import React, { useState } from 'react';
import { createMessage } from '../../actions/message_actions';
import { useDispatch, useSelector } from "react-redux";
import { EditorState, convertToRaw, Modifier, SelectionState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import openSocket from 'socket.io-client';
import './messager.scss'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const socket = process.env.NODE_ENV === 'production' ? openSocket('https://piptionary.herokuapp.com/') : openSocket('http://localhost:5000')

const MessageTextArea = () => {
  const [state, setState] = useState(() => ({ editorState: EditorState.createEmpty(), contentState: ''}))
  const currentUserID = useSelector(state => state.session.user.id);
  const dispatch = useDispatch();

  const onEditorStateChange = editorState => {
    setState(prevState => ({ ...prevState, editorState: editorState }))
  };

  const onContentStateChange = contentState => {
    setState(prevState => ({ ...prevState, contentState: contentState }))
  };

  const handleReturn = (e) => {
    if (e.shiftKey) return 'not-handled'

    const content = JSON.stringify(convertToRaw(state.editorState.getCurrentContent()))
    const message = { body: draftToHtml(JSON.parse(content)), author_id: currentUserID };
    
    if (state.contentState.blocks.some(block =>  (block.text !== ""))) {
      dispatch(createMessage(message)).then(message => {
        socket.emit('chat message', `${message._id}`);
        handleClear()
      })
    }
    return 'handled'
  };

  const handleClear = () => {
    let { editorState } = state;
    let contentState = editorState.getCurrentContent();
    const firstBlock = contentState.getFirstBlock();
    const lastBlock = contentState.getLastBlock();
    const allSelected = new SelectionState({
      anchorKey: firstBlock.getKey(),
      anchorOffset: 0,
      focusKey: lastBlock.getKey(),
      focusOffset: lastBlock.getLength(),
      hasFocus: true
    });
    contentState = Modifier.removeRange(contentState, allSelected, 'backward');
    editorState = EditorState.push(editorState, contentState, 'remove-range');
    setState(prevState => ({ ...prevState, editorState }));
  }

  return (
    <form className="message-input-form">
      <Editor
        editorState={state.editorState}
        onEditorStateChange={onEditorStateChange}
        onContentStateChange={onContentStateChange}
        editorClassName="messages-editor"
        toolbarClassName="messages-toolbar"
        wrapperClassName="messages-editor-wrapper"
        handleReturn={handleReturn}
        toolbar={{
          options: ['inline', 'colorPicker', 'link'],
          inline: { options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'] },
          link: { options: ['link'] }, 
          colorPicker: { colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
            'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
            'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
            'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
            'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)', 'rgb(255,255,255)',
            'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)', 'rgba(0, 0, 0, 0)'] 
          }
        }} />
    </form>
  );
}

export default MessageTextArea;