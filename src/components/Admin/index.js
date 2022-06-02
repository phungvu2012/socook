import React, { useEffect, useState } from "react";
import "./main.scss";
import logo from "./../../assets/image/logo/Logo_SoCook_vertical_3.png";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import {
  getUser,
  getToken,
  removeUserSession,
} from "./../../features/sessionStorage";
import { useLocation } from "react-router-dom";

const list = [
  {
    tilte: "Dashboard",
    url: "",
    icon: 'bx bx-grid-alt'
  },
  {
    tilte: "Profile",
    url: "profile",
    icon: 'bx bx-user'
  },
  {
    tilte: "Recipe",
    url: "recipe",
    icon: 'bx bx-file-blank'
  },
  {
    tilte: "Report Comment",
    url: "reportComment",
    icon: 'bx bxs-report'
  },
  {
    tilte: "Report User",
    url: "reportUser",
    icon: 'bx bxs-report'
  },
  {
    tilte: "Report Recipe",
    url: "reportRecipe",
    icon: 'bx bxs-report'
  },
  {
    tilte: "Setting",
    url: "#",
    icon: 'bx bxs-customize'
  },
];

const Admin = () => {
  const user = getUser();
  const token = getToken();
  const [urlPage, setUrlPage] = useState();

  useEffect(() => {
    document.title = "Admin | Socook";

    return () => {
      document.title = "Socook";
    };
  }, []);

  useEffect(() => {
    console.log(urlPage);
  }, [urlPage]);

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

  function changeBtn() {}

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
          {list.length &&
            list.map((value, index) => {
              return (
                <li key={index}>
                  <Link
                    to={value.url}
                    className={value.url === urlPage ? "active" : ""}
                    key={index}
                  >
                    <i className={value?.icon}></i>
                    <span className="links_name">{value.tilte}</span>
                  </Link>
                </li>
              );
            })}
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
          {/* <div className="search_wrapper">
            <label>
              <span>
                <i className="bx bx-search"></i>
              </span>
              <input type="search" placeholder="Search..." />
            </label>
          </div> */}
          <a href="/user" className="user_wrapper">
            <img src={user.avatar_image} alt="" />
          </a>
        </div>
        <Outlet context={[urlPage, setUrlPage]} />
      </section>
    </div>
  );
};

export default Admin;
