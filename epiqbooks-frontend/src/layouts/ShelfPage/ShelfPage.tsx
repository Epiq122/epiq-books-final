import {HistoryPage} from './components/HistoryPage';
import {Loans} from './components/Loans';
import {useHistory} from "react-router-dom";
import React, {useEffect} from "react";


interface ShelfPageProps {
    isAuthenticated: boolean;
}

export const ShelfPage: React.FC<ShelfPageProps> = ({isAuthenticated}) => {

    const history = useHistory()

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/login');
        }
    }, [isAuthenticated, history]);

    return (
        <div className="container">
            <div className="mt-3">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button
                            className="nav-link active bg-black text-white hover:bg-gray-400"
                            id="nav-loans-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-loans"
                            type="button"
                            role="tab"
                            aria-controls="nav-loans"
                            aria-selected="true"
                        >
                            Loans
                        </button>
                        <button
                            className="nav-link text-white bg-black hover:bg-gray-400"
                            id="nav-history-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-history"
                            type="button"
                            role="tab"
                            aria-controls="nav-history"
                            aria-selected="false"
                        >
                            Your History
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div
                        className="tab-pane fade show active"
                        id="nav-loans"
                        role="tabpanel"
                        aria-labelledby="nav-loans-tab"
                    >
                        <Loans/>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="nav-history"
                        role="tabpanel"
                        aria-labelledby="nav-history-tab"
                    >
                        <HistoryPage/>
                    </div>
                </div>
            </div>
        </div>
    );
}
