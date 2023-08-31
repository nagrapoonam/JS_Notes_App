// Import the 'fs' module for file system operations 
// and 'readline-sync' for user input
const fs = require('fs');
const readline = require('readline-sync');

// Load existing notes from the JSON file if it exists, or
//  initialize an empty array
let notes = [];
const jsonFilePath = 'notes.json';

// Check if the JSON file exists
if (fs.existsSync(jsonFilePath)) {
  // Read the content of the JSON file and parse it into the 'notes' array
  const data = fs.readFileSync(jsonFilePath, 'utf-8');
  notes = JSON.parse(data);
}

// Function to save the 'notes' array to the JSON file
function saveNotesToFile() {
  fs.writeFileSync(jsonFilePath, JSON.stringify(notes, null, 2));
}

// Function to add a new note
function addNote() {
  // Ask the user for note title and body
  const title = readline.question('Enter note title: ');
  const body = readline.question('Enter note body: ');

  // Create a new note object with title, body, and current timestamp
  const newNote = {
    title,
    body,
    time_added: new Date().toISOString()
  };

  // Add the new note to the 'notes' array, 
  // save it to the JSON file, and provide feedback
  notes.push(newNote);
  saveNotesToFile();
  console.log('Note added successfully!');
}

// Function to list all notes
function listNotes() {
  // Iterate through each note and display its details
  notes.forEach((note, index) => {
    console.log(`${index + 1}. Title: ${note.title}`);
    console.log(`   Body: ${note.body}`);
    console.log(`   Added on: ${note.time_added}\n`);
  });
}

// Function to read all notes
function readNote() {
  const title = readline.question('Enter note title: ');
  const foundNote = notes.find(note => note.title === title);

  if (foundNote) {
    console.log(`Title: ${foundNote.title}`);
    console.log(`Body: ${foundNote.body}`);
    console.log(`Added on: ${foundNote.time_added}`);
  } else {
    console.log('Note not found.');
  }
}

// Function to delete all notes
function deleteNote() {
  const title = readline.question('Enter note title: ');
  const noteIndex = notes.findIndex(note => note.title === title);

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    saveNotesToFile();
    console.log('Note deleted successfully!');
  } else {
    console.log('Note not found.');
  }
}

// Function to update all notes
function updateNote() {
  const title = readline.question('Enter note title: ');
  const noteIndex = notes.findIndex(note => note.title === title);

  if (noteIndex !== -1) {
    const newBody = readline.question('Enter new note body: ');
    notes[noteIndex].body = newBody;
    saveNotesToFile();
    console.log('Note updated successfully!');
  } else {
    console.log('Note not found.');
  }
}

// Function to handle the main menu and user choices
function mainMenu() {
  while (true) {
    console.log('📖 Note Organizer App');
    console.log('1. Add a note');
    console.log('2. List all notes');
    console.log('3. Read a note');
    console.log('4. Delete a note');
    console.log('5. Update a note');
    console.log('6. Exit');
    const choice = readline.questionInt('Enter your choice: ');

    // Switch statement to handle user's choice
    switch (choice) {
      case 1:
        addNote();
        break;
      case 2:
        listNotes();
        break;
      case 3:
        readNote();
        break;
      case 4:
        deleteNote();
        break;
      case 5:
        updateNote();
        break;
      case 6:
        console.log('Exiting...');
        process.exit(0);
      default:
        console.log('Invalid choice.');
    }
  }
}

// Start the application
mainMenu();
