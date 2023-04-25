import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {LoadingSpinner} from '../layouts/Utils/LoadingSpinner';

// @ts-ignore
const LoginWidget = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsLoading(true);
        // Call your login API endpoint here
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            const {token} = await response.json();
            onLogin(token);
            history.push('/');
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" disabled={isLoading}>Log In</button>
            {isLoading && <LoadingSpinner/>}
        </form>
    );
};

export default LoginWidget;
