import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
const CartContext = createContext();

// Context Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("/cart.json")
      .then((response) => setCart(response.data))
      .catch((error) => console.error("Error loading cart data:", error));
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    axios.post("/cart.json", newCart)
      .catch((error) => console.error("Error saving cart data:", error));
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      updateCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      updateCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    updateCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    updateCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
    ));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use the Cart Context
export const useCart = () => {
  return useContext(CartContext);
};

// Example Product Component
const Product = ({ product }) => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const itemInCart = cart.find((item) => item.id === product.id);

  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      {itemInCart ? (
        <div>
          <button onClick={() => decreaseQuantity(product.id)}>-</button>
          <span>{itemInCart.quantity}</span>
          <button onClick={() => increaseQuantity(product.id)}>+</button>
        </div>
      ) : (
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      )}
    </div>
  );
};

// Example Usage
const App = () => {
  const products = [
    { id: 1, name: "Product A", price: 20 },
    { id: 2, name: "Product B", price: 30 },
  ];

  return (
    <CartProvider>
      <h1>Products</h1>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </CartProvider>
  );
};

export default App;
