const express = require("express");
const route = express.Router();
const data = require("../models/schema");

route.post("/submit-vote", async (req, res) => {
  try {
    const {
      voteId,
      name,
      phoneNumber,
      age,
      state,
      place,
      constituency,
      district,
      vote,
    } = req.body;

    const newVote = new data({
      voteId,
      name,
      phoneNumber,
      age,
      state,
      place,
      constituency,
      district,
      vote,
    });

    await newVote.save();

    res.redirect("/index.html#dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = route;
