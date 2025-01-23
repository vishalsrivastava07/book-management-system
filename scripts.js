// // Types
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Main Book Manager Class
var BookManager = /** @class */ (function () {
    function BookManager() {
        this.STORAGE_KEY = "books"; // It tells where all the books stored in localStorage
        this.API_URL = "https://jsonplaceholder.typicode.com/posts";
        this.allBooks = [];
        this.currentSearchTerm = "";
        this.currentGenreFilter = "";
        this.currentSortOption = "";
    }
    // Initialize books from both local storage and API
    BookManager.prototype.initializeBooks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localBooks, apiBooks, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localBooks = this.getLocalBooks();
                        return [4 /*yield*/, this.fetchApiBooks()];
                    case 1:
                        apiBooks = _a.sent();
                        this.allBooks = __spreadArray(__spreadArray([], localBooks, true), apiBooks, true);
                        return [2 /*return*/, this.filterAndSortBooks()];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error initializing books:", error_1);
                        this.allBooks = this.getLocalBooks();
                        return [2 /*return*/, this.filterAndSortBooks()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Book validation methods
    BookManager.prototype.validateBook = function (book) {
        var errors = [];
        if (!book.title)
            errors.push("Title is required");
        if (!book.author)
            errors.push("Author is required");
        if (!book.isbn)
            errors.push("ISBN is required");
        if (!this.validateISBN(book.isbn || ""))
            errors.push("ISBN must contain only numeric characters");
        return errors;
    };
    BookManager.prototype.validateISBN = function (isbn) {
        return /^\d+$/.test(isbn);
    };
    //It handles books stored locally in localStorage
    BookManager.prototype.getLocalBooks = function () {
        var books = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
        return books.map(function (book) { return (__assign(__assign({}, book), { isLocal: true })); });
    };
    BookManager.prototype.saveBooks = function (books) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books));
    };
    BookManager.prototype.addBook = function (book) {
        var books = this.getLocalBooks();
        books.push(book);
        this.saveBooks(books);
        this.allBooks = __spreadArray(__spreadArray([], books, true), this.allBooks.filter(function (b) { return !b.isLocal; }), true);
    };
    BookManager.prototype.updateBook = function (index, book) {
        var books = this.getLocalBooks();
        books[index] = __assign(__assign({}, book), { isLocal: true }); // Ensure isLocal is set
        this.saveBooks(books);
        this.allBooks = __spreadArray(__spreadArray([], books, true), this.allBooks.filter(function (b) { return !b.isLocal; }), true);
    };
    BookManager.prototype.deleteBook = function (index) {
        var books = this.getLocalBooks();
        books.splice(index, 1);
        this.saveBooks(books);
        this.allBooks = __spreadArray(__spreadArray([], books, true), this.allBooks.filter(function (b) { return !b.isLocal; }), true);
    };
    // API methods
    BookManager.prototype.fetchApiBooks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, apiBooks, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(this.API_URL)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Failed to fetch data from the server.");
                        return [4 /*yield*/, response.json()];
                    case 2:
                        apiBooks = _a.sent();
                        return [2 /*return*/, apiBooks.map(function (item) { return ({
                                title: String(item.title || "Untitled"),
                                author: "Author",
                                isbn: "12",
                                pubDate: "2025-01-01",
                                genre: "API Genre",
                                price: 20.0,
                                purchaseLink: "https://www.amazon.in/s?k=books",
                                bookType: "EBook",
                                isLocal: false
                            }); })];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Error fetching books from server:", error_2);
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Book age calculation
    BookManager.prototype.calculateBookAge = function (pubDate) {
        var publicationDate = new Date(pubDate);
        var currentDate = new Date();
        var age = currentDate.getFullYear() - publicationDate.getFullYear();
        return age > 0 ? "".concat(age, " year(s)") : "Less than a year";
    };
    // Filter and sort methods
    BookManager.prototype.setSearchTerm = function (term) {
        this.currentSearchTerm = term;
    };
    BookManager.prototype.setGenreFilter = function (filter) {
        this.currentGenreFilter = filter;
    };
    BookManager.prototype.setSortOption = function (option) {
        this.currentSortOption = option;
    };
    BookManager.prototype.resetFilters = function () {
        this.currentSearchTerm = "";
        this.currentGenreFilter = "";
        this.currentSortOption = "";
    };
    BookManager.prototype.filterAndSortBooks = function () {
        var filtered = this.filterBooks();
        return this.sortBooks(filtered);
    };
    BookManager.prototype.filterBooks = function () {
        var _this = this;
        return this.allBooks.filter(function (book) {
            var searchMatch = _this.matchesSearchTerm(book);
            var genreMatch = _this.matchesGenre(book);
            return searchMatch && genreMatch;
        });
    };
    BookManager.prototype.matchesSearchTerm = function (book) {
        if (!this.currentSearchTerm)
            return true;
        var searchLower = this.currentSearchTerm.toLowerCase();
        return (String(book.title || "").toLowerCase().includes(searchLower) ||
            String(book.author || "").toLowerCase().includes(searchLower) ||
            String(book.genre || "").toLowerCase().includes(searchLower));
    };
    BookManager.prototype.matchesGenre = function (book) {
        if (!this.currentGenreFilter)
            return true;
        var bookGenre = String(book.genre || "").toLowerCase();
        var filter = this.currentGenreFilter.toLowerCase();
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
    };
    BookManager.prototype.sortBooks = function (books) {
        var _this = this;
        if (!this.currentSortOption)
            return books;
        return __spreadArray([], books, true).sort(function (a, b) {
            var titleA = String(a.title || "").toLowerCase();
            var titleB = String(b.title || "").toLowerCase();
            return _this.currentSortOption === "asc"
                ? titleA.localeCompare(titleB)
                : titleB.localeCompare(titleA);
        });
    };
    return BookManager;
}());
// Book Renderer Class
var BookRenderer = /** @class */ (function () {
    function BookRenderer(bookListElement) {
        this.bookManager = new BookManager(); // Create an instance of the bookmanager class to handle data-related operations
        this.bookList = bookListElement; // it stores the html element where the book list will be rendered 
        this.initializeEventListeners(); // sets up event handlers
        this.initializeBooks(); // loads and render the initial list of books
    }
    BookRenderer.prototype.initializeBooks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var books;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bookManager.initializeBooks()];
                    case 1:
                        books = _a.sent();
                        this.renderBooks(books);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookRenderer.prototype.renderBooks = function (books) {
        var _this = this;
        this.bookList.innerHTML = "";
        if (books.length === 0) {
            this.bookList.innerHTML = "<tr><td colspan='8'>No books found.</td></tr>";
            return;
        }
        books.forEach(function (book, index) { return _this.renderBookRow(book, index); });
    };
    BookRenderer.prototype.renderBookRow = function (book, index) {
        var bookAge = this.bookManager.calculateBookAge(book.pubDate);
        var row = document.createElement("tr");
        row.innerHTML = "\n            <td>".concat(book.title, "</td>\n            <td>").concat(book.author, "</td>\n            <td>").concat(book.isbn || "N/A", "</td>\n            <td>").concat(book.pubDate || "N/A", "</td>\n            <td>").concat(book.genre || "N/A", "</td>\n            <td>").concat(book.bookType || "N/A", "</td>\n            <td>").concat(book.price ? "$".concat(book.price) : "N/A", "</td>\n            <td>").concat(bookAge, "</td>\n            <td><a href=\"").concat(book.purchaseLink, "\" target=\"_blank\">Purchase</a></td>\n            <td>\n                <div class=\"button-container\">\n                    <button class=\"edit-btn\" data-index=\"").concat(index, "\">Edit</button>\n                    <button class=\"delete-btn\" data-index=\"").concat(index, "\">Delete</button>\n                    <button class=\"details-btn\" data-index=\"").concat(index, "\">Details</button>\n                </div>\n            </td>\n        ");
        this.bookList.appendChild(row);
    };
    // Form handling methods
    BookRenderer.prototype.handleFormSubmit = function (e) {
        e.preventDefault();
        var formData = this.getFormData();
        var errors = this.bookManager.validateBook(formData);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }
        var editIndex = document.getElementById("edit-index").value;
        if (editIndex !== "") {
            this.bookManager.updateBook(parseInt(editIndex), formData);
        }
        else {
            this.bookManager.addBook(formData);
        }
        alert("Book saved successfully!");
        window.location.href = "index.html";
    };
    BookRenderer.prototype.prefillForm = function () {
        var editData = JSON.parse(localStorage.getItem("editBook") || "{}");
        if (!editData.book)
            return;
        var book = editData.book, index = editData.index;
        Object.entries(book).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            var element = document.getElementById(key);
            if (element)
                element.value = value;
        });
        document.getElementById("edit-index").value = index;
        localStorage.removeItem("editBook");
    };
    BookRenderer.prototype.getFormData = function () {
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
    };
    BookRenderer.prototype.initializeEventListeners = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        // Search
        var searchBar = document.getElementById("search-bar");
        searchBar === null || searchBar === void 0 ? void 0 : searchBar.addEventListener("input", function (e) {
            _this.bookManager.setSearchTerm(e.target.value);
            _this.initializeBooks();
        });
        (_a = document.getElementById("book-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (e) { return _this.handleFormSubmit(e); });
        // Filters
        (_b = document.getElementById("filter-fiction")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
            _this.bookManager.setGenreFilter("fiction");
            _this.initializeBooks();
        });
        (_c = document.getElementById("filter-non-fiction")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
            _this.bookManager.setGenreFilter("non-fiction");
            _this.initializeBooks();
        });
        (_d = document.getElementById("clear-filters")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
            _this.bookManager.resetFilters();
            if (searchBar)
                searchBar.value = "";
            _this.initializeBooks();
        });
        // Sorting
        (_e = document.getElementById("sort-asc")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
            _this.bookManager.setSortOption("asc");
            _this.initializeBooks();
        });
        (_f = document.getElementById("sort-desc")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
            _this.bookManager.setSortOption("desc");
            _this.initializeBooks();
        });
        // Book actions
        document.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
            var target, index;
            return __generator(this, function (_a) {
                target = e.target;
                if (!target.dataset.index)
                    return [2 /*return*/];
                index = parseInt(target.dataset.index);
                if (target.classList.contains("edit-btn"))
                    this.handleEdit(index);
                if (target.classList.contains("delete-btn"))
                    this.handleDelete(index);
                if (target.classList.contains("details-btn"))
                    this.handleDetails(index);
                return [2 /*return*/];
            });
        }); });
    };
    BookRenderer.prototype.saveBooks = function () {
        throw new Error("Method not implemented.");
    };
    BookRenderer.prototype.handleEdit = function (index) {
        var books = this.bookManager.getLocalBooks();
        localStorage.setItem("editBook", JSON.stringify({ book: books[index], index: index }));
        window.location.href = "add-book.html";
    };
    BookRenderer.prototype.handleDelete = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.bookManager.deleteBook(index);
                        return [4 /*yield*/, this.initializeBooks()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BookRenderer.prototype.handleDetails = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var books, book, bookAge;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bookManager.initializeBooks()];
                    case 1:
                        books = _a.sent();
                        book = books[index];
                        bookAge = this.bookManager.calculateBookAge(book.pubDate);
                        alert("\n            Title: ".concat(book.title, "\n            Author: ").concat(book.author, "\n            ISBN: ").concat(book.isbn || "N/A", "\n            Publication Date: ").concat(book.pubDate || "N/A", "\n            Age: ").concat(bookAge, "\n            Genre: ").concat(book.genre || "N/A", "\n            Book Type: ").concat(book.bookType || "N/A", "\n            Price: ").concat(book.price ? "$".concat(book.price) : "N/A", "\n            Purchase Link: ").concat(book.purchaseLink, "\n        "));
                        return [2 /*return*/];
                }
            });
        });
    };
    return BookRenderer;
}());
document.addEventListener("DOMContentLoaded", function () {
    var bookList = document.getElementById("book-list");
    var bookForm = document.getElementById("book-form");
    if (bookList) {
        var bookRenderer = new BookRenderer(bookList);
    }
    if (bookForm) {
        var bookRenderer_1 = new BookRenderer(document.createElement('tbody'));
        bookRenderer_1.prefillForm();
        bookForm.addEventListener("submit", function (e) { return bookRenderer_1.handleFormSubmit(e); });
    }
});
