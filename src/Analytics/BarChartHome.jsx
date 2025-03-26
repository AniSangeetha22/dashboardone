import { useContext, useEffect } from "react";
import ProductContext from "../context/ProductContext";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const BarChartHome = () => {
  const { totalorders, fetchTotalOrders, products, fetchPosts } =
    useContext(ProductContext);

  useEffect(() => {
    fetchTotalOrders();
  }, []);
  useEffect(() => {
    fetchPosts();
  }, []);

  console.log("Bar Chart");
  console.log(totalorders);

  return (
    <div>
      <h4
        style={{
          marginBottom: "25px",
          marginTop: "10px",
          color: "#bc6c25",
          fontSize: "20px",
        }}
      >
        BarChart
      </h4>

      <ResponsiveContainer width={550} height={250}>
        <BarChart
          width={500}
          height={300}
          data={totalorders}
          margin={{
            right: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="users.username" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#2563eb" />
          <Bar dataKey="quantity" fill="#780000" />

          <Bar dataKey="username" fill="#264653" />
          {/* <Bar dataKey="subamt" fill="#8b5cf6" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
