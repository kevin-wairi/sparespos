import React from 'react'
import './SidebarMenu.css'
import { Grid, List, Settings, Users, BarChart2 } from 'react-feather';
import { NavLink, useLocation } from 'react-router-dom'


function SidebarMenu() {

  const location = useLocation()

  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className=' sidebarmenu' style={{ maxHeight: '100vh', height: '100vh' }}>
      <div className="wrapper bg-cyan-500 h-100">

        <div>
          <div>
            <p className="btn m-0">
              <span className="logo fw-bold fs-1">C</span>
            </p>
          </div>

          <ul className="nav d-flex flex-column gap-3">
            <li className="nav-item mb-3">
              <NavLink to="/" className={` rounded p-2 sidenav-icon ${isNavLinkActive('/') ? 'bg-cyan-300 text-white' : 'bg-cyan-500 text-cyan-100'}`} >
                <Grid />
              </NavLink>
            </li>
            <li className="nav-item mb-3">
              <NavLink to="/tables" className={` rounded p-2 sidenav-icon ${isNavLinkActive('/tables') ? 'bg-cyan-300 text-white' : 'bg-cyan-500 text-cyan-100'}`} >
                <List />
              </NavLink>
            </li>
            <li className="nav-item mb-3">
              <NavLink to="/dashboard" className={` rounded p-2 sidenav-icon ${isNavLinkActive('/dashboard') ? 'bg-cyan-300 text-white' : 'bg-cyan-500 text-cyan-100'}`} >
                <BarChart2 />
              </NavLink>
            </li>
            <li className="nav-item mb-3">
              <NavLink to="/users" className={` rounded p-2 sidenav-icon ${isNavLinkActive('/users') ? 'bg-cyan-300 text-white' : 'bg-cyan-500 text-cyan-100'}`} >
                <Users />
              </NavLink>
            </li>
            <li className="nav-item mb-3">
              <NavLink to="/settings" className={` rounded p-2 sidenav-icon ${isNavLinkActive('/settings') ? 'bg-cyan-300 text-white' : 'bg-cyan-500 text-cyan-100'}`} >
                <Settings />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>


    </div>
  )
}

export default SidebarMenu