function logMethodParams(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Method ${propertyKey} called with arguments:`, args);
        return originalMethod.apply(this, args);
    };
}

// validateISBN function
const validateISBN = (isbn: string): boolean => {
    return /^\d+$/.test(isbn);
};

class BaseManager {
    constructor() {
        document.addEventListener("DOMContentLoaded", () => this.init());
    }


    
    async fetchBooks(): Promise<any[]> {
        const localBooks = JSON.parse(localStorage.getItem("books") || "[]");
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            if (!response.ok) throw new Error("Failed to fetch data from the server.");

            const apiBooks = await response.json();

            return [
                ...localBooks,
                ...apiBooks.map((item: any) => ({
                    title: item.title,
                    author: "Author",
                    isbn: 12,
                    pubDate: "2025-01-01",
                    genre: "API Genre",
                    price: 20.0,
                    purchaseLink: "https://www.amazon.in/s?k=books&crid=744W0CQGEHJX&sprefix=book%2Caps%2C301&ref=nb_sb_noss_2",
                    bookType: "EBook",
                })),
            ];
        } catch (error) {
            console.error("Error fetching books from server:", error);
            return localBooks;
        }
    }

    @logMethodParams
    calculateBookAge(pubDate: string): string {
        const publicationDate = new Date(pubDate);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - publicationDate.getFullYear();
        return age > 0 ? `${age} year(s)` : "Less than a year";
    }

    init() {}
}

class BookManager extends BaseManager {
    bookList: HTMLElement | null;
    searchBar: HTMLInputElement | null;
    filterFiction: HTMLButtonElement | null;
    filterNonFiction: HTMLButtonElement | null;
    clearFiltersBtn: HTMLButtonElement | null;
    sortAscBtn: HTMLButtonElement | null;
    sortDescBtn: HTMLButtonElement | null;

    constructor() {
        super();
        this.bookList = document.getElementById("book-list");
        this.searchBar = document.getElementById("search-bar") as HTMLInputElement;
        this.filterFiction = document.getElementById("filter-fiction") as HTMLButtonElement;
        this.filterNonFiction = document.getElementById("filter-non-fiction") as HTMLButtonElement;
        this.clearFiltersBtn = document.getElementById("clear-filters") as HTMLButtonElement;
        this.sortAscBtn = document.getElementById("sort-asc") as HTMLButtonElement;
        this.sortDescBtn = document.getElementById("sort-desc") as HTMLButtonElement;

        
    }

    async loadBooks(filter: string = "", sortOption: string = "", genreFilter: string = ""): Promise<void> {
        if (!this.bookList) return;

        this.bookList.innerHTML = ""; // Clear the list first

        try {
            const books = await this.fetchBooks();

            let filteredBooks = books.filter(book =>
                (
                    (book.title?.toLowerCase().includes(filter.toLowerCase()) ?? false) ||
                    (book.author?.name?.toLowerCase().includes(filter.toLowerCase()) ?? false) ||
                    (book.genre?.name?.toLowerCase().includes(filter.toLowerCase()) ?? false)
                ) &&
                (genreFilter === "" || book.genre?.name?.toLowerCase() === genreFilter.toLowerCase())
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
                this.bookList.innerHTML = "<tr><td colspan='8'>No books found.</td></tr>";
            } else {
                filteredBooks.forEach((book, index) => this.createBookRow(book, index));
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            this.bookList.innerHTML = "<tr><td colspan='8'>Failed to load books. Please try again later.</td></tr>";
        }
    }

    @logMethodParams
    createBookRow(book: any, index: number) {
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

    @logMethodParams
    editBook(index: number) {
        const books = JSON.parse(localStorage.getItem("books") || "[]");
        const book = books[index];

        localStorage.setItem("editBook", JSON.stringify({ book, index }));
        window.location.href = "add-book.html";
    }
    static prefillForm() {
        const editData = JSON.parse(localStorage.getItem("editBook") || "{}");

        if (editData) {
            const { book, index } = editData;

            (document.getElementById("title") as HTMLInputElement).value = book.title;
            (document.getElementById("author") as HTMLInputElement).value = book.author;
            (document.getElementById("isbn") as HTMLInputElement).value = book.isbn;
            (document.getElementById("pub-date") as HTMLInputElement).value = book.pubDate;
            (document.getElementById("genre") as HTMLInputElement).value = book.genre;
            (document.getElementById("price") as HTMLInputElement).value = book.price || "";
            (document.getElementById("edit-index") as HTMLInputElement).value = index;

            localStorage.removeItem("editBook");
        }
    }

    
    @logMethodParams
    async deleteBook(index: number) {
        const books = JSON.parse(localStorage.getItem("books") || "[]");
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        this.loadBooks();
    }

    @logMethodParams
    showBookDetails(index: number) {
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
        } else {
            alert("Book details not found.");
        }
    }

    saveBook(e: Event) {
        e.preventDefault();

        const title = (document.getElementById("title") as HTMLInputElement).value;
        const author = (document.getElementById("author") as HTMLInputElement).value;
        const isbn = (document.getElementById("isbn") as HTMLInputElement).value;
        const pubDate = (document.getElementById("pub-date") as HTMLInputElement).value;
        const genre = (document.getElementById("genre") as HTMLInputElement).value;
        const price = (document.getElementById("price") as HTMLInputElement).value;
        const purchaseLink = (document.getElementById("purchase-link") as HTMLInputElement).value;
        const bookType = (document.getElementById("book-type") as HTMLInputElement).value;

        if (!validateISBN(isbn)) {
            alert("ISBN must contain only numeric characters.");
            return;
        }

        const books = JSON.parse(localStorage.getItem("books") || "[]");
        const editIndex = (document.getElementById("edit-index") as HTMLInputElement).value;

        if (editIndex !== "") {
            books[editIndex] = { title, author, isbn, pubDate, genre, price, purchaseLink, bookType };
        } else {
            books.push({ title, author, isbn, pubDate, genre, price, purchaseLink, bookType });
        }

        localStorage.setItem("books", JSON.stringify(books));
        alert("Book saved successfully!");
        window.location.href = "index.html";
    }

    init() {
        document.getElementById("book-form")?.addEventListener("submit", (e) => this.saveBook(e));

        this.searchBar?.addEventListener("input", (e) => {
            this.loadBooks((e.target as HTMLInputElement).value);
        });

        this.filterFiction?.addEventListener("click", () => this.loadBooks(this.searchBar!.value, "", "fiction"));
        this.filterNonFiction?.addEventListener("click", () => this.loadBooks(this.searchBar!.value, "", "non-fiction"));

        this.clearFiltersBtn?.addEventListener("click", () => {
            this.searchBar!.value = "";
            this.loadBooks();
        });

        this.sortAscBtn?.addEventListener("click", () => this.loadBooks(this.searchBar!.value, "asc"));
        this.sortDescBtn?.addEventListener("click", () => this.loadBooks(this.searchBar!.value, "desc"));

        this.loadBooks();
    }
}

const bookManager = new BookManager();

document.addEventListener("DOMContentLoaded", () => {
    BookManager.prefillForm();
});
