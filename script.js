// Load books from localStorage and simulated server
// Load books from localStorage and simulated server
async function loadBooks(filter = "", sortOption = "") {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    try {
        // Simulate server request with a Promise
        const books = await fetchBooks();

        // Filter books based on search criteria
        let filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(filter.toLowerCase()) ||
            book.author.toLowerCase().includes(filter.toLowerCase()) ||
            book.genre.toLowerCase().includes(filter.toLowerCase())
        );

        // Apply sorting logic
        if (sortOption === "asc") {
            filteredBooks.sort((a, b) => 
                a.title.toLowerCase().localeCompare(b.title.toLowerCase())
            );
        } else if (sortOption === "desc") {
            filteredBooks.sort((a, b) => 
                b.title.toLowerCase().localeCompare(a.title.toLowerCase())
            );
        }

        // Display the books or show a "no books found" message
        if (filteredBooks.length === 0) {
            bookList.innerHTML = "<tr><td colspan='6'>No books found.</td></tr>";
        } else {
            filteredBooks.forEach((book, index) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn || "N/A"}</td>
                    <td>${book.pubDate || "N/A"}</td>
                    <td>${book.genre || "N/A"}</td>
                    <td>
                        <div class="button-container">
                            <button class="edit-btn" onclick="editBook(${index})">Edit</button>
                            <button class="delete-btn" onclick="deleteBook(${index})">Delete</button>
                            <button class="details-btn" onclick="showBookDetails(${index})">Details</button>
                        </div>
                    </td>
                `;

                bookList.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Error fetching books:", error);
        bookList.innerHTML = "<tr><td colspan='6'>Failed to load books. Please try again later.</td></tr>";
    }
}

// Simulate fetching books from a server
async function fetchBooks() {
    const localBooks = JSON.parse(localStorage.getItem("books")) || [];
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?author='Srivastava'");
        if (!response.ok) throw new Error("Failed to fetch data from the server.");

        const apiBooks =  response.json();

        return [
            ...localBooks,
            ...apiBooks.map(item => ({
                title: item.title,
                author: "API Author",
                isbn: 12,
                pubDate: "01-01-25",
                genre: "API Genre",
            })),
        ];
    } catch (error) {
        console.error("Error fetching books from server:", error);
        return localBooks; // Fallback to local books if the server request fails
    }
}

// Add or update a book in localStorage
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

// Show detailed book information
function showBookDetails(index) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const book = books[index];

    if (book) {
        alert(`Title: ${book.title}\nAuthor: ${book.author}\nISBN: ${book.isbn || "N/A"}\nPublication Date: ${book.pubDate || "N/A"}\nGenre: ${book.genre || "N/A"}`);
    } else {
        alert("Book details not found.");
    }
}

// Add event listeners for ISBN validation
document.getElementById("isbn")?.addEventListener("blur", validateISBN);
document.getElementById("isbn")?.addEventListener("input", validateISBN);

// Pre-fill form for editing
document.addEventListener("DOMContentLoaded", () => {
    const editData = JSON.parse(localStorage.getItem("editBook"));

    if (editData) {
        const { book, index } = editData;

        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("isbn").value = book.isbn;
        document.getElementById("pub-date").value = book.pubDate;
        document.getElementById("genre").value = book.genre;
        document.getElementById("edit-index").value = index;

        // Clear the stored data to avoid incorrect editing later
        localStorage.removeItem("editBook");
    }
});

// Search books
document.getElementById("search-bar")?.addEventListener("input", function (e) {
    const filter = e.target.value;
    loadBooks(filter);
});

// Filter books by genre
document.getElementById("filter-fiction")?.addEventListener("click", () => {
    loadBooks("Fiction");
});

document.getElementById("filter-non-fiction")?.addEventListener("click", () => {
    loadBooks("Non-Fiction");
});

// Clear all filters
document.getElementById("clear-filters")?.addEventListener("click", () => {
    document.getElementById("search-bar").value = "";
    loadBooks(); // Clear both genre and search filters
});

// Add sorting event listeners
document.getElementById("sort-asc")?.addEventListener("click", () => loadBooks("", "asc"));
document.getElementById("sort-desc")?.addEventListener("click", () => loadBooks("", "desc"));


// Load books on page load
if (window.location.pathname.includes("index.html")) {
    document.addEventListener("DOMContentLoaded", () => loadBooks());
}