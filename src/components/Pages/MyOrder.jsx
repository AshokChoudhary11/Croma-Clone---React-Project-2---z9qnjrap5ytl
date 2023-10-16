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
      <h2 className={Style.heading}>My Orders</h2>
      {orderList &&
        orderList.map((product, index) => (
          <OrderListCard product={product} key={index} />
        ))}
    </div>
  );
};

export default MyOrder;
