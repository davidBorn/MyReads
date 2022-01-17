import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { search, update } from "./BooksAPI";
import Books from "./Books";

// Search component queries for books and passes books data down to Books component
const Search = () => {
    const [queriedBooks, setQueriedBooks] = useState("");
    const [enteredQuery, setEnteredQuery] = useState("");

    // Get Book Data based on the Users query
    const handleChange = async (query) => {
        setEnteredQuery(query);
    };

    // Sets queried books data, if the query is blank then the state for the queried books is set to an empty string.
    useEffect(() => {
        let didCancel = false;
        //use setTimeout for bouncing
        const identifier = setTimeout(async () => {
            if (enteredQuery !== "") {
                const response = await search(enteredQuery);
                const responseData = await response.json();
                if (!didCancel) {
                    setQueriedBooks(responseData.books);
                }
            } else {
                setQueriedBooks("");
            }
        }, 500);
        return () => {
            didCancel = true;
            clearTimeout(identifier);
        };
    }, [enteredQuery]);

    //moveBook function updates the shelf state of a book if a different bookshelf is selected
    const moveBook = (currbook, shelf) => {
        let didCancel = false;
        async function updateData() {
            await update(currbook, shelf);
        }
        if (!didCancel) {
            updateData();
        }
        return () => (didCancel = true);
    };

    if (queriedBooks === "" || queriedBooks === undefined) {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" exact="true">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => {
                                handleChange(event.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <p>No Keywords Entered</p>
                </div>
            </div>
        );
    } else if (queriedBooks.items && queriedBooks.items.length === 0) {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" exact="true">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => {
                                handleChange(event.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <p>No results found with those keywords</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" exact="true">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => {
                                handleChange(event.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {queriedBooks.map((book) => (
                            <li key={book.id}>
                                <Books
                                    books={queriedBooks}
                                    onMove={moveBook}
                                    title={book.title}
                                    authors={book.authors}
                                    shelf={book.shelf}
                                    thumbnail={
                                        book.imageLinks
                                            ? book.imageLinks.smallThumbnail
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
        );
    }
};
export default Search;
