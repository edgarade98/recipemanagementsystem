// CreateUser.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreateUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

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
    
            if (response.ok) {
                setMessage('User Created Successfully');
                setTimeout(() => {
                    navigate('/login');
            }, 2000);
            } else {
                setMessage('Error creating user');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error creating user');
        }
    };
    

    return (
        <div className="login-container">
        <div className='sign-form'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
            {message && <p className="error-message" style={{ color: 'green' }}>{message}</p>}
                <label htmlFor="username"><b>Username:</b></label>
                <input type="text" id="username" name="username" className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />
                <label htmlFor="password"><b>Password:</b></label>
                <input type="password" id="password" name="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
                <input type="submit" value="Sign Up" className="submit-button"/>
                <br/><br/>
                <Link className= "link" to="/login">Already have an Account? Login Here!</Link>
            </form>
            

        </div>
        </div>
    );
}

export default CreateUser;