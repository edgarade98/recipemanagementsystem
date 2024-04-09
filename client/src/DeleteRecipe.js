import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DeleteRecipe({ username }) {
    const [recipeId, setRecipeId] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch(`/delete_recipe/${recipeId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                navigate('/dashboard');
            } else {
                setMessage(data.message || 'Error deleting recipe');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error deleting recipe');
        }
    };

    return (
        <div>
            <h2>Delete Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="recipeId">Recipe ID:</label>
                <input 
                    type="number" 
                    id="recipeId" 
                    value={recipeId} 
                    onChange={(e) => setRecipeId(e.target.value)} 
                /><br /><br />
                <input type="submit" value="Delete Recipe" />
            </form>
            <div>{message}</div>
        </div>
    );
}

export default DeleteRecipe;
