import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SunMoon,
  Bell,
  Grip,
  SquareUserRound,
  ShoppingCart,
} from "lucide-react";

import { useContext } from "react";
import ProductContext from "../../context/ProductContext";
import phoeniximage from "../../asserts/heroimage/phoenixlogo.jpg";

import { DropdownLogout } from "./DropdownLogout";
// import LoginContext from "../../context/LoginContext";

//--------------------------------------------

// import { ShoppingCart } from "lucide-react";
// import { Link } from "react-router-dom";
// import "./Homepage.css";
// import heroimage from "../asserts/heroimage/iphone-hero-image1.jpg";
// import { Sidebar } from "../components/globalBars/Sidebar";
// import { Navbar } from "../components/globalBars/Navbar";
// import { useContext } from "react";
// import ProductContext from "../context/ProductContext";

export const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const { cart, cartlength } = useContext(ProductContext);
  // const { user, setUser, logout } = useContext(LoginContext);
  let len = cartlength;
  console.log("Navbar Rendered - Cart:", cart);
  console.log("Navbar Rendered - Cart Length:", cartlength);

  console.log("Navbar Cart");

  console.log(cart);
  console.log(len);

  const navigate = useNavigate();

  const navHome = () => {
    navigate("/"); // Navigates to home screen
  };

  //New code 24-03-25
  const storedUser = localStorage.getItem("user");
  console.log("NavBar Login Navigate UserName");
  console.log(storedUser);
  //New code 24-03-25 End

  //New code 24-03-25
  const loginNavigate = (e) => {
    e.preventDefault();
    if (!storedUser) {
      navigate("/loginuserfile");
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="navbar-class">
      <div className="nav-side-heading" onClick={navHome}>
        <img src={phoeniximage} alt="phoeniximage" />
        <span>phoenix</span>
      </div>

      <ul className="nav-themes">
        <li>
          <span className="nav-link" onClick={() => setDropdown(!dropdown)}>
            <SquareUserRound size={26} />
          </span>
          {dropdown && <DropdownLogout />}
        </li>

        <li>
          <div className="nav-link" onClick={loginNavigate}>
            <ShoppingCart size={26} /> <span> {cart.length}</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
