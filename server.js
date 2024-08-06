const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const tournamentRoutes = require('./routes/tournaments');
const teamRoutes = require('./routes/teams');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tournaments', tournamentRoutes);
app.use('/api/teams', teamRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});