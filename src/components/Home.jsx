import React from "react";
import Carousel from "./Carousel/Carousel";
import { CAROUSEL_DATA } from "./Carousel/constants";
import TrandingProduct from "./Pages/TrandingProduct";
import Brand from "./CategoryList/Brand";
import Categories from "./CategoryList/Categories";
import KitchenAppliances from "./Pages/KitchenAppliances";
import DealOnAudio from "./Pages/DealOnAudio";
const Home = () => {
  return (
    <div>
      <Carousel data={CAROUSEL_DATA.slides} />
      <div className="offer">
        <img src="https://mouhumi-croma-clone.netlify.app/static/media/hdfc-banner.ec286e91a06140a527a8.webp" />
        <img src="https://mouhumi-croma-clone.netlify.app/static/media/paytm.c3c162b7900e3671cc05.png" />
      </div>
      <div className="productSection">
        <Categories />
      </div>
      <div className="productSection">
        <h2>Top Tranding Deal</h2>
        <TrandingProduct />
      </div>
      <div className="productSection">
        <h2>Kitchen Appliances</h2>
        <KitchenAppliances />
      </div>
      <div className="productSection">
        <h2>Brands</h2>
        <Brand />
      </div>
      <div className="productSection">
        <h2>Deal on Audio</h2>
        <DealOnAudio />
      </div>
    </div>
  );
};

export default Home;
