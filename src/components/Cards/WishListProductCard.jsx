// @ts-nocheck
import React, { useEffect, useState } from "react";
import Style from "./WishListProductCard.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import Image404 from "../../assets/2e60079f1e36b5c7681f0996a79e8af4.jpg"


const WishListProductCard = ({ product, setList }) => {
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const RemoveOne = async (e) => {
    // e.stopPropagation();
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${product._id} `,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "z9qnjrap5ytl",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await responce.json();
      console.log(data);
      if (responce.status >= 400) {
        alert(data.message);
        return;
      } else {
        setList((list) =>
          list.filter((item) => item.products._id !== product._id)
        );
        // setList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const AddtoCart = async (e) => {
    // e.stopPropagation();
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${product._id} `,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "z9qnjrap5ytl",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: 1,
          }),
        }
      );
      const data = await responce.json();
      console.log(data);
      if (responce.status >= 400) {
        alert(data.message);
        return;
      } else {
        setList((list) =>
          list.filter((item) => item.products._id !== product._id)
        );
        RemoveOne()
        alert("add Successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {});
  return (
    <>
      <div className={Style.ProductContainer}>
        <div className={Style.ProductDetail}>
          <div className={Style.ProductImg}>
            <img src={!product.displayImage ? Image404 :product.displayImage} alt="Product Image" />
          </div>
          <div className={Style.ProductDetails}>
            <p className={Style.ProductName}>{product.name}</p>
            {/* <div className={Style.ProductRating}>{product.ratings}</div> */}
            <div className={Style.ProductId}>Product id:{product._id}</div>
            <div className={Style.ProductPrice}>
              <CurrencyRupeeIcon style={{ fontSize: "20px" }} />
              {product.price}.00
            </div>
          </div>
        </div>
        <div className={Style.button}>
          <button onClick={AddtoCart}>Add to cart</button>
          <button onClick={RemoveOne}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default WishListProductCard;
