//=====================================================
//=====================================================
// SleepyChat Index Script
// websocket.io + SQLite3
//
// Written by Isaac Yep
//=====================================================
//=====================================================


/***********************
  Imports
***********************/
// import websocket object
var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// import db object
// const sqlite3 = require('sqlite3').verbose();
const userDB = require('./db/userInterface');
const historyDB = require('./db/chatLogInterface');

/***********************
  Execution Loop
***********************/
// retrieve init
app.use(express.static('./'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

userDB.build("users", ["username", "password", "email"], ["text", "text", "text"]);
historyDB.build("history", ["username", "msg"], ["text", "text"]);

// connection loop
io.on('connection', (socket) => {
  userDB.add("users", ["Sleepy Boy", "RK7G36L299I", "anthonybenchyep@gmail.com"]);
  userDB.add("users", ["Awakey Girl", "abcdefg", "awakeygirl@gmail.com"]);
  userDB.add("users", ["Drowsy Kid", "p@$$word", "drowsy@yahoo.com"]);
  // userDB.update("password", "betterPassword", "Sleepy Boy");
  // userDB.update("password", "evenBetterPassword", "Awakey Girl");
  console.log('a user connected');
  socket.on('disconnect', () => {
    historyDB.get();
    userDB.get();
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log('message: ' + msg);
    historyDB.add("history", ["Sleepy Boy", msg]);
  });
  socket.on('credentials', (email, passWord) => {
    // open db
      let res = userDB.validate(email, passWord);
      if (res)
        io.emit('authenticate', "Success! Weclcome back " + email + '!');
      else
        io.emit('authenticate', "Authentication failed. Please try again.");
  });
});
// port exposure
http.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});