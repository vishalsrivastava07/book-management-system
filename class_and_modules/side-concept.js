"use strict";
//BaseBook now accepts two generic parameters: T for title and author, and U for price (defaulting to number).
//PrintedBook and EBook inherit these generics to support flexible data types.
// BaseBook class
class BaseBook {
    title;
    author;
    price;
    constructor({ title, author, price }) {
        this.title = title;
        this.author = author;
        this.price = price;
    }
    getBookDetails() {
        return `Title: ${this.title}, Author: ${this.author}, Price: $${this.price}`;
    }
}
// PrintedBook class extending BaseBook
class PrintedBook extends BaseBook {
    bookCondition;
    dimensions;
    coverType;
    constructor({ title, author, price, bookCondition, dimensions, coverType, }) {
        super({ title, author, price });
        this.bookCondition = bookCondition;
        this.dimensions = dimensions;
        this.coverType = coverType;
    }
    getPrintedBookDetails() {
        return `Printed Book - ${this.getBookDetails()}, Condition: ${this.bookCondition}, Dimensions: ${this.dimensions}, Cover Type: ${this.coverType}`;
    }
}
// EBook class extending BaseBook
class EBook extends BaseBook {
    fileSize;
    constructor({ title, author, price, fileSize }) {
        super({ title, author, price });
        this.fileSize = fileSize;
    }
    getEBookDetails() {
        return `EBook - ${this.getBookDetails()}, File Size: ${this.fileSize} MB`;
    }
}
