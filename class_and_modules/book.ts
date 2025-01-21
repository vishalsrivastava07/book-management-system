export class BaseBook {
    title: string;
    author: string;
    price: number;

    constructor({ title, author, price }: { title: string, author: string, price: number }) {
        this.title = title;
        this.author = author;
        this.price = price;
    }

    getBookDetails(): string {
        return `Title: ${this.title}, Author: ${this.author}, Price: $${this.price}`;
    }
}

export class PrintedBook extends BaseBook {
    bookCondition: string;
    dimensions: string;
    coverType: string;

    constructor({ title, author, price, bookCondition, dimensions, coverType }: 
        { title: string, author: string, price: number, bookCondition: string, dimensions: string, coverType: string }) {
        super({ title, author, price });
        this.bookCondition = bookCondition;
        this.dimensions = dimensions;
        this.coverType = coverType;
    }

    getPrintedBookDetails(): string {
        return `Printed Book - ${this.getBookDetails()}, Condition: ${this.bookCondition}, Dimensions: ${this.dimensions}, Cover Type: ${this.coverType}`;
    }
}

export class EBook extends BaseBook {
    fileSize: number;

    constructor({ title, author, price, fileSize }: { title: string, author: string, price: number, fileSize: number }) {
        super({ title, author, price });
        this.fileSize = fileSize;
    }

    getEBookDetails(): string {
        return `EBook - ${this.getBookDetails()}, File Size: ${this.fileSize} MB`;
    }
}
