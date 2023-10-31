// display-books.js

const RENDER_EVENT = "render-book";

document.addEventListener("DOMContentLoaded", function () {
  if (isStorageExist()) {
    loadDataFromStorage();
  }
  renderBookList();
});

document.addEventListener(RENDER_EVENT, function () {
  renderBookList();
});

function renderBookList() {
  const unfinishedBook = document.getElementById("unfinished");
  unfinishedBook.innerHTML = ""; // Clear the container
  const finishedBook = document.getElementById("finished");
  finishedBook.innerHTML = ""; // Clear the container

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted) unfinishedBook.append(bookElement);
    else finishedBook.append(bookElement);
  }
  console.log("Rendering books");
}

function makeBook(bookObject) {
  // Create the main container div
  const unfinishedContentDiv = document.createElement("div");
  unfinishedContentDiv.className = "unfinished-content";

  // Create the image div
  const imageDiv = document.createElement("div");
  imageDiv.className = "unfinished-image";

  // Create the image element
  const image = document.createElement("img");
  image.src = bookObject.cover; // Use the cover from the bookObject
  image.alt = "";

  // Append the image to the image div
  imageDiv.appendChild(image);

  // Create a container for the buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  // Create the edit and delete buttons
  const readButton = document.createElement("button");
  if (bookObject.isCompleted) {
    readButton.textContent = "Unread";
  } else {
    readButton.textContent = "Read";
  }
  readButton.className = "read-button";

  // Add a click event listener to toggle the completed status and update storage
  readButton.addEventListener("click", function () {
    if (bookObject.isCompleted) {
      bookObject.isCompleted = false; // Change from "Read" to "Unread"
    } else {
      bookObject.isCompleted = true; // Change from "Unread" to "Read"
    }

    // Save the updated data to localStorage
    saveData();
    renderBookList();
  });

  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit';
  editButton.className = "edit-button";

  editButton.addEventListener("click", function () {
    window.location.href = "editbooks.html?id=" + bookObject.id;
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i> Delete';
  deleteButton.className = "delete-button";

  // Add an event listener to delete the book
  deleteButton.addEventListener("click", function () {
    const deleteDialog = document.getElementById("id01");
    const confirmDelete = document.getElementById("confirmDelete");
    const cancelDelete = document.getElementById("cancelDelete");

    // Show the delete dialog
    deleteDialog.style.display = "block";

    // Add an event listener to the confirm delete button
    confirmDelete.addEventListener("click", function () {
      // Find the index of the book to be deleted
      const index = books.findIndex((book) => book.id === bookObject.id);
      if (index !== -1) {
        books.splice(index, 1); // Remove the book from the array
        saveData(); // Update the local storage
        renderBookList(); // Refresh the book list
        deleteDialog.style.display = "none"; // Hide the dialog
      }
    });

    // Add an event listener to the cancel delete button
    cancelDelete.addEventListener("click", function () {
      deleteDialog.style.display = "none"; // Hide the dialog
    });
  });

  // Append the buttons to the button container
  buttonContainer.appendChild(readButton);
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  // Create the description div
  const descDiv = document.createElement("div");
  descDiv.className = "unfinished-desc";

  // Create the title (h1) element
  const title = document.createElement("h1");
  title.className = "title";
  title.textContent = bookObject.title; // Use the title from the bookObject

  // Create author and year (p) elements
  const author = document.createElement("p");
  author.textContent = bookObject.author; // Use the author from the bookObject

  const year = document.createElement("p");
  year.textContent = bookObject.year; // Use the year from the bookObject

  // Append the title, author, and year to the description div
  descDiv.appendChild(title);
  descDiv.appendChild(author);
  descDiv.appendChild(year);

  // Append the image div and description div to the main container div
  unfinishedContentDiv.appendChild(imageDiv);
  unfinishedContentDiv.appendChild(buttonContainer);
  unfinishedContentDiv.appendChild(descDiv);

  return unfinishedContentDiv;
}

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  filterBooks(searchInput.value.toLowerCase());
});

function filterBooks(query) {
  const filteredBooks = books.filter((book) => {
    // Match the query against book attributes (e.g., title, author)
    const titleMatch = book.title.toLowerCase().includes(query);
    const authorMatch = book.author.toLowerCase().includes(query);

    return titleMatch || authorMatch;
  });

  // Clear the existing book list
  const unfinishedBook = document.getElementById("unfinished");
  unfinishedBook.innerHTML = "";

  const finishedBook = document.getElementById("finished");
  finishedBook.innerHTML = ""; // Clear the container

  // Render the filtered books
  for (const bookItem of filteredBooks) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted) unfinishedBook.append(bookElement);
    else finishedBook.append(bookElement);
  }
}
