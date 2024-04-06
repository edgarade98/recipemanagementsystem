import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateRecipe({ user_id }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipeData = {
            name: name,
            description: description,
            user: user_id // Associate the new recipe with the logged-in user
        };

        try {
            const response = await fetch('/create_recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'UserId': user_id // Pass the logged-in username in the headers
                },
                body: JSON.stringify(recipeData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Recipe created successfully'); // Set success message
                setTimeout(() => {
                    setMessage(''); // Clear the success message after a certain time
                    navigate('/dashboard');
                }, 3000); // Auto-dismiss after 3 seconds
            } else {
                setMessage(data.error || 'Error creating recipe');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error creating recipe');
        }
    };

    return (
        <div>
            <div className="add-recipe-container">
                {message && (
                    <div className="success-message" style={{ color: 'green', fontWeight: 'bold' }}>
                        {message}
                    </div>
                )}
                <h2>Create New Recipe</h2>
                <form onSubmit={handleSubmit} className="recipe-form">
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <br /><br />
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <br /><br />
                    <input type="submit" value="Create Recipe" className="submit-button" />
                </form>
            </div>
        </div>
    );
}

export default CreateRecipe;
