import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from './sessionStorage'
import { useLocation } from 'react-router-dom'

const PrivateRoute = () => {
  const authentication = getToken(); // determine if authorized, from context or however you're doing it
  const location = useLocation().pathname || '/login';
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return authentication ? <Outlet /> : <Navigate to={{ pathname: '/login?page=' + location.slice(1)}}/>;
}

export default PrivateRoute