import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MyRecipes({ username }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
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

    const handleDeleteRecipe = async (recipeId) => {
        try {
            const response = await fetch(`/delete_recipe/${recipeId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                // Filter out the deleted recipe from the recipes list
                setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
                console.log('Recipe deleted successfully');
            } else {
                console.error('Error deleting recipe:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
      <div className="myrecipe-container">
            <h2>My Recipes</h2>
              <ul className="myrecipe-list">
                {recipes.map(recipe => (
            <li className="myrecipe-item" key={recipe.id}>
             <h3>Recipe Name: {recipe.name}</h3>
           <p><b>DESCRIPTION:</b> {recipe.description}</p>
            <Link className='link' to={`/edit_recipe/${username}/${recipe.id}`}>Edit</Link>
            <Link className='dlink' onClick={() => handleDeleteRecipe(recipe.id)}>Delete Recipe</Link>
      </li>
    ))}
  </ul>
</div>
    );
}

export default MyRecipes;
