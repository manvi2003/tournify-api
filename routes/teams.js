// backend/routes/teams.js
const express = require("express");
const router = express.Router();
const Team = require("../models/team");
const Tournament = require("../models/tournament");

router.post("/", async (  req, res) => {
  try {
    const {
      name,
      college,
      captain,
      mobile,
      email,
      members,
      tournamentId,
    } = req.body;

    // Check if team with the same name exists in the same tournament
    const existingTeam = await Team.findOne({ name, tournament: tournamentId });
    if (existingTeam) {
      return res
        .status(400)
        .json({
          message:
            "Team with this name already exists in the selected tournament",
        });
    }

    const team = new Team({
      name,
      college,
      captain,
      mobile,
      email,
      members,
      tournament: tournamentId,
    });
    await team.save();

    // Add team reference to the tournament
    const tournament = await Tournament.findById(tournamentId);
    tournament.teams.push(team._id);
    await tournament.save();

    res.status(201).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
