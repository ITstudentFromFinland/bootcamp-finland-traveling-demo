const express = require("express");
const router = express.Router();
const passport = require("passport");

const Trip = require("../../models/Trip");


router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let tripsArr = [];

    await Trip.find({})
      .then(trips => {
        trips.map(trip => {
          trip.teamPassengers &&
            trip.teamPassengers.map(passenger => {
              if (passenger.email == req.user.email) {
                tripsArr.push(trip);
              }
            });
        });
      })
      .catch(err => console.log(err));

    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    await Trip.find({ owner: OWNER })
      .then(trips => {
        let finalArr = [...trips, ...tripsArr];
        res.json(finalArr);
      })
      .catch(err => console.log(err));
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;

    Trip.findById(id).then(trip => res.json(trip));
  }
);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    const NEW_TRIP = await new Trip({
      owner: OWNER,
      name: req.body.tripName,
      teamPassengers: req.body.passengers
    });

    NEW_TRIP.save().then(trip => res.json(trip));
  }
);

router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let tripFields = {};

    tripFields.name = req.body.tripName;
    tripFields.teamPassengers = req.body.passengers;

    Trip.findOneAndUpdate(
      { _id: req.body.id },
      { $set: tripFields },
      { new: true }
    )
      .then(trip => {
        res.json(trip);
      })
      .catch(err => console.log(err));
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Trip.findById(req.params.id).then(trip => {
      trip.remove().then(() => res.json({ success: true }));
    });
  }
);

module.exports = router;
