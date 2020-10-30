import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import MessageIndex from '../messaging/message_index'
import './sidebar.scss'

const SideBar = () => {
  const isAuthenticated = useSelector(state => state.session.isAuthenticated);
  useEffect(() => {
    const sidebartoggler = () => {
      if (window.innerWidth <= 580) {
        document.querySelector('.side-bar-toggler').className = 'side-bar-toggler toggler-closed'
      } else if (window.innerWidth > 580) {
        document.querySelector('.side-bar-toggler').className = 'side-bar-toggler toggler-open'
      }
    }
    window.onresize = sidebartoggler;
  }, [])

  const handleClick = () => {
    if (document.querySelector('.side-bar-toggler.toggler-open')) {
      document.querySelector('.side-bar-toggler').className = 'side-bar-toggler toggler-closed'
    } else {
      document.querySelector('.side-bar-toggler').className = 'side-bar-toggler toggler-open'
    }
  }

  return (
    isAuthenticated ?
    <div className="side-bar-toggler toggler-open">
      <div onClick={handleClick} className="sidebar-toggle">|||</div>
      <div className="sidebar-container">
        <MessageIndex />
      </div>
    </div> : null
  )
}

export default SideBar;
