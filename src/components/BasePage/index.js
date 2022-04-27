import React from "react"
import { Outlet } from "react-router-dom"
import Header from "../Header"

const BasePage = () => {
  return (
    <React.Fragment>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </React.Fragment>
  )
}

export default BasePage
