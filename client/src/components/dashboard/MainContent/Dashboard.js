import React, { Component } from "react";
import "./MainContent.scss";
import "./Dashboard.scss";

import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Dashboard extends Component {
  state = {
    modal: false,
    edit: false,
    name: "",
    passengers: [],
    id: "",
    owner: {}
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal, edit: false });
  };

  toggleEditModal = (name, passengers, id, owner, e) => {
    e.stopPropagation();

    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      passengers: passengers,
      id: id,
      owner: owner
    });
  };

  render() {
    const { trips } = this.props.trips;

    let content;

    let tripData = trips.sort().map(trip => (
      <div
        key={trip._id}
        className="trip-icon"
        onClick={() => this.props.history.push(`/trips/${trip._id}`)}
      >
        <div className="trip-name">{trip.name}</div>
        <div
          className="trip-info-button"
          onClick={this.toggleEditModal.bind(
            this,
            trip.name,
            trip.teamPassengers,
            trip._id,
            trip.owner
          )}
        >
          Muokkaa matkaa
        </div>
        <div className="trip-info-button">Mene matkaan</div>
      </div>
    ));

    if (trips.length > 0) {
      content = (
        <>
          <button className="main-btn" onClick={this.toggleModal}>
            Luo uusi matka
          </button>
          <div className="modal-wrapper">
            <Modal
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              name={this.state.name}
              passengers={this.state.passengers}
              id={this.state.id}
              owner={this.state.owner}
            />
          </div>
          <div className="trips-wrapper">{tripData}</div>
        </>
      );
    } else {
      content = (
        <>
          <div className="trips">
            <div className="no-trips">
              <h1 className="header">Sinulla ei ole matkoja</h1>
              <button className="main-btn" onClick={this.toggleModal}>
                Luo ensimmäinen matkasi
              </button>
              <div className="modal-wrapper">
                <Modal onClose={this.toggleModal} modal={this.state.modal} />
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="main-content">
        <h1 className="header">Matkasi</h1>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
