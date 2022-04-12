import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import auth from './../../api/auth';
import { setUserSession } from './../../features/sessionStorage';

import fullLogoImage from "./../../assets/image/logo/Logo_SoCook_vertical_4(300x128).png"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const RegisterForm = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigation = useNavigate();
  let success = false;

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd, email])

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
        setErrMsg('Thông tin không hợp lệ');
        setLoading(false);
        return;
    }
    console.log(JSON.stringify({
      email: email, user_name: user, password: pwd
    }))
    auth.register(user, email, pwd)
    .then(function (response) {
      // console.log('response', response);
      // console.log(response?.data?.messageCode)
      // console.log(response?.data);
      if(response?.data?.messageCode !== 1) {
        throw {response};
      }
      setUserSession(response?.data?.accessToken, response?.data?.user);
      //clear state and controlled inputs
      setUser('');
      setEmail('');
      setPwd('');
      setMatchPwd('');
      navigation('/activeEmail')
    })
    .catch(function (err) {
      console.log('err', err);
      if (!err?.response) {
          setErrMsg('Server không phản hồi');
      } else if (err?.response?.data?.messageCode === 2) {
          setErrMsg('Email hoặc username đã được đăng ký!');
      } else {
          setErrMsg('Có gì đó không ổn. Vui lòng thử lại sau!')
      }
      setLoading(false);
      errRef.current.focus();
    });
  }

  const handleResendActive = () => {

  } 

  return (
    <div className='form-box'>
      <form onSubmit={handleSubmit} className='form-auth'>
        <img src={fullLogoImage} className='logo-image my-2'></img>
        <h2 className='form-auth__title m-0'>Đăng ký</h2>
        <div className={'form-auth__input-field '+ (!validName && user && 'invalid')}>
          <FontAwesomeIcon icon={faUser} className='form-auth__input-icon' />
          <input 
            type="text"
            placeholder='Tên tài khoản' 
            className='form-auth__input' 
            name="iuser"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
          />
            <FontAwesomeIcon icon={faInfoCircle} className={"form-auth__input-icon " + (user && !validName ? " form-auth__danger-icon" : "d-none")} />
        </div>
        <div className='form-auth__text text-start'>
          <p id="uidnote" className={"text-danger m-0 "  + (user && !validName ? "" : "d-none")}>
            Tên tài khoản phải có 4 đến 24 ký tự<br />
            Phải bắt đầu bằng chứ và không chứa kỹ tự đặc biệt<br />
          </p>
        </div>
        <div  className={'form-auth__input-field '+ (!validEmail && email ? "invalid" : "")}>
          <FontAwesomeIcon icon={faEnvelope} className='form-auth__input-icon' />
          <input
            type="text" 
            placeholder='Email' 
            className='form-auth__input' 
            name="iemail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
          />
          <FontAwesomeIcon icon={faInfoCircle} className={"form-auth__input-icon " + (email && !validEmail ? " form-auth__danger-icon" : "d-none")} />
        </div>
        <div className='form-auth__text text-start'>
          <p id="emailnote" className={"text-danger m-0 "  + (email && !validEmail ? "" : "d-none")}>
            Email không hợp lệ
          </p>
        </div>
        <div className={'form-auth__input-field '+ (!validPwd && pwd ? "invalid" : "")}>
          <FontAwesomeIcon icon={faLock} className='form-auth__input-icon' />
          <input 
            type="password" 
            placeholder='Mật khẩu' 
            className='form-auth__input' 
            name="ipassword"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
          />
          <FontAwesomeIcon icon={faInfoCircle} className={"form-auth__input-icon " + (pwd && !validPwd ? " form-auth__danger-icon" : "d-none")} />
        </div>
        <div className='form-auth__text text-start'>
          <p className={"text-danger m-0 "  + (pwd && !validPwd ? "" : "d-none")}>
            Mật khẩu từ 8 đến 24 ký tự<br />
            Phải có ít nhất 1 chữ cái hoa, 1 chữ cái thường, 1 số và 1 ký tự đặc biệt(<span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>)<br />
          </p>
        </div>
        <div className={'form-auth__input-field '+ (!validMatch && matchPwd ? "invalid" : "")}>
          <FontAwesomeIcon icon={faLock} className='form-auth__input-icon' />
          <input 
            type="password" 
            placeholder='Nhập lại mật khẩu' 
            className='form-auth__input' 
            name="imatchpassword"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
          />
          <FontAwesomeIcon icon={faInfoCircle} className={"form-auth__input-icon " + (matchPwd && !validMatch ? " form-auth__danger-icon" : "d-none")} />
        </div>
        <div className='form-auth__text text-start'>
          <p className={"text-danger m-0 "  + (matchPwd && !validMatch ? "" : "d-none")}>
            Mật khẩu không khớp
          </p>
        </div>
        <div className={'form-auth__text text-start' + (errMsg ? 'errmsg' : 'offscreen')}>
          <p ref={errRef} className='text-danger m-0' aria-live='assertive'>{errMsg}</p>
        </div>
        <button disabled={loading || !validName || !validEmail || !validPwd || !validMatch} className="btn btn-primary rounded-pill btn--form">
          {
            loading ? (
              <React.Fragment>
                <div className="spinner-border text-light" style={{width: '1rem', height: '1rem'}} role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                  <span> Loading...</span>
              </React.Fragment>
            ) : (
              "Gửi"
            )
          }
        </button>
        <p className="form-auth__text-gray text-center">
          Bạn đã có tài khoản? 
          <Link to="/login" className="text-link"> Đăng nhập! </Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterForm;