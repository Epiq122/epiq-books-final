import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {LoadingSpinner} from '../Utils/LoadingSpinner';
import {useAuth} from "../../Auth/AuthContext";

export function Navbar() {

    const {isAuthenticated, logout, user, login} = useAuth()

    // this is because it takes sometime to start up
    if (!isAuthenticated) {
        return <LoadingSpinner/>;
    }
    const handleLogout = async () => logout();
    console.log(user);


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-5">
            {/* cuts off the corners of the page a little bit */}
            <div className="container-fluid">
                <span className="navbar-brand">Epiq Books</span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropDown"
                    aria-controls="navbarNavDropDown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="navbar-collapse" id="navbarNavDropDown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/search">
                                Search Books
                            </Link>
                        </li>
                        {isAuthenticated && (
                            <li>
                                <NavLink className="nav-link" to="/shelf">
                                    Shelf
                                </NavLink>
                            </li>
                        )}
                        {isAuthenticated && user?.userType === "admin" && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin">
                                    Admin
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav ms-auto navbar-dark bg-dark">
                        {isAuthenticated ? (
                            <li className="nav-item m-1">
                                <Link
                                    type="button"
                                    className="btn btn-outline-light"
                                    to="/login"
                                >
                                    Sign In
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <button
                                    className="btn btn-outline-light"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
