import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, getUser } from "../../features/sessionStorage";
import auth from "../../api/auth";

const WaitingActiveEmail = () => {
  const token = getToken();
  const user = getUser();
  const [click, setClick] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    console.log(user?.status);
    if (user?.status !== undefined && user.status === 1) navigation("/");
  });

  // useEffect

  const handleClick = () => {
    console.log(token);
    if (token) auth.resendActiveEmail(token);
  };

  // const countDown = () => {
  //   // setInterval
  // };

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <h1> Tài khoản chưa được kích hoạt </h1>
      <p> Vui lòng kiểm tra gmail để kích hoạt tài khoản </p>
      {/* <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div> */}
      <p className="form-auth__text-gray text-center">
        Nếu chưa nhận được email kích hoạt. Vui lòng{" "}
        <span className="textlink-blue" onClick={() => setClick(true)}>
          {" "}
          gửi lại.{" "}
        </span>
      </p>
      <p className="form-auth__text-gray text-center">
        Chuyển đến <Link to="/"> trang chủ </Link>
      </p>
    </div>
  );
};

export default WaitingActiveEmail;
