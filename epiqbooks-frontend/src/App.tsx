import './App.css';
import './tailwind.css';
import './tailwind.output.css';
import React from 'react';
import { Footer } from './layouts/NavBarAndFooter/Footer';
import { Navbar } from './layouts/NavBarAndFooter/Navbar';
import { BookCheckoutPage } from './layouts/BookCheckOutPage/BookCheckOutPage';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';

import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { ReviewListPage } from './layouts/BookCheckOutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';
import { MessagesPage } from './layouts/MessagesPage/MessagesPage';
import { ManageLibraryPage } from './layouts/ManageLibraryPage/ManageLibraryPage';
import { AuthProvider } from './Auth/AuthContext';

export const App = () => {
  const history = useHistory();

  return (
    <div className={'d-flex flex-column min-vh-100'}>
      <AuthProvider>
        <Navbar />

        <div className={'flex-grow-1'}>
          <Switch>
            <Route path='/' exact>
              <Redirect to='/home' />
            </Route>

            <Route path='/home'>
              <HomePage />
            </Route>
            <Route path='/search'>
              <SearchBooksPage />
            </Route>
            <Route path='/reviewlist/:bookId'>
              <ReviewListPage />
            </Route>
            <Route path='/checkout/:bookId'>
              <BookCheckoutPage />
            </Route>
            <Route path='/shelf'>
              <ShelfPage />
            </Route>
            <Route path='/messages'>
              <MessagesPage />
            </Route>
            <Route path='/admin'>
              <ManageLibraryPage />
            </Route>
          </Switch>
        </div>
        <Footer />
      </AuthProvider>
    </div>
  );
};
