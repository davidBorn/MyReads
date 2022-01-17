import React, { useState, useEffect } from "react";
import ShelfSelector from "./ShelfSelector";
import propTypes from "prop-types";
import { get } from "./BooksAPI";

// Displays book item
const Books = (props) => {
    const { books, onMove, title, authors, shelf, thumbnail, book, bookid } =
        props;

    //Sets the bookshelf state of a book on when searched, "none" is set as the default state
    const [searchBookShelf, setSearchBookShelf] = useState("none");

    //Sets the bookshelf state of a book that is in search
    const getBookShelf = async (bookid) => {
        const abortCont = new AbortController();
        await get(bookid)
            .then((res) => res.json())
            .then((data) => setSearchBookShelf(data.book.shelf))
            .catch((err) => {
                if (err.name === "AbortError") {
                    console.log("Fetch Aborted");
                }
            });
        return () => abortCont.abort();
    };

    // useEffect utilizes the empty dependency array so that getBookShelf is only called once and does not create and infinite loop
    useEffect(() => {
        let didCancel = true;
        if (didCancel) {
            getBookShelf(bookid);
        }
        return () => (didCancel = false);
    }, []);

    return (
        <div className="book">
            <div className="book-top">
                {thumbnail !== "no image" ? (
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: 'url("' + thumbnail + '")',
                        }}
                    ></div>
                ) : (
                    <div
                        className="book-cover-placeholder"
                        style={{ width: 128, height: 193 }}
                    >
                        <p>no image available</p>
                    </div>
                )}
                <ShelfSelector
                    books={books}
                    onMove={onMove}
                    id={bookid}
                    shelf={shelf}
                    searchBookShelf={searchBookShelf}
                    book={book}
                ></ShelfSelector>
            </div>
            <div className="book-title">{title}</div>

            <div className="book-authors">
                {
                    // If there is only one author

                    authors !== undefined
                        ? authors.map((author) => {
                              let authorName = author.split(" ").join("-");
                              return <p key={authorName}>{author}</p>;
                          })
                        : authors
                }
            </div>
        </div>
    );
};

Books.propTypes = {
    books: propTypes.array,
    onMove: propTypes.func,
    title: propTypes.string,
    authors: propTypes.array,
    shelf: propTypes.string,
    thumbnail: propTypes.string,
    book: propTypes.object,
    bookid: propTypes.string,
};

export default Books;
