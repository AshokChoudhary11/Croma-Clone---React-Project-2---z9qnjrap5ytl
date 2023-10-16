import React, { useState } from "react";
import Style from "./UpdateAddress.module.css";
import { useNavigate } from "react-router-dom";

const UpdateAddress = () => {
  const [pincode, setPinCode] = useState("");
  const [city, Setcity] = useState("");
  const [Address, setAddress] = useState("");
  const navigate = useNavigate();
  const LocationDetails = {
    Pincode: pincode,
    City: city,
    Address: Address,
  };
  const handleContinue = () => {
    localStorage.setItem("locationDetails", JSON.stringify(LocationDetails));
    navigate(-1);
  };

  return (
    <div className={Style.mainWrapper}>
      <div className={Style.mainContainer}>
        <div className={Style.contentSection}>
          <h2 className={Style.heading}>SELECT YOUR LOCATION</h2>
          <div className={Style.details}>
            To Check Products & Delivery Options available at your location
          </div>
          <input
            placeholder="Enter Pincode"
            onChange={(e) => setPinCode(e.target.value)}
          />
          <input
            placeholder="Write City Name"
            onChange={(e) => Setcity(e.target.value)}
          />
          <input
            placeholder="Write complete Address"
            onChange={(e) => setAddress(e.target.value)}
          ></input>
          <button onClick={handleContinue}>Continue</button>
        </div>
        <div
          className={Style.crossButton}
          onClick={() => {
            navigate(-1);
          }}
        >
          X
        </div>
      </div>
    </div>
  );
};

export default UpdateAddress;
