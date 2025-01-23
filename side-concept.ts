

// //The interface in this code serves as a blueprint for defining the structure of objects that represent books. 
// interface Book<T> {
//     title: T;
//     author: T;
//     isbn: T;
//     pubDate: T;
//     genre: T;
//     price: number;
//     purchaseLink: string;
//     bookType: string;
// }


// //BaseBook now accepts two generic parameters: T for title and author, and U for price (defaulting to number).
// //PrintedBook and EBook inherit these generics to support flexible data types.

// // BaseBook class
// class BaseBook<T, U = number> {
//     title: T;
//     author: T;
//     price: U;

//     constructor({ title, author, price }: { title: T; author: T; price: U }) {
//         this.title = title;
//         this.author = author;
//         this.price = price;
//     }

//     getBookDetails(): string {
//         return `Title: ${this.title}, Author: ${this.author}, Price: $${this.price}`;
//     }
// }

// // PrintedBook class extending BaseBook
// class PrintedBook<T, U = number> extends BaseBook<T, U> {
//     bookCondition: string;
//     dimensions: string;
//     coverType: string;

//     constructor({
//         title,
//         author,
//         price,
//         bookCondition,
//         dimensions,
//         coverType,
//     }: {
//         title: T;
//         author: T;
//         price: U;
//         bookCondition: string;
//         dimensions: string;
//         coverType: string;
//     }) {
//         super({ title, author, price });
//         this.bookCondition = bookCondition;
//         this.dimensions = dimensions;
//         this.coverType = coverType;
//     }

//     getPrintedBookDetails(): string {
//         return `Printed Book - ${this.getBookDetails()}, Condition: ${this.bookCondition}, Dimensions: ${this.dimensions}, Cover Type: ${this.coverType}`;
//     }
// }

// // EBook class extending BaseBook
// class EBook<T = string, U = number> extends BaseBook<T, U> {
//     fileSize: number;

//     constructor({ title, author, price, fileSize }: { title: T; author: T; price: U; fileSize: number }) {
//         super({ title, author, price });
//         this.fileSize = fileSize;
//     }

//     getEBookDetails(): string {
//         return `EBook - ${this.getBookDetails()}, File Size: ${this.fileSize} MB`;
//     }
// }




// //Logging Decorators

// // Logger decorator for methods

// // function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
// //             const originalMethod = descriptor.value;
        
// //             descriptor.value = function (...args: any[]) {
// //                 console.log(`Calling ${propertyKey} with arguments:`, args);
// //                 const result = originalMethod.apply(this, args);
// //                 if (result instanceof Promise) {
// //                     result.then(res => console.log(`Result from ${propertyKey}:`, res))
// //                         .catch(err => console.error(`Error in ${propertyKey}:`, err));
// //                 } else {
// //                     console.log(`Result from ${propertyKey}:`, result);
// //                 }
// //                 return result;
// //             };
        
// //             console.log(descriptor);
// //         }


// // // Logger decorator for constructors
// // function LogConstructor<T extends { new (...args: any[]): {} }>(constructor: T) {
// //     return class extends constructor {
// //         constructor(...args: any[]) {
// //             console.log(`Creating instance of ${constructor.name} with arguments:`, args);
// //             super(...args);
// //         }
// //     };
// // }



// // function logOfFetching(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
// //     const originalMethod = descriptor.value;

// //     descriptor.value = async function (...args: any[]) {
// //         console.log(`Calling method: ${propertyKey}`);
// //         console.log(`Arguments: ${JSON.stringify(args)}`);

// //         const start = Date.now();
// //         try {
// //             const result = await originalMethod.apply(this, args);
// //             const end = Date.now();
// //             console.log(`Execution time of ${propertyKey}: ${end - start}ms`);
// //             return result;
// //         } catch (error) {
// //             const end = Date.now();
// //             console.log(`Execution time of ${propertyKey}: ${end - start}ms`);
// //             console.error(`Error occurred in method ${propertyKey}:`, error);
// //             throw error;
// //         }
// //     };

// //     console.log(descriptor);
// // }



// // function LogMethod(): MethodDecorator {
// //     return (target: Object, propertyKey: string | symbol, descriptor: any): void => {
// //         const originalMethod = descriptor.value;

// //         if (typeof originalMethod === "function") {
// //             descriptor.value = function (...args: any[]) {
// //                 console.log(`Method: ${String(propertyKey)}`);
// //                 console.log(`Arguments: ${JSON.stringify(args)}`);
// //                 const result = originalMethod.apply(this, args);
// //                 console.log(`Result: ${JSON.stringify(result)}`);
// //                 return result;
// //             };
// //         }
// //     };
// // }