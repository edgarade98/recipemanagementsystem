import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
        setMessage("You have a new favorite!");
        setTimeout(() => {
          setMessage(''); // Clear the success message after a certain time
          navigate('/all-recipes');
      }, 3000);
      } else {
        setMessage(data.message || 'Failed to favorite recipe');
      }
    } catch (error) {
      setMessage('Error favoriting recipe');
    }
  };

  return (
<div className="recipe-container">
  <h2>All Recipes</h2>
  {recipes.length === 0 && <p className="message">No recipes found.</p>}
  {message && (
                    <div className="success-message" style={{ color: 'green', fontWeight: 'bold' }}>
                        {message}
                    </div>
                )}
  <div className="recipe-grid">
    {recipes.map((recipe) => (
      <div className="recipe-card" key={recipe.id}>
        <h3>{recipe.name}</h3>
        <p>{recipe.description}</p>
        <button onClick={() => handleFavorite(recipe.id)}>Favorite</button>
      </div>
    ))}
  </div>
  {message && <p className="message" style={{color: 'green', fontWeight: 'bold'}}>{message}</p>}
  <Link className="link" to="/dashboard" style={{
    fontSize: 20,
    textAlign: 'center',
    display: 'block',
    marginTop: 35,
    marginBottom: 35,
    textDecoration: 'underline'
  }}>Go back to Dashboard</Link>
</div>

  );
};

export default AllRecipes;