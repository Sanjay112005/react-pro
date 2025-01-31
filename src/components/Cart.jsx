import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map((item, index) => (
              <li key={index} style={{ marginBottom: '20px' }}>
                <img src={item.image} alt={item.title} width="50" />
                <h2>{item.title}</h2>
                <p>Price: ${item.price}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button> {/* Remove button */}
              </li>
            ))}
          </ul>
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
