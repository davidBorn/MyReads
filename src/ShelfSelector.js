import React, { useEffect, useState } from "react";
import propTypes from "prop-types";

const ShelfSelector = (props) => {
    const { onMove, shelf, searchBookShelf, book } = props;
    const [value, setValue] = useState(searchBookShelf);

    // When a new bookshelf is selected this will change the 'select' value with 'setValue' and update the books shelf with the onMove function
    const handleChange = (event) => {
        setValue(event.target.value);
        onMove(book, event.target.value);
    };
    useEffect(() => {
        setValue(searchBookShelf);
    }, [searchBookShelf]);

    return (
        <div className="book-shelf-changer">
            <select value={shelf ? shelf : value} onChange={handleChange}>
                <option value="move" disabled>
                    Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    );
};

ShelfSelector.propTypes = {
    onMove: propTypes.func,
    shelf: propTypes.string,
    searchBookShelf: propTypes.string,
    book: propTypes.object,
};

export default ShelfSelector;
