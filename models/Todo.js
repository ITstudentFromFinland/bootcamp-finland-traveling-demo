const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TodoSchema = new Schema({
  trip: {
    type: Schema.Types.ObjectId,
    ref: "trips",
    required: true
  },
  todoName: {
    type: String,
    required: true
  },
  dateDue: {
    type: String
  },
  payer: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model("todos", TodoSchema);
