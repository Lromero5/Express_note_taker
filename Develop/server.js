var express = require("express");
const path = require ("path");
const fs = require ("fs");

var app = express();
var PORT = process.env.PORT || 8080;
var noteJSON = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./'));

//  * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
  });


//* GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON. 
  app.get("/api/notes", function(req, res) {
    res.json(noteJSON);
  });

//* POST `/api/notes` - Should receive a new note to save on the request body, 
//add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function(req, res){
  // console.log("hit the route", req.body);
  var newnote =  { 
    title: req.body.title,
    text: req.body.text,
    id: noteJSON.length + 1  
  }

  noteJSON.push(newnote);
})


//DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
//This means you'll need to find a way to give each note a unique `id` when it's saved. 
//In order to delete a note, you'll need to read all notes from the `db.json` file, 
//remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", function (req, res){
  // console.log(req.params.id)
  var newdb = [];

  for(i = 0; i < noteJSON.length; i++){
    // console.log(noteJSON[i]);
    if( noteJSON[i].id == req.params.id){
      console.log("we found a match", noteJSON[i]);

    }else {
      newdb.push(noteJSON[i]);
    }
  }
  console.log("new db too", newdb);
  noteJSON = newdb;
});
  
//  * GET `*` - Should return the `index.html` file  
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
});

  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
