import { BookManager } from './bookManager';

const bookManager = new BookManager();

document.addEventListener("DOMContentLoaded", () => {
    BookManager.prefillForm();
});
