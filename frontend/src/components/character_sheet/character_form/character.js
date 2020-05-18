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
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.props.requestCharacter(this.state._id)
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  renderFields() {
    return this.props.fields.map((field, idx) => {
      return <div key={`input-${idx}`} className="form-group session-input-field">
        <input type="text"
          value={this.state[`${field}`]}
          onChange={this.update(`${field}`)}
          className="form-control form-control-lg session-input"
        />
        <label className="session-input-label">{`${field}:`}</label>
      </div>
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let character = this.state;
    this.props.updateCharacter(character)
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} className="character-form">
       { this.renderFields() }
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