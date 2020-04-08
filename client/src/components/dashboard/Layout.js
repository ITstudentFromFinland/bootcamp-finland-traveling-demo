import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTrips } from "../../actions/tripActions";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import Spinner from "../common/Spinner";
import SideNav from "./SideNav/SideNav";
import TopNav from "./TopNav/TopNav";
import Dashboard from "./MainContent/Dashboard";
import Todos from "./MainContent/Todos";
import Trip from "./MainContent/Trip/Trip";

import "./Layout.scss";

class Layout extends Component {
  componentDidMount() {
    this.props.getTrips();
  }

  render() {
    const { trips, tripsLoading } = this.props.trips;

    let dashboardContent;

    if (trips === null || tripsLoading) {
      dashboardContent = <Spinner />;
    } else if (trips.length > 0) {
      dashboardContent = (
        <>
          <SideNav trips={trips} />
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                trips={trips}
                component={Dashboard}
              />
              <Route
                exact
                path="/todos"
                trips={trips}
                component={Todos}
              />
              <Route exact path="/trips/:trip" component={Trip} />
            </Switch>
          </div>
        </>
      );
    } else {
      dashboardContent = (
        <>
          <SideNav />
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                trips={[]}
                component={Dashboard}
              />
              <Route exact path="/todos" component={Todos} />
            </Switch>
          </div>
        </>
      );
    }

    return (
      <Router>
        <div className="wrapper">{dashboardContent}</div>
      </Router>
    );
  }
}

Layout.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  trips: state.trips
});

export default withRouter(
  connect(
    mapStateToProps,
    { getTrips }
  )(Layout)
);
