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

export const BarChartFile = () => {
  const {
    totalorders,
    fetchTotalOrders,
    products,
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

  console.log("Bar Chart File Big");
  console.log(totalorders);

  let totaliphoneamt = 0;
  let totalSamsungGalaxyamt = 0;
  let totaliphone16 = 0;

  for (let i = 0; i < addonlyOrders.length; i++) {
    if (addonlyOrders[i].ftype === "iphone") {
      console.log(addonlyOrders[i].name + " " + addonlyOrders[i].amt);

      totaliphoneamt = totaliphoneamt + parseInt(addonlyOrders[i].amt);
    }
  }

  console.log("totaliphoneamt");
  console.log(totaliphoneamt);

  for (let i = 0; i < addonlyOrders.length; i++) {
    if (addonlyOrders[i].ftype === "SamsungGalaxy") {
      console.log(addonlyOrders[i].name + " " + addonlyOrders[i].amt);

      totalSamsungGalaxyamt =
        totalSamsungGalaxyamt + parseInt(addonlyOrders[i].amt);
    }
  }

  console.log("SamsungGalaxy");
  console.log(totalSamsungGalaxyamt);

  for (let i = 0; i < addonlyOrders.length; i++) {
    if (addonlyOrders[i].ftype === "iPhone16") {
      console.log(addonlyOrders[i].name + " " + addonlyOrders[i].amt);

      totaliphone16 = totaliphone16 + parseInt(addonlyOrders[i].amt);
    }
  }

  console.log("totaliphone16");
  console.log(totaliphone16);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <h3 style={{ marginBottom: "25px", marginTop: "10px", color: "#bc6c25" }}>
        BarChart
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={700}
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
          {/* <Bar dataKey=" orderList.name" fill="#264653" /> */}
          <Bar dataKey="users.username" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
