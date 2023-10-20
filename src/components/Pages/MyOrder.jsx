// @ts-nocheck
import React, { useEffect, useState } from "react";
import Style from "./myOrder.module.css";
import OrderListCard from "../Cards/OrderListCard";

const MyOrder = () => {
  const [orderList, setOrderList] = useState([]);
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const GetorderList = async () => {
    try {
      const responce = await fetch(
        "https://academics.newtonschool.co/api/v1/ecommerce/order",
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
      console.log("data", data);
      if (responce.status >= 400) {
        console.log(data.message);
        return;
      } else {
        setOrderList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetorderList();
  }, []);

  return (
    <div className={Style.mainContainer}>
      {orderList.length > 0 ? (
        <>
          <h2 className={Style.heading}>My Orders</h2>
          {orderList &&
            orderList.map((product, index) => (
              <OrderListCard product={product} key={index} />
            ))}
        </>
      ) : (
        <>
          <h2>Your Cart</h2>
          <div className={Style.mainContainer}>
            <img
              src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/f_auto,q_auto,d_Croma%20Assets:No_image.png/Croma%20Assets/UI%20Assets/sshz69afrixwivcsgnpx.svg"
              alt="Empty OrderList Image"
            />
            <div className={Style.info}>
              <div>No Order History Available</div>
              <div className={Style.innerInfo}>
                <a href="/">Continue Shopping</a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrder;
