import React, { useState } from "react";
import style from "./index.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import {
  gotoAc,
  gotoHomeAppliance,
  // gotoLaptop,
  gotoPhones,
  // gotoTelevition,
  gotoaudio,
  gotokitchenappliances,
  gototablet,
  gotowashingMachine,
} from "../../utils/navigators";

const CategoryList = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const gotoTelevition = () => {
    navigate("/subCategory/tv");
  };
  const gotoLaptop = () => {
    navigate("/subCategory/laptop");
  };
  const gotoHomeAppliance = () => {
    navigate("/subCategory/refrigerator");
  };
  const gotoHealth = () => {
    navigate("/subCategory/health");
  };
  const gotokitchenappliances = () => {
    navigate("/subCategory/kitchenappliances");
  };
  const gotoaudio = () => {
    navigate("/subCategory/audio");
  };
  const gototravel = () => {
    navigate("/subCategory/travel");
  };
  const gotoPhones = () => {
    navigate("/subCategory/mobile");
  };
  const gotoAc = () => {
    navigate("/subCategory/ac");
  };
  const gotowashingMachine = () => {
    navigate("/subCategory/washingMachine");
  };
  const gototablet = () => {
    navigate("/subCategory/tablet");
  };

  const slides = [
    {
      imgSrc:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1690220193/Croma%20Assets/CMS/LP%20Page%20Banners/2023/UNBOXED/UPDATE/2407/category-icon_unboxed_e123f4.png",
      alt: "what's new",
    },
    {
      imgSrc:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968095/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_Mobile_21Feb2023_y6hsfe.png",
      alt: "Mobiles",
      onClick: gotoPhones,
    },
    {
      imgSrc:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968095/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_TV_21Feb2023_repyuk.png",
      alt: "Television",
      onClick: gotoTelevition,
    },
    {
      imgSrc:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683281227/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Category%20Navigation/laptop_categoryicons_nixzuv.png",
      alt: "Laptop",
      onClick: gotoLaptop,
    },
    {
      imgSrc:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968094/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_H_E_21Feb2023_cw375r.png",
      alt: "Headphone & Earphone",
      onClick: gotoaudio,
    },
    {
      imgSrc:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968094/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_Ref_21Feb2023_ztynzt.png",
      alt: "Refrigerator",
      onClick: gotoHomeAppliance,
    },
    {
      imgSrc:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968094/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_HT_SB_21Feb2023_rk8ohd.png",
      alt: "Home Theater & SoundBars",
      onClick: gotoaudio,
    },
    {
      imgSrc:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968094/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_AC_21Feb2023_azyacw.png",
      alt: "Air Conditioners",
      onClick: gotoAc,
    },
    {
      imgSrc:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968095/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_S_M_21Feb2023_qllhag.png",
      alt: "Speaker & Media Player",
      onClick: gotoaudio,
    },
    {
      imgSrc:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683281227/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Category%20Navigation/washingmachine_categoryicons_ktcdeu.png",
      alt: "Washing machines",
      onClick: gotowashingMachine,
    },
    {
      imgSrc:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683281227/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Category%20Navigation/kitchenappliances_categoryicons_xulmep.png",
      alt: "Kitchen Appliance",
      onClick: gotokitchenappliances,
    },
    {
      imgSrc:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683281227/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Category%20Navigation/grooming_categoryicons_oj7mrc.png",
      alt: "Grooming",
    },
    {
      imgSrc:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683281228/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Category%20Navigation/tablet_categoryicons_d9a5ru.png",
      alt: "Tablets",
      onClick: gototablet,
    },
    {
      imgSrc:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683281228/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Category%20Navigation/wearable_categoryicons_sl3n0l.png",
      alt: "Wearables",
    },
    {
      imgSrc:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1690270086/Croma%20Assets/CMS/Category%20icon/Updated%20Icons/LP_WishlistSale_CN_WP_4July2023_jtwzp9.png",
      alt: "Water Purifiers",
    },
  ];
  const nextSlide = () => {
    setActiveSlide((prevSlide) =>
      prevSlide === slides.length - 10 ? prevSlide : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === 0 ? 0 : prevSlide - 1));
  };
  return (
    <div className={style.categoryList}>
      <ChevronLeftIcon className={style.arrow_left} onClick={prevSlide} />

      <div className={style.slideContainer}>
        {slides.map((slide, index) => (
          <div
            onClick={slide.onClick}
            key={index}
            className={`${style.slide} ${
              index >= activeSlide ? style.activeSlide : style.nonActive
            }`}
          >
            <img src={slide.imgSrc} alt={slide.alt} className={style.images} />
          </div>
        ))}
      </div>

      <ChevronRightIcon className={style.arrow_right} onClick={nextSlide} />
    </div>
  );
};

export default CategoryList;
