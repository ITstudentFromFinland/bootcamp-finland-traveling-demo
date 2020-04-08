import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";

import "./SideNav.scss";

class SideNav extends Component {
  onLogoutClick = e => {
    this.props.logoutUser(this.props.history);
    window.location.href = "/";
  };

  toggleMenu = e => {
    let sideNav = document.querySelector(".side");
    sideNav.classList.add("invisibile");

    let hamburger = document.querySelector(".hamburger-top-menu");
    hamburger.classList.add("hamburger-visible");

    let rightSide = document.querySelector(".right");
    rightSide.classList.add("no-side");

    let rightSideRight = document.querySelector(".right-top");
    rightSideRight.classList.add("right-top-visibile");
  };

  render() {
    const { trips } = this.props.trips;

    let tripData = trips.sort().map(trip => (
      <li className="trip-listing" key={trip._id}>
        <Link to={`/trips/${trip._id}`}>{trip.name}</Link>
      </li>
    ));

    return (
      <nav className="side">
        <ul className="top">
          <li>
            <i
              onClick={this.toggleMenu}
              className="material-icons hamburger-side-menu"
            >
            </i>
          </li>
          <NavLink exact activeClassName="active-page" to="/dashboard">
            <li>
              <i className="material-icons icon2"></i>Koti
            </li>
          </NavLink>
          <div className="sign-out" onClick={this.onLogoutClick}>
            <li>
              <i className="material-icons icon"></i>Kirjaudu ulos
            </li>
          </div>
        </ul>
        <ul className="bottom">
          <li>
            <h4 className="side-trips-header">Matkat</h4>
          </li>
          <div className="trip-listings">{tripData}</div>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(withRouter(SideNav))
);
