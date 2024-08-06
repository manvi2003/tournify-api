// backend/models/Team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String, required: true },
  captain: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  members: [{ type: String }],
  tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
