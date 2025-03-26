import { useState, useContext, useEffect } from "react";
import api from "../../api/allProductsapi";
import ProductContext from "../../context/ProductContext";
// import ProductContext from "../context/ProductContext";
import LoginContext from "../../context/LoginContext";
import "./registerfile.css";

export const RegisterFile = () => {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    usersdata,
    setUsersdata,
    handleRegister,
    fetchUsers,
  } = useContext(LoginContext);

  console.log("usersdata from Register File");
  console.log(usersdata);

  return (
    <main className="regmain">
      <h3 className="">Register Form</h3>

      <div className="regdiv">
        <form className="regform" onSubmit={handleRegister}>
          <div className="">
            <label htmlFor="name" className="">
              User Name
            </label>
            <input
              type="name"
              id="name"
              className=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ani"
              required
              autoComplete="off"
            />
          </div>
          <div className="">
            <label htmlFor="email" className="">
              Email
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
              Password
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
          <button type="submit" className="">
            Register
          </button>
        </form>
      </div>
    </main>
  );
};
