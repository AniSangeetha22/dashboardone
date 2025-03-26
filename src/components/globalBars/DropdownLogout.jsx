import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../../context/LoginContext";
import { li } from "framer-motion/client";

export const DropdownLogout = () => {
  const { user, setUser, logout } = useContext(LoginContext);
  const navigate = useNavigate();

  // Logout function
  const handlelogout = () => {
    logout();
  };

  return (
    <div id="dropdownAvatar" className="dropdownlogout">
      <div className="">
        <div className="">{user === null ? "pls login" : user.email}</div>
      </div>
      <ul className="" aria-labelledby="dropdownUserAvatarButton">
        <li>
          <Link to="/" className="dropdownli">
            Home
          </Link>
        </li>
        <li>
          <Link to="/homepage" className="dropdownli">
            Online Shopping
          </Link>
        </li>
        <li>
          <Link to="/loginuserfile" className="dropdownli">
            Login
          </Link>
        </li>
        <li>
          <Link to="/registerfile" className="dropdownli">
            Register
          </Link>
        </li>

        <li>
          <span className="dropdownspan" onClick={handlelogout}>
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
};
