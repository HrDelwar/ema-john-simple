import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import banner1 from "../../images/banner1.png";
import banner2 from "../../images/banner2.png";
import banner3 from "../../images/banner3.png";

const bannerImages = [banner1, banner2, banner3];

const TopBanner = () => {
  return (
    <div className="container">
      <Slide>
        {bannerImages.map((url, index) => (
          <div className="each-slide container overflow-hidden" key={index}>
            <div
              className=" "
              style={{
                backgroundImage: `url(${url})`,
                minHeight: 600,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default TopBanner;
