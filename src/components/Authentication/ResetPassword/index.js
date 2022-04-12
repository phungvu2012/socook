import React, { useRef, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import auth from '../../../api/auth';
import fullLogoImage from "../../../assets/image/logo/Logo_SoCook_vertical_4(300x128).png"

const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const ResetPassword = () => {
  const [accessParam, setAccessParam] = useSearchParams();
  const [ success, setSuccess ] = useState();
  const accessToken = accessParam.get("access");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(accessToken)
    if(!accessToken) navigate('/')
  })
  
  function ResetPasswordForm({ access }) {
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
  
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
  
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    
    const passwordRef = useRef();
    const errRef = useRef();
  
    useEffect(() => {
      passwordRef.current.focus();
    }, []);
    
    useEffect(() => {
      console.log(pwd)
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
      setErrMsg('');
    }, [pwd, matchPwd])
  
    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      // if button enabled with JS hack
      const v1 = setValidPwd(PWD_REGEX.test(pwd));
      if (v1 && !validMatch) {
        setLoading(false);
        setErrMsg("Mật khẩu không khớp");
        return;
      }
      console.log(pwd);
      auth.saveRSPassword(pwd, access)
      .then((response) => {
        console.log(response)
        if(response.data.messageCode !== 1) throw { response };
        setLoading(false);
        setSuccess(true);
        setPwd('');
        setMatchPwd('');
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("Server không phản hồi");
        } else {
          setErrMsg("Có lỗi xảy ra. Vui lòng thử lại.");
        }
        setLoading(false);
      })
    }
    return (
      <div className='form-box'>
        <form onSubmit={handleSubmit} className='form-auth'> 
          <img src={fullLogoImage} className='logo-image my-2' />
          <h2 className='form-auth__title'>Đổi mật khẩu</h2>
          <div className={'form-auth__input-field '+ (!validPwd && pwd ? "invalid" : "")}>
            <FontAwesomeIcon icon={faLock} className='form-auth__input-icon' />
            <input 
                type="password" 
                placeholder='Nhập mật khẩu mới'
                className='form-auth__input' 
                name="ipassword"
                onChange={(e) => setPwd(e.target.value)}
                ref={ passwordRef }
                autoComplete="off"
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
            />
            <FontAwesomeIcon icon={faInfoCircle} className={"form-auth__input-icon " + (pwd && !validPwd ? " form-auth__danger-icon" : "d-none")} />
            </div>
            <div className='form-auth__text text-start'>
            <p className={"text-danger m-0 "  + (pwd && !validPwd ? "" : "d-none")}>
                Mật khẩu trên 8 ký tự<br />
                Phải có ít nhất 1 chữ cái thường, 1 số và 1 ký tự đặc biệt(<span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>)<br />
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
                autoComplete="off"
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
          <button disabled={loading || !validMatch} className="btn btn-primary rounded-pill btn--form">
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
          <p className="form-auth__text-gray text-center">
            Hoặc
            <Link to="/register" className="text-link"> đăng ký tại đây! </Link>
          </p>
        </form>
      </div>
    )
  }

  function SuccessComponent() {
    return (
      <div className='text-center'>
        <h2>Đổi mật khẩu thành công</h2>
        <p>Đang chuyển đến màn hình đăng nhập.</p>
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
            <Link to="/login" className="text-link"> Đăng nhập! </Link>
          </p>
          <p className="form-auth__text-gray text-center">
            Hoặc
            <Link to="/register" className="text-link"> đăng ký tại đây! </Link>
          </p>
      </div>
    )
  }

  return (
    <React.Fragment>
      {success ? <SuccessComponent /> : <ResetPasswordForm access={ accessToken }/> }
    </React.Fragment>
  )
}

export default ResetPassword