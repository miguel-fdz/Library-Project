const myLibrary = [{
  title: "the Hobbit",
  author: "Tolkein",
  pages: 300,
  read: true,
  rating: 3,
},
{
  title: "Neuromancer",
  author: "William Gibson",
  pages: 271,
  read: true,
  rating: 4,
},
{
  title: "Leviathan Wakes",
  author: "James SA Corey",
  pages: 577,
  read: false,
  rating: 3,
},
{
  title: "The Charisma Myth",
  author: "Olivia Fox",
  pages: 150,
  read: false,
  rating: 5,
},
];

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
  "read__button": (i) => {
    (myLibrary[i].read === true) ? myLibrary[i].read = false : myLibrary[i].read = true;
    removeBooks();
    myLibrary.forEach(book => render(book));
  },
  "remove__button": (i) => {
    myLibrary.splice(i, 1);
    removeBooks();
    myLibrary.forEach(book => render(book));
  },
}

 /* Resets table for re-rendering books*/
const removeBooks = () => {
  const tableBody = document.getElementById("table");
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.lastChild);
  }
}

const isChecked = (x) => x.checked === "true";

const bookValue = x => {
  if (x === "starRating") {
    const ele = document.getElementsByName("rating");
    for (i = 0; i < ele.length; i++) { 
      if (ele[i].checked) {
        return ele[i].value;
      }
    }
  } else {
    return document.getElementById(`${x}`).value;
  }
}

class Book {
  constructor() {
    this.title = bookValue("titleName").capitalize();
    this.author = bookValue("authorName");
    this.pages = Number(bookValue("pageCount"));
    this.read = document.getElementById("readStatus").checked;
    this.rating = Number(bookValue("starRating"));
  }
}

/* On sort selection switch, sorts myLibrary and re-renders books */
document.getElementById("sortList").addEventListener("change", (e) => {
  const compare = type => (a,b) => (a[type] > b[type]) ? 1 : (b[type] > a[type]) ? -1 : 0;
  myLibrary.sort(compare(e.target.value));
  removeBooks();
  myLibrary.forEach(book => render(book));
})

/* Switches display type */
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
  const tableContainer = document.getElementById("table");
  const tableNewRow = document.createElement("div");
  tableNewRow.classList.add("library__body--row");
  tableNewRow.innerHTML = `<div class="library__body--row-cell">${book.title}</div>
  <div class="library__body--row-cell">${book.author}</div>
  <div class="library__body--row-cell">${book.pages} pages</div>
  <button class="library__body--row-cell read__button" data-type="${myLibrary.indexOf(book)}">${book.read}</button>
  <div class="library__body--row-cell">${book.rating}</div>
  <button class="remove__button" data-type="${myLibrary.indexOf(book)}">remove</button>`;
  tableContainer.appendChild(tableNewRow);
  /*const gridContainer = document.getElementById("grid");
  const gridNewRow = document.createElement("div");
  gridNewRow.classList.add("library-grid__row");
  if (book.isbn){
    gridNewRow.style.backgroundImage = `url("http://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg})`
  }
  gridNewRow.innerHTML = `<div class="library-grid__row-cell">${book.title}</div>
  <div class="library-grid__row-cell">${book.author}</div>
  <div class="library-grid__row-cell">${book.pages} pages</div>
  <button class="library-grid__row-cell read__button" data-type="${myLibrary.indexOf(book)}">${book.read}</button>
  <div class="library-grid__row-cell">${book.rating}</div>
  <button class="remove__button" data-type="${myLibrary.indexOf(book)}">remove</button>`;
  container.appendChild(gridNewRow);*/
}

myLibrary.forEach(book => render(book));

/*const domRender = (container, innerHTML) => {
    const container = document.getElementById(`${container}`);
    const newRow = document.createElement("div");
    newRow.classList.add(`${innerHTML}--row`);
    newRow.innerHTML = `<div class="${innerHTML}--row-cell">${book.title}</div>
    <div class="${innerHTML}--row-cell">${book.author}</div>
    <div class="${innerHTML}--row-cell">${book.pages} pages</div>
    <button class="${innerHTML}--row-cell read__button" data-type="${myLibrary.indexOf(book)}">${book.read}</button>
    <div class="${innerHTML}--row-cell">${book.rating}</div>
    <button class="remove__button" data-type="${myLibrary.indexOf(book)}">remove</button>`;
    container.appendChild(newRow);
  }
  domRender("table", 
  domRender("grid", ``)*/
