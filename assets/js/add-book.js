// add-book.js

const books = [];
const STORAGE_KEY = "BOOK_APPS";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
    window.location.replace("books.html");
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = parseInt(document.getElementById("year").value, 10);
  const cover = document.getElementById("cover").value;
  const isComplete = document.getElementById("read").checked;

  const generatedID = generateId();
  const bookObject = generateBookObject(
    generatedID,
    title,
    author,
    year,
    cover,
    isComplete
  );

  books.push(bookObject);
  saveData();
}

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, cover, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    cover,
    isCompleted,
  };
}

function isStorageExist() {
  return typeof Storage !== "undefined";
}

function saveData() {
  if (isStorageExist()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  if (serializedData) {
    books.push(...JSON.parse(serializedData));
  }
}
