import React from "react";
import Carousel from "./Carousel/Carousel";
import CategoryList from "./CategoryList/index3.jsx";
import SingleProductCard from "./Cards/SingleProductCard";
import { CAROUSEL_DATA } from "./Carousel/constants";
import Leptop from "./DealOfTheDay/Letop";
import Mobile from "./DealOfTheDay/Mobile";
import WashingMachine from "./DealOfTheDay/WashingMachine";
import Oven from "./DealOfTheDay/Oven";
import Mixer from "./DealOfTheDay/Mixer";
import Refrigerator from "./TopTradingDeal/Refrigerator";
import Burner from "./TopTradingDeal/Burner";
import Tv from "./TopTradingDeal/Tv";
import Ac from "./TopTradingDeal/Ac";
import BluetoothSoundBar from "./TopTradingDeal/BluetoothSoundBar";
const Home = () => {
  return (
    <div>
      <Carousel data={CAROUSEL_DATA.slides} />
      <CategoryList />
      <h2 className="h2tag">Deal Of The Day</h2>
      <div className="dealOfTheDayContainer">
        <div className="dealOfTheDayProduct">
          <Leptop />
          <Mobile />
          <WashingMachine />
          <Oven />
          <Mixer />
        </div>
      </div>
      <h2 className="h2tag">Top Tranding Deal</h2>

      <div className="dealOfTheDayContainer">
        <div className="dealOfTheDayProduct">
          <Refrigerator />
          <Burner />
          <Tv />
          <Ac />
          <BluetoothSoundBar />
        </div>
      </div>
    </div>
  );
};

export default Home;
