from app import db, User, Recipe, FavoriteRecipe, create_app

# Create Flask app
app = create_app()

# Push an application context to make Flask-SQLAlchemy work
app.app_context().push()

db.drop_all()

db.create_all()

# Create sample users
user1 = User(username='john_doe', password='password1')
user2 = User(username='jane_doe', password='password2')
user3 = User(username='alice_smith', password='password3')

# Add users to session and commit
db.session.add_all([user1, user2, user3])
db.session.commit()

# Create sample recipes associated with users
recipe1 = Recipe(name='Spaghetti Carbonara', description='Classic Italian pasta dish with bacon and eggs', user_id=user1.id)
recipe2 = Recipe(name='Vegetable Stir Fry', description='Healthy vegetable stir fry with tofu', user_id=user1.id)
recipe3 = Recipe(name='Pumpkin Soup', description='Creamy pumpkin soup with a hint of spice', user_id=user1.id)

recipe4 = Recipe(name='Chicken Curry', description='Spicy Indian chicken curry with rice', user_id=user2.id)
recipe5 = Recipe(name='Beef Stroganoff', description='Creamy beef stroganoff with mushrooms', user_id=user2.id)
recipe6 = Recipe(name='Fish Tacos', description='Delicious fish tacos with fresh salsa', user_id=user2.id)

recipe7 = Recipe(name='Chocolate Cake', description='Decadent chocolate cake with frosting', user_id=user3.id)
recipe8 = Recipe(name='Berry Smoothie', description='Refreshing berry smoothie with yogurt', user_id=user3.id)
recipe9 = Recipe(name='Quinoa Salad', description='Healthy quinoa salad with vegetables and feta', user_id=user3.id)

# Add recipes to session and commit
db.session.add_all([recipe1, recipe2, recipe3, recipe4, recipe5, recipe6, recipe7, recipe8, recipe9])
db.session.commit()

# Favorite recipes for users
favorite1 = FavoriteRecipe(recipe_id=recipe1.id, user_id=user2.id)
favorite2 = FavoriteRecipe(recipe_id=recipe3.id, user_id=user1.id)
favorite3 = FavoriteRecipe(recipe_id=recipe2.id, user_id=user3.id)
favorite4 = FavoriteRecipe(recipe_id=recipe4.id, user_id=user1.id)
favorite5 = FavoriteRecipe(recipe_id=recipe5.id, user_id=user2.id)
favorite6 = FavoriteRecipe(recipe_id=recipe6.id, user_id=user2.id)
favorite7 = FavoriteRecipe(recipe_id=recipe7.id, user_id=user3.id)
favorite8 = FavoriteRecipe(recipe_id=recipe8.id, user_id=user3.id)
favorite9 = FavoriteRecipe(recipe_id=recipe9.id, user_id=user1.id)

# Add favorite recipes to session and commit
db.session.add_all([favorite1, favorite2, favorite3, favorite4, favorite5, favorite6, favorite7, favorite8, favorite9])
db.session.commit()

print("Database seeded successfully.")
