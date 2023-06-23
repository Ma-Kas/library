///////////////////////////////////////////////////////
/////////////////// Variables /////////////////////////
///////////////////////////////////////////////////////

// References to DOM elements
const addBookButton = document.querySelector('#add-book');
const bookCardContainer = document.querySelector('.book-card-container');
const modalContainer = document.querySelector('#modal-container');
const readCheckbox = document.querySelector('#read');
const submitButton = document.querySelector('#submit');
const cancelButton = document.querySelector('#cancel');


// General use variables
const READ = 'read';
const UNREAD = 'unread';

let myLibrary = [];

let newBookTitle = '';
let newBookAuthor = '';
let newBookPages = '';
let newBookRead = '';



///////////////////////////////////////////////////////
/////////////////// Event Listeners ///////////////////
///////////////////////////////////////////////////////

addBookButton.addEventListener('click', (e) => {
  modalContainer.style.visibility = 'visible';
});

modalContainer.addEventListener('submit', (e) => {
  newBookTitle = modalContainer.elements["title"].value;
  newBookAuthor = modalContainer.elements["author"].value;
  newBookPages = `${modalContainer.elements["pages"].value} pages`;
  if (modalContainer.elements["read"].checked) {
    newBookRead = READ;
  } else {
    newBookRead = UNREAD;
  }

  addBookToLibrary();
  addToCardContainer();
  modalContainer.style.visibility = 'hidden';
  e.preventDefault();

  modalContainer.reset();
});

cancelButton.addEventListener('click', (e) => {
  modalContainer.style.visibility = 'hidden';
  e.preventDefault();

  modalContainer.reset();
});


///////////////////////////////////////////////////////
///////////////// Object Constructors /////////////////
///////////////////////////////////////////////////////

// Handle the general book object, as well as prototype functions
function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
}


///////////////////////////////////////////////////////
///////////////// General Functions ///////////////////
///////////////////////////////////////////////////////

// Create new book object from input, add to myLibrary array
function addBookToLibrary() {
  const book = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead)
  myLibrary.push(book);
}

// Create a card on page for each book in myLibrary array
function populateCardContainer() {
  myLibrary.forEach((book, index) => {
    createNewBookCard(book.title, book.author, book.pages, book.read, index);
  });
}

// Adds newly created book card to page
function addToCardContainer() {
  createNewBookCard(newBookTitle, newBookAuthor, newBookPages, newBookRead, myLibrary.length - 1);
}

// Remove the specified book from page and array
function removeFromCardContainer(targetToRemove) {
  console.log('clicked');
  const indexToRemove = Number(targetToRemove.dataset.index);
  targetToRemove.remove();
  myLibrary.splice(indexToRemove, 1);

  updateCardDataset();
}


// Toggle the read or unread status of specified book
function toggleReadButton(targetParent, targetButton) {
  const parentDataIndex = Number(targetParent.dataset.index);
  if (myLibrary[parentDataIndex].read === READ) {
    myLibrary[parentDataIndex].read = UNREAD;
    targetButton.textContent = UNREAD;
    targetButton.classList.remove('read');
  } else {
    myLibrary[parentDataIndex].read = READ;
    targetButton.textContent = READ;
    targetButton.classList.add('read');
  }
}


// When removing book card, index of myLibrary array changes
// This updates dataset attribute of cards to match array index again
function updateCardDataset() {
  const existingCards = document.querySelectorAll('.book-card');

  existingCards.forEach(card => {
    const currentTitle = card.querySelector('.book-title').textContent;
    const currentAuthor = card.querySelector('.book-author').textContent;

    myLibrary.forEach((book, index) => {
      if ((book.title === currentTitle) && (book.author === currentAuthor)) {
        card.dataset.index = index;
      }
    });
  });
}


// Handle creation of DOM elements for book card on page
function createNewBookCard(title, author, pages, read, index) {
  const newCard = document.createElement('div');
  const newCover = document.createElement('div');
  const newTitle = document.createElement('div');
  const newAuthor = document.createElement('div');
  const newPages = document.createElement('div');
  const newCardBtnDiv = document.createElement('div');
  const newReadStatusBtn = document.createElement('button');
  const newRemoveBookBtn = document.createElement('button');

  newCard.classList.add('book-card');
  newCard.dataset.index = index;

  newCover.classList.add('book-cover');

  newTitle.classList.add('book-title');
  newTitle.textContent = title;

  newAuthor.classList.add('book-author');
  newAuthor.textContent = author;

  newPages.classList.add('book-pages');
  newPages.textContent = pages;

  newCardBtnDiv.classList.add('book-card-buttons');
  newReadStatusBtn.classList.add('book-read-status');
  newReadStatusBtn.textContent = UNREAD; // assume unread as default
  if (read === READ) {
    newReadStatusBtn.textContent = READ;
    newReadStatusBtn.classList.add('read')
  }
 
  newReadStatusBtn.addEventListener('click', (e) => {
    toggleReadButton(e.target.parentNode.parentNode, e.target);
  })


  newRemoveBookBtn.classList.add('remove-book');
  newRemoveBookBtn.textContent = 'remove';
  newRemoveBookBtn.addEventListener('click', (e) => {
    removeFromCardContainer(e.target.parentNode.parentNode);
  })

  bookCardContainer.appendChild(newCard);
  newCard.appendChild(newCover);
  newCard.appendChild(newTitle);
  newCard.appendChild(newAuthor);
  newCard.appendChild(newPages);
  newCard.appendChild(newCardBtnDiv);
  newCardBtnDiv.appendChild(newReadStatusBtn);
  newCardBtnDiv.appendChild(newRemoveBookBtn);
}

populateCardContainer();