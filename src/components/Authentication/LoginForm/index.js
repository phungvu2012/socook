import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faInfoCircle,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { setUserSession } from "../../../features/sessionStorage";

import auth from "../../../api/auth";
import fullLogoImage from "../../../assets/image/logo/Logo_SoCook_vertical_4.png";

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const LoginForm = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

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
      .login(email, pwd)
      .then(function (response) {
        console.log(response);
        console.log(response?.data);
        console.log(typeof response?.data?.messageCode);
        if (response?.data?.messageCode !== 1) {
          throw { response };
        }
        setUserSession(response?.data?.accessToken, response?.data?.user);
        setLoading(false);
        // clear state and controlled inputs
        setEmail("");
        setPwd("");
        if (
          response?.data?.status !== undefined &&
          response?.data?.status === 1
        )
          navigate("/");
        else navigate("/activeEmail");
      })
      .catch(function (err) {
        if (!err?.response) {
          setErrMsg("Server không phản hồi");
        } else if (err.response?.status === 409) {
          setErrMsg("Username Taken");
        } else if (
          err.response?.status === 422 ||
          err?.response?.data?.messageCode === 3 ||
          err?.response?.data?.messageCode === 2 ||
          err?.response?.data?.messageCode === 0
        ) {
          setErrMsg("Tài khoản hoặc mật khẩu không đúng");
        } else {
          setErrMsg("Không thể đăng nhập");
        }
        setLoading(false);
      });
  };

  return (
    <div className="form-box">
      <form onSubmit={handleSubmit} className="form-auth">
        <img src={fullLogoImage} className="logo-image my-2"></img>
        <h2 className="form-auth__title m-0">Đăng nhập</h2>
        <div
          className={
            "form-auth__input-field" + ((!validEmail && email) ?  " invalid" : '')
          }
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            className="form-auth__input-icon"
          />
          <input
            type="text" 
            placeholder='Email' 
            className='form-auth__input' 
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
            - Email không hợp lệ
            <br />
          </p>
        </div>
        <div className="form-auth__input-field">
          <FontAwesomeIcon icon={faLock} className="form-auth__input-icon" />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="form-auth__input"
            name="ipassword"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
          />
        </div>
        <div className="form-auth__text text-start">
          <p
            ref={errRef}
            className={"text-danger m-0 " + (errMsg ? "errmsg" : "offscreen")}
            aria-live="assertive"
          >
            {errMsg}
          </p>
        </div>
        <div className="form-auth__text text-end">
          <Link to="/sendResetPassword" className="text-link mx-2 my-0">
            Quên mật khẩu ?
          </Link>
        </div>
        <button
          disabled={!email || loading}
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
        <div className="social-form">
          <p className="social-form__text">
            Hoặc đăng nhập bằng phương thức khác
          </p>
          <div className="social-form__media">
            <a href="#" className="social-form__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="social-form__icon"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
            </a>
            <a href="#" className="social-form__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
                className="social-form__icon"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            </a>
          </div>
        </div>
        <p className="form-auth__text-gray text-center">
          Nếu bạn chưa có tài khoản bạn?
          <Link to="/register" className="text-link">
            {" "}
            Đăng ký ngay!{" "}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
