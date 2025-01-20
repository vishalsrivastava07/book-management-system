"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseManager = void 0;
class BaseManager {
    constructor() {
        document.addEventListener("DOMContentLoaded", () => this.init());
    }
    fetchBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const localBooks = JSON.parse(localStorage.getItem("books") || "[]");
            try {
                const response = yield fetch("https://jsonplaceholder.typicode.com/posts");
                if (!response.ok)
                    throw new Error("Failed to fetch data from the server.");
                const apiBooks = yield response.json();
                return [
                    ...localBooks,
                    ...apiBooks.map((item) => ({
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
            }
            catch (error) {
                console.error("Error fetching books from server:", error);
                return localBooks;
            }
        });
    }
    calculateBookAge(pubDate) {
        const publicationDate = new Date(pubDate);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - publicationDate.getFullYear();
        return age > 0 ? `${age} year(s)` : "Less than a year";
    }
    init() { }
}
exports.BaseManager = BaseManager;
