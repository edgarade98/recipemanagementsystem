import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/recipes');
      const data = await response.json();
      if (response.ok) {
        setRecipes(data.recipes);
      } else {
        setMessage(data.message || 'Failed to fetch recipes');
      }
    } catch (error) {
      setMessage('Error fetching recipes');
    }
  };

  const handleFavorite = async (recipeId) => {
    try {
      const response = await fetch(`/favorite_recipe/${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Failed to favorite recipe');
      }
    } catch (error) {
      setMessage('Error favoriting recipe');
    }
  };

  return (
    <div>
      <h2>All Recipes</h2>
      {recipes.length === 0 && <p>No recipes found.</p>}
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
          <p>Created by: {recipe.user_id}</p>
          <button onClick={() => handleFavorite(recipe.id)}>Favorite</button>
          <hr />
        </div>
      ))}
      {message && <p>{message}</p>}
      <Link to="/dashboard">Go back to Dashboard</Link>
    </div>
  );
};

export default AllRecipes;