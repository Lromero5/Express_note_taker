var express = require("express");
const path = require ("path");
const fs = require ("fs");

var app = express();
var PORT = process.env.PORT || 8080;
const noteJSON = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./'));


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
  });

  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
