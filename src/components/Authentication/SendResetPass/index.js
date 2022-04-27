import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import auth from "../../../api/auth";
import fullLogoImage from "../../../assets/image/logo/Logo_SoCook_vertical_4(300x128).png";

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const SendResetPassword = () => {
  const [success, setSuccess] = useState();

  function ResetPasswordForm() {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const userRef = useRef();
    const errRef = useRef();

    useEffect(() => {
      userRef.current.focus();
    }, []);

    useEffect(() => {
      setValidEmail(EMAIL_REGEX.test(email));
      setErrMsg("");
    }, [email]);

    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      // if button enabled with JS hack
      const v1 = EMAIL_REGEX.test(email);
      if (!v1) {
        setLoading(false);
        setErrMsg("Thông tin không hợp lệ");
        return;
      }

      auth
        .resetPassword(email)
        .then((response) => {
          if (response.data.messageCode !== 1) throw { response };
          setSuccess(true);
          setEmail("");
        })
        .catch((err) => {
          if (!err?.response) {
            setErrMsg("Server không phản hồi");
          } else if (err?.response?.data?.messageCode === 3) {
            setErrMsg("Email không chính xác!");
          } else {
            setErrMsg("Có lỗi xảy ra. Vui lòng thử lại.");
          }
          setLoading(false);
        });
    };
    return (
      <div className="form-box">
        <form onSubmit={handleSubmit} className="form-auth">
          <img src={fullLogoImage} className="logo-image my-2" />
          <h2 className="form-auth__title">Bạn quên mật khẩu ?</h2>
          <div
            className={
              "form-auth__input-field " + (!validEmail && email && "invalid")
            }
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className="form-auth__input-icon"
            />
            <input
              type="text"
              placeholder="Email"
              className="form-auth__input"
              name="iemail"
              ref={userRef}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
            />
            <FontAwesomeIcon
              icon={faInfoCircle}
              className={
                "form-auth__input-icon " +
                (email && !validEmail ? " form-auth__danger-icon" : "d-none")
              }
            />
          </div>
          <div className="form-auth__text text-start">
            <p
              id="emailnote"
              className={
                "text-danger m-0 " + (email && !validEmail ? "" : "d-none")
              }
            >
              Email không hợp lệ
            </p>
          </div>
          <div
            className={
              "form-auth__text text-start" + (errMsg ? "errmsg" : "offscreen")
            }
          >
            <p ref={errRef} className="text-danger m-0" aria-live="assertive">
              {errMsg}
            </p>
          </div>
          <button
            disabled={loading || !validEmail}
            className="btn btn-primary rounded-pill btn--form"
          >
            {loading ? (
              <React.Fragment>
                <div
                  className="spinner-border text-light"
                  style={{ width: "1rem", height: "1rem" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span> Loading...</span>
              </React.Fragment>
            ) : (
              "Gửi"
            )}
          </button>
          <p className="form-auth__text-gray text-center">
            Bạn đã có tài khoản?
            <Link to="/login" className="text-link">
              {" "}
              Đăng nhập!{" "}
            </Link>
          </p>
          <p className="form-auth__text-gray text-center">
            Hoặc
            <Link to="/register" className="text-link">
              {" "}
              đăng ký tại đây!{" "}
            </Link>
          </p>
        </form>
      </div>
    );
  }

  function SuccessComponent() {
    return (
      <div className="text-center">
        <h2>Email thay đổi mật khẩu đã được gửi.</h2>
        <p>Vui lòng kiểm tra mail để đổi mật khẩu.</p>
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
        <p className="form-auth__text-gray text-center">
          Bạn đã có tài khoản?
          <Link to="/login" className="text-link">
            {" "}
            Đăng nhập!{" "}
          </Link>
        </p>
        <p className="form-auth__text-gray text-center">
          Hoặc
          <Link to="/register" className="text-link">
            {" "}
            đăng ký tại đây!{" "}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <React.Fragment>
      {success ? <SuccessComponent /> : <ResetPasswordForm />}
    </React.Fragment>
  );
};

export default SendResetPassword;
