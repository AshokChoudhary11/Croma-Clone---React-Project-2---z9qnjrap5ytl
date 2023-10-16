// @ts-nocheck
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel/Carousel.jsx";
import CategoryList from "./components/CategoryList/index3";
import SingleProductCard from "./components/Cards/SingleProductCard";
import ProductCard from "./components/SingleCard/ProductCard";
import AllProduct from "./components/AllProduct/AllProduct";
import Home from "./components/Home";
import SubCategory from "./components/Pages/SubCategory";
import ViewProduct from "./components/ViewProduct/ViewProduct";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/LogIn/Login";
import { AuthProvider } from "./components/Provider/AuthProvider";
import Profile from "./components/Pages/Profile";
import WishList from "./components/Pages/WishList";
import Cart from "./components/Pages/Cart";
import UpdateAddress from "./components/UpdateAddress/UpdateAddress";
import CheckOut from "./components/Pages/CheckOut";
import FeatureUpdateSoon from "./components/FeatureUpdateSoon/FeatureUpdateSoon";
import MyOrder from "./components/Pages/MyOrder";
import SingleProductCart from "./components/Pages/SingleProductCart";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AllProduct" element={<AllProduct />} />
        <Route path="/subCategory/:type" element={<SubCategory />} />
        <Route path="/Product/:productID" element={<ViewProduct />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/udateAddress" element={<UpdateAddress />} />
        <Route path="/checkOut" element={<CheckOut />} />
        <Route path="/UpdateSoon" element={<FeatureUpdateSoon />} />
        <Route path="/MyOrder" element={<MyOrder />} />
        <Route path="/cart/:productID" element={<SingleProductCart />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
