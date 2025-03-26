import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/allProductsapi";
import orderapi from "../api/allOrders";
import totalorder from "../api/totalOrderDetails";
import axios from "axios";
import LoginContext from "./LoginContext";

useContext;

const ProductContext = createContext({});

const CART_API = "http://localhost:3501/orders";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalorders, setTotalOrders] = useState([]);
  const [addonlyOrders, setAddonlyOrders] = useState([]);
  const [phonetotalamt, setPhonetotalamt] = useState({
    id: 1,
    iphone: 0,
    samsung: 0,
  });

  const [total, setTotal] = useState(0);
  const { user, email, setEmail, setUser, localuser, logout } =
    useContext(LoginContext);

  // const [usersdata, setUsersdata] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/productItems");
      console.log(response.data);

      setProducts(response.data);
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  // -------------------------------------------------------------------------------------
  const fetchonlyOrders = async () => {
    try {
      const response = await api.get("/onlyorderlists");
      console.log(response.data);

      setAddonlyOrders(response.data);
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  useEffect(() => {
    fetchonlyOrders();
  }, []);

  console.log("Only Order Lists");
  console.log(addonlyOrders);

  //================================================================================00
  const fetchOrders = async () => {
    try {
      const response = await orderapi.get("/orders");
      setCart(response.data);
      console.log("---------card________-");

      console.log(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const addCart = async (id) => {
    const product = products.find((item) => item.id === id);
    const orderid = cart.length ? cart.length + 1 : 1;
    console.log("Product item");

    console.log(product);

    setCart([...cart, product]);

    const addOrder = {
      orderid,
      name: product.name,
      des: product.des,
      ftype: product.ftype,
      amt: product.amt,
      subamt: product.amt,
      value: 1,
    };
    try {
      const response = await orderapi.post("/orders", addOrder);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  const cartlength = cart.length;
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log("Separate Rendering");

  console.log("cartlength");
  console.log(cartlength);
  //------------------------------------------------------------------------------------------------
  const increaseQuantity = async (e, id) => {
    e.preventDefault();
    try {
      const updateValue = cart.find((cartitem) => cartitem.id === id);
      console.log("Increase Updated Value");

      console.log(updateValue);
      const updateOrder = {
        ...updateValue,
        value: updateValue.value + 1,
        subamt: (updateValue.value + 1) * updateValue.amt,
      };
      await orderapi.put(`/orders/${id}`, updateOrder);
      // Update the local state
      setCart(cart.map((item) => (item.id === id ? updateOrder : item)));
      console.log("Increase Quantity");

      console.log(cart);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const decreaseQuantity = async (e, id) => {
    e.preventDefault();
    try {
      const updateValue = cart.find((cartitem) => cartitem.id === id);
      console.log("Decrease Updated Value");

      console.log(updateValue);
      const updateOrder = {
        ...updateValue,
        value: updateValue.value - 1,
        subamt: (updateValue.value - 1) * updateValue.amt,
      };
      await orderapi.put(`/orders/${id}`, updateOrder);
      // Update the local state
      setCart(cart.map((item) => (item.id === id ? updateOrder : item)));
      console.log("Decrease Quantity");

      console.log(cart);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  // Handle delete action
  const deleteItem = async (e, id) => {
    e.preventDefault();
    fetchOrders();
    try {
      // Delete the item from the server
      await orderapi.delete(`/orders/${id}`);
      // fetchOrders();
      // Remove the item from the local state
      const deleteValue = cart.filter((cartitem) => cartitem.id !== id);

      console.log("Except Deleted Item");
      // Reassign IDs to maintain order
      const reorderedItems = deleteValue.map((item, orderid) => ({
        ...item,
        orderid: orderid + 1, // Start IDs from 1
      }));
      // Update the local state
      setCart(reorderedItems);
      console.log("reorderedItems OrderID");

      console.log(reorderedItems[0].orderid);
      // setCart(deleteValue);
      // // await orderapi.delete(`/orders/${id}`);
      // setCart(deleteValue);

      // console.log("delete Quantity");
      // Update the server with the new order (optional)
      await Promise.all(
        reorderedItems.map((item) => orderapi.put(`/orders/${item.id}`, item))
      );
      // setCart(reorderedItems);
      console.log(cart);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.
  //Fetch Total Order

  const fetchTotalOrders = async () => {
    try {
      const response = await totalorder.get("/totalorders");
      setTotalOrders(response.data);
      console.log("*********Totla Orders*********");

      console.log(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
    }
  };

  useEffect(() => {
    fetchTotalOrders();
  }, []);

  console.log("total order id");

  console.log(totalorders.length);

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  //Total Order Details
  // const id = products.length ? products[products.length -1].id + 1 : 1;
  //const  addProduct = {id, name:productTitle, des:productDescription, amt:parseInt(productAmt), totalNos:parseInt(productTotalNos), ftype:productftype, pic:productPic, latest:productLatest}; paymentfinished cart.length ? cart.length + 1 : 1;

  // //To Find Total each phone value 25-03-25
  let tiamt = 0;
  // const [tiamt, setTiamt] = useState(0);
  for (let i = 0; i < addonlyOrders.length; i++) {
    if (addonlyOrders[i].ftype === "iphone") {
      tiamt = tiamt + parseInt(addonlyOrders[i].subamt);
    }
    // setTiamt(tiamt);
  }
  console.log("Fetch only Iphone Amt from Home Page");
  console.log(tiamt);

  let tsamt = 0;
  for (let i = 0; i < addonlyOrders.length; i++) {
    if (addonlyOrders[i].ftype === "SamsungGalaxy") {
      tsamt = tsamt + parseInt(addonlyOrders[i].subamt);
    }
  }
  console.log("Fetch only Samsung Amt from Home Page");
  console.log(tsamt);

  // setPhonetotalamt((preAmt) => ({
  //       ...preAmt,
  //       iphone: preAmt.iphone + tiamt,
  //       samsung: preAmt.samsung + tsamt,
  //     }));
  //     console.log(phonetotalamt);
  //................................................................................
  const updatephoneamt = (tiamt, tsamt) => {
    //To Find Total each phone value 25-03-25

    console.log("Fetch only Samsung Amt from updatephoneamt fn");
    console.log(tsamt);
    setPhonetotalamt((preAmt) => ({
      ...preAmt,
      iphone: parseInt(preAmt.iphone) + parseInt(tiamt),
      samsung: parseInt(preAmt.samsung) + parseInt(tsamt),
    }));
    // console.log(setPhonetotalamt);
    //     ...preAmt,
    //     iphone: preAmt.iphone + tiamt,
    //     samsung: preAmt.samsung + tsamt,
    //   }));
    //   console.log(phonetotalamt););
  };
  // updatephoneamt();

  useEffect(() => {
    updatephoneamt(tiamt, tsamt);
  }, []);

  console.log("Total Phone amt in ProductContext out side the payfinished fn");
  console.log(phonetotalamt);

  console.log(
    "Total Phone amt in ProductContext out side the updatephoneamt fn"
  );

  const paymentfinished = async (e, cart, user, total) => {
    e.preventDefault();
    fetchTotalOrders();

    console.log("Length of Total Orders");
    console.log(totalorders.length);

    const totalorderid = totalorders.length;

    console.log("total order id");

    console.log(totalorderid);

    console.log("Total Order");

    console.log(totalorders);

    console.log("Total cart");

    console.log(cart);
    console.log("Total user");

    console.log(user);
    console.log("Total Amount");

    console.log(total);

    console.log(totalorderid);
    let iid = totalorderid + 1;
    // let addonlyOrders;
    let reorderid = addonlyOrders.length + 1;
    console.log(" addonlyOrders.length after Total Amount");
    console.log(addonlyOrders.length);
    console.log(reorderid);

    const addonlyOrders1 = cart.map((cartitem) => ({
      id: reorderid++,
      // id: reorderid + 1,
      // id: iid++,
      name: cartitem.name,
      des: cartitem.des,
      amt: cartitem.amt,
      subamt: cartitem.subamt,
      ftype: cartitem.ftype,
      value: cartitem.value,
    }));

    // useEffect(() => {
    //   setAddonlyOrders(addonlyOrders); // ✅ Updates when component mounts
    // }, []); // Runs only once on mount

    // setAddonlyOrders = () => {
    //   addonlyOrders = cart.map((cartitem) => ({
    //     id: reorderid + 1,
    //     // id: reorderid + 1,
    //     // id: iid++,
    //     name: cartitem.name,
    //     des: cartitem.des,
    //     amt: cartitem.amt,
    //     subamt: cartitem.subamt,
    //     ftype: cartitem.ftype,
    //     value: cartitem.value,
    //   }));
    // };
    // fetchTotalOrders();
    console.log(">>>>>>>>>>>>Add Only Order>>>>>>>>>>>>>>");
    console.log(addonlyOrders1);
    console.log(addonlyOrders1[0]);

    for (let i = 0; i < addonlyOrders1.length; i++) {
      try {
        const response = await api.post("/onlyorderlists", addonlyOrders1[i]);
        const allOrders = [...addonlyOrders, response.data];
        setAddonlyOrders(allOrders);
        setTotalOrders(allOrders);
        await fetchTotalOrders();

        const res = await orderapi.get("/orders");
        for (const order of res.data) {
          await orderapi.delete(`/orders/${order.id}`);
        }
        setCart([]);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }

    const addTotalOrder = {
      orderList: cart.map((cartItem) => ({
        id: cartItem.id,
        orderid: cartItem.orderid,
        name: cartItem.name,
        ftype: cartItem.ftype,
        amt: cartItem.amt,
        subamt: cartItem.subamt,
        value: cartItem.value,
      })),
      total: total,
      quantity: cart.reduce((acc, item) => acc + item.value, 0),
      users: {
        id: user.id, // Assuming a static user ID for simplicity
        username: user.username,
        email: user.email, // Assuming a static email for simplicity
      },
    };

    // const addTotalOrder = cart.map((cartitem) => ({
    //   id: iid++,
    //   name: cartitem.name,
    //   des: cartitem.des,
    //   amt: cartitem.amt,
    //   subamt: cartitem.subamt,
    //   ftype: cartitem.ftype,
    //   value: cartitem.value,
    // }));
    // fetchTotalOrders();
    console.log(">>>>>>>>>>>>Add Total Order>>>>>>>>>>>>>>");
    console.log(addTotalOrder);
    // console.log(addTotalOrder[0]);

    // for (let i = 0; i < addTotalOrder.length; i++) {
    try {
      const response = await totalorder.post("/totalorders", addTotalOrder);
      const allTotalOrders = [...totalorders, response.data];
      setTotalOrders(allTotalOrders);
      await fetchTotalOrders();

      const res = await orderapi.get("/orders");
      for (const order of res.data) {
        await orderapi.delete(`/orders/${order.id}`);
      }
      setCart([]);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    // }

    console.log("Total Orders------------------------");
    console.log(totalorders);

    console.log("Total Orders$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
    console.log(totalorders);

    // console.log("Total Phone amt in ProductContext");
    // console.log(updatephoneamt());
  };

  //--------------------------------------------------------------------------

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  console.log(
    "Total Phone amt in ProductContext outside side the payfinished fn"
  );
  console.log(phonetotalamt);

  console.log("products");
  console.log(products);

  //Add Products

  console.log("cart");
  console.log(cart);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        fetchOrders,
        fetchPosts,
        fetchonlyOrders,
        addonlyOrders,
        cart,
        addCart,
        increaseQuantity,
        decreaseQuantity,
        cartlength,

        paymentfinished,
        fetchTotalOrders,
        updatephoneamt,
        phonetotalamt,
        total,
        setTotal,
        totalorders,
        deleteItem,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

//******************************************************************************************************************************************* */
