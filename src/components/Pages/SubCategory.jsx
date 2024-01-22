import React, { useEffect, useState } from "react";
import ProductCard from "../SingleCard/ProductCard";
import { useParams } from "react-router-dom";
import Login from "../LogIn/Login";
import Style from "./SubCategory.module.css";

const SubCategory = () => {
  const { type } = useParams();
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [ProductList, setProductList] = useState([]);
  const [sortedProductList, setSortedProductList] = useState([]);
  const [sortOrder, setSortOrder] = useState();
  const [range, setRange] = useState(135000);
  const [ratting, setRatting] = useState(3);
  const [sellerTag, setSellerTag] = useState("");
  const [applyFilter, setApplyFilter] = useState(false);

  const url = `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=1000&filter={"subCategory":"${type}"}`;
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
  const handleApplyFilter = async () => {
    setApplyFilter(true);

    try {
      const filteredList = ProductList.filter(
        (product) =>
          parseFloat(product.price) <= parseFloat(range) &&
          (sellerTag ? product.sellerTag === sellerTag : true)
        // parseFloat(product.rating) >= parseFloat(ratting)
      );
      console.log({ filteredList });

      const sortedList = [...filteredList];
      sortedList.sort((a, b) => {
        if (sortOrder === "ascending") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });

      setSortedProductList(sortedList);
    } catch (err) {
      console.log(err);
    } finally {
      setApplyFilter(false);
    }
  };
  useEffect(() => {
    if (type) {
      handleProductList();
    }
  }, [type]);
  return (
    <div>
      {/* <div>Television & Accessories</div> */}
      <div className={Style.FilterSection}>
        <div className={Style.filterBox}>
          <div className={Style.priceRange}>
            <div>Price</div>
            <div>{range}</div>
          </div>
          <input
            type="range"
            className={Style.prevision_slider}
            min={0}
            max={150000}
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
        </div>
        <div className={Style.filterBox}>
          <div>Rating</div>
          <input
            type="range"
            className={Style.prevision_slider}
            min={0}
            max={5}
            value={ratting}
            onChange={(e) => setRatting(e.target.value)}
          />
        </div>
        <div className={Style.sellertage}>
          <div>Seller Tag</div>
          <select
            className={Style.selecttage}
            onChange={(e) => setSellerTag(e.target.value)}
          >
            <option value="">All Sellers</option>
            <option value="top rated">Top Rated</option>
            <option value="best seller">Best Seller</option>
            <option value="trending">Trending</option>
            <option value="new arrival">New arrival</option>
          </select>
        </div>

        <button className={Style.applyButton} onClick={handleApplyFilter}>
          Apply Filters
        </button>
        <select
          className={Style.selecttage}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="ascending">Low To High</option>
          <option value="descending">High To Low</option>
        </select>
      </div>
      {sortedProductList.length > 0
        ? sortedProductList.map((product, index) => (
            <ProductCard
              product={product}
              key={index}
              setShowLoginPage={setShowLoginPage}
            />
          ))
        : ProductList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      <Login onClose={() => setShowLoginPage(false)} isOpen={showLoginPage} />
    </div>
  );
};

export default SubCategory;
