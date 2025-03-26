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
import { useContext, useEffect } from "react";
import ProductContext from "../context/ProductContext";

export const AreaChartFile = () => {
  const {
    products,
    totalorders,
    fetchTotalOrders,
    addonlyOrders,
    fetchonlyOrders,
  } = useContext(ProductContext);

  useEffect(() => {
    fetchTotalOrders();
  }, []);

  console.log("Bar Chart");
  console.log(totalorders);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <h3 style={{ marginBottom: "25px", marginTop: "10px", color: "#bc6c25" }}>
        Area Chart
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          width={1500}
          height={400}
          data={addonlyOrders}
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
          {/* <Legend /> */}
          <Area
            type="monotone"
            dataKey="amt"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="subamt"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
