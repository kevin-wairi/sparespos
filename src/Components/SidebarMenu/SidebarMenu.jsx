import React from 'react'
import './SidebarMenu.css'
import { Grid, List, Settings, Users, BarChart2, Package, Server, User } from 'react-feather';
import { NavLink, useLocation } from 'react-router-dom'


function SidebarMenu() {

  const location = useLocation()

  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className=' sidebarmenu' style={{ maxHeight: '100vh', height: '100vh' }}>
      <div className="wrapper bg-cyan-500 h-100">

        <div className='d-flex flex-column justify-content-between align-items-center h-100'>
          <div>
          <div>
            <btn className="btn my-4">
              <NavLink to="/">
                <Package size={'35px'} />
              </NavLink>
            </btn>
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
                <NavLink to="/inventory" className={` rounded p-2 sidenav-icon ${isNavLinkActive('/inventory') ? 'bg-cyan-300 text-white' : 'bg-cyan-500 text-cyan-100'}`} >
                  <Server />
                </NavLink>
              </li>
              <li className="nav-item mb-3">
                <NavLink to="/users" className={` rounded p-2 sidenav-icon ${isNavLinkActive('/users') ? 'bg-cyan-300 text-white' : 'bg-cyan-500 text-cyan-100'}`} >
                  <Users strokeWidth="2" />
                </NavLink>
              </li>
              <li className="nav-item mb-3">
                <NavLink to="/settings" className={` rounded p-2 sidenav-icon ${isNavLinkActive('/settings') ? 'bg-cyan-300 text-white' : 'bg-cyan-500 text-cyan-100'}`} >
                  <Settings />
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="nav-item mb-3">
            <NavLink to="/user_profile" className={` rounded p-2 sidenav-icon ${isNavLinkActive('/user_profile') ? 'bg-cyan-300 text-white' : 'bg-cyan-500 text-cyan-100'}`} >
              <User />
            </NavLink>
          </div>
        </div>
      </div>


    </div>
  )
}

export default SidebarMenu