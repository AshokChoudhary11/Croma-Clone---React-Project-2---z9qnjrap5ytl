import React, { useEffect, useState } from "react";
import Style from "./AllProduct.module.css";
import ProductCard from "../SingleCard/ProductCard";
import { useSearchParams } from "react-router-dom";

const AllProduct = () => {
  const [ProductList, SetProductList] = useState([]);
  // const [updatedlist, setupdatedlist] = useState([]);
  const [searchParams] = useSearchParams();
  const searchProductName = searchParams.get("product_name");
  // const [sortedProductList, setSortedProductList] = useState([]);
  // const [sortOrder, setSortOrder] = useState("ascending");

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
  // const sortProducts = () => {
  // Create a copy of the original productList to avoid mutating state directly
  // const sortedList = [...ProductList];
  // sortedList.sort((a, b) => {
  // if (sortOrder === "ascending") {
  // return a.price - b.price;
  // } else {
  // return b.price - a.price;
  // }
  // });
  // @ts-ignore
  // setSortedProductList(sortedList);
  // Toggle the sort order for the next click
  // setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  // };

  return (
    <div>
      {ProductList &&
        ProductList.map((product) => <ProductCard product={product} />)}
      {/* <button className={Style.shorbutton} onClick={sortProducts}>
        {sortOrder === "ascending" ? "lowToHigh" : "highToLow"}
      </button>
      {sortedProductList.length > 0
        ? sortedProductList.map((product) => <ProductCard product={product} />)
        : ProductList.map((product) => <ProductCard product={product} />)} */}
    </div>
  );
};

export default AllProduct;
