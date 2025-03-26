import { useState, useContext } from "react";
import api from "../api/allProductsapi";
import ProductContext from "../context/ProductContext";
import "./AddProduct.css";

export const AddProduct = () => {
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productAmt, setProductAmt] = useState("");
  const [productTotalNos, setProductTotalNos] = useState("");
  const [productftype, setProductftype] = useState("");
  const [productPic, setProductPic] = useState("");
  const [productLatest, setProductLatest] = useState("");

  const { products, setProducts } = useContext(ProductContext);

  //To Add Products
  const submitAddProduct = async (e) => {
    e.preventDefault();
    const id = products.length
      ? parseInt(products[products.length - 1].id) + 1
      : 1;
    const addProduct = {
      id,
      name: productTitle,
      des: productDescription,
      amt: parseInt(productAmt),
      totalNos: parseInt(productTotalNos),
      ftype: productftype,
      pic: productPic,
      latest: productLatest,
    };
    try {
      const response = await api.post("/productItems", addProduct);
      const allProducts = [...products, response.data];
      setProducts(allProducts);
      setProductTitle("");
      setProductDescription("");
      setProductAmt("");
      setProductTotalNos("");
      setProductftype("");
      setProductPic("");
      setProductLatest("");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div className="addproduct">
      <header>
        <h1>Add a Product</h1>
        <p>Orders placed across you store</p>
      </header>
      <div className="addproduct-details">
        <form onSubmit={submitAddProduct}>
          <div>
            <label htmlFor="productTitle"> Product Title</label>
            <input
              name="productTitle"
              id="productTitle"
              type="text"
              required
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              placeholder="write a title here..."
            />
          </div>
          <div>
            <label htmlFor="productDescription"> Product Description</label>
            <input
              name="productDescription"
              id="productDescription"
              type="text"
              required
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="write a Product Description here..."
            />
          </div>
          <div>
            <label htmlFor="productAmt"> Product Amount</label>
            <input
              name="productAmt"
              id="productAmt"
              type="text"
              required
              value={productAmt}
              onChange={(e) => setProductAmt(e.target.value)}
              placeholder="write a Product Amount here..."
            />
          </div>
          <div>
            <label htmlFor="productTotalNos"> Product Total Nos</label>
            <input
              name="productTotalNos"
              id="productTotalNos"
              type="text"
              required
              value={productTotalNos}
              onChange={(e) => setProductTotalNos(e.target.value)}
              placeholder="write a Product Total Numbers here..."
            />
          </div>
          <div>
            <label htmlFor="productftype"> Product File Type</label>
            <input
              name="productftype"
              id="productftype"
              type="text"
              required
              value={productftype}
              onChange={(e) => setProductftype(e.target.value)}
              placeholder="write a Product File Type here..."
            />
          </div>
          <div>
            <label htmlFor="productPic"> Product Image</label>
            <input
              name="productPic"
              id="productPic"
              type="text"
              required
              value={productPic}
              onChange={(e) => setProductPic(e.target.value)}
              placeholder="write a Product image here..."
            />
          </div>
          <div>
            <label htmlFor="productLatest"> Product Latest</label>
            <input
              name="productLatest"
              id="productLatest"
              type="text"
              required
              value={productLatest}
              onChange={(e) => setProductLatest(e.target.value)}
              placeholder="write a Product Latest here..."
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};
