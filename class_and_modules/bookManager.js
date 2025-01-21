"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookManager = void 0;
const baseManager_1 = require("./baseManager");
class BookManager extends baseManager_1.BaseManager {
    bookList;
    searchBar;
    filterFiction;
    filterNonFiction;
    clearFiltersBtn;
    sortAscBtn;
    sortDescBtn;
    constructor() {
        super();
        this.bookList = document.getElementById("book-list");
        this.searchBar = document.getElementById("search-bar");
        this.filterFiction = document.getElementById("filter-fiction");
        this.filterNonFiction = document.getElementById("filter-non-fiction");
        this.clearFiltersBtn = document.getElementById("clear-filters");
        this.sortAscBtn = document.getElementById("sort-asc");
        this.sortDescBtn = document.getElementById("sort-desc");
    }
    async loadBooks(filter = "", sortOption = "", genreFilter = "") {
        if (!this.bookList)
            return;
        this.bookList.innerHTML = ""; // Clear the list first
        try {
            const books = await this.fetchBooks();
            let filteredBooks = books.filter(book => ((book.title?.toLowerCase().includes(filter.toLowerCase()) ?? false) ||
                (book.author?.name?.toLowerCase().includes(filter.toLowerCase()) ?? false) ||
                (book.genre?.name?.toLowerCase().includes(filter.toLowerCase()) ?? false)) &&
                (genreFilter === "" || book.genre?.name?.toLowerCase() === genreFilter.toLowerCase()));
            if (sortOption === "asc") {
                filteredBooks.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
            }
            else if (sortOption === "desc") {
                filteredBooks.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
            }
            if (filteredBooks.length === 0) {
                this.bookList.innerHTML = "<tr><td colspan='8'>No books found.</td></tr>";
            }
            else {
                filteredBooks.forEach((book, index) => this.createBookRow(book, index));
            }
        }
        catch (error) {
            console.error("Error fetching books:", error);
            this.bookList.innerHTML = "<tr><td colspan='8'>Failed to load books. Please try again later.</td></tr>";
        }
    }
    createBookRow(book, index) {
        const bookAge = this.calculateBookAge(book.pubDate);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn || "N/A"}</td>
            <td>${book.pubDate || "N/A"}</td>
            <td>${book.genre || "N/A"}</td>
            <td>${book.bookType || "N/A"}</td>
            <td>${book.price ? `$${book.price}` : "N/A"}</td>
            <td>${bookAge}</td>
            <td><a href="${book.purchaseLink}" target="_blank">Purchase</a></td>
            <td>
                <div class="button-container">
                    <button class="edit-btn" onclick="bookManager.editBook(${index})">Edit</button>
                    <button class="delete-btn" onclick="bookManager.deleteBook(${index})">Delete</button>
                    <button class="details-btn" onclick="bookManager.showBookDetails(${index})">Details</button>
                </div>
            </td>
        `;
        this.bookList?.appendChild(row);
    }
    editBook(index) {
        const books = JSON.parse(localStorage.getItem("books") || "[]");
        const book = books[index];
        localStorage.setItem("editBook", JSON.stringify({ book, index }));
        window.location.href = "add-book.html";
    }
    validateISBN = (isbn) => {
        return /^\d+$/.test(isbn);
    };
    static prefillForm() {
        const editData = JSON.parse(localStorage.getItem("editBook") || "{}");
        if (editData) {
            const { book, index } = editData;
            document.getElementById("title").value = book.title;
            document.getElementById("author").value = book.author;
            document.getElementById("isbn").value = book.isbn;
            document.getElementById("pub-date").value = book.pubDate;
            document.getElementById("genre").value = book.genre;
            document.getElementById("price").value = book.price || "";
            document.getElementById("edit-index").value = index;
            localStorage.removeItem("editBook");
        }
    }
    async deleteBook(index) {
        const books = JSON.parse(localStorage.getItem("books") || "[]");
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        this.loadBooks();
    }
    showBookDetails(index) {
        const books = JSON.parse(localStorage.getItem("books") || "[]");
        const book = books[index];
        const bookAge = this.calculateBookAge(book.pubDate);
        if (book) {
            alert(`Title: ${book.title}
                Author: ${book.author}
                ISBN: ${book.isbn || "N/A"}
                Publication Date: ${book.pubDate || "N/A"}
                Age: ${bookAge}
                Genre: ${book.genre || "N/A"}
                Book Type: ${book.bookType || "N/A"}
                Price: ${book.price ? `$${book.price}` : "N/A"}
                Purchase Link: ${book.purchaseLink}`);
        }
        else {
            alert("Book details not found.");
        }
    }
    saveBook(e) {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const isbn = document.getElementById("isbn").value;
        const pubDate = document.getElementById("pub-date").value;
        const genre = document.getElementById("genre").value;
        const price = document.getElementById("price").value;
        const purchaseLink = document.getElementById("purchase-link").value;
        const bookType = document.getElementById("book-type").value;
        if (!this.validateISBN(isbn)) {
            alert("ISBN must contain only numeric characters.");
            return;
        }
        const books = JSON.parse(localStorage.getItem("books") || "[]");
        const editIndex = document.getElementById("edit-index").value;
        if (editIndex !== "") {
            books[editIndex] = { title, author, isbn, pubDate, genre, price, purchaseLink, bookType };
        }
        else {
            books.push({ title, author, isbn, pubDate, genre, price, purchaseLink, bookType });
        }
        localStorage.setItem("books", JSON.stringify(books));
        alert("Book saved successfully!");
        window.location.href = "index.html";
    }
    init() {
        document.getElementById("book-form")?.addEventListener("submit", (e) => this.saveBook(e));
        this.searchBar?.addEventListener("input", (e) => {
            this.loadBooks(e.target.value);
        });
        this.filterFiction?.addEventListener("click", () => this.loadBooks(this.searchBar.value, "", "fiction"));
        this.filterNonFiction?.addEventListener("click", () => this.loadBooks(this.searchBar.value, "", "non-fiction"));
        this.clearFiltersBtn?.addEventListener("click", () => {
            this.searchBar.value = "";
            this.loadBooks();
        });
        this.sortAscBtn?.addEventListener("click", () => this.loadBooks(this.searchBar.value, "asc"));
        this.sortDescBtn?.addEventListener("click", () => this.loadBooks(this.searchBar.value, "desc"));
        this.loadBooks();
    }
}
exports.BookManager = BookManager;
