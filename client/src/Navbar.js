import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isLoggedIn, onLogout, username }) {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
    };

    const fetchUserRecipes = async () => {
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

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserRecipes();
        }
    }, [isLoggedIn, username]);

    const handleRecipeDelete = async (recipeId) => {
        try {
            const response = await fetch(`/delete_recipe/${recipeId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                // Refresh the recipes list after deletion
                fetchUserRecipes();
            } else {
                console.error('Error deleting recipe:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <nav>
            <ul>
                {!isLoggedIn ? (
                    <>
                        <li><Link to="/create-user">Create User</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/create-recipe">Create Recipe</Link></li>
                        <li><Link to="/all-recipes">All Recipes</Link></li>
                        <li><Link to="/my-recipes">My Recipes</Link></li>
                        <li><Link to="/favorite-recipes">Favorite Recipes</Link></li> {/* New link for Favorite Recipes */}
                        <li>
                            <select onChange={(e) => navigate(`/edit_recipe/${username}/${e.target.value}`)}>
                                <option value="">Edit Recipe</option>
                                {recipes.map(recipe => (
                                    <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                                ))}
                            </select>
                        </li>
                        <li>
                            <select onChange={(e) => handleRecipeDelete(e.target.value)}>
                                <option value="">Delete Recipe</option>
                                {recipes.map(recipe => (
                                    <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                                ))}
                            </select>
                        </li>
                        <li><Link to="/" onClick={handleLogoutClick}>Logout</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
