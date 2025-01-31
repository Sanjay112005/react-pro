import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products'); 
  };

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to ShopEase!</h1>
        <p>Your one-stop shop for all your needs.</p>
        <button className="shop-now-btn" onClick={handleShopNow}>Shop Now</button>
      </header>
      <section className="categories">
        <h2>Popular Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1517430816045-df4b7de1bb59" alt="Electronics" />
            <p>Electronics</p>
          </div>
          <div className="category-card">
            <img src="/images/fashion.jpg" alt="Fashion" />
            <p>Fashion</p>
          </div>
          <div className="category-card">
            <img src="/images/home.jpg" alt="Home Essentials" />
            <p>Home Essentials</p>
          </div>
          <div className="category-card">
            <img src="/images/books.jpg" alt="Books" />
            <p>Books</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
