import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EditRecipe({ username }) {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState('');
    const [recipe, setRecipe] = useState({
        name: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const token = "YOUR_BEARER_TOKEN";  // Replace with your actual token

    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/get_user_recipes/${username}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`  // Use the token for authorization
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setRecipes(data.recipes);
                } else {
                    console.error('Error fetching user recipes:', data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserRecipes();
    }, [username]);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            if (selectedRecipeId && recipes.length > 0) {
                try {
                    setIsLoading(true);
                    const response = await fetch(`/get_recipe/${username}/${selectedRecipeId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`  // Use the token for authorization
                        }
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setRecipe({
                            name: data.name,
                            description: data.description
                        });
                    } else {
                        console.error('Error fetching recipe details:', data.message);
                    }
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchRecipeDetails();
    }, [username, selectedRecipeId, recipes]);

    const handleSelectRecipe = (e) => {
        setSelectedRecipeId(e.target.value);
        
        // Find the selected recipe from the recipes state
        const selectedRecipe = recipes.find(recipe => recipe.id === parseInt(e.target.value));
        
        // Update the recipe state with the selected recipe details
        if (selectedRecipe) {
            setRecipe({
                name: selectedRecipe.name,
                description: selectedRecipe.description
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!selectedRecipeId || selectedRecipeId === '') {
            console.error('No recipe selected');
            return;
        }
    
        const recipeData = {
            name: recipe.name,
            description: recipe.description,
        };
    
        try {
            setIsLoading(true);
            const response = await fetch(`/edit_recipe/${selectedRecipeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'UserId': username  // Pass the logged-in username in the headers
                },
                body: JSON.stringify(recipeData)
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Recipe updated successfully');
                navigate('/dashboard'); // or wherever you want to navigate after editing
            } else {
                console.error('Error updating recipe:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Edit Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="selectRecipe">Select Recipe:</label>
                    <select id="selectRecipe" onChange={handleSelectRecipe} value={selectedRecipeId}>
                        <option value="" disabled>Select a recipe</option>
                        {recipes.map(recipe => (
                            <option key={recipe.id} value={recipe.id}>
                                {recipe.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={recipe.name} 
                        onChange={(e) => setRecipe({ ...recipe, name: e.target.value })} 
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea 
                        id="description" 
                        value={recipe.description} 
                        onChange={(e) => setRecipe({ ...recipe, description: e.target.value })} 
                    ></textarea>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditRecipe;
