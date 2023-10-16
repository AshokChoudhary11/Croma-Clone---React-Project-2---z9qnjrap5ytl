import React from "react";
import Style from "./SingleProductCard.module.css";

const SingleProductCard = () => {
  return (
    <div className={Style.CardContainer}>
      <div className={Style.ImageContainer}>
        <img
          src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1688545518/Croma%20Assets/Large%20Appliances/Refrigerator/Images/274658_dwljqg.png?tr=w-480"
          alt=""
        />
      </div>
      <div className={Style.cantent}>
        <div className={Style.productName}>PRODUCT NAME</div>
        <div className={Style.productPrice}>ProductPrice</div>
        <div className={Style.ratting}>* * * * *</div>
      </div>
    </div>
  );
};

export default SingleProductCard;
