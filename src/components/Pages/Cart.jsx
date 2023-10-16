// @ts-nocheck
import React, { useEffect, useState } from "react";
import Style from "./Cart.module.css";
import PercentIcon from "@mui/icons-material/Percent";
import CartProductCard from "../Cards/CartProductCard";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartList, SetCartList] = useState("");
  const [allData, setAllData] = useState({});
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const UserLocation = localStorage.getItem("locationDetails");
  const parseUserLocation = JSON.parse(UserLocation);
  const navigate = useNavigate();
  const getAllProduct = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "z9qnjrap5ytl",
            "Content-Type": "application/json",
          },
        }
      );
      const parseData = await responce.json();
      // console.log(parseData.data);
      if (responce.status >= 400) {
        console.log(parseData.message || "Product not Found");
        return;
      }
      SetCartList(parseData?.data?.items);
      // console.log(parseData?.data?.items);
      setAllData(parseData);
      console.log(parseData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  const toUpdateAddress = () => {
    navigate("/udateAddress");
  };
  const toCheckOut = () => {
    navigate("/checkOut");
  };

  return (
    <div className={Style.CartContainer}>
      <h2>Your Cart</h2>
      <div className={Style.allSection}>
        <div className={Style.leftSection}>
          <div className={Style.AddressSection} onClick={toUpdateAddress}>
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
            {cartList &&
              cartList?.map((product, index) => (
                <CartProductCard
                  product={product}
                  key={index}
                  SetCartList={SetCartList}
                />
              ))}
          </div>
        </div>
        <div className={Style.OrderSummaryContainer}>
          <h3>Order Summary ({allData?.data?.items?.length} item)</h3>
          <div className={Style.OriginalPrice}>
            <div>Original Price</div>
            <div>{allData?.data?.totalPrice}</div>
          </div>
          <div className={Style.DeliveryCharge}>
            <div>Delivery</div>
            <div>Free</div>
          </div>
          <div className={Style.TotalPrice}>
            <div>Total</div>
            <div>{allData?.data?.totalPrice}</div>
          </div>
          <button onClick={toCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
