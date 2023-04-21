import './App.css';
import './tailwind.css';
import './tailwind.output.css';
import React from 'react';
import {Footer} from './layouts/NavBarAndFooter/Footer';
import {Navbar} from './layouts/NavBarAndFooter/Navbar';
import {BookCheckoutPage} from './layouts/BookCheckOutPage/BookCheckOutPage';
import {HomePage} from './layouts/HomePage/HomePage';
import {SearchBooksPage} from './layouts/SearchBooksPage/SearchBooksPage';

import {Redirect, Route, Switch, useHistory} from 'react-router-dom';

import {ReviewListPage} from './layouts/BookCheckOutPage/ReviewListPage/ReviewListPage';
import {ShelfPage} from './layouts/ShelfPage/ShelfPage';
import {MessagesPage} from './layouts/MessagesPage/MessagesPage';
import {ManageLibraryPage} from './layouts/ManageLibraryPage/ManageLibraryPage';
import {useAuth} from "./Auth/AuthContext";


export const App = () => {
    // custom auth handler
    const customAuthHandler = () => {
        history.push('/login');
    };
    const history = useHistory();
    const {isAuthenticated} = useAuth()


    // @ts-ignore
    // @ts-ignore
    return (
        <div className={'d-flex flex-column min-vh-100'}>
            <React.Fragment

            >
                <Navbar/>

                <div className={'flex-grow-1'}>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to="/home"/>
                        </Route>
                        <Route path="/home">
                            <HomePage/>
                        </Route>
                        <Route path="/search">
                            <SearchBooksPage/>
                        </Route>
                        <Route path="/reviewlist/:bookId">
                            <ReviewListPage/>
                        </Route>
                        <Route path="/checkout/:bookId">
                            <BookCheckoutPage/>
                        </Route>
                        <Route path="/shelf">
                            <ShelfPage isAuthenticated={isAuthenticated}/>
                        </Route>
                        <Route path="/messages">
                            < MessagesPage/>
                        </Route>
                        <Route path="/admin">
                            <ManageLibraryPage isAuthenticated={isAuthenticated}/>
                        </Route>
                    </Switch>
                </div>
                <Footer/>
            </React.Fragment>
        </div>
    );
};
