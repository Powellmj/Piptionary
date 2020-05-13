const mongoose = require('mongoose');
const express = require("express");
const app = express();
const users = require("./routes/api/users");
const message = require("./routes/api/messages");
const notes = require("./routes/api/notes");
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', '/index.html'));
  })
}

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./config/passport')(passport);
app.use("/api/users", users);
app.use("/api/messages", message);
app.use("/api/notes", notes);

// MongoDB
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));

const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// Socket.io
io = require('socket.io').listen(server),

  io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
      console.log('User Disconnected');
    });
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });