import React from 'react';
import './note_index.scss'

class NoteIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      notes: [],
    };
    this.renderNotes = this.renderNotes.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.filterNotes = this.filterNotes.bind(this)
  }


  handleClick(note = null) {
    if (!note._id) {
      this.props.history.push('/notes/create')
    } else {
      this.props.history.push(`/notes/${note._id}`)
    }
  }

  componentDidMount() {
    this.props.requestAllNotes(this.props.currentUser.id).then(() => {
      this.filterNotes()
    })
  }

  update(field) {
    return e => { 
      this.setState({
        [field]: e.currentTarget.value
      });
    }
  }

  filterNotes() {
    let filteredNotes = Object.values(this.props.notes).filter(note => {
      return note.content.toLowerCase().includes(this.state.search.toLowerCase()) ||
        note.tags.join('').toLowerCase().includes(this.state.search.toLowerCase()) ||
        note.title.toLowerCase().includes(this.state.search.toLowerCase())
    })
    this.state.notes = filteredNotes
  }

  renderNotes() {
    return Object.values(this.state.notes).reverse().map(note => (
      <div key={note._id} onClick={() => this.handleClick(note)} className="note-card card">
        <div className="note-background">
          <div className="note-body card-body">
            {this.attachNote(note)}
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

  attachNote(note) {
    let createMarkup = () => { return { __html: note.body }; };
    return <div dangerouslySetInnerHTML={createMarkup()}></div>
  }

  render() {
    return (
      <div className="notes-index">
      <div className="notes-container">
            <input
              className="notes-search form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={this.update('search')}
              value={this.state.search} />
            { !this.state.search ? <div onClick={this.handleClick} className="note-card card">
            <div className="note-body card-body">
              Hurry! Write it down before you forget it!
            </div>
            <div className="input-group-prepend">
              <div className="notes-tags">
                <div>
                  Create a note
                </div>
                <div className="note-tags-text">
                  Ya know you wanna!
                </div>
              </div>
            </div>
          </div> : null}
            {this.renderNotes()}
        </div>
      </div>
    );
  }
}

export default NoteIndex;