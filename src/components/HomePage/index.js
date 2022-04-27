import React from 'react'
import { Outlet } from 'react-router-dom'
// import axios from '../../api/axios'

const Home = () => {
  
  return (
    <React.Fragment>
      <div>
        Home
      </div>
      <Outlet />
    </React.Fragment>
  )
}

export default Home