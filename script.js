class BookManager {
    constructor() {
        this.bookList = document.getElementById("book-list");
        this.initEventListeners();
        this.loadBooks();
    }

    async loadBooks(filter = "", sortOption = "") {
        this.bookList.innerHTML = "";
        try {
            const books = await this.fetchBooks();

            // Apply filter and sort
            let filteredBooks = books.filter(book =>
                book.title.toLowerCase().includes(filter.toLowerCase()) ||
                book.author.toLowerCase().includes(filter.toLowerCase()) ||
                book.genre.toLowerCase().includes(filter.toLowerCase())
            );

            if (sortOption === "asc") {
                filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOption === "desc") {
                filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
            }

            // Display filtered books
            if (filteredBooks.length === 0) {
                this.bookList.innerHTML = "<tr><td colspan='8'>No books found.</td></tr>";
            } else {
                filteredBooks.forEach((book, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn || "N/A"}</td>
                        <td>${book.pubDate || "N/A"}</td>
                        <td>${book.genre || "N/A"}</td>
                        <td>${book.bookType || "N/A"}</td>
                        <td>${book.basebook ? `<a href="${book.basebook}" target="_blank">Link</a>` : "N/A"}</td>
                        <td>
                            <button onclick="bookManager.editBook(${index})">Edit</button>
                            <button onclick="bookManager.deleteBook(${index})">Delete</button>
                        </td>
                    `;
                    this.bookList.appendChild(row);
                });
            }
        } catch (error) {
            console.error("Error loading books:", error);
            this.bookList.innerHTML = "<tr><td colspan='8'>Failed to load books. Please try again later.</td></tr>";
        }
    }

    saveBook(e) {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const isbn = document.getElementById("isbn").value;
        const pubDate = document.getElementById("pub-date").value;
        const genre = document.getElementById("genre").value;
        const bookType = document.getElementById("book-type").value;
        const basebook = document.getElementById("basebook").value;

        const books = JSON.parse(localStorage.getItem("books")) || [];
        const editIndex = document.getElementById("edit-index").value;

        if (editIndex !== "") {
            books[editIndex] = { title, author, isbn, pubDate, genre, bookType, basebook };
        } else {
            books.push({ title, author, isbn, pubDate, genre, bookType, basebook });
        }

        localStorage.setItem("books", JSON.stringify(books));
        alert("Book saved successfully!");
        this.loadBooks();
    }

    editBook(index) {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        const book = books[index];

        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("isbn").value = book.isbn;
        document.getElementById("pub-date").value = book.pubDate;
        document.getElementById("genre").value = book.genre;
        document.getElementById("book-type").value = book.bookType;
        document.getElementById("basebook").value = book.basebook;
        document.getElementById("edit-index").value = index;
    }

    deleteBook(index) {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        this.loadBooks();
    }

    async fetchBooks() {
        const localBooks = JSON.parse(localStorage.getItem("books")) || [];
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts?author='Srivastava'");
            if (!response.ok) throw new Error("Failed to fetch data from the server.");

            const apiBooks = await response.json();
            return [
                ...localBooks,
                ...apiBooks.map(item => ({
                    title: item.title,
                    author: "API Author",
                    isbn: 12,
                    pubDate: "01-01-2025",
                    genre: "API Genre",
                })),
            ];
        } catch (error) {
            console.error("Error fetching books from server:", error);
            return localBooks;
        }
    }

    initEventListeners() {
        document.getElementById("book-form")?.addEventListener("submit", this.saveBook.bind(this));
        document.getElementById("sort-asc")?.addEventListener("click", () => this.loadBooks("", "asc"));
        document.getElementById("sort-desc")?.addEventListener("click", () => this.loadBooks("", "desc"));
        document.getElementById("search-bar")?.addEventListener("input", e => this.loadBooks(e.target.value));
    }
}

const bookManager = new BookManager();
