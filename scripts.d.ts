interface BookCore {
    title: string;
    author: string;
}
interface BookIdentification {
    isbn: string;
    genre: string;
}
interface PublicationDetails {
    pubDate: string;
    bookType: string;
}
interface BookCommerce {
    price: number;
    purchaseLink: string;
}
interface BookMetadata {
    isLocal: boolean;
}
interface Book extends BookCore, BookIdentification, PublicationDetails, BookCommerce, BookMetadata {
}
declare class BookManager {
    private readonly STORAGE_KEY;
    private readonly API_URL;
    private allBooks;
    private currentSearchTerm;
    private currentGenreFilter;
    private currentSortOption;
    static prefillForm: any;
    initializeBooks(): Promise<Book[]>;
    validateBook(book: Partial<Book>): string[];
    private validateISBN;
    getLocalBooks(): Book[];
    saveBooks(books: Book[]): void;
    addBook(book: Book): void;
    updateBook(index: number, book: Book): void;
    deleteBook(index: number): void;
    private fetchApiBooks;
    calculateBookAge(pubDate: string): string;
    setSearchTerm(term: string): void;
    setGenreFilter(filter: string): void;
    setSortOption(option: string): void;
    resetFilters(): void;
    private filterAndSortBooks;
    private filterBooks;
    private matchesSearchTerm;
    private matchesGenre;
    private sortBooks;
}
declare class BookRenderer {
    private bookManager;
    private bookList;
    constructor(bookListElement: HTMLElement);
    private initializeBooks;
    private renderBooks;
    private renderBookRow;
    handleFormSubmit(e: Event): void;
    prefillForm(): void;
    private getFormData;
    private initializeEventListeners;
    saveBooks(): any;
    private handleEdit;
    private handleDelete;
    private handleDetails;
}
