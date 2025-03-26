import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../context/LoginContext";
import "./registerfile.css";

export const LoginFile = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    fetchUsers,
    handleLogin,
    loading,
  } = useContext(LoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const submitLogin = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
    navigate("/");
  };

  // Check if the user is logged in

  console.log("email,password");
  console.log(email);
  console.log(password);

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
