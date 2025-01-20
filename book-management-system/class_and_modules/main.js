"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bookManager_1 = require("./bookManager");
const bookManager = new bookManager_1.BookManager();
document.addEventListener("DOMContentLoaded", () => {
    bookManager_1.BookManager.prefillForm();
});
