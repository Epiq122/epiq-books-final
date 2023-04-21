import {useEffect, useState} from 'react';
import {PostNewMessage} from './components/PostNewMessage';
import {Messages} from './components/Messages';
import {useAuth} from "../../Auth/AuthContext";
import {useHistory} from "react-router-dom";


export const MessagesPage = () => {
    const [messagesClick, setMessagesClick] = useState(false);
    const {isAuthenticated} = useAuth(); // Get the isAuthenticated state
    const history = useHistory();

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/login');
        }
    }, [isAuthenticated, history]);

    return (
        <div className="container">
            <div className="mt-3 mb-2 b">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button
                            onClick={() => setMessagesClick(false)}
                            className="nav-link active text-white bg-black hover:bg-gray-400"
                            id="nav-send-message-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-send-message"
                            type="button"
                            role="tab"
                            aria-controls="nav-send-message"
                            aria-selected="true"
                        >
                            Submit Question
                        </button>
                        <button
                            onClick={() => setMessagesClick(true)}
                            className="nav-link text-white bg-black hover:bg-gray-400"
                            id="nav-message-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-message"
                            type="button"
                            role="tab"
                            aria-controls="nav-message"
                            aria-selected="false"
                        >
                            Awaiting Admin Response
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div
                        className="tab-pane fade show active"
                        id="nav-send-message"
                        role="tabpanel"
                        aria-labelledby="nav-send-message-tab"
                    >
                        <PostNewMessage/>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="nav-message"
                        role="tabpanel"
                        aria-labelledby="nav-message-tab"
                    >
                        {messagesClick ? <Messages/> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
};
