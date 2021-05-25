console.log("This is Notes taking website");

showNotes();
//took variable addBtn using it's element id ("addBtn")
let addBtn = document.getElementById("addBtn"); 

//adding "click" eventlistener to it, "e" is event objects
addBtn.addEventListener("click", function(e){
    //fetching addTxt details in variable addTxt
    let addTxt = document.getElementById("addTxt");
    //variable for storing in local storage
    let notes = localStorage.getItem("notes");
    
    if(notes == null){
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    //pushing value present in the addTxt to the notesObj
    notesObj.push(addTxt.value)
    //converting array to string using stringify from localstorage
    localStorage.setItem("notes", JSON.stringify(notesObj));
    //clearing addTxt field after clicking add note button
    addTxt.value = "";
    showNotes();

})

//function to show added notes
function showNotes(){
    let notes = localStorage.getItem("notes");
    
    if(notes == null){
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }  
//blank string
let HTML = "";
//for each function as this is array
notesObj.forEach(function (element, index){
    HTML += ` <div class="noteCard my-2 mx-2 card" style="width: 15rem">
         <div class="card-body">
         <h5 class="card-title">Note ${index+1}</h5>
         <p class="card-text">${element}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
     </div>
  </div>`
});
let notesElem = document.getElementById("notes");
if(notesObj != 0){
    notesElem.innerHTML= HTML;
}else{
    notesElem.innerHTML = `Nothing to show! Use "Add a note" section above to add notes.`;
}}

//Function to delete notes
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes)
    }
    //splice removes the elements from array(starting from, no.of count)
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
//function for search bar
let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard")
//getting all array from cards    
    Array.from(noteCards).forEach(function(element){
//retrieve collection of elements by Tag name(tag, start value)
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    })
})
//scroll to top button
let clickBtn = document.getElementById("scrollTopBtn");
//getting reference to root node of document
let rootElement = document.documentElement;
function scrollToTop(){
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
clickBtn.addEventListener("click", scrollToTop);