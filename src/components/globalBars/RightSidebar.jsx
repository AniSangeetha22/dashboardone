import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Home } from "../../adminPages/Home";
import { AddProduct } from "../../adminPages/AddProduct";
import { Products } from "../../adminPages/Products";
import { Products1 } from "../../adminPages/Products1";
import { Customers } from "../../adminPages/Customers";
// import { Orders } from "../../adminPages/Orders";
// import { ProductProvider } from "../../context/ProductContext";
import { Homepage } from "../../onlineShopping/Homepage";
import { Cart } from "../../onlineShopping/Cart";
import { BarChartFile } from "../../Analytics/BarChartFile";
import { LineChartFile } from "../../Analytics/LineChartFile";
import { AreaChartFile } from "../../Analytics/AreaChartFile";
import { RegisterFile } from "./RegisterFile";
// import { Loginfile } from "./Loginfile";
import { LogoutFile } from "./LogoutFile";
import { LoginFile } from "./LoginFile";

// import { Navbar } from "./Navbar";

export const RightSidebar = () => {
  return (
    <div className="rightsidebar-class">
      {/* <ProductProvider>  */}
      {/* <Navbar /> */}
      {/* left bar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products1" element={<Products1 />} />
        {/* <Route path="/eventspage" element={<EventsPage />} /> */}

        {/* <Route path="/navbar" element={<Navbar />} /> */}
        <Route path="/customers" element={<Customers />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/registerfile" element={<RegisterFile />} />
        {/* <Route path="/loginfile" element={<Loginfile />} /> */}
        <Route path="/loginuserfile" element={<LoginFile />} />
        <Route path="/logoutfile" element={<LogoutFile />} />

        <Route path="/barchart" element={<BarChartFile />} />
        <Route path="/linechart" element={<LineChartFile />} />
        <Route path="/areachart" element={<AreaChartFile />} />
      </Routes>
      {/* </ProductProvider>  */}
    </div>
  );
};
