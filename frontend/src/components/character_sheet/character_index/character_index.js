import React from 'react';
import { withRouter } from 'react-router'
import './character_index.scss'

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleClick() {
    this.props.createCharacter().then(char => { this.props.history.push(`/characters/${char._id}`)})
  }

  render() {
    return (
      <div className="notes-form-container">
        <div className="create-character" onClick={this.handleClick}>Create new character</div>
      </div>
    );
  }
}

export default withRouter(Character);