// @ts-nocheck
import React, { useState } from "react";
import Style from "./CartProductCart.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";

const CartProductCard = ({ product, SetCartList }) => {
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const date = new Date();
  let day = date.getDate() + 3;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}/${month}/${year}`;
  const RemoveOne = async (e) => {
    // e.stopPropagation();
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${product.product._id} `,
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
        SetCartList((list) =>
          list.filter((item) => item.product._id !== product.product._id)
        );
        // setList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const AddWishList = async (e) => {
    e.stopPropagation();
    try {
      const responce = await fetch(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist/",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "z9qnjrap5ytl",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: `${product._id}`,
          }),
        }
      );
      const data = await responce.json();
      console.log(data);
      if (responce.status >= 400) {
        alert(data.message);
        return;
      } else {
        SetCartList((list) =>
          list.filter((item) => item.product._id !== product.product._id)
        );
        // setWishList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(product);
  return (
    <>
      <div className={Style.ProductContainer}>
        <div className={Style.ProductImg}>
          <img src={product.product.displayImage} alt="Product Image" />
        </div>
        <div className={Style.ProductDetailsmain}>
          <div className={Style.ProductDetails}>
            <p className={Style.ProductName}>{product.product.name}</p>
            <div className={Style.ProductRating}>{product.product.ratings}</div>

            <div className={Style.deliveryDate}>
              <div>Standard Delivery</div>
              <div>{currentDate}</div>
            </div>
            <div className={Style.buttons}>
              <button className={Style.MovetoWishList} onClick={AddWishList}>
                Move to WishList
              </button>
              <button className={Style.RemoveButton} onClick={RemoveOne}>
                Remove
              </button>
            </div>
          </div>
          <div className={Style.PriceSection}>
            <div className={Style.ProductPrice}>
              <CurrencyRupeeIcon />
              {product.product.price}.00
            </div>
            <div className={Style.tex}>(incl. all Texes)</div>
            <hr></hr>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProductCard;
