import React, { useEffect, useState } from "react";
import Style from "./AllProduct.module.css";
import ProductCard from "../SingleCard/ProductCard";
import { useSearchParams } from "react-router-dom";

const AllProduct = () => {
  const [ProductList, SetProductList] = useState([]);
  const [searchParams] = useSearchParams();
  const searchProductName = searchParams.get("product_name");

  const handleProductList = async (searchName) => {
    const responce = await fetch(
      `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=1000${
        searchName && `&search={"name":"${searchName}"}`
      }`,
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
    SetProductList(parseData.data);
    console.log(ProductList);
  };
  useEffect(() => {
    handleProductList(searchProductName);
  }, [searchProductName]);

  return (
    <div>
      {ProductList &&
        ProductList.map((product) => <ProductCard product={product} />)}
    </div>
  );
};

export default AllProduct;
