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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
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
function logMethodParams(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("Method ".concat(propertyKey, " called with arguments:"), args);
        return originalMethod.apply(this, args);
    };
}
// validateISBN function
var validateISBN = function (isbn) {
    return /^\d+$/.test(isbn);
};
var BaseManager = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _calculateBookAge_decorators;
    return _a = /** @class */ (function () {
            function BaseManager() {
                var _this = this;
                __runInitializers(this, _instanceExtraInitializers);
                document.addEventListener("DOMContentLoaded", function () { return _this.init(); });
            }
            BaseManager.prototype.fetchBooks = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var localBooks, response, apiBooks, error_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                localBooks = JSON.parse(localStorage.getItem("books") || "[]");
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 4, , 5]);
                                return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/posts")];
                            case 2:
                                response = _b.sent();
                                if (!response.ok)
                                    throw new Error("Failed to fetch data from the server.");
                                return [4 /*yield*/, response.json()];
                            case 3:
                                apiBooks = _b.sent();
                                return [2 /*return*/, __spreadArray(__spreadArray([], localBooks, true), apiBooks.map(function (item) { return ({
                                        title: item.title,
                                        author: "Author",
                                        isbn: 12,
                                        pubDate: "2025-01-01",
                                        genre: "API Genre",
                                        price: 20.0,
                                        purchaseLink: "https://www.amazon.in/s?k=books&crid=744W0CQGEHJX&sprefix=book%2Caps%2C301&ref=nb_sb_noss_2",
                                        bookType: "EBook",
                                    }); }), true)];
                            case 4:
                                error_1 = _b.sent();
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
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _calculateBookAge_decorators = [logMethodParams];
            __esDecorate(_a, null, _calculateBookAge_decorators, { kind: "method", name: "calculateBookAge", static: false, private: false, access: { has: function (obj) { return "calculateBookAge" in obj; }, get: function (obj) { return obj.calculateBookAge; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var BookManager = function () {
    var _a;
    var _classSuper = BaseManager;
    var _instanceExtraInitializers = [];
    var _createBookRow_decorators;
    var _editBook_decorators;
    var _deleteBook_decorators;
    var _showBookDetails_decorators;
    return _a = /** @class */ (function (_super) {
            __extends(BookManager, _super);
            function BookManager() {
                var _this = _super.call(this) || this;
                _this.bookList = __runInitializers(_this, _instanceExtraInitializers);
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
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!this.bookList)
                                    return [2 /*return*/];
                                this.bookList.innerHTML = ""; // Clear the list first
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, this.fetchBooks()];
                            case 2:
                                books = _b.sent();
                                filteredBooks = books.filter(function (book) {
                                    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                                    return (((_c = (_b = book.title) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(filter.toLowerCase())) !== null && _c !== void 0 ? _c : false) ||
                                        ((_f = (_e = (_d = book.author) === null || _d === void 0 ? void 0 : _d.name) === null || _e === void 0 ? void 0 : _e.toLowerCase().includes(filter.toLowerCase())) !== null && _f !== void 0 ? _f : false) ||
                                        ((_j = (_h = (_g = book.genre) === null || _g === void 0 ? void 0 : _g.name) === null || _h === void 0 ? void 0 : _h.toLowerCase().includes(filter.toLowerCase())) !== null && _j !== void 0 ? _j : false)) &&
                                        (genreFilter === "" || ((_l = (_k = book.genre) === null || _k === void 0 ? void 0 : _k.name) === null || _l === void 0 ? void 0 : _l.toLowerCase()) === genreFilter.toLowerCase());
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
                                error_2 = _b.sent();
                                console.error("Error fetching books:", error_2);
                                this.bookList.innerHTML = "<tr><td colspan='8'>Failed to load books. Please try again later.</td></tr>";
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            };
            BookManager.prototype.createBookRow = function (book, index) {
                var _b;
                var bookAge = this.calculateBookAge(book.pubDate);
                var row = document.createElement("tr");
                row.innerHTML = "\n            <td>".concat(book.title, "</td>\n            <td>").concat(book.author, "</td>\n            <td>").concat(book.isbn || "N/A", "</td>\n            <td>").concat(book.pubDate || "N/A", "</td>\n            <td>").concat(book.genre || "N/A", "</td>\n            <td>").concat(book.bookType || "N/A", "</td>\n            <td>").concat(book.price ? "$".concat(book.price) : "N/A", "</td>\n            <td>").concat(bookAge, "</td>\n            <td><a href=\"").concat(book.purchaseLink, "\" target=\"_blank\">Purchase</a></td>\n            <td>\n                <div class=\"button-container\">\n                    <button class=\"edit-btn\" onclick=\"bookManager.editBook(").concat(index, ")\">Edit</button>\n                    <button class=\"delete-btn\" onclick=\"bookManager.deleteBook(").concat(index, ")\">Delete</button>\n                    <button class=\"details-btn\" onclick=\"bookManager.showBookDetails(").concat(index, ")\">Details</button>\n                </div>\n            </td>\n        ");
                (_b = this.bookList) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            };
            BookManager.prototype.editBook = function (index) {
                var books = JSON.parse(localStorage.getItem("books") || "[]");
                var book = books[index];
                localStorage.setItem("editBook", JSON.stringify({ book: book, index: index }));
                window.location.href = "add-book.html";
            };
            BookManager.prefillForm = function () {
                var editData = JSON.parse(localStorage.getItem("editBook") || "{}");
                if (editData) {
                    var book = editData.book, index = editData.index;
                    document.getElementById("title").value = book.title;
                    document.getElementById("author").value = book.author;
                    document.getElementById("isbn").value = book.isbn;
                    document.getElementById("pub-date").value = book.pubDate;
                    document.getElementById("genre").value = book.genre;
                    document.getElementById("price").value = book.price || "";
                    document.getElementById("edit-index").value = index;
                    localStorage.removeItem("editBook");
                }
            };
            BookManager.prototype.deleteBook = function (index) {
                return __awaiter(this, void 0, void 0, function () {
                    var books;
                    return __generator(this, function (_b) {
                        books = JSON.parse(localStorage.getItem("books") || "[]");
                        books.splice(index, 1);
                        localStorage.setItem("books", JSON.stringify(books));
                        this.loadBooks();
                        return [2 /*return*/];
                    });
                });
            };
            BookManager.prototype.showBookDetails = function (index) {
                var books = JSON.parse(localStorage.getItem("books") || "[]");
                var book = books[index];
                var bookAge = this.calculateBookAge(book.pubDate);
                if (book) {
                    alert("Title: ".concat(book.title, "\n                Author: ").concat(book.author, "\n                ISBN: ").concat(book.isbn || "N/A", "\n                Publication Date: ").concat(book.pubDate || "N/A", "\n                Age: ").concat(bookAge, "\n                Genre: ").concat(book.genre || "N/A", "\n                Book Type: ").concat(book.bookType || "N/A", "\n                Price: ").concat(book.price ? "$".concat(book.price) : "N/A", "\n                Purchase Link: ").concat(book.purchaseLink));
                }
                else {
                    alert("Book details not found.");
                }
            };
            BookManager.prototype.saveBook = function (e) {
                e.preventDefault();
                var title = document.getElementById("title").value;
                var author = document.getElementById("author").value;
                var isbn = document.getElementById("isbn").value;
                var pubDate = document.getElementById("pub-date").value;
                var genre = document.getElementById("genre").value;
                var price = document.getElementById("price").value;
                var purchaseLink = document.getElementById("purchase-link").value;
                var bookType = document.getElementById("book-type").value;
                if (!validateISBN(isbn)) {
                    alert("ISBN must contain only numeric characters.");
                    return;
                }
                var books = JSON.parse(localStorage.getItem("books") || "[]");
                var editIndex = document.getElementById("edit-index").value;
                if (editIndex !== "") {
                    books[editIndex] = { title: title, author: author, isbn: isbn, pubDate: pubDate, genre: genre, price: price, purchaseLink: purchaseLink, bookType: bookType };
                }
                else {
                    books.push({ title: title, author: author, isbn: isbn, pubDate: pubDate, genre: genre, price: price, purchaseLink: purchaseLink, bookType: bookType });
                }
                localStorage.setItem("books", JSON.stringify(books));
                alert("Book saved successfully!");
                window.location.href = "index.html";
            };
            BookManager.prototype.init = function () {
                var _this = this;
                var _b, _c, _d, _e, _f, _g, _h;
                (_b = document.getElementById("book-form")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", function (e) { return _this.saveBook(e); });
                (_c = this.searchBar) === null || _c === void 0 ? void 0 : _c.addEventListener("input", function (e) {
                    _this.loadBooks(e.target.value);
                });
                (_d = this.filterFiction) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () { return _this.loadBooks(_this.searchBar.value, "", "fiction"); });
                (_e = this.filterNonFiction) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () { return _this.loadBooks(_this.searchBar.value, "", "non-fiction"); });
                (_f = this.clearFiltersBtn) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
                    _this.searchBar.value = "";
                    _this.loadBooks();
                });
                (_g = this.sortAscBtn) === null || _g === void 0 ? void 0 : _g.addEventListener("click", function () { return _this.loadBooks(_this.searchBar.value, "asc"); });
                (_h = this.sortDescBtn) === null || _h === void 0 ? void 0 : _h.addEventListener("click", function () { return _this.loadBooks(_this.searchBar.value, "desc"); });
                this.loadBooks();
            };
            return BookManager;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _createBookRow_decorators = [logMethodParams];
            _editBook_decorators = [logMethodParams];
            _deleteBook_decorators = [logMethodParams];
            _showBookDetails_decorators = [logMethodParams];
            __esDecorate(_a, null, _createBookRow_decorators, { kind: "method", name: "createBookRow", static: false, private: false, access: { has: function (obj) { return "createBookRow" in obj; }, get: function (obj) { return obj.createBookRow; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _editBook_decorators, { kind: "method", name: "editBook", static: false, private: false, access: { has: function (obj) { return "editBook" in obj; }, get: function (obj) { return obj.editBook; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _deleteBook_decorators, { kind: "method", name: "deleteBook", static: false, private: false, access: { has: function (obj) { return "deleteBook" in obj; }, get: function (obj) { return obj.deleteBook; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _showBookDetails_decorators, { kind: "method", name: "showBookDetails", static: false, private: false, access: { has: function (obj) { return "showBookDetails" in obj; }, get: function (obj) { return obj.showBookDetails; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var bookManager = new BookManager();
document.addEventListener("DOMContentLoaded", function () {
    BookManager.prefillForm();
});
