import React from "react";
import "./Homepage.css";
import heroimage from "../asserts/heroimage/iphone-hero-image1.jpg";
import { Sidebar } from "../components/globalBars/Sidebar";
import { Navbar } from "../components/globalBars/Navbar";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";

export const ProductItem = ({ product }) => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } =
    useContext(ProductContext);
  const itemInCart = cart.find((item) => item.id === product.id);

  return (
    <div className="homepage-card-image">
      <div className="card-image">
        <img src={product.pic} alt />
      </div>
      <div className="homepage-card-details">
        <p className="card-name">{product.name}</p>
        <p className="card-des">{product.des}</p>
        <p className="card-amt">{product.amt}&nbsp;€</p>
      </div>
      {/* <h3>{product.name}</h3>
        <p>Price: ${product.price}</p> */}
      {itemInCart ? (
        <div>
          <button
            type="button"
            className="qtybtn"
            onClick={(e) => decreaseQuantity(e, product.id)}
          >
            -
          </button>
          <span>{itemInCart.quantity}</span>
          <button
            type="button"
            className="qtybtn"
            onClick={(e) => increaseQuantity(e, product.id)}
          >
            +
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="addcartbtn"
          onClick={(e) => addToCart(e, product.id)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

// import React from "react";
// import { useCart } from "./CartContext";

// const ProductItem = ({ product }) => {
//   const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
//   const itemInCart = cart.find((item) => item.id === product.id);

//   return (
//     <div>
//       <h3>{product.name}</h3>
//       <p>Price: ${product.price}</p>
//       {itemInCart ? (
//         <div>
//           <button type="button" onClick={() => decreaseQuantity(product.id)}>-</button>
//           <span>{itemInCart.quantity}</span>
//           <button type="button" onClick={() => increaseQuantity(product.id)}>+</button>
//         </div>
//       ) : (
//         <button type="button" onClick={() => addToCart(product)}>Add to Cart</button>
//       )}
//     </div>
//   );
// };

// export default Product;
