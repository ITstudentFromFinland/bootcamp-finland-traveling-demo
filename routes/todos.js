const express = require("express");
const router = express.Router();
const passport = require("passport");

const Todo = require("../../models/Todo");

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;

    Todo.find({ trip: id }).then(todos => res.json(todos));
  }
);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const NEW_TODO = new Todo({
      trip: req.body.trip,
      todoName: req.body.todoName,
      dateDue: req.body.dateDue,
      payer: req.body.payer
    });

    NEW_TODO.save()
      .then(todo => res.json(todo))
      .catch(err => console.log(err));
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.findById(req.params.id).then(todo => {
      todo.remove().then(() => res.json({ success: true }));
    });
  }
);

router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let todoFields = {};

    todoFields.todoName = req.body.todoName;
    if (req.body.dateDue && req.body.dateDue !== "Päiväystä ei määritelty") {
      todoFields.dateDue = req.body.dateDue;
    }
    todoFields.payer = req.body.payer;

    Todo.findOneAndUpdate(
      { _id: req.body.id },
      { $set: todoFields },
      { new: true }
    )
      .then(todo => {
        res.json(todo);
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
