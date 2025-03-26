import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import "./Cart.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import LoginContext from "../context/LoginContext";

export const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    fetchOrders,
    fetchTotalOrders,
    paymentfinished,
    deleteItem,
    total,
    setTotal,
  } = useContext(ProductContext);

  const { user } = useContext(LoginContext);
  const navigate = useNavigate();

  const [login, setlogin] = useState(false);
  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    fetchTotalOrders();
  }, []);

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + parseFloat(curr.subamt), 0));
  }, [cart]);

  return (
    <>
      <div>
        {user ? (
          <div>
            <h2>Shopping Cart</h2>
            <h5>Hello {user.username}</h5>
            {cart.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              cart.map((item) => (
                <div className="cartlist" key={item.id}>
                  <h4 className="itemid">{item.orderid}</h4>
                  <h4>{item.name}</h4>
                  <p>{item.amt} €</p>
                  <div className="btns">
                    <button
                      type="button"
                      className="cartbtn"
                      onClick={(e) => decreaseQuantity(e, item.id)}
                    >
                      -
                    </button>
                    <span className="value">{item.value}</span>
                    <button
                      type="button"
                      className="cartbtn"
                      onClick={(e) => increaseQuantity(e, item.id)}
                    >
                      +
                    </button>
                    <span className="subamt">{item.subamt}</span>

                    <button
                      className=" deletebtn"
                      onClick={(e) => deleteItem(e, item.id)}
                    >
                      <RiDeleteBin5Line size={15} />{" "}
                    </button>
                  </div>
                </div>
              ))
            )}
            <h2 className="total-amt">Total Amount : {total.toFixed(2)} €</h2>
            <button
              type="button"
              className="bezahlenbtn"
              onClick={(e) => paymentfinished(e, cart, user, total)}
            >
              Payment
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
