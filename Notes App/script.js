const notesContainer = document.querySelector(".notes-container");
const createNote = document.querySelector(".btn")
let notes = document.querySelectorAll(".input-box");

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
}

showNotes();

function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML)
}

createNote.addEventListener("click", function() {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable","true");
    img.src = "assets/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
});

notesContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "IMG"){
        e.target.parentNode.remove();
        updateStorage();
    }
    else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt=>{
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }

});

document.addEventListener("keydown", function(e) {
    if(e.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
} );




