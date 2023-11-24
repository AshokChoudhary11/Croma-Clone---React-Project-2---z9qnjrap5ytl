// @ts-nocheck
import React, { useEffect, useState } from "react";
import Style from "./Profile.module.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ImportantDevicesOutlinedIcon from "@mui/icons-material/ImportantDevicesOutlined";
import SmsFailedOutlinedIcon from "@mui/icons-material/SmsFailedOutlined";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userDetails")
  );
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);

  const toWishList = () => {
    if (!parseUserDetails || !parseUserDetails.token) {
      navigate("/login");
      console.log("User details or token not found.");
      return;
    } else {
      navigate("/wishList");
    }
  };
  const toMyOrder = () => {
    if (!parseUserDetails || !parseUserDetails.token) {
      navigate("/login");
      console.log("User details or token not found.");
      return;
    } else {
      navigate("/MyOrder");
    }
  };
  const gotomyProfile = () => {
    navigate("/Profile/edit-Profile");
  };
  const gotoUpdateSoon = () => {
    navigate("/UpdateSoon");
  };
  const handleLogOut = () => {
    localStorage.removeItem("userDetails");
    setIsLoggedIn(false);
    toast.success("Logout Successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className={Style.ProfileSection}>
      <div className={Style.header}>
        <div>My Account</div>
        {isLoggedIn && <button onClick={handleLogOut}>Logout</button>}
        {!isLoggedIn && <button onClick={handleLogin}>Login</button>}
      </div>
      <div className={Style.detailSection}>
        <div className={Style.Container} onClick={gotomyProfile}>
          <div className={Style.icon}>
            <AccountCircleOutlinedIcon />
          </div>
          <div>
            <div className={Style.heading}>My Profile</div>
            <div className={Style.about}>Edit your basic details</div>
          </div>
        </div>
        <div className={Style.Container} onClick={gotoUpdateSoon}>
          <div className={Style.icon}>
            <AssignmentIndOutlinedIcon />
          </div>
          <div>
            <div className={Style.heading}>My Address</div>
            <div className={Style.about}>manage your saved addresses</div>
          </div>
        </div>
        <div className={Style.Container} onClick={toMyOrder}>
          <div className={Style.icon}>
            <InventoryOutlinedIcon />
          </div>
          <div>
            <div className={Style.heading}>My Orders</div>
            <div className={Style.about}>
              View, track, cancle orders and buy again
            </div>
          </div>
        </div>
        <div className={Style.Container} onClick={gotoUpdateSoon}>
          <div className={Style.icon}>
            <EmojiEventsOutlinedIcon />
          </div>
          <div>
            <div className={Style.heading}>My Rewards</div>
            <div className={Style.about}>
              Exclusive offers and loyalty rewards for you
            </div>
          </div>
        </div>
        <div className={Style.Container} onClick={toWishList}>
          <div className={Style.icon}>
            <FavoriteBorderOutlinedIcon />
          </div>
          <div>
            <div className={Style.heading}>My Wishlist</div>
            <div className={Style.about}>
              Have a look at your favourite products
            </div>
          </div>
        </div>
        <div className={Style.Container} onClick={gotoUpdateSoon}>
          <div className={Style.icon}>
            <ImportantDevicesOutlinedIcon />
          </div>
          <div>
            <div className={Style.heading}>My Devices & Plans</div>
            <div className={Style.about}>Manage your devices and plans</div>
          </div>
        </div>
        <div className={Style.Container} onClick={gotoUpdateSoon}>
          <div className={Style.icon}>
            <SmsFailedOutlinedIcon />
          </div>
          <div>
            <div className={Style.heading}>My Service Requests</div>
            <div className={Style.about}>
              Manage complaints, feedback, service requests
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
