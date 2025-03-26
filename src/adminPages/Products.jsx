import { useContext } from "react";
import ProductContext from "../context/ProductContext";

export const Products = () => {
  const { products } = useContext(ProductContext);
  return (
    <div>
      <h3>Products List</h3>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Amount</th>
            <th>TotalNos</th>
            <th>Type</th>
            <th>Image</th>
            <th>Latest</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.des}</td>
              <td>{item.amt}</td>
              <td>{item.totalNos}</td>
              <td>{item.ftype}</td>
              <td>
                <img src={item.pic} alt={item.name} srcset="" />
              </td>
              <td>{item.latest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
