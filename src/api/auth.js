import axiosHost1 from "./axiosHost1";
class Auth {
  login = (user, pwd) => {
    const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;
    return axiosHost1.post(
      LOGIN_URL,
      JSON.stringify({ email: user, password: pwd })
    );
  };

  register = (user, email, pwd) => {
    const REGISTER_URL = process.env.REACT_APP_REGISTER_URL;
    return axiosHost1.post(
      REGISTER_URL,
      JSON.stringify({ email: email, user_name: user, password: pwd })
    );
  };

  activeEmail = (accessActiveToken) => {
    const ACTIVE_URL = process.env.REACT_APP_ACTIVE_URL;
    return axiosHost1.put(
      ACTIVE_URL,
      JSON.stringify({ access: accessActiveToken })
    );
  };

  resendActiveEmail = (resendToken) => {
    const RESENDEMAIL_URL = process.env.REACT_APP_RESENDEMAIL_URL;
    return axiosHost1.post(
      RESENDEMAIL_URL,
      {},
      {
        headers: {
          token: `Bearer ${resendToken}`,
        },
      }
    );
  };

  resetPassword = (email) => {
    const RESET_PWD_URL = process.env.REACT_APP_RESET_PWD_URL;
    return axiosHost1.put(RESET_PWD_URL, JSON.stringify({ email: email }));
  };

  saveRSPassword = (newPwd, accessToken) => {
    const SAVEPWD_URL = process.env.REACT_APP_SAVEPWD;
    return axiosHost1.put(
      SAVEPWD_URL,
      JSON.stringify({ newPassword: newPwd, access: accessToken })
    );
  };
}

const auth = new Auth();

export default auth;
