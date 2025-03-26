import React from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useContext, useEffect } from "react";
import ProductContext from "../context/ProductContext";

export const AreaChartHome = () => {
  const { products, fetchTotalOrders, addonlyOrders, fetchonlyOrders } =
    useContext(ProductContext);

  useEffect(() => {
    fetchTotalOrders();
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
        AreaChart
      </h4>
      <ResponsiveContainer width={500} height={250}>
        <AreaChart
          width={500}
          height={300}
          data={products}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amt"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="value"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          {/* <Area
            type="monotone"
            dataKey="subamt"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
