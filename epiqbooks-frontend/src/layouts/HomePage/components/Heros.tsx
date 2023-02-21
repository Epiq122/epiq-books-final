import {useOktaAuth} from '@okta/okta-react/';
import React from 'react';
import {Link} from 'react-router-dom';

export const Heros = () => {
    // for our okta auth
    const {authState} = useOktaAuth();

    return (
        <div>
            <div className="hidden lg:block">
                <div className="flex -mx-0 mt-5">
                    <div className="sm:w-1/2 md:w-1/2">
                        <div className="col-image-left"></div>
                    </div>
                    <div className="w-1/2  max-w-container flex justify-center items-center">
                        <div className="ml-4">
                            <h1 className="text-red-200 text-xl">
                                What have you been reading?
                            </h1>
                            <p className="lead text-white mt-2 w-full">
                                The team here at Epiq Books would love to know what your
                                learning. Are you learning a new language? Are you learning a
                                new framework? Are you learning a new to programming? Let us
                                know what you are learning and we will help you find the best
                                books to help you learn.
                            </p>
                            {authState?.isAuthenticated ? (
                                <Link
                                    type="button"
                                    className="bg-black text-white rounded-lg hover:bg-gray-500 pt-2
              pb-2 pl-4 pr-4 mt-3"
                                    to="search"
                                >
                                    Explore Top Books
                                </Link>
                            ) : (
                                <Link
                                    className="btn bg-black btn-lg hover:bg-gray-500 text-white mt-4"
                                    to="/login"
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="w-1/2 md:w-1/2 flex justify-center items-center">
                        <div className="ml-2">
                            <h1 className="text-red-200 text-xl">
                                Our collection is always changing!
                            </h1>
                            <p className="lead text-white mt-2 w-full">
                                Make sure to checkout our collection as tech is always changing!
                                We look to provide the best and up to date books for you to
                                learn from. Carefully chosen , our selection is the best around.
                            </p>
                        </div>
                    </div>
                    <div className="sm:w-1/2 md:w-1/2">
                        <div className="col-image-right "></div>
                    </div>
                </div>
            </div>

            {/* Mobile Heros */}
            <div className="d-lg-none">
                <div className="container">
                    <div className="m-2">
                        <div className="col-image-left"></div>
                        <div className="mt-2">
                            <h1 className="text-red-200 text-xl ">
                                What have you been reading?
                            </h1>
                            <p className="lead text-white">
                                The team here at Epiq Books would love to know what your
                                learning. Are you learning a new language? Are you learning a
                                new framework? Are you learning a new to programming? Let us
                                know what you are learning and we will help you find the best
                                books to help you learn
                            </p>
                            {authState?.isAuthenticated ? (
                                <Link
                                    type="button"
                                    className="btn-main-color btn-lg text-white"
                                    to="search"
                                >
                                    Explore Top Books
                                </Link>
                            ) : (
                                <Link
                                    className="btn bg-black btn-lg hover:bg-gray-500 text-white mt-4"
                                    to="/login"
                                >
                                    Sign up
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="m-2">
                        <div className="col-image-right"></div>
                        <div className="mt-2">
                            <h1 className="text-red-200 text-xl">
                                Our collection is always changing!
                            </h1>
                            <p className="lead text-white">
                                Make sure to checkout our collection as tech is always changing!
                                We look to provide the best and up to date books for you to
                                learn from. Carefully chosen , our selection is the best around.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
