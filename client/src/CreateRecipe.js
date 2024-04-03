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
            user: user_id// Associate the new recipe with the logged-in user
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
                setMessage(data.message);
                navigate('/dashboard');
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
            <h2>Create New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} /><br /><br />
                <input type="submit" value="Create Recipe" />
            </form>
            <div>{message}</div>
        </div>
    );
}

export default CreateRecipe;
// In the CreateRecipe component, we use the useNavigate hook from the react-router-dom package to redirect the user to the dashboard page after successfully creating a new recipe. We also pass the logged-in username in the headers of the fetch request to associate the new recipe with the user who created it.