import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import logo from "./../../assets/image/logo/Logo_SoCook_vertical_3.png";
import recipeApi from "../../api/recipeApi";

const Footer = () => {
  const category = [
    {
      name: "Món khai vị",
      url: "#",
    },
    {
      name: "Món tráng miệng",
      url: "#",
    },
    {
      name: "Món chay",
      url: "#",
    },
    {
      name: "Món ăn sáng",
      url: "#",
    },
    {
      name: "Món chính",
      url: "#",
    },
    {
      name: "Món cho trẻ",
      url: "#",
    },
    {
      name: "Thức uống",
      url: "#",
    },
    {
      name: "Bánh - Bánh ngọt",
      url: "#",
    },
    {
      name: "Đồ ăn nhanh",
      url: "#",
    },
  ];
  return (
    <div className={styles.footer}>
      <div className={styles.footerBg}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fc5c30"
            fillOpacity="1"
            d="M0,160L40,154.7C80,149,160,139,240,165.3C320,192,400,256,480,250.7C560,245,640,171,720,144C800,117,880,139,960,160C1040,181,1120,203,1200,186.7C1280,171,1360,117,1400,90.7L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
      </div>
      <footer className="footer-content">
        <div className={styles.footerInfo}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4 px-4">
                <div className="text-center">
                  <img src={logo} className={styles.footerImage} />
                </div>
                <p className="fw-bolder text-justify">
                  Học và nấu các món ăn mới để làm cuộc sống thêm thú vị! Chúng
                  tôi rất vui vì đã giúp các bạn nấu các món ăn mới mỗi ngày.
                </p>
              </div>
              <div className="col-12 col-md-6 col-lg-4 px-4">
                <h5 className="text-center m-3">Category</h5>
                <div className={styles.tagList}>
                  {category?.length &&
                    category.map((value, index) => {
                      return (
                        <span key={index} className={styles.footerTag}>
                          {" "}
                          {value.name}{" "}
                        </span>
                      );
                    })}
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 px-4">
                <h5 className="text-center m-3">Liên hệ với chúng tôi</h5>
                <div className="px-3">
                  <p>
                    Nếu có bất kì vấn đề nào liên quan vui lòng liên hệ:
                    <span> </span>
                    <a
                      href="mailto:socookk@gmail.com"
                      className={styles.footerLink}
                    >
                      socookk@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid border-top py-3">
          <p className="text-center fw-bolder m-0">
            Copyright &copy; socook.com.vn
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
