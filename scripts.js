var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// validateISBN function
var validateISBN = function (isbn) {
    return /^\d+$/.test(isbn);
};
// Generic data manipulation functions
function getData(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
}
function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
// BaseManager class
var BaseManager = /** @class */ (function () {
    function BaseManager() {
        var _this = this;
        document.addEventListener("DOMContentLoaded", function () { return _this.init(); });
    }
    BaseManager.prototype.fetchBooks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localBooks, response, apiBooks, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localBooks = getData("books");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/posts")];
                    case 2:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Failed to fetch data from the server.");
                        return [4 /*yield*/, response.json()];
                    case 3:
                        apiBooks = _a.sent();
                        return [2 /*return*/, __spreadArray(__spreadArray([], localBooks, true), apiBooks.map(function (item) { return ({
                                title: item.title,
                                author: { name: "Author" },
                                isbn: "12",
                                pubDate: "2025-01-01",
                                genre: { name: "API Genre" },
                                price: 20.0,
                                purchaseLink: "https://www.amazon.in/s?k=books&crid=744W0CQGEHJX&sprefix=book%2Caps%2C301&ref=nb_sb_noss_2",
                                bookType: "EBook",
                            }); }), true)];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error fetching books from server:", error_1);
                        return [2 /*return*/, localBooks];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BaseManager.prototype.calculateBookAge = function (pubDate) {
        var publicationDate = new Date(pubDate);
        var currentDate = new Date();
        var age = currentDate.getFullYear() - publicationDate.getFullYear();
        return age > 0 ? "".concat(age, " year(s)") : "Less than a year";
    };
    BaseManager.prototype.init = function () { };
    return BaseManager;
}());
// BaseBook class
var BaseBook = /** @class */ (function () {
    function BaseBook(_a) {
        var title = _a.title, author = _a.author, price = _a.price;
        this.title = title;
        this.author = author;
        this.price = price;
    }
    BaseBook.prototype.getBookDetails = function () {
        return "Title: ".concat(this.title, ", Author: ").concat(this.author.name, ", Price: $").concat(this.price);
    };
    return BaseBook;
}());
// PrintedBook class extending BaseBook
var PrintedBook = /** @class */ (function (_super) {
    __extends(PrintedBook, _super);
    function PrintedBook(_a) {
        var title = _a.title, author = _a.author, price = _a.price, bookCondition = _a.bookCondition, dimensions = _a.dimensions, coverType = _a.coverType;
        var _this = _super.call(this, { title: title, author: author, price: price }) || this;
        _this.bookCondition = bookCondition;
        _this.dimensions = dimensions;
        _this.coverType = coverType;
        return _this;
    }
    PrintedBook.prototype.getPrintedBookDetails = function () {
        return "Printed Book - ".concat(this.getBookDetails(), ", Condition: ").concat(this.bookCondition, ", Dimensions: ").concat(this.dimensions, ", Cover Type: ").concat(this.coverType);
    };
    return PrintedBook;
}(BaseBook));
// EBook class extending BaseBook
var EBook = /** @class */ (function (_super) {
    __extends(EBook, _super);
    function EBook(_a) {
        var title = _a.title, author = _a.author, price = _a.price, fileSize = _a.fileSize;
        var _this = _super.call(this, { title: title, author: author, price: price }) || this;
        _this.fileSize = fileSize;
        return _this;
    }
    EBook.prototype.getEBookDetails = function () {
        return "EBook - ".concat(this.getBookDetails(), ", File Size: ").concat(this.fileSize, " MB");
    };
    return EBook;
}(BaseBook));
// BookManager class extending BaseManager
var BookManager = /** @class */ (function (_super) {
    __extends(BookManager, _super);
    function BookManager() {
        var _this = _super.call(this) || this;
        _this.bookList = document.getElementById("book-list");
        _this.searchBar = document.getElementById("search-bar");
        _this.filterFiction = document.getElementById("filter-fiction");
        _this.filterNonFiction = document.getElementById("filter-non-fiction");
        _this.clearFiltersBtn = document.getElementById("clear-filters");
        _this.sortAscBtn = document.getElementById("sort-asc");
        _this.sortDescBtn = document.getElementById("sort-desc");
        return _this;
    }
    BookManager.prototype.loadBooks = function () {
        return __awaiter(this, arguments, void 0, function (filter, sortOption, genreFilter) {
            var books, filteredBooks, error_2;
            var _this = this;
            if (filter === void 0) { filter = ""; }
            if (sortOption === void 0) { sortOption = ""; }
            if (genreFilter === void 0) { genreFilter = ""; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.bookList)
                            return [2 /*return*/];
                        this.bookList.innerHTML = ""; // Clear the list first
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fetchBooks()];
                    case 2:
                        books = _a.sent();
                        filteredBooks = books.filter(function (book) {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                            return (((_b = (_a = book.title) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(filter.toLowerCase())) !== null && _b !== void 0 ? _b : false) ||
                                ((_e = (_d = (_c = book.author) === null || _c === void 0 ? void 0 : _c.name) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes(filter.toLowerCase())) !== null && _e !== void 0 ? _e : false) ||
                                ((_h = (_g = (_f = book.genre) === null || _f === void 0 ? void 0 : _f.name) === null || _g === void 0 ? void 0 : _g.toLowerCase().includes(filter.toLowerCase())) !== null && _h !== void 0 ? _h : false)) &&
                                (genreFilter === "" || ((_k = (_j = book.genre) === null || _j === void 0 ? void 0 : _j.name) === null || _k === void 0 ? void 0 : _k.toLowerCase()) === genreFilter.toLowerCase());
                        });
                        if (sortOption === "asc") {
                            filteredBooks.sort(function (a, b) {
                                return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
                            });
                        }
                        else if (sortOption === "desc") {
                            filteredBooks.sort(function (a, b) {
                                return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
                            });
                        }
                        if (filteredBooks.length === 0) {
                            this.bookList.innerHTML = "<tr><td colspan='8'>No books found.</td></tr>";
                        }
                        else {
                            filteredBooks.forEach(function (book, index) { return _this.createBookRow(book, index); });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Error fetching books:", error_2);
                        this.bookList.innerHTML = "<tr><td colspan='8'>Failed to load books. Please try again later.</td></tr>";
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BookManager.prototype.createBookRow = function (book, index) {
        var _a;
        var bookAge = this.calculateBookAge(book.pubDate);
        var row = document.createElement("tr");
        row.innerHTML = "\n            <td>".concat(book.title, "</td>\n            <td>").concat(book.author.name, "</td>\n            <td>").concat(book.isbn || "N/A", "</td>\n            <td>").concat(book.pubDate || "N/A", "</td>\n            <td>").concat(book.genre.name || "N/A", "</td>\n            <td>").concat(book.bookType || "N/A", "</td>\n            <td>").concat(book.price ? "$".concat(book.price) : "N/A", "</td>\n            <td>").concat(bookAge, "</td>\n            <td><a href=\"").concat(book.purchaseLink, "\" target=\"_blank\">Purchase</a></td>\n            <td>\n                <div class=\"button-container\">\n                    <button class=\"edit-btn\" onclick=\"bookManager.editBook(").concat(index, ")\">Edit</button>\n                    <button class=\"delete-btn\" onclick=\"bookManager.deleteBook(").concat(index, ")\">Delete</button>\n                    <button class=\"details-btn\" onclick=\"bookManager.showBookDetails(").concat(index, ")\">Details</button>\n                </div>\n            </td>\n        ");
        (_a = this.bookList) === null || _a === void 0 ? void 0 : _a.appendChild(row);
    };
    BookManager.prototype.editBook = function (index) {
        var books = getData("books");
        var book = books[index];
        setData("editBook", [{ book: book, index: index }]);
        window.location.href = "add-book.html";
    };
    BookManager.prefillForm = function () {
        var _a;
        var editData = getData("editBook")[0] || null;
        if (editData) {
            var book = editData.book, index = editData.index;
            document.getElementById("title").value = book.title;
            document.getElementById("author").value = book.author.name;
            document.getElementById("isbn").value = book.isbn;
            document.getElementById("pub-date").value = book.pubDate;
            document.getElementById("genre").value = book.genre.name;
            document.getElementById("price").value = ((_a = book.price) === null || _a === void 0 ? void 0 : _a.toString()) || "";
            document.getElementById("edit-index").value = index.toString();
            localStorage.removeItem("editBook");
        }
    };
    BookManager.prototype.deleteBook = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var books;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        books = getData("books");
                        books.splice(index, 1);
                        setData("books", books);
                        return [4 /*yield*/, this.loadBooks()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BookManager.prototype.showBookDetails = function (index) {
        var books = getData("books");
        var book = books[index];
        var bookAge = this.calculateBookAge(book.pubDate);
        if (book) {
            alert("Title: ".concat(book.title, "\n                Author: ").concat(book.author.name, "\n                ISBN: ").concat(book.isbn || "N/A", "\n                Publication Date: ").concat(book.pubDate || "N/A", "\n                Age: ").concat(bookAge, "\n                Genre: ").concat(book.genre.name || "N/A", "\n                Book Type: ").concat(book.bookType || "N/A", "\n                Price: ").concat(book.price ? "$".concat(book.price) : "N/A", "\n                Purchase Link: ").concat(book.purchaseLink));
        }
        else {
            alert("Book details not found.");
        }
    };
    BookManager.prototype.saveBook = function (e) {
        e.preventDefault();
        // Get form values
        var title = document.getElementById("title").value;
        var authorName = document.getElementById("author").value;
        var isbn = document.getElementById("isbn").value;
        var pubDate = document.getElementById("pub-date").value;
        var genreName = document.getElementById("genre").value;
        var price = parseFloat(document.getElementById("price").value);
        var purchaseLink = document.getElementById("purchase-link").value;
        var bookType = document.getElementById("book-type").value;
        if (!validateISBN(isbn)) {
            alert("ISBN must contain only numeric characters.");
            return;
        }
        var books = JSON.parse(localStorage.getItem("books") || "[]");
        var editIndex = document.getElementById("edit-index").value;
        var author = { name: authorName };
        var genre = { name: genreName };
        if (editIndex !== "") {
            books[parseInt(editIndex, 10)] = { title: title, author: author, isbn: isbn, pubDate: pubDate, genre: genre, price: price, purchaseLink: purchaseLink, bookType: bookType };
        }
        else {
            books.push({ title: title, author: author, isbn: isbn, pubDate: pubDate, genre: genre, price: price, purchaseLink: purchaseLink, bookType: bookType });
        }
        localStorage.setItem("books", JSON.stringify(books));
        alert("Book saved successfully!");
        console.log("Form submitted and book saved:", { title: title, author: author, isbn: isbn });
        // Redirect to index.html after a short delay (to ensure everything is saved)
        setTimeout(function () {
            window.location.href = "index.html";
        }, 500); // A delay might be needed to ensure proper saving before redirection
    };
    BookManager.prototype.init = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        (_a = document.getElementById("book-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (e) { return _this.saveBook(e); });
        (_b = this.searchBar) === null || _b === void 0 ? void 0 : _b.addEventListener("input", function (e) {
            _this.loadBooks(e.target.value);
        });
        (_c = this.filterFiction) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () { var _a; return _this.loadBooks(((_a = _this.searchBar) === null || _a === void 0 ? void 0 : _a.value) || "", "", "fiction"); });
        (_d = this.filterNonFiction) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () { var _a; return _this.loadBooks(((_a = _this.searchBar) === null || _a === void 0 ? void 0 : _a.value) || "", "", "non-fiction"); });
        (_e = this.clearFiltersBtn) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
            if (_this.searchBar)
                _this.searchBar.value = "";
            _this.loadBooks();
        });
        (_f = this.sortAscBtn) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () { var _a; return _this.loadBooks(((_a = _this.searchBar) === null || _a === void 0 ? void 0 : _a.value) || "", "asc"); });
        (_g = this.sortDescBtn) === null || _g === void 0 ? void 0 : _g.addEventListener("click", function () { var _a; return _this.loadBooks(((_a = _this.searchBar) === null || _a === void 0 ? void 0 : _a.value) || "", "desc"); });
        this.loadBooks();
    };
    return BookManager;
}(BaseManager));
var bookManager = new BookManager();
document.addEventListener("DOMContentLoaded", function () {
    BookManager.prefillForm();
});
