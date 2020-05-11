const mongoose = require('mongoose');
const express = require("express");
const app = express();
const users = require("./routes/api/users");
const message = require("./routes/api/message");
const notes = require("./routes/api/notes");
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./config/passport')(passport);
app.use("/api/users", users);
app.use("/api/message", message);
app.use("/api/notes", notes);

// Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('User Disconnected');
  });
  socket.on('example_message', function (msg) {
    console.log('message: ' + msg);
  });
});
io.listen(8000);

// MongoDB
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
