import React from "react";
import { Link } from "react-router-dom";
import Bookcase from "./Bookcase";
import propTypes from "prop-types";

// Home page listing selected books in their respective bookshelves
const ListBooks = (props) => {
    const { books, onMove } = props;
    if (books !== "") {
        return (
            <div className="list-books">
                <section className="header-container">
                    <div className="list-books-title-container">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                    </div>
                </section>
                <Bookcase books={books} onMove={onMove} />
                <div className="open-search">
                    <Link to="/search">
                        <button>Add a book</button>
                    </Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="list-books">
                <p>No books to show</p>
                <div className="open-search">
                    <Link to="/search">
                        <button>Add a book</button>
                    </Link>
                </div>
            </div>
        );
    }
};

ListBooks.propTypes = {
    books: propTypes.array,
    onMove: propTypes.func,
};

export default ListBooks;
