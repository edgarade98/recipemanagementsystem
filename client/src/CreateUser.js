// CreateUser.js
import React, { useState } from 'react';

function CreateUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('/create_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
            } else {
                setMessage('Error creating user');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error creating user');
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
                <input type="submit" value="Create User" />
            </form>
            <div>{message}</div>
        </div>
    );
}

export default CreateUser;