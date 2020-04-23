const myLibrary = [{
  title: "the Hobbit",
  author: "Tolkein",
  pages: 300,
  isbn: 9780007458424,
  read: true,
  rating: 3,
},
{
  title: "Neuromancer",
  author: "William Gibson",
  pages: 271,
  isbn: 9781473217386,
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

const librarySettings = {
  display: "table",
}

/* Adds functionality for all buttons in library */
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
  "newBook": () => document.querySelector("form").style.display = "block",
  "addBook": () => {
    myLibrary.push(new Book());
    render(myLibrary[myLibrary.length - 1]);
    buttonFunctionalities.cancelForm();
  },
  "cancelForm": () => {
    document.querySelector(".form__modal").style.display = "none";
    document.querySelectorAll(".form__question--input").forEach(e => e.value = "");
  },
  "read__button": (i) => (myLibrary[i].read === true) ? myLibrary[i].read = false : myLibrary[i].read = true,
  "remove__button": (i) => {
    myLibrary.splice(i, 1);
    removeBooks("table")
    removeBooks("grid");
    myLibrary.forEach(book => render(book));
  },
}

 /* Resets table for re-rendering books*/
const removeBooks = x => {
  const tableBody = document.getElementById(`${x}`);
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
    this.title = bookValue("titleName");
    this.author = bookValue("authorName");
    this.pages = Number(bookValue("pageCount"));
    this.read = document.getElementById("readStatus").checked;
    this.rating = Number(bookValue("starRating"));
    this.isbn = bookValue("isbn");
  }
}

/* On sort selection switch, sorts myLibrary and re-renders books */
document.getElementById("sortList").addEventListener("change", (e) => {
  const compare = type => (a,b) => (a[type] > b[type]) ? 1 : (b[type] > a[type]) ? -1 : 0;
  myLibrary.sort(compare(e.target.value));
  removeBooks("table")
  removeBooks("grid");
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
  if (clickEvent(e.target.classList) === "read__button") {
    (e.target.innerHTML === "true") ? e.target.innerHTML = "false" : e.target.innerHTML = "true";
  }
})

const ratingStars = (x) => {
  let container = '';
  for (let i = 0; i < 5; i++) {
    if (i < x) {
      container += `${'<img src="images/star-on.svg" class="star__rated">'}`;
    } else {
      container += `${'<img src="images/star-off.svg" class="star__rated">'}`;
    }
  }
  return container;
};

/* Renders one book according to display selection. */
const render = (book) => {
  const tableContainer = document.getElementById("table");
  const tableRow = document.createElement("div");
  tableRow.classList.add("library-table__row");
  tableRow.innerHTML = 
  `<div class="library-table__row--cell">${book.title}</div>
  <div class="library-table__row--cell">${book.author}</div>
  <div class="library-table__row--cell">${book.pages} pages</div>
  <button class="library-table__row--cell read__button" data-type="${myLibrary.indexOf(book)}">${book.read}</button>
  <div class="library-table__row--cell">${ratingStars(book.rating)}</div>
  <button class="remove__button" data-type="${myLibrary.indexOf(book)}">remove</button>`;
  tableContainer.appendChild(tableRow);
  const gridContainer = document.getElementById("grid");
  const gridRow = document.createElement("div");
  gridRow.classList.add("library-grid__row");
  if (book.isbn){
    gridRow.style.backgroundImage = `url("http://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg")`
  }
  gridRow.innerHTML = `<div class="library-grid__row--cell">${book.title}</div>
  <div class="library-grid__row--cell">${book.author}</div>
  <div class="library-grid__row--cell">${book.pages} pages</div>
  <button class="library-grid__row--cell read__button" data-type="${myLibrary.indexOf(book)}">${book.read}</button>
  <div class="library-grid__row--cell">${book.rating}</div>
  <button class="remove__button" data-type="${myLibrary.indexOf(book)}">remove</button>`;
  gridContainer.appendChild(gridRow);
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