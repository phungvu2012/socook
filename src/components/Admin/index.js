import React, { useEffect } from "react";
import "./main.scss";
import logo from "./../../assets/image/logo/Logo_SoCook_vertical_3.png";
import { Link, Outlet } from "react-router-dom";
import {getUser, getToken, removeUserSession} from "./../../features/sessionStorage"

const Admin = () => {
  const user = getUser();
  const token = getToken();

  useEffect(() => {
    document.title = 'Admin | Socook';

    return () => {
      document.title = 'Socook';
    }
  })
  
  const handleOpenSideBar = () => {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    sidebar.classList.toggle("open");
    // call function
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };

  function changeBtn() {
  }

  return (
    <div className="admin">
      <link
        href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
        rel="stylesheet"
      />
      <div className="sidebar">
        <div className="logo_details">
          {/* <i className="bx bx-code-alt"></i> */}
          <div className="logo_name">
            <img src={logo} alt="socook logo" className="logo_name__image" />
          </div>
        </div>
        <ul>
          <li>
            <Link to='' className="active">
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to=''>
              <i className="bx bx-user"></i>
              <span className="links_name">Report comment</span>
            </Link>
          </li>
          <li>
            <Link to=''>
              <i className="bx bx-user"></i>
              <span className="links_name">Report user </span>
            </Link>
          </li>
          <li>
            <Link to=''>
              <i className="bx bx-user"></i>
              <span className="links_name">Profile</span>
            </Link>
          </li>
          {/* <li>
            <a href="#">
              <i className="bx bxs-truck"></i>
              <span className="links_name">Sales</span>
            </a>
          </li> */}
          {/* <li>
            <a href="#">
              <i className="bx bx-dollar"></i>
              <span className="links_name">Earning</span>
            </a>
          </li> */}
          {/* <li>
            <a href="#">
              <i className="bx bxs-user-plus"></i>
              <span className="links_name">Visitors</span>
            </a>
          </li> */}
          {/* <li>
            <a href="#">
              <i className="bx bx-cart-alt"></i>
              <span className="links_name">Order</span>
            </a>
          </li> */}
          <li>
            <Link to="recipe">
              <i className="bx bx-receipt"></i>
              <span className="links_name">Recipe</span>
            </Link>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="links_name">Setting</span>
            </a>
          </li>
          <li className="login">
            <Link to="/" onClick={removeUserSession}>
              <span className="links_name login_out">Login Out</span>
              <i className="bx bx-log-out" id="log_out"></i>
            </Link>
          </li>
        </ul>
      </div>
      {/* <!-- End Sideber --> */}
      <section className="home_section">
        <div className="topbar">
          <div className="toggle">
            <i className="bx bx-menu" id="btn" onClick={handleOpenSideBar}></i>
          </div>
          <div className="search_wrapper">
            <label>
              <span>
                <i className="bx bx-search"></i>
              </span>
              <input type="search" placeholder="Search..." />
            </label>
          </div>
          <a href="/user" className="user_wrapper">
            <img src={user.avatar_image} alt="" />
          </a>
        </div>
        <Outlet />
      </section>
    </div>
  );
};

export default Admin;
