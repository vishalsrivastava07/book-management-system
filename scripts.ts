// Types
interface Book {
    title?: string | null;
    author?: string | null;
    isbn?: string | null;
    pubDate: string;
    genre?: string | null;
    price?: number | null;
    purchaseLink?: string | null;
    bookType?: string | null;
    isLocal?: boolean;
}

// Main Book Manager Class
class BookManager {

    private readonly STORAGE_KEY = "books";
    private readonly API_URL = "https://jsonplaceholder.typicode.com/posts";
    private allBooks: Book[] = [];
    private currentSearchTerm: string = "";
    private currentGenreFilter: string = "";
    private currentSortOption: string = "";
    static prefillForm: any;

    // Initialize books from both local storage and API
    async initializeBooks(): Promise<Book[]> {
        try {
            const localBooks = this.getLocalBooks();
            const apiBooks = await this.fetchApiBooks();
            this.allBooks = [...localBooks, ...apiBooks];
            return this.filterAndSortBooks();
        } catch (error) {
            console.error("Error initializing books:", error);
            this.allBooks = this.getLocalBooks();
            return this.filterAndSortBooks();
        }
    }

    // Book validation methods
    validateBook(book: Partial<Book>): string[] {
        const errors: string[] = [];
        if (!book.title) errors.push("Title is required");
        if (!book.author) errors.push("Author is required");
        if (!book.isbn) errors.push("ISBN is required");
        if (!this.validateISBN(book.isbn || "")) errors.push("ISBN must contain only numeric characters");
        return errors;
    }

    private validateISBN(isbn: string): boolean {
        return /^\d+$/.test(isbn);
    }

    getLocalBooks(): Book[] {  // Changed to public
        const books = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
        return books.map((book: Book) => ({ ...book, isLocal: true }));
    }

    saveBooks(books: Book[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books));
    }

    addBook(book: Book): void {
        const books = this.getLocalBooks();
        books.push(book);
        this.saveBooks(books);
        this.allBooks = [...books, ...this.allBooks.filter(b => !b.isLocal)];
    }

    updateBook(index: number, book: Book): void {
        const books = this.getLocalBooks();
        books[index] = { ...book, isLocal: true };  // Ensure isLocal is set
        this.saveBooks(books);
        this.allBooks = [...books, ...this.allBooks.filter(b => !b.isLocal)];
    }

    deleteBook(index: number): void {
        const books = this.getLocalBooks();
        books.splice(index, 1);
        this.saveBooks(books);
        this.allBooks = [...books, ...this.allBooks.filter(b => !b.isLocal)];
    }

    // API methods
    private async fetchApiBooks(): Promise<Book[]> {
        try {
            const response = await fetch(this.API_URL);
            if (!response.ok) throw new Error("Failed to fetch data from the server.");

            const apiBooks = await response.json();
            return apiBooks.map((item: any) => ({
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
        } catch (error) {
            console.error("Error fetching books from server:", error);
            return [];
        }
    }

    // Book age calculation
    calculateBookAge(pubDate: string): string {
        const publicationDate = new Date(pubDate);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - publicationDate.getFullYear();
        return age > 0 ? `${age} year(s)` : "Less than a year";
    }

    // Filter and sort methods
    setSearchTerm(term: string): void {
        this.currentSearchTerm = term;
    }

    setGenreFilter(filter: string): void {
        this.currentGenreFilter = filter;
    }

    setSortOption(option: string): void {
        this.currentSortOption = option;
    }

    resetFilters(): void {
        this.currentSearchTerm = "";
        this.currentGenreFilter = "";
        this.currentSortOption = "";
    }

    private filterAndSortBooks(): Book[] {
        let filtered = this.filterBooks();
        return this.sortBooks(filtered);
    }

    private filterBooks(): Book[] {
        return this.allBooks.filter(book => {
            const searchMatch = this.matchesSearchTerm(book);
            const genreMatch = this.matchesGenre(book);
            return searchMatch && genreMatch;
        });
    }

    private matchesSearchTerm(book: Book): boolean {
        if (!this.currentSearchTerm) return true;
        const searchLower = this.currentSearchTerm.toLowerCase();
        return (
            String(book.title || "").toLowerCase().includes(searchLower) ||
            String(book.author || "").toLowerCase().includes(searchLower) ||
            String(book.genre || "").toLowerCase().includes(searchLower)
        );
    }

    private matchesGenre(book: Book): boolean {
        if (!this.currentGenreFilter) return true;
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

    private sortBooks(books: Book[]): Book[] {
        if (!this.currentSortOption) return books;
        
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
    private bookManager: BookManager;
    private bookList: HTMLElement;

    constructor(bookListElement: HTMLElement) {
        this.bookManager = new BookManager();
        this.bookList = bookListElement;
        this.initializeEventListeners();
        this.initializeBooks();
    }

    private async initializeBooks(): Promise<void> {
        const books = await this.bookManager.initializeBooks();
        this.renderBooks(books);
    }

    private renderBooks(books: Book[]): void {
        this.bookList.innerHTML = "";
        
        if (books.length === 0) {
            this.bookList.innerHTML = "<tr><td colspan='8'>No books found.</td></tr>";
            return;
        }

        books.forEach((book, index) => this.renderBookRow(book, index));
    }

    private renderBookRow(book: Book, index: number): void {
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
    handleFormSubmit(e: Event): void {
        e.preventDefault();
        const formData = this.getFormData();
        const errors = this.bookManager.validateBook(formData);

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        const editIndex = (document.getElementById("edit-index") as HTMLInputElement).value;

        if (editIndex !== "") {
            this.bookManager.updateBook(parseInt(editIndex), formData as Book);
        } else {
            this.bookManager.addBook(formData as Book);
        }

        alert("Book saved successfully!");
        window.location.href = "index.html";
    }

    prefillForm(): void {
        const editData = JSON.parse(localStorage.getItem("editBook") || "{}");
        if (!editData.book) return;

        const { book, index } = editData;
        Object.entries(book).forEach(([key, value]) => {
            const element = document.getElementById(key) as HTMLInputElement;
            if (element) element.value = value as string;
        });
        
        (document.getElementById("edit-index") as HTMLInputElement).value = index;
        localStorage.removeItem("editBook");
    }

    private getFormData(): Partial<Book> {
        return {
            title: (document.getElementById("title") as HTMLInputElement).value,
            author: (document.getElementById("author") as HTMLInputElement).value,
            isbn: (document.getElementById("isbn") as HTMLInputElement).value,
            pubDate: (document.getElementById("pub-date") as HTMLInputElement).value,
            genre: (document.getElementById("genre") as HTMLInputElement).value,
            price: parseFloat((document.getElementById("price") as HTMLInputElement).value),
            purchaseLink: (document.getElementById("purchase-link") as HTMLInputElement).value,
            bookType: (document.getElementById("book-type") as HTMLInputElement).value
        };
    }

    private initializeEventListeners(): void {
        // Search
        const searchBar = document.getElementById("search-bar") as HTMLInputElement;
        searchBar?.addEventListener("input", (e) => {
            this.bookManager.setSearchTerm((e.target as HTMLInputElement).value);
            this.initializeBooks();
        });

        document.getElementById("book-form")?.addEventListener("submit", (e) => this.handleFormSubmit(e));


        // Filters
        document.getElementById("filter-fiction")?.addEventListener("click", () => {
            this.bookManager.setGenreFilter("fiction");
            this.initializeBooks();
        });

        document.getElementById("filter-non-fiction")?.addEventListener("click", () => {
            this.bookManager.setGenreFilter("non-fiction");
            this.initializeBooks();
        });

        document.getElementById("clear-filters")?.addEventListener("click", () => {
            this.bookManager.resetFilters();
            if (searchBar) searchBar.value = "";
            this.initializeBooks();
        });

        // Sorting
        document.getElementById("sort-asc")?.addEventListener("click", () => {
            this.bookManager.setSortOption("asc");
            this.initializeBooks();
        });

        document.getElementById("sort-desc")?.addEventListener("click", () => {
            this.bookManager.setSortOption("desc");
            this.initializeBooks();
        });

        // Book actions
        document.addEventListener("click", async (e) => {
            const target = e.target as HTMLElement;
            if (!target.dataset.index) return;

            const index = parseInt(target.dataset.index);
            if (target.classList.contains("edit-btn")) this.handleEdit(index);
            if (target.classList.contains("delete-btn")) this.handleDelete(index);
            if (target.classList.contains("details-btn")) this.handleDetails(index);
        });
    }
    saveBooks(): any {
        throw new Error("Method not implemented.");
    }

    private handleEdit(index: number): void {
        const books = this.bookManager.getLocalBooks();
        localStorage.setItem("editBook", JSON.stringify({ book: books[index], index }));
        window.location.href = "add-book.html";
    }

    private async handleDelete(index: number): Promise<void> {
        this.bookManager.deleteBook(index);
        await this.initializeBooks();
    }

    private async handleDetails(index: number): Promise<void> {
        const books = await this.bookManager.initializeBooks();
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