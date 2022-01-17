import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import Search from "./search";
import BookShelf from "./bookshelf";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class BooksApp extends React.Component {
    state = {
        showSearchPage: false,
    };

    render() {
        return (
            <BrowserRouter>
                <Route
                    render={({ location }) => (
                        <Switch location={location}>
                            <Route path="/" exact component={BookShelf}></Route>
                            <Route path="/search" component={Search}></Route>
                        </Switch>
                    )}
                />
            </BrowserRouter>
        );
    }
}

export default BooksApp;
