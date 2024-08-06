const express = require("express");
const router = express.Router();
const Tournament = require("../models/tournament");
const Team = require("../models/team");

// Create a new tournament
router.post("/", async (req, res) => {
  try {
    const { name, description, startDate } = req.body;

    // Check if tournament with the same name already exists
    const existingTournament = await Tournament.findOne({ name });
    if (existingTournament) {
      return res
        .status(400)
        .json({ message: "Tournament with this name already exists" });
    }

    const tournament = new Tournament({
      name,
      description,
      startDate,
    });
    await tournament.save();
    res.status(201).json(tournament);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/', async (req, res) => {
    try {
      const tournaments = await Tournament.find().sort({ createdAt: -1 });
      res.status(200).json(tournaments);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
});

router.get('/name/:name', async (req, res) => {
  try {
    const tournament = await Tournament.findOne({ name: req.params.name });
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:tournamentId/teams", async (req, res) => {
  try {
    const teams = await Team.find({ tournament: req.params.tournamentId });
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;