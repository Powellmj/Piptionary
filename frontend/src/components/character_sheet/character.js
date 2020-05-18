import React from 'react';
import './character.scss'

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.requestCharacter()
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {
    return (
      <div className="notes-form-container">
        halloooooo
      </div>
    );
  }
}

export default Character;