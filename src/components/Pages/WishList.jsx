// @ts-nocheck
import React, { useEffect, useState } from "react";
import Style from "./WishList.module.css";
// import { useNavigate } from "react-router-dom";
import WishListProductCard from "../Cards/WishListProductCard";

const WishList = ({ product }) => {
  const [List, setList] = useState();
  //   const Navigate = useNavigate();
  //   const toViewProduct = () => {
  //     Navigate(`/Product/${product._id}`);
  //   };
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const DeleteWishList = async (e) => {
    // e.stopPropagation();
    try {
      const responce = await fetch(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist/",
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
        setList("");
        // alert("All Product Remove to WishList Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const GetWishList = async (e) => {
    // e.stopPropagation();
    try {
      const responce = await fetch(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist/",
        {
          method: "GET",
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
        setList(data?.data?.items);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetWishList();
  }, []);

  return (
    <div className={Style.WishListContainer}>
      <div className={Style.Heading}>
        <div>My WishList</div>
        <button onClick={DeleteWishList}>Delete All</button>
      </div>
      {List &&
        List.filter((product) => product?.products)?.map((product, index) => (
          <WishListProductCard
            product={product.products}
            setList={setList}
            key={index}
          />
        ))}
    </div>
  );
};

export default WishList;
