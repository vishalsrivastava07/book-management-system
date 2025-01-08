class BookManager {
    constructor() {
        this.bookList = document.getElementById("book-list");
        this.init();
    }

    async loadBooks(filter = "", sortOption = "") {
        this.bookList.innerHTML = "";

        try {
            const books = await this.fetchBooks();

            let filteredBooks = books.filter(book =>
                book.title.toLowerCase().includes(filter.toLowerCase()) ||
                book.author.toLowerCase().includes(filter.toLowerCase()) ||
                book.genre.toLowerCase().includes(filter.toLowerCase())
            );

            if (sortOption === "asc") {
                filteredBooks.sort((a, b) =>
                    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                );
            } else if (sortOption === "desc") {
                filteredBooks.sort((a, b) =>
                    b.title.toLowerCase().localeCompare(a.title.toLowerCase())
                );
            }

            if (filteredBooks.length === 0) {
                this.bookList.innerHTML = "<tr><td colspan='7'>No books found.</td></tr>";
            } else {
                filteredBooks.forEach((book, index) => this.createBookRow(book, index));
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            this.bookList.innerHTML = "<tr><td colspan='7'>Failed to load books. Please try again later.</td></tr>";
        }
    }

    async fetchBooks() {
        const localBooks = JSON.parse(localStorage.getItem("books")) || [];
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // Removed the query part
            if (!response.ok) throw new Error("Failed to fetch data from the server.");
    
            // Ensure the response is in JSON format
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server returned non-JSON data");
            }
    
            const apiBooks = await response.json();
    
            return [
                ...localBooks,
                ...apiBooks.map(item => ({
                    title: item.title,
                    author: "API Author",
                    isbn: 12,
                    pubDate: "01-01-25",
                    genre: "API Genre",
                    purchaseLink: "https://example.com", // Mock Purchase Link
                    bookType: "EBook", // Mock Book Type
                })),
            ];
        } catch (error) {
            console.error("Error fetching books from server:", error);
            return localBooks; // Fallback to local books if the server request fails
        }
    }

    createBookRow(book, index) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn || "N/A"}</td>
            <td>${book.pubDate || "N/A"}</td>
            <td>${book.genre || "N/A"}</td>
            <td>${book.bookType || "N/A"}</td> <!-- New Column for Book Type -->
            <td><a href="${book.purchaseLink}" target="_blank">Purchase</a></td> <!-- New Column for Purchase Link -->
            <td>
                <div class="button-container">
                    <button class="edit-btn" onclick="bookManager.editBook(${index})">Edit</button>
                    <button class="delete-btn" onclick="bookManager.deleteBook(${index})">Delete</button>
                    <button class="details-btn" onclick="bookManager.showBookDetails(${index})">Details</button>
                </div>
            </td>
        `;

        this.bookList.appendChild(row);
    }

    async editBook(index) {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        const book = books[index];

        localStorage.setItem("editBook", JSON.stringify({ book, index }));
        window.location.href = "add-book.html";
    }

    async deleteBook(index) {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        this.loadBooks();
    }

    showBookDetails(index) {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        const book = books[index];

        if (book) {
            alert(`Title: ${book.title}\nAuthor: ${book.author}\nISBN: ${book.isbn || "N/A"}\nPublication Date: ${book.pubDate || "N/A"}\nGenre: ${book.genre || "N/A"}\nBook Type: ${book.bookType || "N/A"}\nPurchase Link: ${book.purchaseLink}`);
        } else {
            alert("Book details not found.");
        }
    }

    validateISBN() {
        const isbnField = document.getElementById("isbn");
        const isbnValue = isbnField.value;

        if (!/^\d*$/.test(isbnValue)) {
            isbnField.setCustomValidity("ISBN must contain only numeric characters.");
            isbnField.reportValidity();
        } else {
            isbnField.setCustomValidity("");
        }
    }

    saveBook(e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const isbn = document.getElementById("isbn").value;
        const pubDate = document.getElementById("pub-date").value;
        const genre = document.getElementById("genre").value;
        const purchaseLink = document.getElementById("purchase-link").value;
        const bookType = document.getElementById("book-type").value;

        const books = JSON.parse(localStorage.getItem("books")) || [];
        const editIndex = document.getElementById("edit-index").value;

        if (editIndex !== "") {
            books[editIndex] = { title, author, isbn, pubDate, genre, purchaseLink, bookType };
        } else {
            books.push({ title, author, isbn, pubDate, genre, purchaseLink, bookType });
        }

        localStorage.setItem("books", JSON.stringify(books));
        alert("Book saved successfully!");
        window.location.href = "index.html";
    }

    init() {
        document.getElementById("book-form")?.addEventListener("submit", (e) => this.saveBook(e));
        document.getElementById("isbn")?.addEventListener("blur", () => this.validateISBN());
        document.getElementById("isbn")?.addEventListener("input", () => this.validateISBN());

        document.getElementById("search-bar")?.addEventListener("input", (e) => this.loadBooks(e.target.value));
        document.getElementById("filter-fiction")?.addEventListener("click", () => this.loadBooks("Fiction"));
        document.getElementById("filter-non-fiction")?.addEventListener("click", () => this.loadBooks("Non-Fiction"));
        document.getElementById("clear-filters")?.addEventListener("click", () => {
            document.getElementById("search-bar").value = "";
            this.loadBooks();
        });
        document.getElementById("sort-asc")?.addEventListener("click", () => this.loadBooks("", "asc"));
        document.getElementById("sort-desc")?.addEventListener("click", () => this.loadBooks("", "desc"));

        if (window.location.pathname.includes("index.html")) {
            document.addEventListener("DOMContentLoaded", () => this.loadBooks());
        }

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
                document.getElementById("purchase-link").value = book.purchaseLink;
                document.getElementById("book-type").value = book.bookType;
                document.getElementById("edit-index").value = index;

                localStorage.removeItem("editBook");
            }
        });
    }
}

const bookManager = new BookManager();
