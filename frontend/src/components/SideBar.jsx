import React from 'react'
import "../styles/sidebar.css"
import {Forward, LayoutDashboard, LogOut} from "lucide-react"
import {NavLink, useNavigate} from "react-router-dom"
import {useAuth} from "../context/Auth"

const SideBar = () => {
  const navigate = useNavigate();

  const {logout} = useAuth();

  const handleSignOut = () => {
    logout();
    navigate("/user/signin", {replace: true});
  }

  return (
    <div className='sidebar'>
      
      {/* {Logo} */}
      <div className='sidebar-logo'>
        <div className='logo-icon'>P</div>
        <span>PayWallet</span>
      </div>

      {/* {Navigation} */}
      <nav className='sidebar-nav'>
        <NavLink to={'/user/dashboard'} className={({isActive}) =>  `sidebar-link ${isActive ? "Active" : ""}`}>
          <span className='sidebar-icon'><LayoutDashboard/></span>
          <span>Dashboard</span>
        </NavLink>
      </nav>

      <nav className='sidebar-nav'>
        <NavLink to={'/user/send-money'} className={({isActive}) =>  `sidebar-link ${isActive ? "Active" : ""}`}>
          <span className='sidebar-icon'><Forward/></span>
          <span>Send Money</span>
        </NavLink>
      </nav>

      {/* Bottom section */}
      <div className="sidebar-bottom">

        <button
          className="sidebar-link signout-button"
          onClick={handleSignOut}
        >
          <span className="sidebar-icon"><LogOut/></span>
          <span>Sign out</span>
        </button>

      </div>
      
    </div>
  )
}

export default SideBar
