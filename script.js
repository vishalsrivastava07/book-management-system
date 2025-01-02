// Load books from localStorage
function loadBooks() {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    books.forEach((book, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>${book.pubDate}</td>
            <td>${book.genre}</td>
            <td>
                <button class="edit-btn" onclick="editBook(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteBook(${index})">Delete</button>
            </td>
        `;

        bookList.appendChild(row);
    });
}

// Validation for ISBN: Only numeric input is allowed
function validateISBN() {
    const isbnField = document.getElementById("isbn");
    const isbnValue = isbnField.value;

    // Check if the ISBN contains only numeric characters
    if (!/^\d*$/.test(isbnValue)) {
        isbnField.setCustomValidity("ISBN must contain only numeric characters.");
        isbnField.reportValidity(); // Display the validation message
    } else {
        isbnField.setCustomValidity(""); // Clear the validation message
    }
}

// Add event listeners for ISBN validation
document.getElementById("isbn")?.addEventListener("blur", validateISBN);
document.getElementById("isbn")?.addEventListener("input", validateISBN);


// Add book to localStorage
document.getElementById("book-form")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
    const pubDate = document.getElementById("pub-date").value;
    const genre = document.getElementById("genre").value;

    const books = JSON.parse(localStorage.getItem("books")) || [];
    const editIndex = document.getElementById("edit-index").value;

    if (editIndex !== "") {
        books[editIndex] = { title, author, isbn, pubDate, genre };
        document.getElementById("edit-index").value = "";
    } else {
        books.push({ title, author, isbn, pubDate, genre });
    }

    localStorage.setItem("books", JSON.stringify(books));

    alert("Book saved successfully!");
    window.location.href = "index.html";
});

// Delete book from localStorage
function deleteBook(index) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    loadBooks();
}

// Edit book
function editBook(index) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const book = books[index];

    // Store the book data and index in localStorage
    localStorage.setItem("editBook", JSON.stringify({ book, index }));

    // Redirect to the add-book.html page
    window.location.href = "add-book.html";
}

// Pre fills the data from previous DOM
document.addEventListener("DOMContentLoaded", () => {
    const editData = JSON.parse(localStorage.getItem("editBook"));

    if (editData) {
        const { book, index } = editData;

        // Pre-fill the form fields
        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("isbn").value = book.isbn;
        document.getElementById("pub-date").value = book.pubDate;
        document.getElementById("genre").value = book.genre;

        // Set the hidden edit-index field
        document.getElementById("edit-index").value = index;

        // Clear edit data from localStorage after use
        localStorage.removeItem("editBook");
    }
});

// Load books on page load
if (window.location.pathname.includes("index.html")) {
    document.addEventListener("DOMContentLoaded", loadBooks);
}
