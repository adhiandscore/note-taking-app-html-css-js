function popup() {

    const popupContainer = document.createElement("div");

    popupContainer.innerHTML = `
    <div id="popupContainer">
    <h1>Add Note</h1>
    <textarea id="note-text" placeholder="enter your note..."></textarea>
        <div id="btn-container">  
            <button id="submitBtn" onclick="createNote()">Create Note </button>
            <button id="closeBtn" onclick="closePopup()">Close </button>
        </div>
    </div>
    `;
    document.body.appendChild(popupContainer);
}
function createNote() {
    const popupContainer = document.getElementById("popupContainer");
    const noteText = document.getElementById("note-text").value;
    if (noteText.trim() !== '') {
        const note = {
            id: new Date().getTime(),
            text: noteText
        };

        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(note);

        localStorage.setItem('notes', JSON.stringify(existingNotes));

        document.getElementById('note-text').value = '';

        popupContainer.remove();
        displayNotes();
    }
}

function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
                <span>${note.text}</span>
                <div id="noteBtns-container">
                <button id="editBtn" onclick="editNote(${note.id})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button id="deleteBtn" onclick="deleteNote(${note.id})">
                <i class="fa-solid fa-trash"></i>
            </button>
            </div>
                `;

                notesList.appendChild(listItem);
    });
}

function closePopup() {
    const popupContainer = document.getElementById("popupContainer");
    if (popupContainer) {
        popupContainer.remove();
    }
}




function editNote(noteId) {

    const notesList = document.getElementById('notes=list');
    const noteToEdit = notes.find(note => note.id == noteId);
    const notetext = notetoEdit ? noteToEdit.text : '';
    const editingPopup = document.createElement("div");

    editingPopup.innerHTML = `
            <div id="editing-container" data-note-id="$(noteId)">
                <h1> Edit Note </h1>
                <textarea id="note=text"> $(noteText) </textarea>
                <div id="btn-container">
                    <button id="submitBtn" onclick="updateNote()"> done </button>
                    <button id="deleteBtn" onclick="closeEditPopup()"> Cancel </button>
                </div>
         </div>
      `
};

document.body.appendChild(editingPopup);

function closeEditPopup() {

    const editingPopup = document.getElementById("editing-container");

    if (editingPopup) {
        editingPopup.remove();
    }
}

function updateNote() {
    const noteText = document.getElementById('note-text').value.trim();
    const editingPopup = document.getElementById('editing-container');

    if (noteText !== '') {
        const noteId = editingPopup.getAttribute('data-note-id');
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        // find the note to update

        const updateNotes = notes.map(note => {
            if (note.id == noteId) {
                return { id: note.id, text: noteText };
            }
            return note;
        });

        // update the notes in local storage
        localStorage.setItem('notes', JSON.stringify(updatedNotes));

        // close the editing popup
        editingPopup.remove();

        // refresh the displayed notes
        displayNotes();
    }
}

function deleteNote(noteId) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

displayNotes();

// Add JS here