import React from 'react';
import './index.css';

const Home = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to The Recipe Hub</h1>
        <p>Kindly login or sign up to access the application.</p>
      
      <section className="hero-section">
        <div className="hero-content">
          <h2>Discover Delicious Recipes</h2>
        <p>From savory main courses to delectable desserts, 
          our recipe collection has something for everyone. 
          Whether you're planning a cozy family dinner, a romantic date night, or a festive gathering with friends, we've got you covered. 
          Get ready to unleash your culinary creativity and delight your taste buds with our irresistible dishes!</p>
         
        </div>
        <div className="hero-image">
          {/* Insert a relevant image related to cooking or food */}
          <img src="https://www.frontiersin.org/files/special%20topics/62214/thumb_400.jpg" alt="Cooking" />
        </div>
      </section>
      </header>

      <section className="popular-recipes-section">
        <h2>Popular Recipes</h2>
        <div className="recipee-cards">
          {/* Recipe cards can be dynamically generated based on popular recipes */}
          <div className="recipe-cards">
            <img src="https://weeatatlast.com/wp-content/uploads/2022/03/mishkaki-recipe.jpg" alt="Recipe" />
            <h3>Mishkaki</h3>
            <p>Mishkaki, also known as mshakiki, refers to kabobs (cubed pieces of meat such as chicken, beef, or mutton that are marinated, skewered, and then roasted in a grill). 
              It is a popular dish in East African countries, especially in Kenya and Tanzania, as well as in Middle Eastern countries such as Yemen. </p>
          </div>
          {/* Add more recipe cards as needed */}
          <div className="recipe-cards">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW_Ia_NV_DwCkT7E1O_QaRXrAcHPsbdYkZdyK9Ro4yEA&s" alt="Recipe" />
            <h3>Kenyan Style Stew</h3>
            <p>Kenyan stew is a favorite dish for many Kenyans and is easy to prepare. Many different types of meat can be used, including goat, chicken, or beef. 
              The aroma of Kenyan stew will delight your senses, and many restaurants in Kenya use it to tempt customers to enter, especially at lunchtime.</p>
          </div>
          <div className="recipe-cards">
            <img src="https://www.willflyforfood.net/wp-content/uploads/2021/06/kenyan-food-pilau.jpg" alt="Recipe" />
            <h3>Kenyan Pilau</h3>
            <p>It seems that rice meals run aplenty in Kenya, and one of the best-tasting is pilau. It’s a Kenyan staple dish that’s widespread in Eastern Africa. 
            Considered as the Kenyan and more celebrated version of Nigeria’s jollof rice.
            What makes the pilau in Kenya rich in flavor are the spices, which include cinnamon, cardamom, and cloves. Chicken and beef can be used as protein, with a bottle of ice-cold Tusker to wash down this delectable Kenyan dish.</p>
          </div>
          <div className="recipe-cards">
            <img src="https://i.pinimg.com/736x/02/2e/21/022e21cd2998695421a53b0d831d0349.jpg" alt="Recipe" />
            <h3>Githeri</h3>
            <p>This is a cheap and well-balanced meal. Get githeri and the vegetables of your choice from the kibanda and go make a delicious meal. Of course, githeri is never complete without avocado.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
  <h2>About Recipe Hub</h2>
  <p>Welcome to our Recipe Hub, where culinary enthusiasts and professional chefs come together to share their passion for cooking and discover new flavors. Our platform provides a vibrant community for chefs to showcase their expertise by posting mouth-watering recipes and culinary creations.
  Whether you're a seasoned chef looking to share your signature dishes or a cooking novice eager to explore the world of gastronomy, our app offers a diverse range of recipes for every skill level and taste preference.</p>
  <p>Join our community to:</p>
  <ul>
    <li>Explore a vast collection of recipes from talented chefs around the world.</li>
    <li>Discover new cooking techniques, ingredients, and flavor combinations.</li>
    <li>Connect with fellow food enthusiasts, share cooking tips, and exchange culinary experiences.</li>
    <li>Showcase your culinary creations and receive feedback from a supportive community of chefs and food lovers.</li>
  </ul>

      </section>
      
      <footer class="footer">
  <div class="footer-content">
 
    <div class="footer-section contact">
      <h3>Contact Us</h3>
      <ul>
        <li><b>Email: info@recipehub.com</b></li>
        <li>Phone: +254-456-7890</li>
        <li>Address: 123 Nairobi Street, Nairobi, KENYA</li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024 The Recipe Corner. All rights reserved.</p>
  </div>
</footer>
    </div>
  );
};

export default Home;