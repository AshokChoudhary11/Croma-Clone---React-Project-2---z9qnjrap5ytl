// @ts-nocheck
import React, { useState } from "react";
import style from "./Navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "./MenuInNevbar/Menu.jsx";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const UserLocation = localStorage.getItem("locationDetails");
  const parseUserLocation = JSON.parse(UserLocation);
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  console.log(parseUserLocation);
  const toHome = () => {
    navigate("/");
  };
  const toProfile = () => {
    navigate("/profile");
  };
  const toCart = () => {
    if (!parseUserDetails || !parseUserDetails.token) {
      navigate("/login");
      console.log("User details or token not found.");
      return;
    }
    navigate("/cart");
  };
  const toUpdate = () => {
    navigate("/udateAddress");
  };
  const customIconStyle = {
    fontSize: "16px",
  };
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className={style.navbar_container}>
      <div className={style.content}>
        <div className={style.left_part}>
          <div className={style.logoandMenu}>
            <img
              onClick={toHome}
              src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1695191182/Croma%20Assets/CMS/Header/Sept%202023/Croma_Logo_Animation_option2_jnj1bo.gif"
              alt="Logo"
            ></img>
            <Menu />
          </div>
          <div className={style.inputfield}>
            <input
              placeholder="What are you looking for ?"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            <SearchIcon
              className={style.searchIcon}
              onClick={() => {
                const newSearchParams = new URLSearchParams(
                  document.location.search
                );
                newSearchParams.set("product_name", searchValue);
                navigate({
                  pathname: "/allProduct",
                  search: newSearchParams.toString(),
                });
              }}
            />
          </div>
        </div>
        <div className={style.right_part}>
          <div className={style.location} onClick={toUpdate}>
            <LocationOnIcon />
            {parseUserLocation ? parseUserLocation.Pincode : "location"},
            {parseUserLocation ? parseUserLocation.City : ""}
            <EditIcon className={style.editIcon} style={customIconStyle} />
          </div>
          <div>
            <PersonIcon className={style.UserIcon} onClick={toProfile} />
          </div>
          <div>
            <ShoppingCartIcon onClick={toCart} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
