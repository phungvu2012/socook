import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles'
import Auth from './components/Authentication';
import PublicRoute from './features/PublicRoute';
import PrivateRoute from './features/PrivateRoute';
import RegisterForm from './components/Authentication/RegisterForm';
import ActiveEmail from './components/Authentication/ActiveEmail';
import LoginForm from './components/Authentication/LoginForm';
import Verify from './components/Authentication/VerifyEmail';
import SendResetPassword from './components/Authentication/SendResetPass';
import ResetPassword from './components/Authentication/ResetPassword';
import BasePage from './components/BasePage';
import Home from './components/HomePage';
// import ThemeTest from './ThemeTest'

function App() {
  return (
    <GlobalStyles>
        <React.StrictMode>
          <Router>
            <Routes>
              {/* Có thể truy cập mà không cần đăng nhập */}
              <Route path='' element={<BasePage />}>
                <Route index element={<Home />} />
              </Route>
              {/* Có thể truy cập mà không cần đăng nhập, không thể truy cập khi đăng nhập*/}
              <Route path='' element={ <PublicRoute />} >
                <Route path='' element={ <Auth /> }>
                  <Route exact path='/login' element={ <LoginForm />} />
                  <Route exact path='/register' element={ <RegisterForm /> } />
                  <Route exact path='/sendResetPassword' element={ <SendResetPassword /> } />
                  <Route exact path='/rspassword' element={<ResetPassword />}>
                  </Route>
                </Route>
              </Route>
              {/* Có thể truy cập khi đăng nhập  */}
              <Route path='' element={ <PrivateRoute />}>
                <Route path='' element={<BasePage />}>
                  <Route path='' element={<Home />}>
                    <Route path='/activeEmail' element={ <ActiveEmail/> } />
                    </Route>
                </Route>
              </Route>
              {/* Các định tuyến khác  */}
              <Route path='/verify' element={<Auth />}>
                <Route index element={ < Verify/>} />
              </Route>
            </Routes>
          </Router>
        </React.StrictMode>
    </GlobalStyles>
  );
}

export default App;
