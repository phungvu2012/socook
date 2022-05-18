import React from "react";
import { Link } from "react-router-dom";
import banner from "./../../assets/image/login/pexels-pixabay-357573.jpg";
import slide1 from "./../../assets/image/slider/slide1.png";
import slide2 from "./../../assets/image/slider/slide2.jpg";
import slide3 from "./../../assets/image/slider/slide3.jpg";
import slide4 from "./../../assets/image/slider/slide4.jpg";

export default function SliderHome({
  activeNumber = 0,
  arr = [
    { srcImage: slide1, altImage: "slide1", href: "#" },
    { srcImage: slide2, altImage: "slide2", href: "#" },
    { srcImage: slide3, altImage: "slide3", href: "#" },
    { srcImage: slide4, altImage: "slide4", href: "/recipe/87" },
  ],
  delayTime = 5000
}) {
  return (
    <div
      id="carouselInterval"
      className="carousel slide slider"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators slider__indicators">
        {arr?.length && arr.map((value, index) => {
          console.log("slide: ", arr.length);
          return (index === activeNumber) ?
            (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselInterval"
                data-bs-slide-to={index}
                className="active rounded-circle slider__indicators-button"
                aria-current="true"
                aria-label={`Slide ${index}`}
              ></button>
            ) : (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselInterval"
                data-bs-slide-to={index}
                className="rounded-circle slider__indicators-button"
                aria-label={`Slide ${index}`}
              ></button>
            )
        })}
      </div>
      <div className="carousel-inner slider__inner">
        { arr?.length && arr.map((value, index) => {
          return (index === activeNumber) ? (
            <div className="carousel-item active" data-bs-interval={delayTime} key={index}>
              <Link to={value.href}  className='slider__image-box'>
                <img src={value.srcImage} className="slider__image-box" alt={value.altImage} />
              </Link>
            </div>
          ) : (
            <div className="carousel-item"  data-bs-interval={delayTime} key={index}>
              <Link to={value.href}  className='slider__image-box'>
                <img src={value.srcImage} className="slider__image-box" alt={value.altImage} />
              </Link>
            </div>
          )
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
