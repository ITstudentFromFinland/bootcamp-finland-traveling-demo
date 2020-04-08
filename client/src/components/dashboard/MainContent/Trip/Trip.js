import React, { Component } from "react";
import { connect } from "react-redux";
import { getTrip } from "../../../../actions/tripActions";
import { getTodos, deleteTodo } from "../../../../actions/todosAction";

import Spinner from "../../../common/Spinner";
import Modal from "../Modal/Modal";

import "../MainContent.scss";
import "./Trip.scss";

class Trip extends Component {
  state = {
    modal: false,
    edit: false,
    editTodo: false,
    todo: false,
    name: "",
    passengers: [],
    id: "",
    owner: {},
    todos: [],
    date: "",
    todoName: "",
    payer: "",
    todoId: "",
    dateDue: ""
  };

  toggleModal = e => {
    this.setState({
      modal: !this.state.modal,
      edit: false,
      todo: false,
      editTodo: false
    });
  };

  toggleEditModal = (name, passengers, id, owner, e) => {
    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      passengers: passengers,
      id: id,
      owner: owner
    });
  };

  toggleTodoModal = e => {
    this.setState({
      modal: !this.state.modal,
      todo: !this.state.todo
    });
  };

  toggleEditTodoModal = (todoName, payer, dateDue, id, e) => {
    this.setState({
      modal: !this.state.modal,
      editTodo: !this.state.editTodo,
      todoName: todoName,
      payer: payer,
      todoId: id,
      dateDue: dateDue
    });
  };

  componentDidMount() {
    this.props.getTrip(this.props.match.params.trip);
    this.props.getTodos(this.props.match.params.trip);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.trip !== prevProps.match.params.trip) {
      this.props.getTrip(this.props.match.params.trip);
      this.props.getTodos(this.props.match.params.trip);
    }
  }

  onChange = async e => {
    await this.setState({ todos: this.props.todos.todos });

    let todos = await [...this.state.todos];

    todos[e.target.id].todoName = await e.target.value;

    await this.setState({ todos });
  };

  deleteTodo = id => {
    this.props.deleteTodo(id);
  };

  render() {
    const { todos } = this.props.todos;

    let todosList = todos.map((todo, index) => (
      <div className="todo-input" key={todo._id}>
        <i
          className="material-icons check-todo"
          onClick={this.deleteTodo.bind(this, todo._id)}
        >
          check_circle
        </i>
        <span
          onClick={this.toggleEditTodoModal.bind(
            this,
            todo.todoName,
            todo.payer,
            todo.dateDue,
            todo._id
          )}
          id={index}
          name="todo"
          className="trip-todo"
        >
          {todo.todoName}
        </span>
        <span
          onClick={this.toggleEditTodoModal.bind(
            this,
            todo.todoName,
            todo.payer,
            todo.dateDue,
            todo._id
          )}
          className={!todo.payer ? "todo-info muted" : "todo-info"}
        >
          {todo.payer === this.props.auth.user.email
            ? "Sinä"
            : todo.payer || "Ei maksajaa"}
        </span>
        <span
          onClick={this.toggleEditTodoModal.bind(
            this,
            todo.todoName,
            todo.payer,
            todo.dateDue,
            todo._id
          )}
          className={
            todo.dateDue === "Date undefined" ? "todo-info muted" : "todo-info"
          }
        >
          {todo.dateDue === "Date undefined" ? "Not Set" : todo.dateDue}
        </span>
      </div>
    ));

    if (
      this.props.trip &&
      this.props.trip.teamPassengers &&
      !this.props.trips.tripLoading &&
      !this.props.todos.todosLoading
    ) {
      const { trip } = this.props;

      return (
        <div className="main-content">
          <h1 className="trip-header">{trip.name}</h1>
          <button
            onClick={this.toggleEditModal.bind(
              this,
              trip.name,
              trip.teamPassengers,
              trip._id,
              trip.owner
            )}
            className="main-btn center-btn"
          >
            Muokkaa matkan tietoja
          </button>

          <div className="modal-wrapper">
            <Modal
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              todo={this.state.todo}
              editTodo={this.state.editTodo}
              name={this.state.name}
              passengers={this.state.passengers}
              id={this.state.id}
              owner={this.state.owner}
              todoName={this.state.todoName}
              payer={this.state.payer}
              dateDue={this.state.dateDue}
              todoId={this.state.todoId}
            />
          </div>
          <div className="todos-container">
            <div className="trips-first-row">
              <button
                className="main-btn add-btn"
                onClick={this.toggleTodoModal}
              >
                Lisää matka-aktiviteetti
              </button>
              <div className="trips-column-headers">
                <p>Maksaja</p>
                <p>Eräpäivä</p>
              </div>
            </div>
            <div className="trip-todos">{todosList}</div>
          </div>
        </div>
      );
    }

    return (
      <div className="trip-spinner">
        <Spinner />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  trip: state.trips.trip,
  trips: state.trips,
  todos: state.todos
});

export default connect(
  mapStateToProps,
  { getTrip, getTodos, deleteTodo }
)(Trip);
