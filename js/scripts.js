const myLibrary = [];

document.querySelectorAll(".form__button").forEach(button => {
  button.addEventListener("click", (e) => {
    buttonFunctionalities[e.target.id]();
  });
})

const buttonFunctionalities = {
  "readStatus": () => {
    const readStatus = document.getElementById("rating-question");
    (readStatus.style.display === "block") ? readStatus.style.display = "none" : readStatus.style.display = "block";
},
  "newBook": () => document.querySelector(".form__modal").style.display = "block",
  "addBook": () => {
    myLibrary.push(new Book());
    buttonFunctionalities.cancelForm();
    render(myLibrary[-1], "table");
  },
  "cancelForm": () => {
    document.querySelector(".form__modal").style.display = "none";
    document.querySelectorAll(".form__question--input").forEach(e => e.value = "");
  },
}

const bookValue = x => document.getElementById(`${x}`).value;

class Book {
  constructor() {
    this.title = bookValue("titleName");
    this.author = bookValue("authorName");
    this.pages = bookValue("pageCount");
    this.read = document.getElementById("readStatus").checked;
    this.rating = bookValue("rating");
    this.toggleRead = () => {};
    this.changeRating = () => {};
    this.deleteBook = () => {};
  }
}

document.getElementById("displayList").addEventListener("change", (e) => {
  myLibrary.forEach(book => render(e.target.id, "table"))
})

const render = (book, type) => {
  if (type === "table") {
    const table = document.getElementById("bookshelf-table");
    const newRow = document.createElement("div");
    newRow.classList.add("bookshelf__body--row"); 
    
    const titleCell = document.createElement("div");
    titleCell.classList.add("bookshelf__body--row-cell");
    titleCell.innerHTML = book.title;
    const authorCell = document.createElement("div");
    authorCell.classList.add("bookshelf__body--row-cell");
    authorCell.innerHTML = book.author;
    const pageCell = document.createElement("div");
    pageCell.classList.add("bookshelf__body--row-cell");
    pageCell.innerHTML = book.pages;
    const readCell = document.createElement("div");
    readCell.classList.add("bookshelf__body--row-cell");
    readCell.innerHTML = book.read;
    const ratingCell = document.createElement("div");
    ratingCell.classList.add("bookshelf__body--row-cell");
    ratingCell.innerHTML = book.rating;
    
    newRow.appendChild(titleCell);
    newRow.appendChild(authorCell);
    newRow.appendChild(pageCell);
    newRow.appendChild(readCell);
    newRow.appendChild(ratingCell);
    table.appendChild(newRow);
  }
};
