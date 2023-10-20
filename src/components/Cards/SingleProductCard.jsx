// @ts-nocheck
import React, { useState } from "react";
import Style from "./SingleProductCard.module.css";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProductCard = ({ product }) => {
  const [wishList, setWishList] = useState(false);
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const navigate = useNavigate();

  const viewProduct = () => {
    navigate(`/Product/${product._id}`);
  };
  const AddWishList = async () => {
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
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      } else {
        setWishList(true);
        toast.success("item added to wishList successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
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
            <CurrencyRupeeIcon
              style={{ fontSize: "14px", fontWeight: "600" }}
            />
            <div>{product.price}</div>
          </div>
          <Rating
            className={Style.RatingIcon}
            name="product-rating"
            value={product.rating}
            precision={0.5}
            // onChange={(event, newRating) => setRating(newRating)}
            emptyIcon={<StarIcon style={{ color: "aqua", width: "100%" }} />}
            icon={<StarIcon style={{ color: "aqua", width: "100%" }} />}
          />
          {/* <div className={Style.ratting}>{product.rating}</div> */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SingleProductCard;
