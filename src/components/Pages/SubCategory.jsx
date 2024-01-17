import React, { useEffect, useState } from "react";
import ProductCard from "../SingleCard/ProductCard";
import { useParams } from "react-router-dom";
import Login from "../LogIn/Login";

const SubCategory = () => {
  const { type } = useParams();
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [ProductList, setProductList] = useState([]);
  
  const url = `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":"${type}"}`;
  const handleProductList = async () => {
    const responce = await fetch(
      // `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products`,
      url,
      {
        method: "GET",
        headers: {
          projectId: "ecbv068658kc",
        },
      }
    );
    const parseData = await responce.json();
    console.log(parseData.data);
    if (responce.status >= 400) {
      console.log(parseData.message || "Product not Found");
      return;
    }
    setProductList(parseData.data);
  };
  useEffect(() => {
    if (type) {
      handleProductList();
    }
  }, [type]);
  return (
    <div>
      {/* <div>Television & Accessories</div> */}
      {ProductList &&
        ProductList.map((product, index) => (
          <ProductCard product={product} key={index} setShowLoginPage={setShowLoginPage}/>
        ))}
      <Login onClose={() => setShowLoginPage(false)} isOpen={showLoginPage} />
    </div>
  );
};

export default SubCategory;
