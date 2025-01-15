// // Author interface
// interface Author {
//     name: string;
//     bio?: string;
// }

// // Category interface
// interface Category {
//     name: string;
//     description?: string;
// }

// // Book interface
// interface Book {
//     title: string;
//     author: Author;
//     isbn: string;
//     pubDate: string;
//     genre: Category;
//     price: number;
//     purchaseLink: string;
//     bookType: string;
// }

// // validateISBN function
// const validateISBN = (isbn: string): boolean => {
//     return /^\d+$/.test(isbn);
// };

// // Generic data manipulation functions
// function getData<T>(key: string): T[] {
//     return JSON.parse(localStorage.getItem(key) || "[]");
// }

// function setData<T>(key: string, data: T[]): void {
//     localStorage.setItem(key, JSON.stringify(data));
// }

// // BaseManager class
// class BaseManager {
//     constructor() {
//         document.addEventListener("DOMContentLoaded", () => this.init());
//     }

//     async fetchBooks(): Promise<Book[]> {
//         const localBooks: Book[] = getData<Book>("books");
//         try {
//             const response: Response = await fetch("https://jsonplaceholder.typicode.com/posts");
//             if (!response.ok) throw new Error("Failed to fetch data from the server.");

//             const apiBooks: any[] = await response.json();

//             return [
//                 ...localBooks,
//                 ...apiBooks.map((item: any): Book => ({
//                     title: item.title,
//                     author: { name: "Author" },
//                     isbn: "12",
//                     pubDate: "2025-01-01",
//                     genre: { name: "API Genre" },
//                     price: 20.0,
//                     purchaseLink: "https://www.amazon.in/s?k=books&crid=744W0CQGEHJX&sprefix=book%2Caps%2C301&ref=nb_sb_noss_2",
//                     bookType: "EBook",
//                 })),
//             ];
//         } catch (error) {
//             console.error("Error fetching books from server:", error);
//             return localBooks;
//         }
//     }

//     calculateBookAge(pubDate: string): string {
//         const publicationDate: Date = new Date(pubDate);
//         const currentDate: Date = new Date();
//         const age: number = currentDate.getFullYear() - publicationDate.getFullYear();
//         return age > 0 ? `${age} year(s)` : "Less than a year";
//     }

//     init(): void {}
// }

// // BaseBook class
// class BaseBook {
//     title: string;
//     author: Author;
//     price: number;

//     constructor({ title, author, price }: { title: string; author: Author; price: number }) {
//         this.title = title;
//         this.author = author;
//         this.price = price;
//     }

//     getBookDetails(): string {
//         return `Title: ${this.title}, Author: ${this.author.name}, Price: $${this.price}`;
//     }
// }

// // PrintedBook class extending BaseBook
// class PrintedBook extends BaseBook {
//     bookCondition: string;
//     dimensions: string;
//     coverType: string;

//     constructor({ title, author, price, bookCondition, dimensions, coverType }: { title: string; author: Author; price: number; bookCondition: string; dimensions: string; coverType: string }) {
//         super({ title, author, price });
//         this.bookCondition = bookCondition;
//         this.dimensions = dimensions;
//         this.coverType = coverType;
//     }

//     getPrintedBookDetails(): string {
//         return `Printed Book - ${this.getBookDetails()}, Condition: ${this.bookCondition}, Dimensions: ${this.dimensions}, Cover Type: ${this.coverType}`;
//     }
// }

// // EBook class extending BaseBook
// class EBook extends BaseBook {
//     fileSize: number;

//     constructor({ title, author, price, fileSize }: { title: string; author: Author; price: number; fileSize: number }) {
//         super({ title, author, price });
//         this.fileSize = fileSize;
//     }

//     getEBookDetails(): string {
//         return `EBook - ${this.getBookDetails()}, File Size: ${this.fileSize} MB`;
//     }
// }

// // BookManager class extending BaseManager
// class BookManager extends BaseManager {
//     bookList: HTMLElement | null;
//     searchBar: HTMLInputElement | null;
//     filterFiction: HTMLElement | null;
//     filterNonFiction: HTMLElement | null;
//     clearFiltersBtn: HTMLElement | null;
//     sortAscBtn: HTMLElement | null;
//     sortDescBtn: HTMLElement | null;

//     constructor() {
//         super();
//         this.bookList = document.getElementById("book-list");
//         this.searchBar = document.getElementById("search-bar") as HTMLInputElement;
//         this.filterFiction = document.getElementById("filter-fiction");
//         this.filterNonFiction = document.getElementById("filter-non-fiction");
//         this.clearFiltersBtn = document.getElementById("clear-filters");
//         this.sortAscBtn = document.getElementById("sort-asc");
//         this.sortDescBtn = document.getElementById("sort-desc");
//     }

//     async loadBooks(filter: string = "", sortOption: string = "", genreFilter: string = ""): Promise<void> {
//         if (!this.bookList) return;

//         this.bookList.innerHTML = ""; // Clear the list first

//         try {
//             const books: Book[] = await this.fetchBooks();

//             let filteredBooks: Book[] = books.filter((book: Book) =>
//                 (book.title.toLowerCase().includes(filter.toLowerCase()) ||
//                     book.author.name.toLowerCase().includes(filter.toLowerCase()) ||
//                     book.genre.name.toLowerCase().includes(filter.toLowerCase())) &&
//                 (genreFilter === "" || book.genre.name.toLowerCase() === genreFilter.toLowerCase())
//             );

//             if (sortOption === "asc") {
//                 filteredBooks.sort((a: Book, b: Book) =>
//                     a.title.toLowerCase().localeCompare(b.title.toLowerCase())
//                 );
//             } else if (sortOption === "desc") {
//                 filteredBooks.sort((a: Book, b: Book) =>
//                     b.title.toLowerCase().localeCompare(a.title.toLowerCase())
//                 );
//             }

//             if (filteredBooks.length === 0) {
//                 this.bookList.innerHTML = "<tr><td colspan='8'>No books found.</td></tr>";
//             } else {
//                 filteredBooks.forEach((book: Book, index: number) => this.createBookRow(book, index));
//             }
//         } catch (error) {
//             console.error("Error fetching books:", error);
//             this.bookList.innerHTML = "<tr><td colspan='8'>Failed to load books. Please try again later.</td></tr>";
//         }
//     }

//     createBookRow(book: Book, index: number): void {
//         const bookAge: string = this.calculateBookAge(book.pubDate);

//         const row: HTMLTableRowElement = document.createElement("tr");

//         row.innerHTML = `
//             <td>${book.title}</td>
//             <td>${book.author.name}</td>
//             <td>${book.isbn || "N/A"}</td>
//             <td>${book.pubDate || "N/A"}</td>
//             <td>${book.genre.name || "N/A"}</td>
//             <td>${book.bookType || "N/A"}</td>
//             <td>${book.price ? `$${book.price}` : "N/A"}</td>
//             <td>${bookAge}</td>
//             <td><a href="${book.purchaseLink}" target="_blank">Purchase</a></td>
//             <td>
//                 <div class="button-container">
//                     <button class="edit-btn" onclick="bookManager.editBook(${index})">Edit</button>
//                     <button class="delete-btn" onclick="bookManager.deleteBook(${index})">Delete</button>
//                     <button class="details-btn" onclick="bookManager.showBookDetails(${index})">Details</button>
//                 </div>
//             </td>
//         `;

//         this.bookList?.appendChild(row);
//     }

//     editBook(index: number): void {
//         const books: Book[] = getData<Book>("books");
//         const book: Book = books[index];

//         setData("editBook", [{ book, index }]);
//         window.location.href = "add-book.html";
//     }

    // static prefillForm(): void {
    //     const editData: { book: Book; index: number } | null = getData<{ book: Book; index: number }>("editBook")[0] || null;

    //     if (editData) {
    //         const { book, index } = editData;

    //         (document.getElementById("title") as HTMLInputElement).value = book.title;
    //         (document.getElementById("author") as HTMLInputElement).value = book.author.name;
    //         (document.getElementById("isbn") as HTMLInputElement).value = book.isbn;
    //         (document.getElementById("pub-date") as HTMLInputElement).value = book.pubDate;
    //         (document.getElementById("genre") as HTMLInputElement).value = book.genre.name;
    //         (document.getElementById("price") as HTMLInputElement).value = book.price?.toString() || "";
    //         (document.getElementById("edit-index") as HTMLInputElement).value = index.toString();

    //         localStorage.removeItem("editBook");
    //     }
    // }

//     async deleteBook(index: number): Promise<void> {
//         const books: Book[] = getData<Book>("books");
//         books.splice(index, 1);
//         setData("books", books);
//         await this.loadBooks();
//     }

//     showBookDetails(index: number): void {
//         const books: Book[] = getData<Book>("books");
//         const book: Book = books[index];
//         const bookAge: string = this.calculateBookAge(book.pubDate);

//         if (book) {
//             alert(`Title: ${book.title}
//                 Author: ${book.author.name}
//                 ISBN: ${book.isbn || "N/A"}
//                 Publication Date: ${book.pubDate || "N/A"}
//                 Age: ${bookAge}
//                 Genre: ${book.genre.name || "N/A"}
//                 Book Type: ${book.bookType || "N/A"}
//                 Price: ${book.price ? `$${book.price}` : "N/A"}
//                 Purchase Link: ${book.purchaseLink}`);
//         } else {
//             alert("Book details not found.");
//         }
//     }

//     saveBook(e: Event): void {
//         e.preventDefault();

//         // Get form values
//         const title: string = (document.getElementById("title") as HTMLInputElement).value;
//         const authorName: string = (document.getElementById("author") as HTMLInputElement).value;
//         const isbn: string = (document.getElementById("isbn") as HTMLInputElement).value;
//         const pubDate: string = (document.getElementById("pub-date") as HTMLInputElement).value;
//         const genreName: string = (document.getElementById("genre") as HTMLInputElement).value;
//         const price: number = parseFloat((document.getElementById("price") as HTMLInputElement).value);
//         const purchaseLink: string = (document.getElementById("purchase-link") as HTMLInputElement).value;
//         const bookType: string = (document.getElementById("book-type") as HTMLInputElement).value;

//         if (!validateISBN(isbn)) {
//             alert("ISBN must contain only numeric characters.");
//             return;
//         }

//         const books: Book[] = JSON.parse(localStorage.getItem("books") || "[]");
//         const editIndex: string = (document.getElementById("edit-index") as HTMLInputElement).value;

//         const author: Author = { name: authorName };
//         const genre: Category = { name: genreName };

//         if (editIndex !== "") {
//             books[parseInt(editIndex, 10)] = { title, author, isbn, pubDate, genre, price, purchaseLink, bookType };
//         } else {
//             books.push({ title, author, isbn, pubDate, genre, price, purchaseLink, bookType });
//         }

//         localStorage.setItem("books", JSON.stringify(books));
//         alert("Book saved successfully!");

//         console.log("Form submitted and book saved:", { title, author, isbn });

//         // Redirect to index.html after a short delay (to ensure everything is saved)
//         setTimeout(() => {
//             window.location.href = "index.html";
//         }, 500); // A delay might be needed to ensure proper saving before redirection
//     }

//     init(): void {
//         document.getElementById("book-form")?.addEventListener("submit", (e: Event) => this.saveBook(e));

//         this.searchBar?.addEventListener("input", (e: Event) => {
//             this.loadBooks((e.target as HTMLInputElement).value);
//         });

//         this.filterFiction?.addEventListener("click", () => this.loadBooks(this.searchBar?.value || "", "", "fiction"));
//         this.filterNonFiction?.addEventListener("click", () => this.loadBooks(this.searchBar?.value || "", "", "non-fiction"));

//         this.clearFiltersBtn?.addEventListener("click", () => {
//             if (this.searchBar) this.searchBar.value = "";
//             this.loadBooks();
//         });

//         this.sortAscBtn?.addEventListener("click", () => this.loadBooks(this.searchBar?.value || "", "asc"));
//         this.sortDescBtn?.addEventListener("click", () => this.loadBooks(this.searchBar?.value || "", "desc"));

//         this.loadBooks();
//     }
// }

// const bookManager: BookManager = new BookManager();

// document.addEventListener("DOMContentLoaded", () => {
//     BookManager.prefillForm();
// });

