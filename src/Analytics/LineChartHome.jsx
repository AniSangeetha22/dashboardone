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
import { useState, useContext, useEffect } from "react";
import ProductContext from "../context/ProductContext";

export const LineChartHome = () => {
  const {
    fetchTotalOrders,

    fetchPosts,

    addonlyOrders,
  } = useContext(ProductContext);

  useEffect(() => {
    fetchTotalOrders();
  }, []);
  useEffect(() => {
    fetchPosts();
  }, []);

  console.log("Bar Chart");
  console.log(addonlyOrders);
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
        LineChart
      </h4>
      <ResponsiveContainer width={500} height={250}>
        <LineChart
          width={500}
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
          <Line dataKey="amt" fill="#blue" />
          <Line dataKey="value" fill="red" />
          <Line dataKey="subamt" fill="#8b5cf6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
