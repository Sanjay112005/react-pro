import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About ShopEase</h1>
        <p>Your trusted destination for online shopping.</p>
      </header>
      
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          At ShopEase, we aim to simplify your shopping experience by offering a wide range of products at unbeatable prices. 
          Whether you're looking for the latest gadgets, trendy fashion, or everyday essentials, we've got you covered.
        </p>
      </section>

      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Extensive product selection across multiple categories.</li>
          <li>Seamless shopping experience with user-friendly navigation.</li>
          <li>Secure and fast checkout process.</li>
          <li>Unmatched customer service available 24/7.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2023, ShopEase started as a small initiative to bring convenience to online shoppers. Today, 
          we are proud to be one of the most trusted names in e-commerce, serving customers across the globe.
        </p>
      </section>

      <section className="about-section">
        <h2>Contact Us</h2>
        <p>
          Have questions or feedback? We'd love to hear from you! 
          Reach out to us at <a href="mailto:support@shopease.com">support@shopease.com</a>.
        </p>
      </section>
    </div>
  );
}

export default About;
