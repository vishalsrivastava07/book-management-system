"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookManager = void 0;
const baseManager_1 = require("./baseManager");
class BookManager extends baseManager_1.BaseManager {
    constructor() {
        super();
        this.validateISBN = (isbn) => {
            return /^\d+$/.test(isbn);
        };
        this.bookList = document.getElementById("book-list");
        this.searchBar = document.getElementById("search-bar");
        this.filterFiction = document.getElementById("filter-fiction");
        this.filterNonFiction = document.getElementById("filter-non-fiction");
        this.clearFiltersBtn = document.getElementById("clear-filters");
        this.sortAscBtn = document.getElementById("sort-asc");
        this.sortDescBtn = document.getElementById("sort-desc");
    }
    loadBooks() {
        return __awaiter(this, arguments, void 0, function* (filter = "", sortOption = "", genreFilter = "") {
            if (!this.bookList)
                return;
            this.bookList.innerHTML = ""; // Clear the list first
            try {
                const books = yield this.fetchBooks();
                let filteredBooks = books.filter(book => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    return (((_b = (_a = book.title) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(filter.toLowerCase())) !== null && _b !== void 0 ? _b : false) ||
                        ((_e = (_d = (_c = book.author) === null || _c === void 0 ? void 0 : _c.name) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes(filter.toLowerCase())) !== null && _e !== void 0 ? _e : false) ||
                        ((_h = (_g = (_f = book.genre) === null || _f === void 0 ? void 0 : _f.name) === null || _g === void 0 ? void 0 : _g.toLowerCase().includes(filter.toLowerCase())) !== null && _h !== void 0 ? _h : false)) &&
                        (genreFilter === "" || ((_k = (_j = book.genre) === null || _j === void 0 ? void 0 : _j.name) === null || _k === void 0 ? void 0 : _k.toLowerCase()) === genreFilter.toLowerCase());
                });
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
        });
    }
    createBookRow(book, index) {
        var _a;
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
        (_a = this.bookList) === null || _a === void 0 ? void 0 : _a.appendChild(row);
    }
    editBook(index) {
        const books = JSON.parse(localStorage.getItem("books") || "[]");
        const book = books[index];
        localStorage.setItem("editBook", JSON.stringify({ book, index }));
        window.location.href = "add-book.html";
    }
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
    deleteBook(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = JSON.parse(localStorage.getItem("books") || "[]");
            books.splice(index, 1);
            localStorage.setItem("books", JSON.stringify(books));
            this.loadBooks();
        });
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
        var _a, _b, _c, _d, _e, _f, _g;
        (_a = document.getElementById("book-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (e) => this.saveBook(e));
        (_b = this.searchBar) === null || _b === void 0 ? void 0 : _b.addEventListener("input", (e) => {
            this.loadBooks(e.target.value);
        });
        (_c = this.filterFiction) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => this.loadBooks(this.searchBar.value, "", "fiction"));
        (_d = this.filterNonFiction) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => this.loadBooks(this.searchBar.value, "", "non-fiction"));
        (_e = this.clearFiltersBtn) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
            this.searchBar.value = "";
            this.loadBooks();
        });
        (_f = this.sortAscBtn) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => this.loadBooks(this.searchBar.value, "asc"));
        (_g = this.sortDescBtn) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => this.loadBooks(this.searchBar.value, "desc"));
        this.loadBooks();
    }
}
exports.BookManager = BookManager;