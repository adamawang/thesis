import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchEvents } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});
    // console.log('SUBMIT FUNCTION CALLED');
    console.log(event.target.value);
  }

  onFormSubmit(event) {
    event.preventDefault();

// We need to go and fetch weather data
    this.props.searchEvents(this.state.term);
    this.setState({ term: '' });
  }

  render() {
    return (

      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="Search for events"
          value={this.state.term}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    )
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchEvents }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);