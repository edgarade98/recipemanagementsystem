from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Recipe, FavoriteRecipe

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    CORS(app)
    db.init_app(app)
    migrate = Migrate(app, db)
    
    return app

app = create_app()

# ... (existing routes)

@app.route('/get_user_recipes/<username>', methods=['GET'])
def get_user_recipes(username):
    try:
        # Fetch the user based on the username
        user = User.query.filter_by(username=username).first()
        
        # Check if user exists
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        # Fetch the recipes based on the user_id
        recipes = Recipe.query.filter_by(user_id=user.id).all()

        # Check if any recipes exist
        if not recipes:
            return jsonify({'message': 'No recipes found for this user'}), 404

        output = []
        for recipe in recipes:
            recipe_data = {
                'id': recipe.id,
                'name': recipe.name,
                'description': recipe.description,
                'user_id': recipe.user_id
            }
            output.append(recipe_data)

        return jsonify({'recipes': output}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error fetching user recipes'}), 500
@app.route('/')
def index():
    return 'WELCOME TO MY TASTY WORLD'


@app.route('/get_recipe/<int:user_id>/<int:recipe_id>', methods=['GET'])
def get_recipe(user_id, recipe_id):
    try:
        # Fetch the recipe from the database based on user_id and recipe_id
        recipe = Recipe.query.filter_by(id=recipe_id, user_id=user_id).first()

        # Check if the recipe exists
        if not recipe:
            return jsonify({'message': 'Recipe not found'}), 404

        recipe_data = {
            'id': recipe.id,
            'name': recipe.name,
            'description': recipe.description,
            'user_id': recipe.user_id
        }

        return jsonify(recipe_data), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error fetching recipe details'}), 500
@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.json
    if not data:
        return jsonify({'message': 'Invalid request'}), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data:
        return jsonify({'message': 'Invalid request'}), 400

    username = data.get('username')
    password = data.get('password')

    # Query the database to find the user with the given username
    user = User.query.filter_by(username=username).first()

    if user and user.password == password:
        # Successful login
        return jsonify({'message': 'Login successful'}), 200
    else:
        # Invalid username or password
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    output = []
    for user in users:
        user_data = {'id': user.id, 'username': user.username}
        output.append(user_data)
    return jsonify({'users': output}), 200

@app.route('/create_recipe', methods=['POST'])
def create_recipe():
    data = request.json
    user_id = request.headers.get('UserId')  # Assuming user ID is sent in the headers
    if not user_id:
        return jsonify({'error': 'User ID not provided in headers'}), 400

    name = data.get('name')
    description = data.get('description')

    if not name or not description:
        return jsonify({'error': 'Name or description missing in request'}), 400


    new_recipe = Recipe(name=name, description=description, user_id=user_id)
    db.session.add(new_recipe)
    db.session.commit()

    return jsonify({'message': 'Recipe created successfully'}), 201

@app.route('/recipes', methods=['GET'])
def get_recipes():
    recipes = Recipe.query.all()
    output = []
    for recipe in recipes:
        recipe_data = {'id': recipe.id, 'name': recipe.name, 'description': recipe.description, 'user_id': recipe.user_id}
        output.append(recipe_data)
    return jsonify({'recipes': output}), 200

@app.route('/edit_recipe/<string:username>/<int:recipe_id>', methods=['PUT'])
def edit_recipe(username, recipe_id):
    print(request.url)  # Print the requested URL
    print(request.method)  # Print the request method
    data = request.json
    name = data.get('name')
    description = data.get('description')
    
    # Fetch the user based on the username
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Fetch the recipe to update
    recipe = Recipe.query.filter_by(id=recipe_id, user_id=user.id).first()

    if not recipe:
        return jsonify({'message': 'Recipe not found'}), 404

    recipe.name = name
    recipe.description = description
    db.session.commit()

    return jsonify({'message': 'Recipe updated successfully'}), 200


  

@app.route('/delete_recipe/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return jsonify({'message': 'Recipe not found'}), 404

    db.session.delete(recipe)
    db.session.commit()

    return jsonify({'message': 'Recipe deleted successfully'}), 200

@app.route('/favorited_recipes/<int:user_id>', methods=['GET'])
def get_favorited_recipes(user_id):
    favorited_recipes = FavoriteRecipe.query.filter_by(user_id=user_id).all()
    output = []
    for fav_recipe in favorited_recipes:
        recipe = Recipe.query.get(fav_recipe.recipe_id)
        recipe_data = {'id': recipe.id, 'name': recipe.name, 'description': recipe.description, 'user_id': recipe.user_id}
        output.append(recipe_data)
    return jsonify({'favorited_recipes': output}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5555)