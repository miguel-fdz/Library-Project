document.querySelectorAll(".form__button").forEach(button => {
  button.addEventListener("click", (e) => {
    buttonFunctionalities[e.target.id]();
  });
})

const buttonFunctionalities = {
  "read": () => {
    const readStatus = document.getElementById("rating-question");
    (readStatus.style.display === "block") ? readStatus.style.display = "none" : readStatus.style.display = "block";
},
  "newBook": () => document.getElementById("form__modal").style.display = "block",
  "addBook": () => alert("This button has no functionalities yet."),
  "cancelBook": () => {
    document.getElementById("form__modal").style.display = "none";
    document.querySelectorAll(".form__question--input").forEach(e => e.value = "");
  },
}