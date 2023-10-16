// @ts-nocheck
import React, { useEffect, useState } from "react";
import Style from "./SingleProductCard.module.css";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";

const Leptop = () => {
  const [product, setProduct] = useState("");
  const [rating, setRating] = useState(0);
  const [wishList, setWishList] = useState(false);
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const navigate = useNavigate();

  const GetProduct = async () => {
    const responce = await fetch(
      "https://academics.newtonschool.co/api/v1/ecommerce/product/65153c11c2bdf54cfdbd06c9",
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
    setProduct(parseData.data);
    console.log(parseData.data);
    setRating(parseData.data.ratings); // Set the initial rating
    // setReview(parseData.data.reviews);
    console.log(parseData.data);
  };
  const viewProduct = () => {
    navigate(`/Product/${product._id}`);
  };
  const AddWishList = async (e) => {
    e.stopPropagation();
    try {
      if (!parseUserDetails || !parseUserDetails.token) {
        navigate("/login");
        console.log("User details or token not found.");
        return;
      }

      const responce = await fetch(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "z9qnjrap5ytl",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product._id,
          }),
        }
      );
      const data = await responce.json();
      console.log(data);
      if (responce.status >= 400) {
        alert(data.message);
        return;
      } else {
        setWishList(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetProduct();
  }, []);
  return (
    <div className={Style.CardContainer} onClick={viewProduct}>
      <div className={Style.wishLishIcon} onClick={AddWishList}>
        {wishList ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </div>
      <div className={Style.ImageContainer}>
        <img src={product.displayImage} alt="Product Image" />
      </div>
      <div className={Style.cantent}>
        <div className={Style.productName}>{product.name}</div>
        <div className={Style.productPrice}>
          <CurrencyRupeeIcon style={{ fontSize: "14px", fontWeight: "600" }} />
          <div>{product.price}</div>
        </div>
        <Rating
          className={Style.RatingIcon}
          name="product-rating"
          value={product.rating}
          precision={0.5}
          // onChange={(event, newRating) => setRating(newRating)}
          emptyIcon={<StarIcon style={{ color: "gray", width: "100%" }} />}
          icon={<StarIcon style={{ color: "yellow", width: "100%" }} />}
        />
        {/* <div className={Style.ratting}>{product.rating}</div> */}
      </div>
    </div>
  );
};

export default Leptop;
