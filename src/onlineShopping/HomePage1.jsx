import React, { useState } from "react";
import "./Homepage.css";
import heroimage from "../asserts/heroimage/iphone-hero-image1.jpg";
import { Sidebar } from "../components/globalBars/Sidebar";
import { Navbar } from "../components/globalBars/Navbar";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";

export const HomePage1 = () => {
  //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { products, cart, addToCart, increaseQuantity, decreaseQuantity } =
    useContext(ProductContext);
  //   const itemInCart = cart;
  //   const itemInCart = cart.find((item) => item.id === products.id);
  const itemInCart = cart.find((item) => item.id === products.id);
  const [qty, setQty] = useState(0);
  // const [decreaseqty, setDecreaseqty] = useState(0);
  const increaseqty = () => {
    setQty(() => qty + 1);
  };

  const decreaseqty = () => {
    setQty(qty - 1);
  };

  const addtocart = () => {};

  return (
    <div className="homepage-main-div">
      <div className="homepage-hero-image">
        <img src={heroimage} alt="" />
      </div>

      <div className="homepage-cards">
        {products.map((product) => (
          <div className="homepage-card-image" key={product.id}>
            <div className="card-image">
              <img src={product.pic} alt />
            </div>

            <div className="homepage-card-details">
              <p className="card-name">{product.name}</p>
              <p className="card-des">{product.des}</p>
              <p className="card-amt">{product.amt}&nbsp;€</p>
            </div>
            {itemInCart ? <p>In Cart: {itemInCart.quantity}</p> : null}
            <button onClick={(e) => addToCart(e, product)}>Add to Cart</button>
            {/* -------------------------------------------------------------------- */}
            {/* <button onClick={(event) => addToCart(event, product)}>
                Add to Cart
              </button> */}
            {/* ------------------------------------------------------------------------ */}

            {/* <button
                type="button"
                className="qtybtn"
                onClick={(e) => decreaseQuantity(e, product.id)}
              >
                -
              </button>
              <span>{itemInCart.quantity}</span>
              <button
                type="button"
                className="qtybtn1"
                onClick={(e) => increaseQuantity(e, product.id)}
              >
                +
              </button>
              <button
                  type="button"
                  className="addcartbtn"
                  onClick={(e) => addToCart(e, product)}
                >
                  Add to Cart
                </button>

              {itemInCart ? (
                <div className="qtydiv">
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
                    className="qtybtn1"
                    onClick={(e) => increaseQuantity(e, product.id)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="addcartbtn"
                  onClick={(e) => addToCart(e, product)}
                >
                  Add to Cart
                </button>
              )} */}
          </div>
        ))}
      </div>
    </div>
  );
};
