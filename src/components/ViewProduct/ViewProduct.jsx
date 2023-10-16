// @ts-nocheck
import React, { useEffect, useState } from "react";
import Style from "./ViewProduct.module.css";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import StoreIcon from "@mui/icons-material/Store";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate, useParams } from "react-router-dom";

const ViewProduct = () => {
  const [Product, setProduct] = useState();
  const [wishList, setWishList] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [rating, setRating] = useState(3.5); // Initial rating value
  const [Review, setReview] = useState([]);
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const UserLocation = localStorage.getItem("locationDetails");
  const parseUserLocation = JSON.parse(UserLocation);
  const navigate = useNavigate();

  const { productID } = useParams();
  const url = `https://academics.newtonschool.co/api/v1/ecommerce/product/${productID}`;
  const handleProduct = async () => {
    const responce = await fetch(url, {
      method: "GET",
      headers: {
        projectId: "ecbv068658kc",
      },
    });
    const parseData = await responce.json();
    console.log(parseData.data);
    if (responce.status >= 400) {
      console.log(parseData.message || "Product not Found");
      return;
    }
    setProduct(parseData.data);
    // setRating(parseData.data.ratings); // Set the initial rating
    setReview(parseData.data.reviews);
    console.log(parseData.data);
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
            productId: Product._id,
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
  const AddtoCart = async (e) => {
    // e.stopPropagation();
    try {
      if (!parseUserDetails || !parseUserDetails.token) {
        navigate("/login");
        console.log("User details or token not found.");
        return;
      } else {
        const responce = await fetch(
          `https://academics.newtonschool.co/api/v1/ecommerce/cart/${Product._id} `,
          {
            method: "PATCH",
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
          alert("add Successfully!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const BuyNow = () => {
    if (!parseUserDetails || !parseUserDetails.token) {
      navigate("/login");
      console.log("User details or token not found.");
      return;
    } else {
      navigate(`/Cart/${Product._id}`);
    }
  };
  const AddReview = async (e) => {
    // e.stopPropagation();
    try {
      if (!parseUserDetails || !parseUserDetails.token) {
        navigate("/login");
        console.log("User details or token not found.");
        return;
      } else {
        const responce = await fetch(
          `https://academics.newtonschool.co/api/v1/ecommerce/review/${Product._id} `,
          {
            method: "POST",
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
          alert("add Successfully!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (productID) {
      handleProduct();
    }
  }, [productID]);
  if (!Product) {
    return "Loading";
  }
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <>
      <div className={Style.ViewProductContainer}>
        <div className={Style.ProductDetailContainer}>
          <div className={Style.ProductImageContainer}>
            {/* <div className={Style.ProductImages}>
            <img
              src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1680264497/Croma%20Assets/Entertainment/Television/Images/255758_ndwfvq.png"
              alt="ProductImg1"
            />
            <img
              src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1669009608/Croma%20Assets/Entertainment/Television/Images/255758_2_jtwav6.png"
              alt="productImg2"
            />
          </div> */}
            <div className={Style.ProductImages}>
              <div className={Style.icons}>
                <div onClick={AddWishList}>
                  {wishList ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </div>
                <div>
                  <ShareOutlinedIcon style={{ cursor: "not-allowed" }} />
                </div>
              </div>
              <img src={Product.displayImage} alt="ProductImg" />
              <div className={Style.CampareProduct}>
                <div className={Style.disebleButton}>
                  <input type="checkbox" />
                  Compare
                </div>
                <div className={Style.disebleButton}>
                  <StoreIcon />
                  Connect To Store
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={Style.ProductName}>{Product.name}</div>
            {/* <Rating
              name="product-rating"
              value={rating}
              precision={0.5}
              onChange={(event, newRating) => setRating(newRating)}
              emptyIcon={<StarBorderIcon style={{ color: "white" }} />}
              icon={<StarIcon style={{ color: "yellow" }} />}
            /> */}
            <div className={Style.ProductRating}>
              <div>{Product.ratings}</div>
              <StarIcon style={{ fontSize: "16px" }} />
              <div>({Product.reviews.length}Reviews)</div>
            </div>
            <div className={Style.ProductPrice}>
              <CurrencyRupeeIcon />
              {Product.price}.00
            </div>
            <div className={Style.tex}>(Incl. all Texes)</div>
            <div className={Style.deliveryAddress}>
              <div className={Style.DeliveryAddress}>
                Delivery at: {parseUserLocation?.City},
                {parseUserLocation?.Pincode}
              </div>
              <div className={Style.StanderdDelivery}>
                Standard Delivery by Tomorrow
              </div>
            </div>
            <div className={Style.KeyFeatures}>
              Key Features
              <div>
                {Product.features.map((item) => (
                  <div>{item}</div>
                ))}
              </div>
            </div>
            <div className={Style.button}>
              <button onClick={BuyNow}>Buy now</button>
              <button onClick={AddtoCart}>Add to cart</button>
            </div>
          </div>
        </div>
        <div className={Style.Description}>
          <h3>Overview</h3>
          <br></br>
          <div
            dangerouslySetInnerHTML={{
              __html: showMore
                ? Product.description
                : Product.description.slice(0, 500),
            }}
          />
          {!showMore && (
            <button onClick={toggleShowMore} className={Style.ShowMoreButton}>
              Show More
            </button>
          )}
        </div>
        <div className={Style.Review}>
          <h2>Review</h2>
          <div className={Style.AddReview}>
            <div>Review this product</div>
            <div>Help other customers make their decisions</div>
            <div>
              <label htmlFor="rating">Rating : </label>

              <select
                name="Rating"
                id="rating"
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <textarea
              placeholder="Write a Review"
              onChange={(e) => setReview(e.target.value)}
            />
            <button className={Style.SubmitReview}>Submit</button>
          </div>
          <div className={Style.ConstomersReview}>
            <h3>Customer Reviews:</h3>
            {Review &&
              Review.map((constomer, index) => (
                <div key={index}>
                  <div>constomer Name</div>
                  <div>Ratings in star</div>
                  <span>review Date</span>
                  <div>Review content</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
