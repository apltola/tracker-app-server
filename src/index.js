require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://admin:adminpassword@cluster0-knbnh.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('CONNECTED TO MONGO 🥭');
});
mongoose.connection.on('error', (err) => {
  console.error('ERROR CONNECTING TO MONGO ', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`user email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('SERVER LISTENING ON 3000 🚀');
});