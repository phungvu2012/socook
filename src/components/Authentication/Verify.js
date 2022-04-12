import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import auth from '../../api/auth';

const Verify = () => {
  const [accessParam, setAccessParam] = useSearchParams();
  const [ success, setSuccess ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  var navigation = useNavigate();
  var accessToken = accessParam.get("accessToken");
  var message;

  useEffect(() => {
    setLoading(true);
    if(accessToken) {
      auth.activeEmail(accessToken)
      .then((response) => {
        console.log(response);
        setLoading(false);
        setSuccess(true);
        setTimeout(() => navigation('/login'), 3000)
      })
      .catch(function(err) {
        console.log(err.response);
        setLoading(false);
        if (!err?.response) message = 'Server không phản hồi';
        else message = 'Kích hoạt thất bại';
      })
    }
    else setSuccess(false);
  }, [])

  return (
    <>
      {
        loading ?
        (
          <> 
            <h3 className='text-center'>Đang kích hoạt tài khoản</h3>
            <div class="snippet" data-title=".dot-flashing">
              <div class="stage">
                <div class="dot-flashing"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            { 
              success ? (
                <div className='text-center'>
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
                </div>
              ) : (
                <div className='text-center'>
                  <h1>Not found</h1>
                  <p>Không thành công. Vui lòng thử lại sau</p>
                  <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                  </div>
                </div>
              )
            }
          </>  
          )
      }
    </>
  )
}

export default Verify;