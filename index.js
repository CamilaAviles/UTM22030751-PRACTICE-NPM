import { readFile, updateFile, sendResponse } from "./fileUtils.js";

// getBook
const getBook = (titleOrISBN) => {
  try {
    const books = readFile("books-test.json");

    const book = books.find(
      (currentBook) =>
        currentBook.ISBN === titleOrISBN || currentBook.title === titleOrISBN
    );

    if (!book) return "Book not found";

    return book;
  } catch (error) {
    console.error("Error:", error);
    return sendResponse(500, error);
  }
};

// getBooks 
const getBooks = () => {
  try {
    const books = readFile("books-test.json");
    return sendResponse(200, books);
  } catch (error) {
    console.error("Error:", error);
    return sendResponse(500, error);
  }
};


// addBook
const addBook = (title, ISBN, year, genre, author, stock, publisher) => {
  try {
    const books = readFile("books.json");
    let exists = books.some(book => book.ISBN === ISBN);
    if (exists) {
      return sendResponse(400);
    } else {
      const newBook = { "title": title, "ISBN": ISBN, "year": year, "genre": genre, "author": author, "stock": stock, "publisher": publisher };
      books.push(newBook);
      updateFile("books.json", books);
      console.log("New book added:", newBook);
      return sendResponse(200, newBook);
    }
  } catch (error) {
    console.error("Error:", error);
    return sendResponse(500, error);
  }
}

// removeBookByTitleOrISBN
const removeBookByTitleOrISBN = (titleOrISBN) => {
  try {
    let books = readFile("books.json");
    const index = books.findIndex(book => book.title === titleOrISBN || book.ISBN === titleOrISBN);
    if (index !== -1) {
      const deletedBook = books.splice(index, 1)[0];
      updateFile("books.json", books);
      console.log("Book removed successfully:", deletedBook);
      return sendResponse(200, { deletedBook, books });
    } else {
      console.log("Book not found");
      return sendResponse(404);
    }
  } catch (error) {
    console.error("Error:", error);
    return sendResponse(500, error);
  }
};

// filterBy
const filterBy = (property, value) => {
  try {
    const books = readFile("books.json");
    const filteredBooks = books.filter(book => book[property] === value);
    return sendResponse(200, filteredBooks);
  } catch (error) {
    console.error("Error:", error);
    return sendResponse(500, error);
  }
};

// listBooks
const listBooks = () => {
  try {
    const books = readFile("books.json");
    const formattedBooks = books.map(book => `${book.title} - ${book.author} - ${book.year}`);
    return sendResponse(200, formattedBooks);
  } catch (error) {
    console.error("Error:", error);
    return sendResponse(500, error);
  }
};

// getBooksByYear
const getBooksByYear = (year) => {
  try {
    const books = readFile("books.json");
    const filteredBooks = books.filter(book => book.year === year);
    return sendResponse(200, filteredBooks);
  } catch (error) {
    console.error("Error:", error);
    return sendResponse(500, error);
  }
};

// genreFullAvailability
const genreFullAvailability = (genre) => {
  try {
    const books = readFile("books.json");
    const isAvailable = books.every(book => book.genre === genre && book.stock > 0);
    return sendResponse(200, isAvailable);
  } catch (error) {
    console.error("Error:", error);
    return sendResponse(500, error);
  }
};

// genrePartialAvailability
const genrePartialAvailability = (genre) => {
  try {
    const books = readFile("books.json");
    const isAvailable = books.some(book => book.genre === genre && book.stock > 0);
    return sendResponse(200, isAvailable);
  } catch (error) {
    console.error("Error:", error);
    return sendResponse(500, error);
  }
};

// getCountBy
const getCountBy = (property) => {
  try {
    const books = readFile("books.json");
    const countByProperty = books.reduce((acc, book) => {
      acc[book[property]] = (acc[book[property]] || 0) + 1;
      return acc;
    }, {});
    return sendResponse(200, countByProperty);
  } catch (error) {
    console.error("Error:", error);
    return sendResponse(500, error);
  }
};

// updateBookByTitle
const updateBookTitle = (isbn, title) => {
  try {
    const books = readFile("books-test.json");
    let updatedBook;
    const newBooks = books.map((book) => {
      if (book.ISBN === isbn) {
        updatedBook = { ...book, title };
        return updatedBook;
      }

      return book;
    });

    updateFile("books-test.json", newBooks);
    return updatedBook;
  } catch (error) {
    console.error("Error:", error);
    return sendResponse(500, error);
  }
};

function main() {
  const args = process.argv.slice(2);

  const endpoint = args[0];

  switch (endpoint) {
    case "getBook":
      const titleOrISBN = args[1];
      console.log(getBook(titleOrISBN));
      break;
    case "removeBookByTitleOrISBN":
      const titleOrISBNToRemove = args[1];
      console.log(removeBookByTitleOrISBN(titleOrISBNToRemove));
      break;
    case "filterBy":
      const property = args[1];
      const value = args[2];
      console.log(filterBy(property, value));
      break;
    case "listBooks":
      console.log(listBooks());
      break;
    case "getBooksByYear":
      const year = parseInt(args[1]);
      console.log(getBooksByYear(year));
      break;
    case "genreFullAvailability":
      const genreFull = args[1];
      console.log(genreFullAvailability(genreFull));
      break;
    case "genrePartialAvailability":
      const genrePartial = args[1];
      console.log(genrePartialAvailability(genrePartial));
      break;
    case "getCountBy":
      const propertyCount = args[1];
      console.log(getCountBy(propertyCount));
      break;
    default:
      console.log("Endpoint not valid");
  }
}

main();

