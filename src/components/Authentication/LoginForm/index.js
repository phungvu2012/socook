import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faInfoCircle,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { setUserSession } from "../../../features/sessionStorage";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

import auth from "../../../api/auth";
import fullLogoImage from "../../../assets/image/logo/Logo_SoCook_vertical_4.png";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const LoginForm = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [params] = useSearchParams();
  const [backPage, setBackPage] = useState(params.get("page") || "");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    document.title = "Đăng nhập | Socook";
    userRef.current.focus();
    return () => {
      document.title = "Socook";
    };
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  useEffect(() => {
    if (success) {
      navigate("/" + backPage);
    }
  }, [success]);

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
        // console.log(response);
        // console.log(response?.data);
        // console.log(typeof response?.data?.messageCode);
        if (response?.data?.messageCode !== 1) {
          throw { response };
        }
        setSuccess(true);
        setLoading(false);
        setUserSession(response?.data?.accessToken, response?.data?.user);
        // clear state and controlled inputs
        setEmail("");
        setPwd("");
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

  const loginGoogle = (data) => {
    auth
      .responseGoogle(data)
      .then((response) => {
        if (response?.data?.messageCode !== 1) {
          throw { response };
        }
        setSuccess(true);
        setUserSession(response?.data?.accessToken, response?.data?.user);
      })
      .catch((err) => {
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
      });
  };

  const loginFacebook = (data) => {
    auth
      .responseGoogle(data)
      .then((response) => {
        console.log(response);
        if (response?.data?.messageCode !== 1) {
          throw { response };
        }
        setSuccess(true);
        setUserSession(response?.data?.accessToken, response?.data?.user);
      })
      .catch((err) => {
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
      });
  };

  return (
    <div className="form-box">
      <form onSubmit={handleSubmit} className="form-auth">
        <Link to="/">
          <img src={fullLogoImage} className="logo-image my-2"></img>
        </Link>
        <h2 className="form-auth__title m-0">Đăng nhập</h2>
        <div
          className={
            "form-auth__input-field" + (!validEmail && email ? " invalid" : "")
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
            {/* <FacebookLogin
              appId="336284341932251"
              autoLoad={true}
              fields="email"
              // onClick={componentClicked}
              // onFailure={failGoogle}
              callback={loginFacebook}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="social-form__icon"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
            </FacebookLogin> */}
            <GoogleLogin
              clientId="502517293767-5r4ut28qecrla1h94mfhdb2t8p3qim0h.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={loginGoogle}
              onFailure={(data) => {
                console.log(data);
              }}
              cookiePolicy={"single_host_origin"}
              className="social-form__link m-0"
              // icon={false}
              style={{ margin: 0 }}
            >
              <div></div>
            </GoogleLogin>
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
