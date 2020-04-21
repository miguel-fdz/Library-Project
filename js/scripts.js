const myLibrary = [{
  title: "the hobbit",
  author: "tolkein",
  pages: "123 pages",
  read: true,
  rating: "***",
}];
const librarySettings = {
  display: "table",
  sort: "title",
}

/* Adds functionality for all books in library */
document.querySelectorAll(".form__button").forEach(button => {
  button.addEventListener("click", (e) => {
    buttonFunctionalities[e.target.id]();
  });
})

const buttonFunctionalities = {
  "readStatus": () => {
    const readStatus = document.getElementById("ratingInput");
    (readStatus.style.display === "block") ? readStatus.style.display = "none" : readStatus.style.display = "block";
},
  "newBook": () => document.querySelector(".form__modal").style.display = "block",
  "addBook": () => {
    myLibrary.push(new Book());
    render(myLibrary[myLibrary.length - 1]);
    buttonFunctionalities.cancelForm();
  },
  "cancelForm": () => {
    document.querySelector(".form__modal").style.display = "none";
    document.querySelectorAll(".form__question--input").forEach(e => e.value = "");
  },
  "toggleRead": () => {
    alert("this works!");
  },
  "remove__button": (e) => {
    myLibrary.splice(e, 1);
    removeBooks();
    myLibrary.forEach(book => render(book));
  },
}

 /* Resets table for re-rendering books*/
const removeBooks = () => {
  const tableBody = document.getElementById("body");
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.lastChild);
  }
}

const bookValue = x => document.getElementById(`${x}`).value;

class Book {
  constructor() {
    this.title = bookValue("titleName");
    this.author = bookValue("authorName");
    this.pages = `${bookValue("pageCount")} pages`;
    this.read = document.getElementById("readStatus").checked;
    // this.rating = bookValue("rating");
    this.toggleRead = () => {};
    this.changeRating = () => {};
    this.deleteBook = () => {};
  }
}

/* Adds display change functionality */
document.getElementById("displayList").addEventListener("change", (e) => {
  const currentDisplayType = document.getElementById(`library-${librarySettings.display}`)
  currentDisplayType.style.display = "none";
  const newDisplayType = document.getElementById(`library-${e.target.value}`)
  newDisplayType.style.display = "";
  librarySettings.display = e.target.value;
})

const clickEvent = (e) => ["remove__button", "read__button"].filter(button => (e !== undefined && e.contains(`${button}`)))[0]

document.addEventListener("click", (e) => {
  if (clickEvent(e.target.classList)) {
    buttonFunctionalities[clickEvent(e.target.classList)](e.target.dataset.type);
  }
})

/* Renders one book according to display selection. */
const render = (book) => {
  if (librarySettings.display === "table") {
    const container = document.getElementById("body");
    const newRow = document.createElement("div");
    newRow.classList.add("library__body--row");
    newRow.innerHTML = 
    `<div class="library__body--row-cell">${book.title}</div>
    <div class="library__body--row-cell">${book.author}</div>
    <div class="library__body--row-cell">${book.pages}</div>
    <button class="library__body--row-cell read__button" id="toggleRead">${book.read}</button>
    <div class="library__body--row-cell">${book.rating}</div>
    <button class="remove__button" id="removeBook" data-type="${myLibrary.indexOf(book)}">remove</button>`;
    container.appendChild(newRow);
  }
  else {
    console.log("this doesn't work yet!");
  } 
}

myLibrary.forEach(book => render(book));