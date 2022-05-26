import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUser } from "./sessionStorage";
import adminApi from "../api/adminApi";

const AdminRoute = () => {
  const authentication = getToken(); // determine if authorized, from context or however you're doing it
  let [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAutoLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    adminApi.checkToken(getToken())
      .then(res => {
        if(res.data.messageCode !== 1) throw {res};

        console.log(res);
        setIsAdmin(res.data.user.role === 'admin');
        setAutoLoading(false);
      })
      .catch(err => {
        console.log("err ", err);
        setAutoLoading(false);
      })
    }, []);
    
    if(authLoading && getToken()) {
      return <div className='content'>Checking Authentication...</div>
    }
    
    
    console.log(isAdmin);
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return (isAdmin) ? <Outlet /> : <Navigate to={{ pathname: "/" }} />;
};

export default AdminRoute;
