const noteContainer = document.querySelector(".note-container");
const modalContainer = document.querySelector(".modal-container");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");

class Note {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = Math.random();
  }
}

// Taking NOte title and Body from the user
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const noteInput = document.querySelector("#note");

  if (titleInput.value.length > 0 && noteInput.value.length > 0) {
    const newNote = new Note(titleInput.value, noteInput.value);
    addNoteToList(newNote);
    addNoteToLocalStorage(newNote);
    titleInput.value = "";
    noteInput.value = "";
    showAlertMessage("Note successfully added!", "success-message");
    titleInput.focus();
  } else {
    showAlertMessage("Please add both title and a note.", "alert-message");
  }
});

// Creating note using js and appending to the noteContainer
function addNoteToList(note) {
  const newUINote = document.createElement("div");
  newUINote.classList.add("note");
  newUINote.innerHTML = `
    <span hidden>${note.id}</span>
    <h2 class="note-title">${note.title}</h2>
    <p class="note-body">${note.body}</p>
    <div class="note-btns">
    <button class="note-btn note-view">View Details</button>
    <button class="note-btn note-delete">Delete Note</button>
    </div>
    `;
  noteContainer.appendChild(newUINote);
}

// Note Btnsssssss
noteContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("note-view")) {
    const currentNote = e.target.closest(".note");
    const currentTitle = currentNote.querySelector(".note-title").textContent;
    const currentBody = currentNote.querySelector(".note-body").textContent;
    activateNoteModal(currentTitle, currentBody);
  }

  if (e.target.classList.contains("note-delete")) {
    const currentNote = e.target.closest(".note");
    showAlertMessage("Your note was permanently deleted.", "remove-message");
    currentNote.remove();
    const id = currentNote.querySelector("span").textContent;
    removeNote(Number(id));
  }
});

function showAlertMessage(message, alertClass) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `message ${alertClass}`;
  alertDiv.appendChild(document.createTextNode(message));
  form.insertAdjacentElement("beforebegin", alertDiv);
  titleInput.focus();
  setTimeout(() => alertDiv.remove(), 2000);
}

// Showing Modal Container by clicking View Details btn
function activateNoteModal(title, body) {
  const modalTitle = document.querySelector(".modal-title");
  const modalBody = document.querySelector(".modal-body");
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modalContainer.classList.add("active");
}

// Hiding Modal Container on CLicking x
document.querySelector(".modal-btn").addEventListener("click", () => {
  modalContainer.classList.remove("active");
});

function getNotes() {
  let notes;
  if (localStorage.getItem("noteApp.notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("noteApp.notes"));
  }
  return notes;
}

function addNoteToLocalStorage(note) {
  const notes = getNotes();
  notes.push(note);
  localStorage.setItem("noteApp.notes", JSON.stringify(notes));
}

function displayNotes() {
  const notes = getNotes();
  notes.forEach((note) => {
    addNoteToList(note);
  });
}

document.addEventListener("DOMContentLoaded", displayNotes);

function removeNote(id) {
  const notes = getNotes();
  notes.forEach((note, index) => {
    if (note.id === id) {
      notes.splice(index, 1);
    }
    localStorage.setItem("noteApp.notes", JSON.stringify(notes));
  });
}
