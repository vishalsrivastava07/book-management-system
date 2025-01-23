// // Core book interface
// interface Book {
//     title: string;
//     author: string;
//     isbn: string;
//     pubDate: string;
//     genre?: string;
//     price?: number;
//     getBookType(): string;
        // getPurchaseLink(): string;   
// }

// // E-book specific interface
// interface EBookDetails {
//     fileFormat: string;
//     downloadSize: number;
// }

// // Physical book specific interface
// interface PhysicalBookDetails {
//     bookBinding: string;
//     weight: number;
// }

// // E-book implementation
// class EBook implements Book, EBookDetails {
//     constructor(
//         public title: string,
//         public author: string,
//         public isbn: string,
//         public pubDate: string,
//         public fileFormat: string,
//         public downloadSize: number,
//         public genre?: string,
//         public price?: number,
//         private downloadLink?: string
//     ) {}

//     getBookType(): string {
//         return "E-Book";
//     }

//     getPurchaseLink(): string {
//         return this.downloadLink || "N/A";
//     }
// }

// // Physical book implementation
// class PhysicalBook implements Book, PhysicalBookDetails {
//     constructor(
//         public title: string,
//         public author: string,
//         public isbn: string,
//         public pubDate: string,
//         public bookBinding: string,
//         public weight: number,
//         public genre?: string,
//         public price?: number,
//         private storeLink?: string
//     ) {}

//     getBookType(): string {
//         return "Physical Book";
//     }

//     getPurchaseLink(): string {
//         return this.storeLink || "N/A";
//     }
// }

// // Book manager using interfaces
// class BookManager {
//     private books: Book[] = [];

//     addBook(book: Book): void {
//         this.books.push(book);
//     }

//     // Generic method to filter books by type
//     getBooksByType<T extends Book>(typeCheck: (book: Book) => book is T): T[] {
//         return this.books.filter(typeCheck);
//     }

//     // Method to display book details
//     displayBookDetails(book: Book): string {
//         return `
//             Title: ${book.title}
//             Author: ${book.author}
//             Type: ${book.getBookType()}
//             ISBN: ${book.isbn}
//             Publication Date: ${book.pubDate}
//             Genre: ${book.genre || 'N/A'}
//             Price: ${book.price ? `$${book.price}` : 'N/A'}
//         `;
//     }
// }

// // Type guard functions
// function isEBook(book: Book): book is EBook {
//     return book instanceof EBook;
// }

// function isPhysicalBook(book: Book): book is PhysicalBook {
//     return book instanceof PhysicalBook;
// }

// // Example usage
// const bookManager = new BookManager();

// const ebook = new EBook(
//     "TypeScript Mastery", 
//     "John Doe", 
//     "1234567890", 
//     "2024-01-15", 
//     "PDF", 
//     5.2, 
//     "Programming", 
//     29.99,
//     "https://example.com/download"
// );

// const physicalBook = new PhysicalBook(
//     "Clean Code", 
//     "Robert Martin", 
//     "0132350882", 
//     "2008-08-01", 
//     "Hardcover", 
//     1.2, 
//     "Programming", 
//     44.99,
//     "https://bookstore.com/cleancode"
// );

// bookManager.addBook(ebook);
// bookManager.addBook(physicalBook);

// // Demonstrating type-specific retrieval
// const eBooks = bookManager.getBooksByType(isEBook);
// const physicalBooks = bookManager.getBooksByType(isPhysicalBook);