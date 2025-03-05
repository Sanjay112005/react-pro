import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Commet } from 'react-loading-indicators';
import Toast from 'react-hot-toast'; 
import './products.css';
import Star from './Star';
import { Dog } from '../utils/Api';
import Addtocart from './addtocart';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [load, setLoad] = useState(true);
  const [errors, setErrors] = useState(null);
  const[searchParams] = useSearchParams()

 const searchQuery =  searchParams.get('q')|| ''

  const fetchProduct = async (query = '') => {
    setMessage('');
    setLoad(true);
    setErrors(null);
  

    try {
      const repo = await Dog.getProducts(query);
  
      if (!repo.ok) {
        throw new Error(`Error fetching products: ${repo.status}`);
      }
  
      const wait = await repo.json();
      console.log('API Response:', wait); // Debugging
  
      // Fix: Access 'Products' instead of 'products'
      if (wait && Array.isArray(wait.Products)) {
        setProducts([...wait.Products]); // Ensure state updates properly
      } else {
        setMessage('No products found');
        setProducts([]);
      }
    } catch (err) {
      console.error("The product was not fetched:", err);
      setErrors(err.message || "Something went wrong.");
    } finally {
      setLoad(false);
    }
  };
  

  useEffect(() => {
    fetchProduct();
  }, []);
  
  useEffect(()=>{
   fetchProduct(searchQuery)
  },[searchQuery])
  useEffect(() => {
    console.log("Updated products state:", products);
  }, [products]); // This will log whenever products updates
  

  if (load) {
    return <Commet color="#32cd32" size="medium" text="Loading..." />;
  }

  if (errors) {
    return <p className="error-message">{errors}</p>;
  }

  return (
 <div>
      <h1>Products</h1>
      {message && <p className="message">{message}</p>}
      <div className="product-list">
  {products.length > 0 ? (
    products.map((product) => (
      <div key={product.productID} className="product-card">
        <img src={product.imageUrl} alt={product.model} />
        <h3 className="product-title">{product.product}</h3>
        <p className="product-model">{product.model}</p>
        <p className="product-desc">{product.description}</p>
        <p className="product-price">Price: ₹{product.price}</p>
        <Addtocart product_id={product.productID} />
      </div>
    ))
  ) : (
    <p>No products available.</p>
  )}
      </div>
      </div>
  );
};

export default Products;