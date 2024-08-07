// Style File --------------------------------------------------
import "./css/carouselComp.css";
// From React and Redux ----------------------------------------
import React from "react";
// Local storage --------------------------------------------
import image1 from "./../images/1.svg";
import image2 from "./../images/2.svg";
import image3 from "./../images/3.svg";
// Bootstrap Components
import Carousel from "react-bootstrap/Carousel";
// ##############################################################
function CarouselComp() {
  return (
    <Carousel data-bs-theme="lghit" className="carousel carouselInHome">
      <Carousel.Item>
        <img
          className="d-block w-100 h-static"
          src={image1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-static"
          src={image2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-static"
          src={image3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComp;
