let myLibrary = [];

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
  },
  "cancelForm": () => {
    document.querySelector(".form__modal").style.display = "none";
    document.querySelectorAll(".form__question--input").forEach(e => e.value = "");
  },
}

const bookValue = (x) => document.getElementById(`${x}`).value;

class Book {
  constructor(title, author, pageCount, read) {
    this.title = bookValue("titleName");
    this.author = bookValue("authorName");
    this.pages = bookValue("pageCount");
    (bookValue("readStatus") === "on") ? this.read = true : this.read = false;
    this.rating = bookValue("rating");
    this.toggleRead = () => {};
    this.deleteBook = () => {};
  }
}