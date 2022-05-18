import React from "react"
import { Outlet } from "react-router-dom"
import Header from "../Header"
import Footer from "../Footer"

const BasePage = () => {
  return (
    <React.Fragment>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default BasePage
