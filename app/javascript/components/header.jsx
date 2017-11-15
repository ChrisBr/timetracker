import React from 'react'
import axios from 'axios'

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <span>Hello {this.props.email}! You are logged in!</span>
        <button onClick={this.props.handleLogout}>
          Logout
        </button>
      </div>
    );
  }
}
