import axiosClient from './axiosClient';
class Auth {
  login = (user, pwd) => {
    const LOGIN_URL = '/api/auth/login';
    return axiosClient.post(LOGIN_URL, JSON.stringify({email: user, password: pwd}));
  }

  register = (user, email, pwd) => {
    const REGISTER_URL = '/api/auth/register';
    return axiosClient.post(REGISTER_URL, JSON.stringify({email: email, user_name: user, password: pwd}));
  }

  activeEmail = (accessActiveToken) => {
    const ACTIVE_URL = '/api/auth/verify';
    return axiosClient.put(ACTIVE_URL, JSON.stringify({access: accessActiveToken}));
  }

  resendActiveEmail = (resendToken) => {
    const RESENDEMAIL_URL = '/api/auth/resentlink';
    return axiosClient.post(RESENDEMAIL_URL, {} , {
      headers: {
        token: `Bearer ${resendToken}`
      }
    })
  }
}

const auth = new Auth();

export default auth;