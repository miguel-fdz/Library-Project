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

const buttonFunctionalities = {
  "readStatus": () => {
    const readStatus = document.getElementById("ratingInput");
    (readStatus.style.display === "block") ? readStatus.style.display = "none" : readStatus.style.display = "block";
},
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

 const readHTML = x => x === true ? "Read" : "Not read";

/* Renders one book according to display selection. */
const render = (book) => {
  const tableContainer = document.getElementById("table");
  const tableRow = document.createElement("div");
  tableRow.classList.add("library-table__row");
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
    <div class="library-table__row--cell"><div class="star__rating" data-type="${myLibrary.indexOf(book)}">${starHTML(book.rating, myLibrary.indexOf(book))}</div></div>
    <button class="remove__button" data-type="${myLibrary.indexOf(book)}"></button>`;
  tableContainer.appendChild(tableRow);
  const gridContainer = document.getElementById("grid");
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
          <label for="readCheckbox${myLibrary.indexOf(book)}" class="read-button-label${myLibrary.indexOf(book)}">Not<br>Read</label>
          <input type="checkbox" id="readCheckbox${myLibrary.indexOf(book)}" class="hidden-checkbox">
        </div>
        <div class="library-grid__row--back--average-rating">${book.averageRating}</div>
        <button class="library-grid__row--back--remove-button" id="remove__button${myLibrary.indexOf(book)}" data-type="${myLibrary.indexOf(book)}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.96 25"><title>close-button 2</title><polygon points="24.96 2.44 22.56 0.04 12.5 10.1 2.4 0 0 2.4 10.1 12.5 0 22.59 2.4 25 12.5 14.9 22.56 24.96 24.96 22.56 14.9 12.5 24.96 2.44" style="fill:#FFFFFF"/></svg>
        </button>
      </div>
    </div>`;
  gridContainer.appendChild(gridRow);
}
/* Enables active modification of star ratings */
document.addEventListener("change", (e) => {
  if (e.target.parentNode.classList.contains("star__rating")) {
    const x = e.target;
    myLibrary[x.parentNode.dataset.type].rating = Number(x.value);
  }
})

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

const ifImageBlank = dataPath => dataPath ? dataPath.thumbnail : "../images/not-available.svg";
const ifImageBlankFullSize = dataPath => dataPath.medium ? [dataPath.medium, dataPath.thumbnail] : [dataPath.thumbnail];
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
        p = createNode("p");

      img.src = `${ifImageBlank(book.volumeInfo.imageLinks)}`;
      p.innerHTML = `<span class="search-item__info--title">${ifTitleBlank(book.volumeInfo.title)}</span><br><span class="search-item__info--authors">${ifAuthorBlank(book.volumeInfo.authors)}</span>`;
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
								render(myLibrary[myLibrary.length - 1]);
							})
      })
      append(li, img);
      append(li, p);
      append(ul, li);
    })
  })
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

// const firebaseConfig = {
//   apiKey: "AIzaSyDGotxe8pp2sfLQvIwK_-owmyCtFIXcwaQ",
//   authDomain: "library-project-top.firebaseapp.com",
//   databaseURL: "https://library-project-top.firebaseio.com",
//   projectId: "library-project-top",
//   storageBucket: "library-project-top.appspot.com",
//   messagingSenderId: "481933733152",
//   appId: "1:481933733152:web:a44d97657a7bd98fc6fb45",
//   measurementId: "G-VQYSN0LB2P"
// };

// firebase.initializeApp(firebaseConfig);
// firebase.analytics();














































