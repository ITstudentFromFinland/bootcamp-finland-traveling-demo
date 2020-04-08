import React, { Component } from "react";
import "./MainContent.scss";
import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Todos extends Component {
  state = {
    modal: false
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const { trips } = this.props.trips;

    return (
      <div className="main-content">
        <h1 className="header">Aktiviteettisi</h1>
        <div className="trips">
          <div className="no-trips">
            <h1 className="header">Sinulla ei ole aktiviteetteja</h1>
            {trips.length > 0 ? (
              <p>Mene matkaan luodaksesi ensimmäinen aktiviteettisi</p>
            ) : (
              <button className="main-btn" onClick={this.toggleModal}>
                Luo ensimmäinen matkasi
              </button>
            )}
            <Modal onClose={this.toggleModal} modal={this.state.modal} />
          </div>
        </div>
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
)(Todos);
