"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBook = exports.PrintedBook = exports.BaseBook = void 0;
class BaseBook {
    constructor({ title, author, price }) {
        this.title = title;
        this.author = author;
        this.price = price;
    }
    getBookDetails() {
        return `Title: ${this.title}, Author: ${this.author}, Price: $${this.price}`;
    }
}
exports.BaseBook = BaseBook;
class PrintedBook extends BaseBook {
    constructor({ title, author, price, bookCondition, dimensions, coverType }) {
        super({ title, author, price });
        this.bookCondition = bookCondition;
        this.dimensions = dimensions;
        this.coverType = coverType;
    }
    getPrintedBookDetails() {
        return `Printed Book - ${this.getBookDetails()}, Condition: ${this.bookCondition}, Dimensions: ${this.dimensions}, Cover Type: ${this.coverType}`;
    }
}
exports.PrintedBook = PrintedBook;
class EBook extends BaseBook {
    constructor({ title, author, price, fileSize }) {
        super({ title, author, price });
        this.fileSize = fileSize;
    }
    getEBookDetails() {
        return `EBook - ${this.getBookDetails()}, File Size: ${this.fileSize} MB`;
    }
}
exports.EBook = EBook;
