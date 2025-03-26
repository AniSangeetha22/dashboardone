import React from "react";
import { useState, useContext } from "react";
import api from "../../api/allProductsapi";
import ProductContext from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { LogoutFile } from "./LogoutFile";
import "./loginfile.css";

export const loginfile1 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); //For loading state
  const [error, setError] = useState(null); //For error messages
  const [user, setUser] = useState([]); //Store the logged-in user

  const { usersdata, setUsersdata } = useContext(User);
  const navigate = useNavigate();

  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Fetch users from JSON Server
      const response = await api.get("/users");
      // const users = response.data;
      setUsersdata(response.data);
      console.log(usersdata);

      // Find the user with matching email and password
      // const product = products.find((item) => item.id === id);
      const foundUser = usersdata.find(
        (user) => user.email === email && user.password === password
      );
      console.log("foundUser");
      console.log(foundUser);

      if (foundUser) {
        navigate("/cart");
        setUser(foundUser); // Set the logged-in user
        console.log("Correct User");
        console.log(user);
      } else {
        setError("Invalid email or password");
        console.log("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="regmain">
      <h3 className="">Login Form</h3>
      <div className="regdiv">
        <form onSubmit={(e) => submitLogin(e)}>
          <div className="">
            <label htmlFor="email" className="">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ani@example.com"
              required
              autoComplete="off"
            />
          </div>
          <div className="">
            <label htmlFor="password" className="">
              Your password
            </label>
            <input
              type="password"
              id="password"
              className=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="7"
            />
          </div>
          {/* <button type="submit" className=""> */}
          <button type="submit" className="" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      {/* <LogoutFile user={user} setUser={setUser} /> */}
    </main>
  );
};
