import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Commet } from 'react-loading-indicators';
import Toast from 'react-hot-toast'; 
import './styles.css';
import Star from './Star';


const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [load, setLoad] = useState(true);
  const [errors, setErrors] = useState(null);
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get('q');
  // Added navigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoad(false);
      } catch (err) {
        setErrors(err.message);
        setLoad(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (queryTerm) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(queryTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [queryTerm, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
    Toast.success(`${product.title} added to cart!`);
    
  };

  if (load) {
    return <Commet color="#32cd32" size="medium" text="Loading..." />;
  }

  if (errors) {
    return <p>Error: {errors}</p>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <h5 className="text-danger py-2 border-bottom">
        {filteredProducts.length === 0
          ? `No results found for "${queryTerm}"`
          : queryTerm
          ? `Results for "${queryTerm}"`
          : 'All Products'}
      </h5>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredProducts.map((product) => (
          <li key={product.id} style={{ marginBottom: '20px' }}>
            <img src={product.image} alt={product.title} width="100" />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span>Rating:</span> <Star rating={product.rating.rate} />
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              style={{
                color: 'white',
                backgroundColor: 'red',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
