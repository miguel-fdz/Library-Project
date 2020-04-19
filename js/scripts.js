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
  "newBook": () => document.getElementById("form__modal").style.display = "block",
  "addBook": () => {
    myLibrary.push(new Book());
    buttonFunctionalities.cancelForm();
  },
  "cancelForm": () => {
    document.getElementById("form__modal").style.display = "none";
    document.querySelectorAll(".form__question--input").forEach(e => e.value = "");
  },
}

const bookValue = (x) => document.getElementById(`${x}`).value;

function Book() {
  this.title = bookValue("titleName");
  this.author = bookValue("authorName");
  this.pages = bookValue("pageAmount");
  this.read = bookValue("readStatus");
  this.rating = bookValue("rating");
  this.toggleRead = () => {};
}