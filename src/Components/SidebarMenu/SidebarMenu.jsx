import React from 'react'
import './SidebarMenu.css'
import { Tag, List, Settings, Users, BarChart2, Package, Server, User } from 'react-feather';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'


function SidebarMenu({ toggleSideNav, expandSideBar }) {

  const location = useLocation()
  const navigate = useNavigate()

  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className=' sidebarmenu' style={{ maxHeight: '100vh', height: '100vh' }}>
      <div className="wrapper bg-cyan-500 h-100">

        <div className='d-flex flex-column justify-content-between align-items-start h-100'>

          <ul className="list-unstyled d-flex justify-content-start align-items-start flex-column  ps-3">
            <li className=" py-3 mb-3 d-flex justify-content-start align-items-end  gap-1 rounded" onClick={() => toggleSideNav()}>
                <Package size={'35px'} />
                {expandSideBar && <p className='m-0'>POS SYSTEM</p>}
            </li>
            <li className={`p-2  mb-3 d-flex justify-content-start align-items-end lh-1 gap-1  rounded  sidenav-icon ${isNavLinkActive('/') ? 'bg-cyan-300 text-white' : 'bg-cyan-500 text-cyan-100'}`} onClick={() => navigate('/')}>
              <Tag />
              {expandSideBar && <p className='m-0'>Home</p>}
            </li>
            <li className={`p-2  mb-3 d-flex justify-content-start align-items-end lh-1 gap-1  rounded  sidenav-icon ${isNavLinkActive('/tables') ? 'bg-cyan-300 text-white' : 'bg-cyan-500 text-cyan-100'}`} onClick={() => navigate('/tables')}>
              <List />
              {expandSideBar && <p className='m-0'>Tables</p>}
            </li>
            <li className={`p-2 mb-3 d-flex justify-content-start align-items-end lh-1 gap-1  rounded  sidenav-icon ${isNavLinkActive('/dashboard') ? 'bg-cyan-300 text-white' : 'bg-cyan-500 text-cyan-100'}`} onClick={() => navigate('/dashboard')}>
              <BarChart2 />
              {expandSideBar && <p className='m-0'>Dashboard</p>}
            </li>
            <li className={`p-2 mb-3 d-flex justify-content-start align-items-end lh-1 gap-1  rounded  sidenav-icon ${isNavLinkActive('/inventory') ? 'bg-cyan-300 text-white' : 'bg-cyan-500 text-cyan-100'}`} onClick={() => navigate('/inventory')}>
                <Server />
                {expandSideBar && <p className='m-0'>Inventory</p>}
            </li>
            <li className={`p-2   mb-3  d-flex justify-content-start align-items-end lh-1 gap-2  rounded  sidenav-icon ${isNavLinkActive('/users') ? 'bg-cyan-300 text-white' : 'bg-cyan-500 text-cyan-100'}`} onClick={() => navigate('/users')}>
                <Users strokeWidth="2" />
                {expandSideBar && <p className='m-0'>Users</p>}
            </li>
            <li className={`p-2  mb-3 d-flex justify-content-start align-items-end lh-1 gap-1  rounded  sidenav-icon ${isNavLinkActive('/settings') ? 'bg-cyan-300 text-white' : 'bg-cyan-500 text-cyan-100'}`} onClick={() => navigate('/settings')}>
                <Settings />
                {expandSideBar && <p className='m-0'>Settings</p>}
            </li>
          </ul>

          <div className="ps-3 mb-3">
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