const books = [];
const STORAGE_KEY = "BOOK_APPS";

document.addEventListener("DOMContentLoaded", function () {
  loadDataFromStorage();
  const editForm = document.getElementById("editForm");

  // Get the book ID from the query parameter (e.g., ?id=123)
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("id");

  // Find the book with the given ID in the books array
  const bookToEdit = books.find((book) => book.id == bookId);
  //   console.log(books);
  //   console.log(bookId);
  //   console.log(bookToEdit);

  // Populate the form input fields with the current book details
  document.getElementById("title").value = bookToEdit.title;
  document.getElementById("author").value = bookToEdit.author;
  document.getElementById("year").value = bookToEdit.year;
  document.getElementById("cover").value = bookToEdit.cover;
  document.getElementById("read").checked = bookToEdit.isCompleted;

  const submitForm = document.getElementById("editForm");
  // Add an event listener to save the edited book
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Get the edited book details from the form
    const editedTitle = document.getElementById("title").value;
    const editedAuthor = document.getElementById("author").value;
    const editedYear = document.getElementById("year").value;
    const editedCover = document.getElementById("cover").value;
    const editedRead = document.getElementById("read").checked;

    // Update the book's details in the books array and local storage
    const index = books.findIndex((book) => book.id == bookId);
    if (index !== -1) {
      books[index].title = editedTitle;
      books[index].author = editedAuthor;
      books[index].year = editedYear;
      books[index].cover = editedCover;
      books[index].isCompleted = editedRead;

      // Update local storage
      saveData();

      // Redirect back to the book list page
      window.location.href = "books.html";
    }
  });
});

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
