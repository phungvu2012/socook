import { Outlet } from "react-router-dom";
import panelImage from "./../../assets/image/login/pexels-pixabay-357573.jpg";

import "./authentication.scss";

const Auth = () => {
  return (
    <main className="main">
      <div className="login-page-container">
        <div className="panels-container">
          <div
            className="panel"
            style={{ backgroundImage: `url(${panelImage})` }}
          ></div>
        </div>
        <div className="form-container">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Auth;
