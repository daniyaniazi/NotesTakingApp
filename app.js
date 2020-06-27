console.log('welcome to Notes taking app')
showNotes();
// If user add it t a local storage
let addBtn = document.getElementById('addNoteBtn');
addBtn.addEventListener('click', function() {
        let addText = document.getElementById('addNoteTxt')
        let notes = localStorage.getItem('notes')
        if (notes == null) {
            var notesObj = [];
        } else {
            notesObj = JSON.parse(notes)
        }
        notesObj.push(addText.value)
        localStorage.setItem('notes', JSON.stringify(notesObj));
        addText.value = '';
        // console.log(notes)
        // console.log(notesObj)
        showNotes();
    })
    // Show notes fucntion to add new note
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    let html = '';
    notesObj.forEach(function(element, index) {
        html += `
        <div class=" notecard card my-2 ml-5 col-md-3" style='box-sizing:border-box'>
        <div class="card-body">
            <h5 class="card-title">Note ${index+1}</h5>
            <p class="crad-text">${element}</p>
            <button class="btn btn-danger" id='${index}' onclick='deleteNote(this.id)'>Delete Note</button>
        </div>
    </div>`;

        // display notes card
    });
    let noteselem = document.getElementById('notes')
    if (notesObj.length != 0) {
        noteselem.innerHTML = html;
    } else {
        noteselem.innerHTML = `<p>Nothing to show ! add a note :)`
    }
}

// delete Notes function
function deleteNote(index) {
    // console.log('i am deleting');
    // getting local storage
    notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1);
    //   update local storage
    localStorage.setItem('notes', JSON.stringify(notesObj));
    // refresh notes
    showNotes();
}

// searching feature
let searchTxt = document.getElementById('searchtxt');
searchTxt.addEventListener('input', search);


function search() {
    console.log('input event fired');
    let inpval = searchTxt.value.toLowerCase();
    // console.log(inpval);
    let noteCard = document.getElementsByClassName('notecard');
    Array.from(noteCard).forEach(element => {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        // console.log(cardTxt)
        if (cardTxt.includes(inpval)) {
            element.style.display = 'block';
            var foundelem = element;
        } else {
            element.style.display = 'none';
        }
        if (searchTxt.value.length !== 0) {
            element.style.color = '#0f1c9d';
        } else {
            element.style.color = 'black';
        }

    });
}