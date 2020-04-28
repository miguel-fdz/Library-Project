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
  // "newBook": () => document.querySelector("form").style.display = "block",
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
  removeBooks("table")
  removeBooks("grid");
  myLibrary.forEach(book => render(book));
}

/* On sort selection switch, sorts myLibrary and re-renders books */
document.getElementById("sortList").addEventListener("change", (e) => {
  const compare = type => (a,b) => (a[type] > b[type]) ? 1 : (b[type] > a[type]) ? -1 : 0;
  myLibrary.sort(compare(e.target.value));
  renderLibrary();
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

/* Adds checked property to correct radio input of star rating in DOM */
const starHTML = (x,y) => {
  const rating = Number(x);
  let html = '';
  for (i = 5; i > 0; i--) {
    if (i !== rating) {
      html += `<input id="rating${i}.${y}" type="radio" name="rating${y}" value="${i}">
      <label for="rating${i}.${y}"></label>`;
    } else {
      html += `<input id="rating${i}.${y}" type="radio" name="rating${y}" value="${i}" checked="checked">
      <label for="rating${i}.${y}m"></label>`;
    }
  }
  return html;
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
  <div class="library-table__row--cell"><div class="star__rating" data-type="${myLibrary.indexOf(book)}">${starHTML(book.rating, myLibrary.indexOf(book))}</div></div>
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

document.addEventListener("change", (e) => {
  if (e.target.parentNode.classList.contains("star__rating")) {
    const x = e.target;
    myLibrary[x.parentNode.dataset.type].rating = Number(x.value);
    renderLibrary();
  }
})

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

const modal = {
  visible: false,
}

const modalReset = () => {
  if (document.getElementById("modal").classList.contains("search-mode")) {
    document.getElementById("modal").classList.toggle("search-mode");
  }
  document.getElementById("searchInput").value = "";
  document.getElementById("modal-overlay").classList.toggle("closed");
  document.getElementById("modal").classList.toggle("closed");
}

document.addEventListener("click", (e) => {
  if (modal.visible) {
    if (e.target.id === "closeModal" || e.target.id === "modal-overlay"){
      modalReset()
    }
    if (e.target.id === "searchButton") {
      document.getElementById("modal").classList.toggle("search-mode")
      bookSearch()
    }
  }

  if (e.target.id === "newBook") {	
    removeBooks("search-results")
    modal.visible = true
    document.getElementById("modal-overlay").classList.toggle("closed");
    document.getElementById("modal").classList.toggle("closed")
  }
})

document.addEventListener("keyup", (e) => {
  if (modal.visible) {
    if (e.key === "Escape") {
      modalReset();
    }

    if (e.key === "Enter") {
      document.getElementById("modal").classList.toggle("search-mode");
      bookSearch();
    }
  }
})

document.getElementById("searchButton").addEventListener("click", () => {
  document.getElementById("search-results").innerHTML = "";
  bookSearch();
})

const createNode = element => document.createElement(element)
const append = (parent, el) => parent.appendChild(el);

const ifImageBlank = dataPath => !dataPath ? "../images/not-available.svg" : dataPath.thumbnail;
const ifTitleBlank = dataPath => !dataPath ? "" : dataPath;
const ifAuthorBlank = dataPath => !dataPath ? "" : dataPath.join(', ').replace(/, ([^,]*)$/, ' & $1'); //RegExp pattern argument

function bookSearch() {
  const search = document.getElementById("searchInput").value;
  const ul = document.getElementById("search-results");
  
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${config}`)
  .then(response => response.json())
  .then(data => {
    data.items.map(book => {
      let li = createNode("li"),
        img = createNode("img"),
        div = createNode("div"),
        p = createNode("p");
        div2 = createNode("div")

      img.src = `${ifImageBlank(book.volumeInfo.imageLinks)}`;
      p.innerHTML = `<span class="search-item__info--title">${ifTitleBlank(book.volumeInfo.title)}</span><br><span class="search-item__info--authors">${ifAuthorBlank(book.volumeInfo.authors)}</span>`;
      div2.innerHTML = JSON.stringify({
        "title": `${ifTitleBlank(book.volumeInfo.title)}`, 
        "author": `${ifAuthorBlank(book.volumeInfo.authors)}`, 
        "pages": `${ifTitleBlank(book.volumeInfo.pageCount)}`, 
        "read": false, 
        "rating": `${book.volumeInfo.averageRating}`, 
        "image": `${ifImageBlank(book.volumeInfo.imageLinks)}`,
      });
      li.classList = "search-item";
      img.classList = "search-item__image";
      div.classList = "search-item__text-section"
      p.classList = "search-item__info";
      div2.classList = "hidden-volume-id";
      li.addEventListener("click", (e) => {
        myLibrary.push(JSON.parse(e.target.querySelector(".hidden-volume-id").innerHTML));
        renderLibrary();
      })
      append(li, img);
      append(div, p);
      append(li, div);
      append(li, div2);
      append(ul, li);
    })
  })
}


myLibrary.forEach(book => render(book));