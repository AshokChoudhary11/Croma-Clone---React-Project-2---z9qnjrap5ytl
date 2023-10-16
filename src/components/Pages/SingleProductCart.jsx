// @ts-nocheck
import React, { useEffect, useState } from "react";
import Style from "./Cart.module.css";
import PercentIcon from "@mui/icons-material/Percent";
import SingalProductCartProductCard from "../Cards/SingalProductCartProductCard";
import { useNavigate, useParams } from "react-router-dom";

const Cart = () => {
  const [Product, setProduct] = useState("");
  const [placeOrder, setPlaceOrder] = useState(false);
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const UserLocation = localStorage.getItem("locationDetails");
  const parseUserLocation = JSON.parse(UserLocation);
  const { productID } = useParams();
  const url = `https://academics.newtonschool.co/api/v1/ecommerce/product/${productID}`;
  console.log("productID", productID);

  const getProduct = async () => {
    try {
      const responce = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${parseUserDetails.token}`,
          projectId: "z9qnjrap5ytl",
          "Content-Type": "application/json",
        },
      });
      const parseData = await responce.json();
      // console.log(parseData.data);
      if (responce.status >= 400) {
        console.log(parseData.message || "Product not Found");
        return;
      }
      setProduct(parseData?.data);
      console.log(parseData?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const HandlePaynow = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/order`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "z9qnjrap5ytl",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: productID,
            quantity: 1,
            addressType: "HOME",
            address: {
              street: "123 Main St",
              city: "Anytown",
              state: "CA",
              country: "USA",
              zipCode: "12345",
            },
          }),
        }
      );
      const data = await responce.json();
      console.log(data);
      if (responce.status >= 400) {
        alert(data.message);
        return;
      } else {
        alert("Order placed Successfully!");
        setProduct("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={Style.CartContainer}>
      <h2>Your Cart</h2>
      <div className={Style.allSection}>
        <div className={Style.leftSection}>
          <div className={Style.AddressSection}>
            <div className={Style.ShippingAddressText}>Shipping Address</div>
            <h3>Home</h3>
            <div className={Style.Address}>
              {parseUserLocation?.Address}
              {parseUserLocation?.State}
              {parseUserLocation?.Pincode}
            </div>
          </div>
          <div className={Style.CoupenSection}>
            <PercentIcon className={Style.percentIcon} />
            Apply Coupon
          </div>

          <div className={Style.Product}>
            {Product && <SingalProductCartProductCard product={Product} />}
          </div>
        </div>
        <div className={Style.OrderSummaryContainer}>
          <h3>Order Summary (1 item)</h3>
          <div className={Style.OriginalPrice}>
            <div>Original Price</div>
            <div>{Product.price}</div>
          </div>
          <div className={Style.DeliveryCharge}>
            <div>Delivery</div>
            <div>Free</div>
          </div>
          <div className={Style.TotalPrice}>
            <div>Total</div>
            <div>{Product.price}</div>
          </div>
          <button onClick={HandlePaynow}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
