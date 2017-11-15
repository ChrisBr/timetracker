import React from 'react'
import axios from 'axios'

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
         <a className="navbar-brand" href="#">TimeDice</a>
         <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse" id="navbarsExampleDefault">
           <ul className="navbar-nav ml-auto">
             <li className="nav-item active">
               <a className="nav-link" href="#">{this.props.email}</a>
             </li>
             <li className="nav-item active">
               <button className="btn btn-outline-danger my-2 my-sm-0" onClick={this.props.handleLogout} >Logout</button>
             </li>
           </ul>
         </div>
        </nav>
      </header>
    );
  }
}
