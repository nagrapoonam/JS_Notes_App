const express = require('express');
const fs = require('fs');
const app = express();
const jsonFilePath = 'notes.json';

app.use(express.json());

// GET /notes endpoint to return a list of all notes
app.get('/notes', function (req, res) {
  const data = fs.readFileSync(jsonFilePath, 'utf-8');
  const notes = JSON.parse(data);
  res.json(notes);
});

// POST /notes endpoint to add a new note
app.post('/notes', function (req, res) {
  const { title, body } = req.body;
  const newNote = {
    title,
    body,
    time_added: new Date().toISOString()
  };
  
  const data = fs.readFileSync(jsonFilePath, 'utf-8');
  const notes = JSON.parse(data);
  notes.push(newNote);
  
  fs.writeFileSync(jsonFilePath, JSON.stringify(notes, null, 2));
  
  res.json({ message: 'Note added successfully!' });
});

// GET /notes/:title endpoint to return a note with the given title
app.get('/notes/:title', function (req, res) {
  const title = req.params.title;
  
  const data = fs.readFileSync(jsonFilePath, 'utf-8');
  const notes = JSON.parse(data);
  
  const foundNote = notes.find(note => note.title === title);
  
  if (foundNote) {
    res.json(foundNote);
  } else {
    res.status(404).json({ message: 'Note not found.' });
  }
});

// DELETE /notes/:title endpoint to delete a note with the given title
app.delete('/notes/:title', function (req, res) {
  const title = req.params.title;
  
  const data = fs.readFileSync(jsonFilePath, 'utf-8');
  const notes = JSON.parse(data);
  
  const noteIndex = notes.findIndex(note => note.title === title);
  
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    fs.writeFileSync(jsonFilePath, JSON.stringify(notes, null, 2));
    res.json({ message: 'Note deleted successfully!' });
  } else {
    res.status(404).json({ message: 'Note not found.' });
  }
});

// PUT /notes/:title endpoint to update a note with the given title
app.put('/notes/:title', function (req, res) {
  const title = req.params.title;
  const newBody = req.body.body;
  
  const data = fs.readFileSync(jsonFilePath, 'utf-8');
  const notes = JSON.parse(data);
  
  const foundNote = notes.find(note => note.title === title);
  
  if (foundNote) {
    foundNote.body = newBody;
    fs.writeFileSync(jsonFilePath, JSON.stringify(notes, null, 2));
    res.json({ message: 'Note updated successfully!' });
  } else {
    res.status(404).json({ message: 'Note not found.' });
  }
});

app.listen(3000, function () {
  console.log('Note Organizer API is listening on port 3000!');
});
