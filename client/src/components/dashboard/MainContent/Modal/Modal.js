import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  createTrip,
  updateTrip,
  deleteTrip
} from "../../../../actions/tripActions";
import {
  createTodo,
  deleteTodo,
  updateTodo
} from "../../../../actions/todosAction";

import moment from "moment";

import "./Modal.scss";

class Modal extends Component {
  state = {
    tripName: "",
    passengers: [{ name: "", email: "" }],
    todoName: "",
    payer: "",
    monthDue: "",
    dayDue: "",
    todoId: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({
        tripName: nextProps.name,
        passengers: nextProps.passengers
      });
    } else if (nextProps.editTodo) {
      this.setState({
        todoName: nextProps.todoName
      });
    }
  }

  onChange = e => {
    if (["name", "email"].includes(e.target.name)) {
      let passengers = [...this.state.passengers];
      passengers[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({ passengers });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  };

  addPassenger = e => {
    this.setState(prevState => ({
      passengers: [...prevState.passengers, { name: "", email: "" }]
    }));
  };

  deletePassenger = index => {
    let array = [...this.state.passengers];
    array.splice(index, 1);
    this.setState({ passengers: array });
  };

  createTrip = () => {
    let trip = {
      tripName: this.state.tripName,
      passengers: this.state.passengers
    };

    this.props.createTrip(trip);
    this.onClose();
  };

  updateTrip = async id => {
    let trip = {
      id: this.props.id,
      tripName: this.state.tripName,
      passengers: this.state.passengers
    };

    await this.props.updateTrip(trip);

    this.onClose();
    window.location.reload();
  };

  deleteTrip = id => {
    this.props.deleteTrip(id, this.props.history);
    this.onClose();
  };

  deleteTodo = id => {
    this.props.deleteTodo(id);
    this.onClose();
  };

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
    this.setState({
      tripName: "",
      todoName: "",
      payer: "",
      monthDue: "",
      dayDue: "",
      passengers: [{ name: "", email: "" }]
    });
  };

  onSelectChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  createTodo = e => {
    e.preventDefault();

    let fullDate =
      this.state.monthDue +
      "-" +
      this.state.dayDue +
      "-" +
      Date().split(" ")[3];

    let momentDate = moment(fullDate, "MM-DD-YYYY")
      ._d.toString()
      .split(" ");

    let finalDate = momentDate[1] + " " + momentDate[2];

    const data = {
      trip: this.props.trips.trip._id,
      todoName: this.state.todoName,
      payer: this.state.payer,
      dateDue: finalDate
    };

    this.props.createTodo(data);

    this.onClose();
  };

  updateTodo = id => {
    let finalDate;

    let dates = [
      "Tammi",
      "Helmi",
      "Maalis",
      "Huhti",
      "Touko",
      "Kesä",
      "Heinä",
      "Elo",
      "Syys",
      "Loka",
      "Marras",
      "Joulu"
    ];

    if (!this.state.monthDue && !this.state.dayDue) {
      finalDate = this.props.dateDue;
    } else if (
      this.props.dateDue &&
      this.props.dateDue !== "Päiväystä ei määritelty" &&
      !this.state.monthDue &&
      this.state.dayDue
    ) {
      let fullDate =
        dates.indexOf(this.props.dateDue.split(" ")[0]) +
        1 +
        "-" +
        this.state.dayDue +
        "-" +
        Date().split(" ")[3];

      let momentDate = moment(fullDate, "MM-DD-YYYY")
        ._d.toString()
        .split(" ");

      finalDate = momentDate[1] + " " + momentDate[2];
    } else if (
      this.props.dateDue &&
      this.props.dateDue !== "Päiväystä ei määritelty" &&
      !this.state.dayDue &&
      this.state.monthDue
    ) {
      let fullDate =
        this.state.monthDue +
        "-" +
        this.props.dateDue.split(" ")[1] +
        "-" +
        Date().split(" ")[3];

      let momentDate = moment(fullDate, "MM-DD-YYYY")
        ._d.toString()
        .split(" ");

      finalDate = momentDate[1] + " " + momentDate[2];
    } else {
      let fullDate =
        this.state.monthDue +
        "-" +
        this.state.dayDue +
        "-" +
        Date().split(" ")[3];

      let momentDate = moment(fullDate, "MM-DD-YYYY")
        ._d.toString()
        .split(" ");

      finalDate = momentDate[1] + " " + momentDate[2];
    }

    let todo = {
      id: id,
      todoName: this.state.todoName,
      dateDue: finalDate,
      payer: this.state.payer || this.props.payer
    };

    this.props.updateTodo(todo);

    this.onClose();
  };

  render() {
    if (!this.props.modal) {
      return null;
    }

    document.onkeyup = e => {
      if (e.keyCode === 27 && this.props.modal) {
        this.onClose();
      }
    };

    let { passengers } = this.state;

    if (this.props.todo) {
      const { teamPassengers } = this.props.trips.trip;
      const { name, email } = this.props.auth.user;

      let passengersOptions = teamPassengers.map((passenger, index) => (
        <option key={index} value={passenger.email}>
          {passenger.name}
        </option>
      ));

      const MONTHS = new Array(12).fill(1);
      const DAYS = new Array(31).fill(1);

      let monthsOptions = MONTHS.map((month, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

      let daysOptions = DAYS.map((day, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

      return (
        <form onSubmit={this.createTodo} className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Luo matka-aktiviteetti</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Aktiviteetin nimi (pakollinen)</div>
              <input
                required
                onChange={this.onChange}
                value={this.state.todoName}
                id="todoName"
                type="text"
                placeholder={"Mitä matkalla tekisi?"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <div className="split">
              <label>
                <div className="form-label">Maksaja</div>
                <select
                  onChange={this.onSelectChange}
                  value={this.state.payer}
                  id="payer"
                  type="text"
                  className="form-input todo-input-split"
                >
                  <option disabled value="">
                    Aseta maksaja
                  </option>
                  <option value={email}>{name + " (Sinä)"}</option>
                  {passengersOptions}
                </select>
              </label>
              <label>
                <div className="form-label">Eräpäivä</div>
                <div className="split">
                  <select
                    required={this.state.dayDue ? true : false}
                    onChange={this.onSelectChange}
                    value={this.state.monthDue}
                    id="monthDue"
                    type="text"
                    className="form-input todo-input-split month-due"
                  >
                    <option disabled value="">
                      Kuukausi
                    </option>
                    {monthsOptions}
                  </select>
                  <select
                    required={this.state.monthDue ? true : false}
                    onChange={this.onSelectChange}
                    value={this.state.dayDue}
                    id="dayDue"
                    type="text"
                    className="form-input todo-input-split"
                  >
                    <option disabled value="">
                      Päivä
                    </option>
                    {daysOptions}
                  </select>
                </div>
              </label>
            </div>
          </div>
          <div>
            <button className="main-btn update-trip" type="submit">
              Luo matka-aktiviteetti
            </button>
          </div>
        </form>
      );
    }

    else if (this.props.editTodo) {
      const { teamPassengers } = this.props.trips.trip;
      const { name, email } = this.props.auth.user;

      const { payer, dateDue, todoId } = this.props;
      let payerName;

      let assignedMonth = moment(dateDue).month() + 1;
      let assignedDay = dateDue.split(" ")[1];

      teamPassengers.forEach(passenger => {
        if (passenger.email === payer) {
          payerName = passenger.name;
        } else if (payer) {
          payerName = name + " (Sinä)";
        }
      });

      let passengersOptions = teamPassengers.map((passenger, index) => {
        if (passenger.name !== payerName) {
          return (
            <option key={passenger._id} value={passenger.email}>
              {passenger.name}
            </option>
          );
        }
        return null;
      });

      const MONTHS = new Array(12).fill(1);
      const DAYS = new Array(31).fill(1);

      let monthsOptions = MONTHS.map((month, i) => {
        return (
          <option key={i} value={i + 1}>
            {i < 9 && "0"}
            {i + 1}
          </option>
        );
      });

      let daysOptions = DAYS.map((day, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

      return (
        <form className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Muokkaa matka-aktiviteettia</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Aktiviteetin nimi (pakollinen)</div>
              <input
                required
                onChange={this.onChange}
                value={this.state.todoName}
                id="todoName"
                type="text"
                placeholder={"Mikä aktiviteetti?"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <div className="split">
              <label>
                <div className="form-label">Maksaja</div>
                <select
                  onChange={this.onSelectChange}
                  value={this.state.payer}
                  id="payer"
                  type="text"
                  className="form-input todo-input-split"
                >
                  {!payer && (
                    <option disabled value="">
                      Maksaja
                    </option>
                  )}
                  {payer && <option value={payer}>{payerName}</option>}
                  {payerName !== name + " (Sinä)" && (
                    <option value={email}>{name + " (Sinä)"}</option>
                  )}
                  {passengersOptions}
                </select>
              </label>
              <label>
                <div className="form-label">Eräpäivä</div>
                <div className="split">
                  <select
                    required={this.state.dayDue ? true : false}
                    onChange={this.onSelectChange}
                    value={
                      this.state.monthDue || parseInt(assignedMonth).toString()
                    }
                    id="monthDue"
                    type="text"
                    className="form-input todo-input-split month-due"
                  >
                    {!dateDue && (
                      <option disabled value="">
                        Kuukausi
                      </option>
                    )}
                    {monthsOptions}
                  </select>
                  <select
                    required={this.state.monthDue ? true : false}
                    onChange={this.onSelectChange}
                    value={
                      this.state.dayDue || parseInt(assignedDay).toString()
                    }
                    id="dayDue"
                    type="text"
                    className="form-input todo-input-split"
                  >
                    {!dateDue && (
                      <option disabled value="">
                        Päivä
                      </option>
                    )}
                    {daysOptions}
                  </select>
                </div>
              </label>
            </div>
          </div>
          <div>
            <button
              className="main-btn update-trip"
              type="button"
              onClick={this.updateTodo.bind(this, todoId)}
            >
              Muokkaa matka-aktiviteetti
            </button>
            <button
              className="main-btn delete-trip"
              onClick={this.deleteTodo.bind(this, todoId)}
            >
              Poista aktiviteetti
            </button>
          </div>
        </form>
      );
    }

    else if (this.props.edit) {
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Muokkaa matkan tietoja</h1>
          <p className="created-by">
            Luonut {this.props.owner.name} ({this.props.owner.email})
          </p>
          <div className="form-group">
            <label>
              <div className="form-label">Matkan nimi (pakollinen)</div>
              <input
                onChange={this.onChange}
                value={this.state.tripName}
                id="tripName"
                type="text"
                placeholder={"Matkan tarkoitus"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-label">Lisää matkustajia (vapaaehtoinen)</div>
          <button className="main-btn add-passengers" onClick={this.addPassenger}>
            Lisää toinen matkustaja
          </button>
          <div className="passengers-edit">
            {passengers.map((val, id) => {
              let passengerId = `passenger-${id}`,
                emailId = `email-${id}`;
              return (
                <div className="split" key={id}>
                  <label className="form-label" htmlFor={passengerId}>
                    Nimi (pakollinen matkustajaryhmille)
                    <input
                      type="text"
                      name="name"
                      data-id={id}
                      id={passengerId}
                      value={passengers[id].name}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <label className="form-label split-email" htmlFor={emailId}>
                    Sähköposti (pakollinen matkustajaryhmille)
                    <input
                      type="text"
                      name="email"
                      data-id={id}
                      id={emailId}
                      value={passengers[id].email}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <span
                    className="delete"
                    onClick={this.deletePassenger.bind(this, id)}
                  >
                    Poista
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            <button
              className="main-btn update-trip"
              onClick={this.updateTrip.bind(this, this.props.id)}
            >
              Päivitä matka
            </button>
            {this.props.owner.id === this.props.auth.user.id ? (
              <button
                className="main-btn delete-trip"
                onClick={this.deleteTrip.bind(this, this.props.id)}
              >
                Poista matka
              </button>
            ) : null}
          </div>
        </div>
      );
    }

    else
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Luo matka</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Matkan nimi (pakollinen)</div>
              <input
                onChange={this.onChange}
                value={this.state.tripName}
                id="tripName"
                type="text"
                placeholder="Matkani"
                className="form-input"
              />
            </label>
          </div>
          <div className="form-label">Lisää kanssamatkustajat (vapaaehtoinen)</div>
          <button className="main-btn add-passengers" onClick={this.addPassenger}>
            Lisää toinen matkustaja
          </button>
          <div className="passengers">
            {passengers.map((val, id) => {
              let passengerId = `passenger-${id}`,
                emailId = `email-${id}`;
              return (
                <div className="split" key={id}>
                  <label className="form-label" htmlFor={passengerId}>
                    Nimi (pakollinen matkustajaryhmille)
                    <input
                      type="text"
                      name="name"
                      data-id={id}
                      id={passengerId}
                      value={passengers[id].name}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <label className="form-label split-email" htmlFor={emailId}>
                    Sähköposti (pakollinen matkustajaryhmille)
                    <input
                      type="text"
                      name="email"
                      data-id={id}
                      id={emailId}
                      value={passengers[id].email}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <span
                    className="delete"
                    onClick={this.deletePassenger.bind(this, id)}
                  >
                    Poista
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            <button
              className="main-btn create-trip"
              onClick={this.createTrip}
            >
              Luo matka
            </button>
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  trips: state.trips,
  todos: state.todos
});

export default connect(
  mapStateToProps,
  {
    createTrip,
    updateTrip,
    deleteTrip,
    createTodo,
    deleteTodo,
    updateTodo
  }
)(withRouter(Modal));
