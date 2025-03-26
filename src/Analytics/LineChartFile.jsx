import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useContext, useEffect } from "react";
import ProductContext from "../context/ProductContext";

export const LineChartFile = () => {
  const {
    totalorders,
    fetchTotalOrders,

    fetchPosts,
    fetchonlyOrders,
    addonlyOrders,
  } = useContext(ProductContext);
  useEffect(() => {
    fetchonlyOrders();
  }, []);
  useEffect(() => {
    fetchTotalOrders();
  }, []);
  useEffect(() => {
    fetchPosts();
  }, []);

  console.log("Line Chart");
  console.log(totalorders);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <h3 style={{ marginBottom: "25px", marginTop: "10px", color: "#bc6c25" }}>
        Line Chart{" "}
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={1500}
          height={300}
          data={addonlyOrders}
          margin={{
            right: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="amt" fill="#2563eb" />
          <Line dataKey="value" fill="#264653" />
          <Line dataKey="subamt" fill="#8b5cf6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
