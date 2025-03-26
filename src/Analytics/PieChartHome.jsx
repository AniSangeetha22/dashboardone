import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useContext } from "react";

import ProductContext from "../context/ProductContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const PieChartHome = () => {
  const { addonlyOrders, fetchonlyOrders, updatephoneamt, phonetotalamt } =
    useContext(ProductContext);

  useEffect(() => {
    fetchonlyOrders();
  }, []);

  useEffect(() => {
    updatephoneamt();
  }, []);

  console.log("Fetch only All total Amt from Home Page");
  console.log(phonetotalamt);

  useEffect(() => {
    fetchonlyOrders();
  }, []);

  console.log("Fetch only orders from Home Page");
  console.log(addonlyOrders);

  let htiamt = 0;
  for (let i = 0; i < addonlyOrders.length; i++) {
    if (addonlyOrders[i].ftype === "iphone") {
      htiamt = htiamt + parseInt(addonlyOrders[i].subamt);
    }
  }
  console.log("Fetch only Iphone Amt from Home Page");
  console.log(htiamt);

  let htsamt = 0;
  for (let i = 0; i < addonlyOrders.length; i++) {
    if (addonlyOrders[i].ftype === "SamsungGalaxy") {
      htsamt = htsamt + parseInt(addonlyOrders[i].subamt);
    }
  }
  console.log("Fetch only addonlyOrders.length from Home Page");
  console.log(addonlyOrders.length);
  console.log("Fetch only Samsung Amt from Home Page");
  console.log(htsamt);
  let hthamt = 0;
  for (let i = 0; i < addonlyOrders.length; i++) {
    if (addonlyOrders[i].ftype === "huawei") {
      hthamt = hthamt + parseInt(addonlyOrders[i].subamt);
    }
  }
  console.log("Fetch only Samsung Amt from Home Page");
  console.log(hthamt);

  const data = [
    { name: "Iphone", value: htiamt },
    { name: "Samsung", value: htsamt },
    { name: "Huawei", value: hthamt },
  ];

  return (
    <ResponsiveContainer width="90%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
