import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from './sessionStorage'

const PrivateRoute = () => {
  const authentication = getToken(); // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return authentication ? <Outlet /> : <Navigate to={{ pathname: '/login' }}/>;
}

export default PrivateRoute