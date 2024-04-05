// MyRecipes.js


import React, { useState, useEffect } from 'react';

function MyRecipes({ username }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Fetch recipes created by the logged-in user
        const fetchMyRecipes = async () => {
            try {
                const response = await fetch(`/get_user_recipes/${username}`);
                const data = await response.json();
                if (response.ok) {
                    setRecipes(data.recipes);
                } else {
                    console.error('Error fetching user recipes:', data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchMyRecipes();
    }, [username]);

    return (
        <div>
            <h2>My Recipes</h2>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>{recipe.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default MyRecipes;