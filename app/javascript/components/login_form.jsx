import React from 'react'

export default class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleLogin}>
          <label>
            E-Mail:
            <input type="text" value={this.props.email} onChange={this.props.handleEmailChange} />
          </label>
          <label>
            Password:
            <input type="password" value={this.props.password} onChange={this.props.handlePasswordChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
