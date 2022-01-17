import React, { useEffect, useState, useRef } from "react";
import { update, api, headers } from "./BooksAPI";
import ListBooks from "./list-books";

// Component gathers all books and passes the data down to the ListBooks component
const BookShelf = () => {
    const [allBooks, setAllBooks] = useState("");
    const booksRef = useRef("");

    const moveBook = (currbook, shelf) => {
        let didCancel = false;
        async function updateData() {
            if (!didCancel) {
                await update(currbook, shelf);
                getData();
            }
        }
        updateData();
        return () => {
            didCancel = true;
        };
    };

    const getData = async () => {
        const response = await fetch(`${api}/books`, { headers });
        const newData = await response.json();
        booksRef.current = newData;
        if (allBooks !== booksRef.current) {
            setAllBooks(newData);
        } else {
            return;
        }
    };

    useEffect((prevCount) => {
        getData();
    }, []);

    if (allBooks) {
        return <ListBooks books={allBooks.books} onMove={moveBook} />;
    } else {
        return null;
    }
};

export default BookShelf;
