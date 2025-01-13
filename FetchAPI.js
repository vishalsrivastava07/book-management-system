

// //Fetch data from an external API

async function getData(){
    const url = 'https://jsonplaceholder.typicode.com/todos/2';
    const response = await fetch(url);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
}
getData();

// // // //Simulate a server request using promises 
// // // const simulateServerRequest = () =>{
// // //     return new Promise((resolve, reject) =>{
// // //         setTimeout(()=>{
// // //             const data = [
// // //                 {title: "book 1", author: "Author 1", isbn:"1", publicationDate: "2024-12-01", genre: "Fiction"},
// // //                 {title: "book 2", author: "Author 2", isbn:"2", publicationDate: "2025-12-01", genre: "Non-Fiction"},
// // //             ];
// // //             const success = true;
// // //             if(success){
// // //                 resolve(data);
// // //             }else{
// // //                 reject("Failed to fetch books from the database/server");
// // //             }
// // //         }, 2000);
// // //     });
// // // };

// // // const fetchBookWithErrorHandling = async()=>{
// // //     try{
// // //         const serverBooks = await simulateServerRequest();
// // //         books = serverBooks;
// // //         displayBooks();
// // //         console.log("Fetched Successfully");
// // //     }catch(serverError){
// // //         console.error("serverError");
// // //         console.log("Error: Unable to load");
// // //     }

// // //     await getData();
// // // };

// // // const searchBook = async(search)=>{
// // //     return books.filter((book)=> 
// // //         book.title.toLowerCase().includes(search.toLowerCase())
// // //     );
// // // };

// // // const filterBookByGenre = async(genre)=>{
// // //     return books.filter((book)=> book.genre.toLowerCase()==genre.toLowerCase());
// // // };

// const express = require("express");
// const axios = require("axios");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(bodyParser.json());

// //Fetch function from the external API
// async function fetchBooks(){
//     try{
//         const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
//         return response.data;
//     }
//     catch(error){
//         throw new error("Error from the fetching data");
//     }
// }
// // Route to handle search, filtering, and pagination
// app.get("/books", async (req, res) => {
//     try {
//       const { page = 1, limit = 10, search, userId, completed } = req.query;
  
//       // Fetch data from external API
//       const books = await fetchBooks();
  
//       // Apply filtering
//       let filteredBooks = books;
//       if (search) {
//         filteredBooks = filteredBooks.filter((book) =>
//           book.title.toLowerCase().includes(search.toLowerCase())
//         );
//       }
//       if (userId) {
//         filteredBooks = filteredBooks.filter((book) => book.userId === Number(userId));
//       }
//       if (completed !== undefined) {
//         filteredBooks = filteredBooks.filter(
//           (book) => book.completed === (completed === "true")
//         );
//       }
  
//       // Pagination logic
//       const startIndex = (page - 1) * limit;
//       const paginatedBooks = filteredBooks.slice(startIndex, startIndex + Number(limit));
  
//       // Send response
//       res.status(200).json({
//         total: filteredBooks.length,
//         currentPage: Number(page),
//         totalPages: Math.ceil(filteredBooks.length / limit),
//         books: paginatedBooks,
//       });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  
//   // Start the server
//   app.listen(3000, () => {
//     console.log("Server running on http://localhost:3000");
//   });













































