import "./ChangePassword.scss";
import { useState } from "react";
import { getToken } from "./../../features/sessionStorage";
import { useNavigate } from "react-router-dom";
import { removeUserSession } from "../../features/sessionStorage";
import userApi from "../../api/userApi";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [userHeader, setUserHeader] = useState("Đổi mật khẩu");
  const token = getToken();
  const navigation = useNavigate();
  // const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    userApi
      .changePassword(token, {
        password: oldPassword,
        newPassword,
      })
      .then((res) => {
        console.log(res);
        removeUserSession();
        navigation("/login");
      })
      .catch((err) => console.log(err));
    // PWD_REGEX.test(newPassword)
  };
  return (
    <>
      <h3 className="user-header">{userHeader}</h3>
      <form className="change-password" onSubmit={handleSubmitChangePassword}>
        <div className="user-field">
          <label className="user-field-name">Mật khẩu cũ</label>
          <input
            type="password"
            value={oldPassword}
            className="user-field-detail old-password"
            placeholder="Mật khẩu tối thiểu 8 ký tự"
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="user-field">
          <label className="user-field-name">Mật khẩu mới</label>
          <input
            value={newPassword}
            type="password"
            className="user-field-detail new-password"
            placeholder="Mật khẩu tối thiểu 8 ký tự"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="user-field">
          <label className="user-field-name">Nhập lại mật khẩu mới</label>
          <input
            value={newPasswordAgain}
            type="password"
            className="user-field-detail new-password"
            placeholder="Mật khẩu tối thiểu 8 ký tự"
            onChange={(e) => {
              setNewPasswordAgain(e.target.value);
            }}
            required
          />
        </div>
        <div className="user-field">
          <label className="user-field-name"></label>
          <button type="submit" className="user-form-submit">
            Lưu thay đổi
          </button>
        </div>
      </form>
    </>
  );
}

export default ChangePassword;
