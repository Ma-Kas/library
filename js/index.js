const addBookButton = document.querySelector('#add-book');

const bookCardContainer = document.querySelector('.book-card-container');

const toggleReadButtons = document.querySelectorAll('.book-read-status');
const removeBookButtons = document.querySelectorAll('.remove-book');

const modalContainer = document.querySelector('#modal-container');
const readCheckbox = document.querySelector('#read');
const submitButton = document.querySelector('#submit');
const cancelButton = document.querySelector('#cancel');

let myLibrary = [];

let newBookTitle = '';
let newBookAuthor = '';
let newBookPages = '';
let newBookRead = '';


addBookButton.addEventListener('click', (e) => {
  modalContainer.style.visibility = 'visible';
});

modalContainer.addEventListener('submit', (e) => {
  newBookTitle = modalContainer.elements["title"].value;
  newBookAuthor = modalContainer.elements["author"].value;
  newBookPages = `${modalContainer.elements["pages"].value} pages`;
  if (modalContainer.elements["read"].checked) {
    newBookRead = 'read';
  } else {
    newBookRead = 'unread';
  }

  addBookToLibrary();
  createNewBookCard(newBookTitle, newBookAuthor, newBookPages, newBookRead);
  modalContainer.style.visibility = 'hidden';
  e.preventDefault();

  modalContainer.reset();
});

cancelButton.addEventListener('click', (e) => {
  modalContainer.style.visibility = 'hidden';
  e.preventDefault();

  modalContainer.reset();
});


function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
}

Book.prototype.fuckOff = function() {
  console.log('Fuck off');
}


function addBookToLibrary() {
  const book = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead)
  myLibrary.push(book);
}

function camelCase(str) {
  // converting all characters to lowercase
  let ans = str.toLowerCase();

  // Returning string to camelcase
  return ans.split(" ").reduce((s, c) => s
      + (c.charAt(0).toUpperCase() + c.slice(1)));
}


function populateCardContainer() {
  myLibrary.forEach(book => {
    createNewBookCard(book.title, book.author, book.pages, book.read);
  });
}


function createNewBookCard(title, author, pages, read) {
  const newCard = document.createElement('div');
  const newCover = document.createElement('div');
  const newTitle = document.createElement('div');
  const newAuthor = document.createElement('div');
  const newPages = document.createElement('div');
  const newCardBtnDiv = document.createElement('div');
  const newReadStatusBtn = document.createElement('button');
  const newRemoveBookBtn = document.createElement('button');

  newCard.classList.add('book-card');

  newCover.classList.add('book-cover');

  newTitle.classList.add('book-title');
  newTitle.textContent = title;

  newAuthor.classList.add('book-author');
  newAuthor.textContent = author;

  newPages.classList.add('book-pages');
  newPages.textContent = pages;

  newCardBtnDiv.classList.add('book-card-buttons');
  newReadStatusBtn.classList.add('book-read-status');

  newReadStatusBtn.textContent = read;
  newRemoveBookBtn.classList.add('remove-book');
  newRemoveBookBtn.textContent = 'remove';

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