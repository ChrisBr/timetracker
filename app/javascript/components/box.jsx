import React from 'react'
import axios from 'axios'

export default class Box extends React.Component {
  render() {
    return (
      <div className="col-3 col-sm-3 placeholder">
        <h4>{this.props.value}</h4>
        <div className="text-muted">{this.props.title}</div>
      </div>
    );
  }
}
