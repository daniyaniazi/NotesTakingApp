console.log('welcome to Notes taking app')
showNotes();
// If user add it t a local storage
let addBtn = document.getElementById('addNoteBtn');
addBtn.addEventListener('click', function() {
        let addText = document.getElementById('addNoteTxt')
        let addTitle = document.getElementById('addNoteTitle')
        let notes = localStorage.getItem('notes')
        if (notes == null) {
            var notesArr = [];
        } else {
            notesArr = JSON.parse(notes)
        }
        let notesObj = {
            title: addTitle.value,
            note: addText.value
        }
        notesArr.unshift(notesObj)
        localStorage.setItem('notes', JSON.stringify(notesArr));
        addText.value = '';
        addTitle.value = '';
        // console.log(notes)
        // console.log(notesArr)
        showNotes();
    })
    // Show notes fucntion to add new note
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesArr = [];
    } else {
        notesArr = JSON.parse(notes)
    }
    let html = '';
    notesArr.forEach(function(element, index) {
        html += `
        <div class=" notecard card my-2 ml-5 col-md-3" style='box-sizing:border-box'>
        <div class="card-body">
            <h5 class="card-title"> ${element.title}</h5>
            <p class="crad-text">${element.note}</p>
            <button class="btn btn-outline-danger" id='${index}' onclick='deleteNote(this.id)'>Delete</button>
        </div>
    </div>`;

        // display notes card
    });
    let noteselem = document.getElementById('notes')
    if (notesArr.length != 0) {
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
        notesArr = [];
    } else {
        notesArr = JSON.parse(notes)
    }
    notesArr.splice(index, 1);
    //   update local storage
    localStorage.setItem('notes', JSON.stringify(notesArr));
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
        let cardtitle = element.getElementsByTagName('h5')[0].innerText;
        // console.log(cardTxt)
        if (cardTxt.includes(inpval) || cardtitle.includes(inpval)) {
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