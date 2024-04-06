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
        <div className="navigation-container">
        <nav>
            <ul className ="navigation-links">
                {!isLoggedIn ? (
                    <>
                        <li><Link to="/create-user" className="navigation-link">Create User</Link></li>
                        <br></br>
                        <li><Link to="/login" className="navigation-link">Login</Link></li>
                        <li><Link to="/" className='navigation-link'>HOME</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/all-recipes">All Recipes</Link></li>
                        <li><Link to="/create-recipe">Create Recipe</Link></li>
                        <li><Link to="/my-recipes">My Recipes</Link></li>
                        <li><Link to="/favorite-recipes">Favorite Recipes</Link></li> {/* New link for Favorite Recipes */}
        
                        <li><Link to="/" onClick={handleLogoutClick}
                        style={{
                            top: 15,
                            right: 10,
                            color: 'red',
                            height: 50,
                            width: 80,
                            fontWeight: 600,
                            borderRadius: 10,
                            cursor: 'pointer',
                          }}>Logout</Link></li>
                    </>
                )}
            </ul>
        </nav>
        </div>
    );
}

export default Navbar;
