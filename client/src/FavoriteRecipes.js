
import React, { useState, useEffect } from 'react';

function FavoriteRecipes() {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoriteRecipes = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/favorite_recipes');
                if (!response.ok) {
                    throw new Error('Failed to fetch favorite recipes');
                }
                const data = await response.json();
                setFavoriteRecipes(data.favorite_recipes);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavoriteRecipes();
    }, []);

    

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="favrecipe-container">
            <h2>Favorite Recipes </h2>
            <ul className="favrecipe-list">
                {favoriteRecipes.map(recipe => (
                    <li className="favrecipe-item" key={recipe.id}>
                        <h3>{recipe.name}</h3>
                        <p><b>Description:</b> {recipe.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FavoriteRecipes;
