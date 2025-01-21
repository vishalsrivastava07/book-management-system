export class BaseManager {
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

    calculateBookAge(pubDate: string): string {
        const publicationDate = new Date(pubDate);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - publicationDate.getFullYear();
        return age > 0 ? `${age} year(s)` : "Less than a year";
    }

    init() {}
}
