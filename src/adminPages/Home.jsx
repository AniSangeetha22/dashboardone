import React from "react";
import "./Home.css";
import { createContext, useState, useEffect, useContext } from "react";
import ProductContext from "../context/ProductContext";
import { BarChartHome } from "../Analytics/BarChartHome";
import { AreaChartHome } from "../Analytics/AreaChartHome";
import { LineChartHome } from "../Analytics/LineChartHome";
import { PieChartHome } from "../Analytics/PieChartHome";

export const Home = () => {
  
  const { addonlyOrders, fetchonlyOrders, updatephoneamt, phonetotalamt } =
    useContext(ProductContext);

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

  return (
    <main className="mainhomepage">
      <h2>Ecommerce Dashboard</h2>
      <div className="amtinfo">
        <div>
          <p>Total iphone Amout </p> <span>: {htiamt}</span>
        </div>

        <div>
          <p>Total Samsung Amount </p>
          <span>: {htsamt}</span>
        </div>

        <div>
          <p>Total Huawe Amount </p>
          <span>: {hthamt}</span>
        </div>
      </div>
      <div className="chartsdiv">
        <div className="chartbox">
          <BarChartHome />
        </div>
        <div className="chartbox">
          <AreaChartHome />
        </div>
        <div className="chartbox">
          <LineChartHome />
        </div>
        <div className="chartbox">
          <PieChartHome />
        </div>
      </div>
    </main>
  );
};
