import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquareCaretDown,
  faBell,
  faStickyNote,
} from "@fortawesome/free-regular-svg-icons";


import styles from "./header.module.scss";
import logo from "./../../assets/image/logo/Logo_SoCook_vertical_3.png";
import avatar from "./../../assets/image/login/pexels-pixabay-357573.jpg";
import { getUser, removeUserSession } from './../../features/sessionStorage';
import { useRef, useState, useEffect } from "react";

import searchApi from "../../api/searchApi";

const Header = () => {
  const [suggestionSearch, setSuggestionSearch] = useState([]);
  const [keyword, setKeyword] = useState('')
  const searchInput = useRef()
  const navigate = useNavigate()
  const allPopUp = document.getElementsByClassName(styles.popUp);

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setUserInfo(getUser());
  }, [])

  const hanlePopup = (event) => {
    const element = event.currentTarget;
    const popUp = element.querySelector(`.${styles.popUp}`);
    for (let item of allPopUp) {
      if (item.classList && item !== popUp) item.classList.remove("d-block");
    }
    if (popUp) popUp.classList.toggle("d-block");
  };

  const preprocessingSearchSuggestions = (searchSuggetions) => {
    return searchSuggetions
      .map((ele) => {
        ele = ele.trim();
        return ele.charAt(0).toUpperCase() + ele.substring(1).toLowerCase();
      })
      .filter(function (value, index, array) {
        return array.indexOf(value) === index;
      });
  };

  const handleSuggestionSearch = (e) => {
    e.preventDefault()
    setKeyword(e.target.value)
    if (e.target.value) {
      searchApi
        .getSearchSuggestions(e.target.value)
        .then((res) => {
          setSuggestionSearch([...preprocessingSearchSuggestions(res.data)]);
        })
        .catch((err) => console.log(err));
    } else {
      setSuggestionSearch([])
    }
  };

  const handleSubmitSearchKeyword = (e) => {
    e.preventDefault()
    navigate(`search/${keyword}`)
    setKeyword("")
    setSuggestionSearch([])
  }

  const handleResetInput = () => {
    setKeyword("")
    setSuggestionSearch([])
  }

  return (
    <header className={styles.header}>
      <div className="container-lg">
        <div className="row align-items-center">
          <div className="col-12 col-md">
            <div className={styles.headerLeft}>
              <div className={styles.headerLeft__Logo}>
                <img
                  src={logo}
                  alt="socook logo"
                  className={styles.logoImage}
                />
              </div>
              <div className={styles.headerLeft__Search}>
                <form className={styles.formSearch} onSubmit={handleSubmitSearchKeyword}>
                  <input
                    type="text"
                    value={keyword}
                    className={styles.formSearch__Input}
                    onChange={handleSuggestionSearch}
                    ref={searchInput}
                  />
                  <button className={styles.formSearch__Btn}>
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className={styles.formSearch__Icon}
                    />
                  </button>
                </form>
                <ul className={styles.suggestionSearchResult}>
                  {suggestionSearch.slice(0,10).map((suggestion, index) => {
                    return (
                      <li key={index} className={styles.suggestionSearchItem}>
                        <Link to={`search/${suggestion}`} onClick={handleResetInput}>{suggestion}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-md">
            <div className={styles.headerRight}>
              <div className={styles.feature}>
                {
                  userInfo && (
                    <div className={styles.featureItem} onClick={hanlePopup}>
                      <div className={styles.featureItem__IconBox}>
                        <FontAwesomeIcon
                          icon={faSquareCaretDown}
                          className={styles.featureItem__Icon}
                        />
                      </div>
                      <div
                        className={`${styles.popUp} ${styles.popUp__Auto} ${styles.popUp__Square}`}
                      >
                        <Link
                          to="/login"
                          className={styles.popUp__SettingItem}
                          onClick={removeUserSession}
                        >
                          <div className={styles.popUp__SettingIcon}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                          </div>
                          <div className={styles.popUp__SettingContent}>
                            <h5 className={`${styles.popUp__SettingTitle} m-0`}>
                              Đăng xuất
                            </h5>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )
                }
                <div className={styles.featureItem} onClick={hanlePopup}>
                  <div className={styles.featureItem__IconBox}>
                    <FontAwesomeIcon
                      icon={faBell}
                      className={styles.featureItem__Icon}
                    />
                  </div>
                  <div className={`${styles.popUp}`}>
                    <a href="#" className={styles.popUp__Item}>
                      <div className={styles.popUp__Avatar}>
                        <img src={avatar} className={styles.popUp__Image} />
                      </div>
                      <div className={styles.popUp__Message}>
                        <p className={styles.popUp__MessageContent}>
                          Chào buổi tối, Phụng
                        </p>
                      </div>
                    </a>
                    <a to="#" className={styles.popUp__Item}>
                      <div className={styles.popUp__Avatar}>
                        <img src={avatar} className={styles.popUp__Image} />
                      </div>
                      <div className={styles.popUp__Message}>
                        <p className={styles.popUp__MessageContent}>
                          Chào buổi tối, Phụng Ngày hôm nay của bạn thế nào Hãy
                          nấu một món ăn để tăng thêm niềm vui nào nào.
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
                <div className={styles.featureItem} onClick={hanlePopup}>
                  <div className={styles.featureItem__IconBox}>
                    <FontAwesomeIcon
                      icon={faStickyNote}
                      className={styles.featureItem__Icon}
                    />
                  </div>
                  <div className={`${styles.popUp} ${styles.popUp__Auto}`}>
                    <a href="#" className={styles.popUp__Item}>
                      <div className={styles.popUp__CollectionAvatar}>
                        <img src={avatar} className={styles.popUp__Image} />
                      </div>
                      <div className={styles.popUp__Message}>
                        <h5 className={styles.popUp__CollectionTitle}>Love</h5>
                        <p></p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              {
                userInfo ? (
                  <Link to='/user' className={styles.userAvatar}>
                    <div className={styles.userAvatar__ImageBox} style={{backgroundImage: `url(${userInfo?.avatar_image})`}}>
                    </div>
                    <p className={styles.userAvatar__Name}>{userInfo?.full_name}</p>
                  </Link>
                ) : (
                  <Link to='/login' className={styles.userAvatar} style={{border: 0}}>
                    Đăng nhập
                  </Link>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
