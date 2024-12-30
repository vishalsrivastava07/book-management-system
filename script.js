//3. Implement Basic Data Manipulation (Add, Edit, Delete Books)
// Store books in memory
let books = [];

// Add Book
const addBook = (book) => {
    books.push(book);
    displayBooks();
};

// Edit Book
const editBook = (index, updatedBook) => {
    books[index] = updatedBook;
    displayBooks();
};

// Delete Book
const deleteBook = (index) => {
    books.splice(index, 1);
    displayBooks();
};

// Display Books in Table
const displayBooks = () => {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    books.forEach((book, index) => {
        const bookRow = `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td>${book.publicationDate}</td>
                <td>${book.genre}</td>
                <td>
                    <button onclick="editBookPrompt(${index})">Edit</button>
                    <button onclick="deleteBook(${index})">Delete</button>
                </td>
            </tr>
        `;
        bookList.innerHTML += bookRow;
    });
};

// Handle Edit Prompt
const editBookPrompt = (index) => {
    const book = books[index];
    const updatedBook = {
        title: prompt("Edit Title:", book.title) || book.title,
        author: prompt("Edit Author:", book.author) || book.author,
        isbn: prompt("Edit ISBN:", book.isbn) || book.isbn,
        publicationDate: prompt("Edit Publication Date:", book.publicationDate) || book.publicationDate,
        genre: prompt("Edit Genre:", book.genre) || book.genre,
    };
    editBook(index, updatedBook);
};

//4. Implement Business Logic -> Calculate Book Age , Categorize Books by Genre
const calculateBookAge = (publicationDate) => {
    const currentYear = new Date().getFullYear();
    const publicationYear = new Date(publicationDate).getFullYear();
    return currentYear - publicationYear;
};
const categorizeBooks = () => {
    const genres = books.reduce((categories, book) => {
        if (!categories[book.genre]) {
            categories[book.genre] = [];
        }
        categories[book.genre].push(book);
        return categories;
    }, {});
    console.log("Books Categorized by Genre:", genres);
};


//1. Add JavaScript to Validate Form Inputs
//2. Use ES6 Features to Refactor Code  -> Form Submission
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const isbn = document.getElementById("isbn").value.trim();
    const publicationDate = document.getElementById("publication-date").value;
    const genre = document.getElementById("genre").value;

    if (!title || !author || !isbn || !publicationDate || !genre) {
        alert("All fields are required!");
        return;
    }

    if (isNaN(isbn)) {
        alert("ISBN must be a number!");
        return;
    }

    addBook({ title, author, isbn, publicationDate, genre });
    document.querySelector("form").reset();
});
