const myLibrary = [{
  title: "The Hobbit",
  authors: "Tolkein",
  pageCount: 300,
  image: ["http://books.google.com/books/content?id=hFfhrCWiLSMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"],
  read: true,
  rating: 3,
  },
  {
  title: "Neuromancer",
  authors: "William Gibson",
  pageCount: 271,
  image: ["http://books.google.com/books/content?id=IDFfMPW32hQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"],
  read: true,
  rating: 4,
  },
  {
  title: "Leviathan Wakes",
  authors: "James SA Corey",
  pageCount: 577,
  image:["http://books.google.com/books/content?id=yud-foXqGUEC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"],
  read: false,
  rating: 3,
  }
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

const toggleDOM = (element, className) => document.getElementById(`${element}`).classList.toggle(`${className}`);

const buttonFunctionalities = {
  "readStatus": () => {
    const readStatus = document.getElementById("ratingInput");
    (readStatus.style.display === "block") ? readStatus.style.display = "none" : readStatus.style.display = "block";
},
  "cancelForm": () => {
    document.querySelector(".form__modal").style.display = "none";
    document.querySelectorAll(".form__question--input").forEach(e => e.value = "");
  },
  "read__button": (i) => (myLibrary[i].read === true) ? myLibrary[i].read = false : myLibrary[i].read = true,
  "remove__button": (i) => {
    myLibrary.splice(i, 1);
    renderLibrary();
  },
}

 /* Resets table for re-rendering books*/
const removeBooks = x => {
  const tableBody = document.getElementById(`${x}`);
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.lastChild);
  }
}

const renderLibrary = () => {
  removeBooks("tableBody");
  removeBooks("libraryGrid");
  myLibrary.forEach(book => render(book));
}

const readCheck = book => book.read ? document.getElementById(`label-text${myLibrary.indexOf(book)}`).innerHTML = "Read" : document.getElementById(`label-text${myLibrary.indexOf(book)}`).innerHTML = "Unread";

/* On sort selection switch, sorts myLibrary and re-renders books */
document.getElementById("sortList").addEventListener("change", (e) => {
  const compare = type => (a,b) => (a[type] > b[type]) ? 1 : (b[type] > a[type]) ? -1 : 0;
  myLibrary.sort(compare(e.target.value));
  renderLibrary();
})

/* Switches display type between grid and table*/
document.getElementById("displayList").addEventListener("change", (e) => {
  toggleDOM("libraryTable", "visible-table")
  toggleDOM("libraryGrid", "visible-grid")
})

document.addEventListener("click", (e) => {
  const clickEvent = (e) => ["remove__button", "read__button"].filter(button => (e !== undefined && e.contains(`${button}`)))[0]
  if (clickEvent(e.target.classList)) {
    buttonFunctionalities[clickEvent(e.target.classList)](e.target.dataset.type);
  }
  if (clickEvent(e.target.classList) === "read__button") {
    (e.target.innerHTML === "Read") ? e.target.innerHTML = "Not read" : e.target.innerHTML = "Read";
  }
})

/* Creates rating nodes with according checked property */
const starHTML = (x,y,z) => {
  const rating = Math.floor(x); 
  let html = '';
  for (i = 5; i > 0; i--) {
    if (i !== rating) {
      html += `<input id="${z}Rating${i}.${y}" type="radio" name="${z}Rating${y}" value="${i}">
      <label for="${z}Rating${i}.${y}"></label>`;
    } else {
      html += `<input id="${z}Rating${i}.${y}" type="radio" name="${z}Rating${y}" value="${i}" checked="checked">
      <label for="${z}Rating${i}.${y}"></label>`; 
    }
  }
  return html;
};

/* Renders one book according in both table and grid forms. */
const render = (book) => {
  const tableContainer = document.getElementById("tableBody");
  const tableRow = document.createElement("div");
  tableRow.classList.add("library-table__row");
  const readHTML = (x) => (x === true) ? "Read" : "Not read" ;
  tableRow.innerHTML = 
   `<div class="library-table__row--cell">
      <div class="title">
        <img src="${book.image[book.image.length-1]}">
        <p>${book.title}</p>
      </div>
    </div>
    <div class="library-table__row--cell">${book.authors}</div>
    <div class="library-table__row--cell">${book.pageCount} pages</div>
    <button class="library-table__row--cell read__button" data-type="${myLibrary.indexOf(book)}">${readHTML(book.read)}</button>
    <div class="library-table__row--cell">
      <div class="star__rating" data-type="${myLibrary.indexOf(book)}">${starHTML(book.rating, myLibrary.indexOf(book), "table")}</div>
    </div>
    <button class="remove__button" data-type="${myLibrary.indexOf(book)}"></button>`;
  tableContainer.appendChild(tableRow);
  const gridContainer = document.getElementById("libraryGrid");
  const gridRow = document.createElement("div");
  gridRow.classList.add("library-local-perspective");
  gridRow.innerHTML =
   `<div class="library-grid__row">
      <img src="${book.image[0]}" class="library-grid__row--front"></img>
      <div class="library-grid__row--back">
        <div class="library-grid__row--back--title">${book.title}</div>
        <div class="library-grid__row--back--authors">${book.authors}</div>
        <div class="library-grid__row--back--page-count">${book.pageCount}<br>pages</div>
        <div class="library-grid__row--back--read-button">
          <input type="checkbox" id="readCheckbox${myLibrary.indexOf(book)}" class="hidden-checkbox">
          <p id="label-text${myLibrary.indexOf(book)}"></p>
          <label for="readCheckbox${myLibrary.indexOf(book)}" class="read-button-label"></label>
        </div>
        <div class="library-grid__row--back--rating">
          <div class="star__rating" data-type="${myLibrary.indexOf(book)}">${starHTML(book.rating, myLibrary.indexOf(book), "grid")}</div>
        </div>
        <button class="library-grid__row--back--remove-button remove__button" data-type="${myLibrary.indexOf(book)}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.96 25"><title>close-button 2</title><polygon points="24.96 2.44 22.56 0.04 12.5 10.1 2.4 0 0 2.4 10.1 12.5 0 22.59 2.4 25 12.5 14.9 22.56 24.96 24.96 22.56 14.9 12.5 24.96 2.44" style="fill:#FFFFFF"/></svg>
        </button>
      </div>
    </div>`;
  gridContainer.appendChild(gridRow);
  document.getElementById(`readCheckbox${myLibrary.indexOf(book)}`).checked = book.read
  readCheck(book)
  document.getElementById(`readCheckbox${myLibrary.indexOf(book)}`).addEventListener("change", (e) => {
  	book.read = document.getElementById(e.target.id).checked;
    readCheck(book) 
  })
}

/* Upon changing star rating of book, save new value into myLibrary */
document.addEventListener("change", (e) => {
  if (e.target.parentNode.classList.contains("star__rating")) {
    const x = e.target;
    myLibrary[x.parentNode.dataset.type].rating = Number(x.value);
    renderLibrary();
  }
})

const modal = {
  visible: false,
}

const modalReset = () => {
  if (document.getElementById("modal").classList.contains("search-mode")) {
    toggleDOM("modal", "search-mode")
  }
  document.getElementById("searchInput").value = "";
  toggleDOM("modal-overlay", "hidden")
  toggleDOM("modal", "hidden")
}

document.addEventListener("click", (e) => {
  if (modal.visible) {
    if (e.target.id === "closeModal" || e.target.id === "modal-overlay"){
      modalReset()
    }
    if (e.target.id === "searchButton") {
      toggleDOM("modal", "search-mode")
      bookSearch()
    }
  }

  if (e.target.id === "newBook") {	
    removeBooks("search-results")
    modal.visible = true
    toggleDOM("modal-overlay", "hidden")
    toggleDOM("modal", "hidden")
  }
})

document.addEventListener("keyup", (e) => {
  if (modal.visible) {
    if (e.key === "Escape") {
      modalReset();
    }

    if (e.key === "Enter") {
      toggleDOM("modal", "search-mode");
      bookSearch();
    }
  }
})

window.addEventListener("load", () => {
  modal.visible = true
  toggleDOM("loginSignup", "hidden")
  toggleDOM("modal-overlay", "hidden")
})

document.getElementById("searchButton").addEventListener("click", () => {
  document.getElementById("search-results").innerHTML = "";
  bookSearch();
})

const createNode = element => document.createElement(element)
const append = (parent, el) => parent.appendChild(el);

const ifImageBlank = dataPath => dataPath ? dataPath.thumbnail : "../images/not-available.svg";
const ifImageBlankFullSize = dataPath => dataPath.medium ? [dataPath.medium, dataPath.thumbnail] : [dataPath.thumbnail];
const ifTitleBlank = dataPath => !dataPath ? "" : dataPath;
const ifAuthorBlank = dataPath => !dataPath ? "" : dataPath.join(', ').replace(/, ([^,]*)$/, ' & $1'); //RegExp pattern argument
function bookSearch() {
  const search = document.getElementById("searchInput").value;
  const ul = document.getElementById("search-results");
  if (modal.visible && search !== "") { 
    if (!document.getElementById("searchInput").classList.contains("search-mode")){
      toggleDOM("searchInput", "search-mode");
    }
    removeBooks("search-results")

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${config}`)
      .then(response => response.json())
      .then(data => {
        data.items.map(book => {
          let li = createNode("li"),
            img = createNode("img"),
            p = createNode("p");

          img.src = `${ifImageBlank(book.volumeInfo.imageLinks)}`;
          p.innerHTML = `<div class="search-item__info--title">${ifTitleBlank(book.volumeInfo.title)}</div><div class="search-item__info--authors">${ifAuthorBlank(book.volumeInfo.authors)}</div>`;
          li.classList = "search-item";
          img.classList = "search-item__image";
          p.classList = "search-item__info";
          li.addEventListener("click", () => {
            fetch(`https://www.googleapis.com/books/v1/volumes/${book.id}?key=${config}`)
                  .then(response => response.json())
                  .then(data => {
                    myLibrary.push(new Book(
                      ifTitleBlank(data.volumeInfo.title), 
                      ifAuthorBlank(data.volumeInfo.authors), 
                      data.volumeInfo.pageCount,
                      data.volumeInfo.averageRating,
                      false,
                      ifImageBlankFullSize(data.volumeInfo.imageLinks)))
                    // push new book to firebase here
                    render(myLibrary[myLibrary.length - 1]);
                  })
          })
          append(li, img);
          append(li, p);
          append(ul, li);
        })
    })
  }
}

class Book {
	constructor(title, authors, pageCount, averageRating, read, image){
		this.title = title;
		this.authors = authors;
		this.pageCount = pageCount;
		this.rating = averageRating;
		this.read = read;
		this.image = image;
	}
}

myLibrary.forEach(book => render(book));













































