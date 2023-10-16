import React from "react";
import Style from "./featureUpdateSoon.module.css";
import { useNavigate } from "react-router-dom";

const FeatureUpdateSoon = () => {
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate("/");
  };
  return (
    <div className={Style.mainContainer}>
      <div className={Style.contains}>Feature Update Soon</div>
      <button className={Style.BackButton} onClick={gotoHome}>
        Go to Home
      </button>
    </div>
  );
};

export default FeatureUpdateSoon;
