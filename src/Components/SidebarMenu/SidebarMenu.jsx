import React from 'react'
import './SidebarMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faCalculator,faLinesLeaning ,faGear,faUserGear} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom'


function SidebarMenu() {

  const location = useLocation()
  
  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
      <div className=' sidebarmenu' style={{maxHeight:'100vh',height:'100vh'}}>
        <div className="wrapper bg-cyan-500 h-100">
          
        <div>
            <div>
              <p className="btn m-0">
                <span className="logo fw-bold fs-1">C</span>
              </p>
            </div>

            <ul className="nav d-flex flex-column gap-3">
              <li className={`nav-item mx-auto ${isNavLinkActive('/') ? 'active' : ''}`}>
              <NavLink  to="/"  >
                  <FontAwesomeIcon className='sidenav-icon  rounded icon-bg p-3'   icon={faHouse} />
                </NavLink>
              </li>
              <li className={`nav-item mx-auto ${isNavLinkActive('/items') ? 'active' : ''}`}>
              <NavLink  to="/items"  >
                  <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg p-3' style={{fontSize:'35px'}}  icon={faCalculator} />
              </NavLink>
              </li>
              <li className={`nav-item mx-auto ${isNavLinkActive('/tables') ? 'active' : ''}`}>
              <NavLink  to="/tables"  >
                    <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg p-3 ' icon={faLinesLeaning}  />
                </NavLink>
              </li>
              <li className={`nav-item mx-auto ${isNavLinkActive('/tables') ? 'active' : ''}`}>
              <NavLink  to="/settings"  >
                    <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg p-3 ' icon={faGear}  />
                </NavLink>
              </li>
              <li className={`nav-item mx-auto ${isNavLinkActive('/tables') ? 'active' : ''}`}>
              <NavLink  to="/settings"  >
                    <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg p-3'  icon={faUserGear} />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
         

        </div>
  )
}

export default SidebarMenu