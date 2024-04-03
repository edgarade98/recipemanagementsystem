// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                onLogin(username);
                navigate('/dashboard'); // Redirect to the dashboard upon successful login
            } else {
                setMessage(data.message || 'Error logging in');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error logging in');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
                <input type="submit" value="Login" />
            </form>
            <div>{message}</div>
        </div>
    );
}

export default Login;
