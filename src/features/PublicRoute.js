import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from './sessionStorage'

const PublicRoute = ({ element: Component, ...rest }) => {
  const authentication = getToken(); // determine if authorized, from context or however you're doing it
  console.log('public')
  // If authorized, return element that will navigate to login page
  // If not, return an outlet that will render child elements
  return !authentication ? <Outlet /> : <Navigate to={{ pathname: '/' }}/>;
}

export default PublicRoute