"use strict";
// // Types
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Main Book Manager Class
class BookManager {
    constructor() {
        this.STORAGE_KEY = "books"; // It tells where all the books stored in localStorage
        this.API_URL = "https://jsonplaceholder.typicode.com/posts";
        this.allBooks = [];
        this.currentSearchTerm = "";
        this.currentGenreFilter = "";
        this.currentSortOption = "";
    }
    // Initialize books from both local storage and API
    initializeBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const localBooks = this.getLocalBooks();
                const apiBooks = yield this.fetchApiBooks();
                this.allBooks = [...localBooks, ...apiBooks];
                return this.filterAndSortBooks();
            }
            catch (error) {
                console.error("Error initializing books:", error);
                this.allBooks = this.getLocalBooks();
                return this.filterAndSortBooks();
            }
        });
    }
    // Book validation methods
    validateBook(book) {
        const errors = [];
        if (!book.title)
            errors.push("Title is required");
        if (!book.author)
            errors.push("Author is required");
        if (!book.isbn)
            errors.push("ISBN is required");
        if (!this.validateISBN(book.isbn || ""))
            errors.push("ISBN must contain only numeric characters");
        return errors;
    }
    validateISBN(isbn) {
        return /^\d+$/.test(isbn);
    }
    //It handles books stored locally in localStorage
    getLocalBooks() {
        const books = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
        return books.map((book) => (Object.assign(Object.assign({}, book), { isLocal: true })));
    }
    saveBooks(books) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books));
    }
    addBook(book) {
        const books = this.getLocalBooks();
        books.push(book);
        this.saveBooks(books);
        this.allBooks = [...books, ...this.allBooks.filter(b => !b.isLocal)];
    }
    updateBook(index, book) {
        const books = this.getLocalBooks();
        books[index] = Object.assign(Object.assign({}, book), { isLocal: true }); // Ensure isLocal is set
        this.saveBooks(books);
        this.allBooks = [...books, ...this.allBooks.filter(b => !b.isLocal)];
    }
    deleteBook(index) {
        const books = this.getLocalBooks();
        books.splice(index, 1);
        this.saveBooks(books);
        this.allBooks = [...books, ...this.allBooks.filter(b => !b.isLocal)];
    }
    // API methods
    fetchApiBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.API_URL);
                if (!response.ok)
                    throw new Error("Failed to fetch data from the server.");
                const apiBooks = yield response.json();
                return apiBooks.map((item) => ({
                    title: String(item.title || "Untitled"),
                    author: "Author",
                    isbn: "12",
                    pubDate: "2025-01-01",
                    genre: "API Genre",
                    price: 20.0,
                    purchaseLink: "https://www.amazon.in/s?k=books",
                    bookType: "EBook",
                    isLocal: false
                }));
            }
            catch (error) {
                console.error("Error fetching books from server:", error);
                return [];
            }
        });
    }
    // Book age calculation
    calculateBookAge(pubDate) {
        const publicationDate = new Date(pubDate);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - publicationDate.getFullYear();
        return age > 0 ? `${age} year(s)` : "Less than a year";
    }
    // Filter and sort methods
    setSearchTerm(term) {
        this.currentSearchTerm = term;
    }
    setGenreFilter(filter) {
        this.currentGenreFilter = filter;
    }
    setSortOption(option) {
        this.currentSortOption = option;
    }
    resetFilters() {
        this.currentSearchTerm = "";
        this.currentGenreFilter = "";
        this.currentSortOption = "";
    }
    filterAndSortBooks() {
        let filtered = this.filterBooks();
        return this.sortBooks(filtered);
    }
    filterBooks() {
        return this.allBooks.filter(book => {
            const searchMatch = this.matchesSearchTerm(book);
            const genreMatch = this.matchesGenre(book);
            return searchMatch && genreMatch;
        });
    }
    matchesSearchTerm(book) {
        if (!this.currentSearchTerm)
            return true;
        const searchLower = this.currentSearchTerm.toLowerCase();
        return (String(book.title || "").toLowerCase().includes(searchLower) ||
            String(book.author || "").toLowerCase().includes(searchLower) ||
            String(book.genre || "").toLowerCase().includes(searchLower));
    }
    matchesGenre(book) {
        if (!this.currentGenreFilter)
            return true;
        const bookGenre = String(book.genre || "").toLowerCase();
        const filter = this.currentGenreFilter.toLowerCase();
        switch (filter) {
            case "fiction":
                return bookGenre === "fiction" ||
                    bookGenre.includes("novel") ||
                    bookGenre.includes("fiction");
            case "non-fiction":
                return bookGenre === "non-fiction" ||
                    bookGenre.includes("non-fiction") ||
                    bookGenre.includes("nonfiction") ||
                    bookGenre.includes("biography") ||
                    bookGenre.includes("history") ||
                    bookGenre.includes("science");
            default:
                return true;
        }
    }
    sortBooks(books) {
        if (!this.currentSortOption)
            return books;
        return [...books].sort((a, b) => {
            const titleA = String(a.title || "").toLowerCase();
            const titleB = String(b.title || "").toLowerCase();
            return this.currentSortOption === "asc"
                ? titleA.localeCompare(titleB)
                : titleB.localeCompare(titleA);
        });
    }
}
// Book Renderer Class
class BookRenderer {
    constructor(bookListElement) {
        this.bookManager = new BookManager(); // Create an instance of the bookmanager class to handle data-related operations
        this.bookList = bookListElement; // it stores the html element where the book list will be rendered 
        this.initializeEventListeners(); // sets up event handlers
        this.initializeBooks(); // loads and render the initial list of books
    }
    initializeBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield this.bookManager.initializeBooks();
            this.renderBooks(books);
        });
    }
    renderBooks(books) {
        this.bookList.innerHTML = "";
        if (books.length === 0) {
            this.bookList.innerHTML = "<tr><td colspan='8'>No books found.</td></tr>";
            return;
        }
        books.forEach((book, index) => this.renderBookRow(book, index));
    }
    renderBookRow(book, index) {
        const bookAge = this.bookManager.calculateBookAge(book.pubDate);
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
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                    <button class="details-btn" data-index="${index}">Details</button>
                </div>
            </td>
        `;
        this.bookList.appendChild(row);
    }
    // Form handling methods
    handleFormSubmit(e) {
        e.preventDefault();
        const formData = this.getFormData();
        const errors = this.bookManager.validateBook(formData);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }
        const editIndex = document.getElementById("edit-index").value;
        if (editIndex !== "") {
            this.bookManager.updateBook(parseInt(editIndex), formData);
        }
        else {
            this.bookManager.addBook(formData);
        }
        alert("Book saved successfully!");
        window.location.href = "index.html";
    }
    prefillForm() {
        const editData = JSON.parse(localStorage.getItem("editBook") || "{}");
        if (!editData.book)
            return;
        const { book, index } = editData;
        Object.entries(book).forEach(([key, value]) => {
            const element = document.getElementById(key);
            if (element)
                element.value = value;
        });
        document.getElementById("edit-index").value = index;
        localStorage.removeItem("editBook");
    }
    getFormData() {
        return {
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            isbn: document.getElementById("isbn").value,
            pubDate: document.getElementById("pub-date").value,
            genre: document.getElementById("genre").value,
            price: parseFloat(document.getElementById("price").value),
            purchaseLink: document.getElementById("purchase-link").value,
            bookType: document.getElementById("book-type").value
        };
    }
    initializeEventListeners() {
        var _a, _b, _c, _d, _e, _f;
        // Search
        const searchBar = document.getElementById("search-bar");
        searchBar === null || searchBar === void 0 ? void 0 : searchBar.addEventListener("input", (e) => {
            this.bookManager.setSearchTerm(e.target.value);
            this.initializeBooks();
        });
        (_a = document.getElementById("book-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (e) => this.handleFormSubmit(e));
        // Filters
        (_b = document.getElementById("filter-fiction")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            this.bookManager.setGenreFilter("fiction");
            this.initializeBooks();
        });
        (_c = document.getElementById("filter-non-fiction")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            this.bookManager.setGenreFilter("non-fiction");
            this.initializeBooks();
        });
        (_d = document.getElementById("clear-filters")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
            this.bookManager.resetFilters();
            if (searchBar)
                searchBar.value = "";
            this.initializeBooks();
        });
        // Sorting
        (_e = document.getElementById("sort-asc")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
            this.bookManager.setSortOption("asc");
            this.initializeBooks();
        });
        (_f = document.getElementById("sort-desc")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
            this.bookManager.setSortOption("desc");
            this.initializeBooks();
        });
        // Book actions
        document.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
            const target = e.target;
            if (!target.dataset.index)
                return;
            const index = parseInt(target.dataset.index);
            if (target.classList.contains("edit-btn"))
                this.handleEdit(index);
            if (target.classList.contains("delete-btn"))
                this.handleDelete(index);
            if (target.classList.contains("details-btn"))
                this.handleDetails(index);
        }));
    }
    saveBooks() {
        throw new Error("Method not implemented.");
    }
    handleEdit(index) {
        const books = this.bookManager.getLocalBooks();
        localStorage.setItem("editBook", JSON.stringify({ book: books[index], index }));
        window.location.href = "add-book.html";
    }
    handleDelete(index) {
        return __awaiter(this, void 0, void 0, function* () {
            this.bookManager.deleteBook(index);
            yield this.initializeBooks();
        });
    }
    handleDetails(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield this.bookManager.initializeBooks();
            const book = books[index];
            const bookAge = this.bookManager.calculateBookAge(book.pubDate);
            alert(`
            Title: ${book.title}
            Author: ${book.author}
            ISBN: ${book.isbn || "N/A"}
            Publication Date: ${book.pubDate || "N/A"}
            Age: ${bookAge}
            Genre: ${book.genre || "N/A"}
            Book Type: ${book.bookType || "N/A"}
            Price: ${book.price ? `$${book.price}` : "N/A"}
            Purchase Link: ${book.purchaseLink}
        `);
        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const bookList = document.getElementById("book-list");
    const bookForm = document.getElementById("book-form");
    if (bookList) {
        const bookRenderer = new BookRenderer(bookList);
    }
    if (bookForm) {
        const bookRenderer = new BookRenderer(document.createElement('tbody'));
        bookRenderer.prefillForm();
        bookForm.addEventListener("submit", (e) => bookRenderer.handleFormSubmit(e));
    }
});
