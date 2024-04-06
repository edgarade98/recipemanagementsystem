// Login.js
import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
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
                setLoginMessage('Login Successful');
                onLogin(username);
                setTimeout(() => {
                    setLoginMessage(''); // Clear the success message after a certain time
                    navigate('/dashboard');
                }, 2000);} 
                else {
                setMessage(data.message || 'Error logging in');
                
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error logging in');
        }
    };

    return (
        <div className="login-container">
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
            {message && <p className="error-message" style={{ color: 'red' }}>{message}</p>}
            {loginMessage && <p className="error-message" style={{ color: 'green' }}>{loginMessage}</p>}
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />
                <label htmlFor="password"><b>Password:</b></label>
                <input type="password" id="password" name="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
                <input type="submit" value="Login" className="submit-button" />
                <br/><br/>
                <Link className= "link" to="/create-user">Don't have an Account? SignUp Here!</Link>
            </form>

        </div>
        </div>
    );
}

export default Login;
