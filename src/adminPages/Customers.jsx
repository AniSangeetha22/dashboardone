import React from "react";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import LoginContext from "../context/LoginContext";
import "./customers.css";

export const Customers = () => {
  const { products } = useContext(ProductContext);
  const { usersdata, setUser, localuser, logout } = useContext(LoginContext);
  return (
    <div>
      <h3>Customers List</h3>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>UserName</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {usersdata.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
