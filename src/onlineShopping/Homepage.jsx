import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import heroimage from "../asserts/heroimage/iphone-hero-image1.jpg";
import { LeftSidebar } from "../components/globalBars/LeftSidebar";
import { Navbar } from "../components/globalBars/Navbar";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";

export const Homepage = () => {
  //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    products,
    cart,
    setCart,
    addCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(ProductContext);

  return (
    <div className="homepage-main-div">
      <div className="homepage-hero-image">
        <img src={heroimage} alt="productimage" />
        {/* <div>
          <Link className="admin-link" to="/cart">
            <ShoppingCart size={25} /> <span>Cart {cart.length}</span>
          </Link>
        </div> */}
      </div>

      <div className="homepage-cards">
        {products.map((val) => (
          <div className="homepage-card-image" key={val.id}>
            <div className="card-image">
              <img src={val.pic} alt={val.name} />
            </div>

            <div className="homepage-card-details">
              <p className="card-name">{val.name}</p>
              <p className="card-des">{val.des}</p>
              <p className="card-amt">{val.amt}&nbsp;€</p>
              <div className="qtydiv">
                {/* <button
                  className="qtybtn"
                  onClick={(e) => decreaseQuantity(e, val.id)}
                >
                  -
                </button>
                {/* <input
                  type="number"
                  name=""
                  id=""
                  value={qty}
                  className="qtyinput"
                /> *
                <span>{val.value}</span>
                <button
                  className="qtybtn1"
                  onClick={(e) => increaseQuantity(e, val.id)}
                >
                  +
                </button> */}
                <button className="addcartbtn" onClick={() => addCart(val.id)}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// {
//   products.map((item) => (
//     <tr key={item.id}>
//       <td>{item.id}</td>
//       <td>{item.name}</td>
//       <td>{item.des}</td>
//       <td>{item.amt}</td>
//       <td>{item.totalNos}</td>
//       <td>{item.ftype}</td>
//       <td>
//         <img src={item.pic} alt="" srcset="" />
//       </td>
//       <td>{item.latest}</td>
//     </tr>
//   ));
// }

// import React, { useState } from "react";
// import "./Homepage.css";
// import heroimage from "../asserts/heroimage/iphone-hero-image1.jpg";
// import { Sidebar } from "../components/globalBars/Sidebar";
// import { Navbar } from "../components/globalBars/Navbar";
// import { useContext } from "react";
// import ProductContext from "../context/ProductContext";
// import { ProductItem } from "./ProductItem";

// export const Homepage = () => {
//   //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const { products, cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(ProductContext);
//   // const itemInCart = cart.find((item) => item.id === products.id);
//   // const [qty, setQty] = useState(0);
//   // // const [decreaseqty, setDecreaseqty] = useState(0);
//   // const increaseqty = () => {
//   //   setQty(() => qty + 1);
//   // };

//   // const decreaseqty = () => {
//   //   setQty(qty - 1);
//   // };

//   // const addtocart = () => {};

//   return (
//     <div className="homepage-main-div">
//       <div className="homepage-hero-image">
//         <img src={heroimage} alt="" />
//       </div>

//       <div className="homepage-cards">

//          {/* {products.map((product) => <ProductItem  key={product.id} product={product}/>)} */}
//     </div>
//     </div>
//   );
// };
