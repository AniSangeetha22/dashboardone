import React from "react";
import { useState, useContext, createContext, useEffect } from "react";
import api from "../api/allProductsapi";
import { useNavigate } from "react-router-dom";
// import ProductContext from "../../context/ProductContext";

const LoginContext = createContext({});

export const UserLoginProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usersdata, setUsersdata] = useState([]);
  const [user, setUser] = useState([]); // Store the logged-in user
  const [localuser, setLocaluser] = useState([]); // Store the logged-in user
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error messages

  const navigate = useNavigate();

  //   const { usersdata, setUsersdata } = useContext(ProductContext);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      console.log(response.data);

      setUsersdata(response.data);
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  console.log("fetchUsers from Login Context");
  console.log(usersdata);

  const handleRegister = async (e) => {
    e.preventDefault();
    const id = usersdata.length ? usersdata.length + 1 : 1;
    const addUser = {
      id,
      username: username,
      email: email,
      password: password,
    };
    console.log("addUser from Login Context");
    console.log(addUser);

    try {
      const response = await api.post("/users", addUser);
      const allUsers = [...usersdata, response.data];
      setUsersdata(allUsers);
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/loginuserfile");

      // history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  console.log("usersdata from Login Context");
  console.log(usersdata);
  //   return <div>logincontext</div>;

  // Check localStorage for user on initial load

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  console.log("From Login Context and local storage email,password");
  //c-24
  //  console.log(user.email);
  // console.log(user.password);
  //c-24 end
  console.log(user === null ? "Empty" : user.email);
  console.log(user === null ? "Empty" : user.password);

  //handleLogin

  const handleLogin = async (email, password) => {
    console.log("From Login Context email,password");
    console.log(email);
    console.log(password);

    setLoading(true);
    setError(null);

    try {
      // Fetch users from JSON Server
      const response = await api.get("/users");
      const usersdata = response.data;

      // Find the user with matching email and password
      const foundUser = usersdata.find(
        (user) => user.email === email && user.password === password
      );
      console.log("From Login Context foundUser Name");
      console.log(foundUser.email.split("@")[0]);

      if (foundUser) {
        setUser(foundUser); // Set the logged-in user
        localStorage.setItem("user", JSON.stringify(foundUser)); // Store user in localStorage
        // setLocaluser(uservalue);
        // navigate("/cart");
        return true;
      }
      // return false;
      // else {
      //   console.log("Invalid email or password");
      //   setError("Invalid email or password");
      // }
    } catch (error) {
      setError("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
    // setEmail("");
    // setPassword("");
  };

  // Logout function
  const logout = () => {
    setUser(null); // Clear the logged-in user
    localStorage.removeItem("user"); // Remove user from localStorage
    navigate("/")
  };

  return (
    <LoginContext.Provider
      value={{
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
        handleLogin,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
export default LoginContext;
