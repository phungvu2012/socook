import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import auth from "../../../api/auth";
import { setUserSession } from "../../../features/sessionStorage";
import "./../../GlobalStyles/_animation.scss";
import { isActive  } from "../../../features/sessionStorage";

const VerifyEmail = () => {
  const [accessParam, setAccessParam] = useSearchParams();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState();
  const [messageErr, setMessageErr] = useState();

  var navigate = useNavigate();
  var accessToken = accessParam.get("access");

  useEffect(() => {
    if (!accessToken) navigate("/login");
  });
  
  useEffect(() => {
    if (isActive()) navigate('/')

    setLoading(true);
    if (accessToken) {
      auth
        .activeEmail(accessToken)
        .then((response) => {
          console.log("response", response);
          if (response?.data?.messageCode !== 1) throw { response };
          setLoading(false);
          setSuccess(true);
          
          console.log(response?.data?.accessToken, response?.data?.user);
          setUserSession(response?.data?.accessToken, response?.data?.user);
          setTimeout(() => navigate("/login"), 5000);
        })
        .catch(function (err) {
          console.log(err?.response);
          if (!err?.response)
            setMessageErr("Server không phản hồi. Vui lòng thử lại sau.");
          else if (!err.response.messageCode === 3)
            setMessageErr("Có vẻ link đã hết hạn. Vui lòng thử lại sau.");
          else setMessageErr("Đã có lỗi .Vui lòng thử lại sau.");
          setLoading(false);
        });
    } else {
      setLoading(false);
      setSuccess(false);
      setMessageErr("Đã có lỗi .Vui lòng thử lại sau.");
    }
  }, []);

  function LoadingComponent() {
    return (
      <React.Fragment>
        <h3 className="text-center pb-4">Đang kích hoạt tài khoản</h3>
        <div
          className="snippet d-flex justify-content-center"
          data-title=".dot-flashing"
        >
          <div className="stage">
            <div className="dot-flashing"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  function SuccessComponent() {
    return (
      <div className="text-center">
        <h2>Tài khoản đã được active</h2>
        <p>Đang chuyển đến trang đăng nhập</p>
        
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>

        <div
          className="snippet d-flex justify-content-center my-4"
          data-title=".dot-flashing"
        >
          <div className="stage">
            <div className="dot-flashing"></div>
          </div>
        </div>
      </div>
    );
  }

  function FailedComponent() {
    return (
      <div className="text-center">
        <h1>Not found</h1>
        <p>{messageErr}</p>
        <div className="failure-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>{success ? <SuccessComponent /> : <FailedComponent />}</>
      )}
    </div>
  );
};

export default VerifyEmail;
