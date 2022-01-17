import React from "react";
import Books from "./Books";
import propTypes from "prop-types";

// Bookcase component displays books in their respective selected bookshelves
const Bookcase = (props) => {
    //Destructure passed down props
    const { books, onMove } = props;
    //Return books in their respective bookshelves
    return (
        <div className="list-books-content">
            <div>
                <div className="bookshelf currentlyReading">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books
                                .filter(
                                    (book) => book.shelf === "currentlyReading"
                                )
                                .map((book) => (
                                    <li key={book.id}>
                                        <Books
                                            books={books}
                                            onMove={onMove}
                                            title={book.title}
                                            authors={book.authors}
                                            shelf={book.shelf}
                                            thumbnail={
                                                book.imageLinks
                                                    ? book.imageLinks
                                                          .smallThumbnail
                                                    : "no image"
                                            }
                                            book={book}
                                            bookid={book.id}
                                        ></Books>
                                    </li>
                                ))}
                        </ol>
                    </div>
                </div>
                <div className="bookshelf wantToRead">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books
                                .filter((book) => book.shelf === "wantToRead")
                                .map((book) => (
                                    <li key={book.id}>
                                        <Books
                                            books={books}
                                            onMove={onMove}
                                            title={book.title}
                                            authors={book.authors}
                                            shelf={book.shelf}
                                            thumbnail={
                                                book.imageLinks
                                                    ? book.imageLinks
                                                          .smallThumbnail
                                                    : "no image"
                                            }
                                            book={book}
                                            bookid={book.id}
                                        ></Books>
                                    </li>
                                ))}
                        </ol>
                    </div>
                </div>
                <div className="bookshelf read">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books
                                .filter((book) => book.shelf === "read")
                                .map((book) => (
                                    <li key={book.id}>
                                        <Books
                                            books={books}
                                            onMove={onMove}
                                            title={book.title}
                                            authors={book.authors}
                                            shelf={book.shelf}
                                            thumbnail={
                                                book.imageLinks
                                                    ? book.imageLinks
                                                          .smallThumbnail
                                                    : "no image"
                                            }
                                            book={book}
                                            bookid={book.id}
                                        ></Books>
                                    </li>
                                ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

Bookcase.propTypes = {
    books: propTypes.array,
    onMove: propTypes.func,
};

export default Bookcase;
