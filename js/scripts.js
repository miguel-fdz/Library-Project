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

/* Saves index of each book withing corresponding object. */
const setIndex = () => {
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].index = i;
  }
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
    setIndex();
    removeBooks();
    myLibrary.forEach(book => render(book, librarySettings.display));
    buttonFunctionalities.cancelForm();
  },
  "cancelForm": () => {
    document.querySelector(".form__modal").style.display = "none";
    document.querySelectorAll(".form__question--input").forEach(e => e.value = "");
  },
  "editBook": () => {
    const index = findIndex(event.srcElement.parentNode); 
    console.log(index);
  },
  "removeBook": () => {
    const index = findIndex(event.srcElement.parentNode); 
    myLibrary.splice(index, 1);
    setIndex();
    removeBooks();
    myLibrary.forEach(book => render(book, librarySettings.display))
  },
}

/* Finds index of type node within parent */
const findIndex = (child) => {
  const parent = child.parentNode; 
  return Array.prototype.indexOf.call(parent.children, child);
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
    this.rating = bookValue("rating");
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

/* Renders one book according to display selection. */
const render = (book) => {
  if (librarySettings.display === "table") {
    const container = document.getElementById("body");
    const createRow = document.createElement("div");
    createRow.classList.add("library__body--row");
    const element = [book.title, book.author, book.pages, book.read, book.rating, "edit", "remove"];
    for (let i = 0; i < 5; i++) {
      const Cell = document.createElement("div");
      Cell.classList.add("library__body--row-cell");
      Cell.innerHTML = element[i];
      createRow.appendChild(Cell);
    }
    for (let i = 5; i < 7; i++) {
      const Button = document.createElement("button");
      Button.classList.add("form__button");
      Button.setAttribute("id", `${element[i]}Book`),
      Button.innerHTML = element[i];
      Button.addEventListener("click", () => buttonFunctionalities[Button.id]());
      createRow.appendChild(Button);
    }
    container.appendChild(createRow);
  }
  else {
    alert("this doesn't work yet!");
  } 
}

myLibrary.forEach(book => render(book, librarySettings.display))