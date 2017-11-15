import React from 'react'
import Header from './header'
import Activities from './activities'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header
          email={this.props.email}
          handleLogout={this.props.handleLogout}
        />
        <Activities auth_token={this.props.auth_token} />
      </div>
    );
  }
}
