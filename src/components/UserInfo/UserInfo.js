import { useState } from "react";
import { getToken } from "./../../features/sessionStorage";
import "./UserInfo.scss";
import { getUser } from "./../../features/sessionStorage";
import { setUserSession } from "./../../features/sessionStorage";
import userApi from "../../api/userApi";
import Loading from "../Loading/Loading";

function UserInfo() {
  const token = getToken();
  const [userInfo, setUserInfo] = useState(getUser());
  const [userHeader, setUserHeader] = useState("Thông tin cá nhân");
  const [isLoading, setIsLoading] = useState(false);
  const citys = [
    "Hà Nội",
    "Hà Giang",
    "Cao Bằng",
    "Bắc Kạn",
    "Tuyên Quang",
    "Lào Cai",
    "Điện Biên",
    "Lai Châu",
    "Sơn La",
    "Yên Bái",
    "Hoà Bình",
    "Thái Nguyên",
    "Lạng Sơn",
    "Quảng Ninh",
    "Bắc Giang",
    "Phú Thọ",
    "Vĩnh Phúc",
    "Bắc Ninh",
    "Hải Dương",
    "Hải Phòng",
    "Hưng Yên",
    "Thái Bình",
    "Hà Nam",
    "Nam Định",
    "Ninh Bình",
    "Thanh Hóa",
    "Nghệ An",
    "Hà Tĩnh",
    "Quảng Bình",
    "Quảng Trị",
    "Thừa Thiên Huế",
    "Đà Nẵng",
    "Quảng Nam",
    "Quảng Ngãi",
    "Bình Định",
    "Phú Yên",
    "Khánh Hòa",
    "Ninh Thuận",
    "Bình Thuận",
    "Kon Tum",
    "Gia Lai",
    "Đắk Lắk",
    "Đắk Nông",
    "Lâm Đồng",
    "Bình Phước",
    "Tây Ninh",
    "Bình Dương",
    "Đồng Nai",
    "Bà Rịa - Vũng Tàu",
    "Hồ Chí Minh",
    "Long An",
    "Tiền Giang",
    "Bến Tre",
    "Trà Vinh",
    "Vĩnh Long",
    "Đồng Tháp",
    "An Giang",
    "Kiên Giang",
    "Cần Thơ",
    "Hậu Giang",
    "Sóc Trăng",
    "Bạc Liêu",
    "Cà Mau",
  ].sort();
  const handleSubmitUserForm = (e) => {
    setIsLoading(true);
    userApi
      .changeUserInfo(token, userInfo)
      .then((res) => {
        if (res.data.user) {
          setUserSession(token, res.data.user);
          setIsLoading(false);
          setUserInfo({ ...getUser() });
        }
      })
      .catch((err) => {
        console.log("F: ", err);
        setIsLoading(false);
      });
    e.preventDefault();
  };

  const handleIntroChange = (e) => {
    setUserInfo((prevInfo) => {
      return {
        ...prevInfo,
        introduction: e.target.value,
      };
    });
  };

  const handleNameChange = (e) => {
    setUserInfo((prevInfo) => {
      return {
        ...prevInfo,
        full_name: e.target.value,
      };
    });
  };

  const handleDateChange = (e) => {
    setUserInfo((prevInfo) => {
      return {
        ...prevInfo,
        date_of_birth: e.target.value,
      };
    });
  };

  const handleGenderChange = (e) => {
    setUserInfo((prevInfo) => {
      return {
        ...prevInfo,
        gender: e.target.value,
      };
    });
  };

  const handleCityChange = (e) => {
    setUserInfo((prevInfo) => {
      return {
        ...prevInfo,
        city: e.target.value,
      };
    });
  };
  return (
    <>
      {isLoading && <Loading />}
      <h3 className="user-header">{userHeader}</h3>
      <form className="user-info" onSubmit={handleSubmitUserForm}>
        <div className="user-content">
          <div className="user-field">
            <label className="user-field-name">Giới thiệu</label>
            <textarea
              value={userInfo.introduction}
              name="user-intro"
              rows="6"
              className="user-field-detail user-intro"
              onChange={handleIntroChange}
            ></textarea>
          </div>
          <div className="user-field">
            <label className="user-field-name">Họ tên</label>
            <input
              value={userInfo.full_name}
              type="text"
              className="user-field-detail user-name"
              onChange={handleNameChange}
            />
          </div>
          <div className="user-field">
            <label className="user-field-name">Email</label>
            <span className="user-field-detail user-mail">
              {userInfo.email}
            </span>
          </div>
          <div className="user-field">
            <label className="user-field-name">Ngày sinh</label>
            <input
              value={userInfo.date_of_birth}
              type="date"
              className="user-field-detail user-date"
              onChange={handleDateChange}
            />
          </div>
          <div className="user-field">
            <label className="user-field-name">Giới tính</label>
            <select
              value={userInfo.gender}
              className="user-field-detail user-gender"
              onChange={handleGenderChange}
            >
              <option value="">--Giới tính --</option>
              <option value="0">Nam</option>
              <option value="1">Nữ</option>
              <option value="2">Khác</option>
            </select>
          </div>
          <div className="user-field">
            <label className="user-field-name">Tỉnh/Thành phố</label>
            <select
              value={userInfo.city}
              className="user-field-detail user-city"
              onChange={handleCityChange}
            >
              <option value="">--Chọn Tỉnh/Thành phố--</option>
              {citys.map((city, index) => {
                return (
                  <option value={city} key={index}>
                    {city}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="user-field">
            <label className="user-field-name"></label>
            <button type="submit" className="user-form-submit">
              Lưu thay đổi
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default UserInfo;
