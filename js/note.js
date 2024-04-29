window.onload = function () {

// Add note to local storage
saveNotes();

let btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", function(e) {

  let addTitle = document.getElementById("title");
  let addTxt = document.getElementById("boxTxt");
  
    if (addTitle.value == "" || addTxt.value == "") {
        return alert("Please fill in both fields to add  your note")
    }

  let note = localStorage.getItem("note");
  if (note == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(note);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  noteObj.push(myObj);
  localStorage.setItem("note", JSON.stringify(noteObj));
  addTxt.value = "";
  addTitle.value = "";
//   console.log(noteObj);
  saveNotes();
});
};

// Function to show elements from localStorage
function saveNotes() {
  let note = localStorage.getItem("note");
  if (note == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(note);
  }
  let html = "";
  noteObj.forEach(function(element, index) {   //the new added note
    html += `                                       
        <div class="col-md-6" id="newNote" >
        <div class="card" style="width: 100%; border:blue solid 3px;">
            <div class="card-body ">
              <h5 class="card-title" style="text-decoration: underline;text-align:center;">Note ${index + 1}</h5>
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.text}</p>
              <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary float-right">Delete</button>
              <button id="${index}"onclick="editNote(this.id)" class="btn btn-primary float-left">Edit Note</button>
            </div>
          </div>
        </div>`;
  });
  let noteElm = document.getElementById("note");
  if (noteObj.length != 0) {
    noteElm.innerHTML = html;
  } else {
    noteElm.innerHTML = `No Notes Yet! Add a note using the form above.`;
  }
}

// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);
    let confirmDel = confirm("Delete this note?");
    if (confirmDel == true) {
        let note = localStorage.getItem("note");
        if (note == null) {
            noteObj = [];
        } else {
            noteObj = JSON.parse(note);
        }

        noteObj.splice(index, 1);
        localStorage.setItem("note", JSON.stringify(noteObj));
        saveNotes();
    }
  
}

// Function to Edit the Note
function editNote(index) {
    let note = localStorage.getItem("note");
    let addTitle = document.getElementById("title");
    let addTxt = document.getElementById("boxTxt");

    if (addTitle.value !== "" || addTxt.value !== "") {
      return alert("Please clear the form before editing a note")
    } 

    if (note == null) {
      noteObj = [];
    } else {
      noteObj = JSON.parse(note);
    }
    console.log(noteObj);

    noteObj.findIndex((element, index) => {
      addTitle.value = element.title;
      addTxt.value = element.text;
    })
    noteObj.splice(index, 1);
        localStorage.setItem("note", JSON.stringify(noteObj));
        saveNotes();
}


//Fonts

function changeFont(font) {
    console.log(font.value)
    document.getElementById('boxTxt').style.fontFamily = font.value;

};

//Fonts-size

function changeSize(n) {
    const s = document.getElementById('boxTxt');
    s.style.fontSize = n.value + 'px';
}

//Bold, Italic and Underline
function bold() {
  var addTitle = document.getElementById('title').style.fontWeight;
  var addTxt = document.getElementById('boxTxt').style.fontWeight;

  if (addTitle.value == addTxt.value){
    document.getElementById('title').style.fontWeight = "bold";
      document.getElementById('boxTxt').style.fontWeight = "bold";
    
  }
  else{
    document.getElementById('title').style.fontWeight = "normal";
    document.getElementById('boxTxt').style.fontWeight = "normal";
  }
}

function italic() {
  var addTitle = document.getElementById('title').style.fontStyle;
  var addTxt = document.getElementById('boxTxt').style.fontStyle;

  if (addTitle.value == addTxt.value){
      document.getElementById('title').style.fontStyle = "italic";
      document.getElementById('boxTxt').style.fontStyle = "italic";

  }
  else {
      document.getElementById('title').style.fontStyle = "normal";
      document.getElementById('boxTxt').style.fontStyle = "normal";
  }
}

function uline() {
  var addTitle = document.getElementById('title').style.textDecoration;
  var addTxt = document.getElementById('boxTxt').style.textDecoration;

  if (addTitle.value == addTxt.value){
      document.getElementById('title').style.textDecoration = "underline";
      document.getElementById('boxTxt').style.textDecoration = "underline";

  }
  else {
      document.getElementById('title').style.textDecoration = "none";
      document.getElementById('boxTxt').style.textDecoration = "none";
  }
}


// Clear and Reset
function resetTxt() {
    document.getElementById('boxTxt').style.fontWeight = "normal";
    document.getElementById('boxTxt').style.fontStyle = "normal";
    document.getElementById('boxTxt').style.textDecoration = "none";
    document.getElementById('boxTxt').style.fontFamily = "none";
    document.getElementById('boxTxt').style.fontSize = "20px";

    document.getElementById('title').style.fontWeight = "normal";
    document.getElementById('title').style.fontStyle = "normal";
    document.getElementById('title').style.textDecoration = "none";
    document.getElementById('title').style.fontFamily = "none";
    document.getElementById('title').style.fontSize = "20px"; 

};

function clearTxt() {
   document.getElementById('title').value = "";
    document.getElementById('boxTxt').value = "";

};



//Having a diificulty to grab a bold, italic, font, font size element to the new added note
//without using the document.execCommand. 

//trying to use two id to use same function, but it not working.

//Wiil try to update this notepad in the future to make it work using all the function and can be added to local storage with the working function too.