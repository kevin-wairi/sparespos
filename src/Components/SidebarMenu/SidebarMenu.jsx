import React from 'react'
import './SidebarMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faBoxesStacked,faUser,faX,faBusinessTime,faTableList ,faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom'


function SidebarMenu({closeSidebar}) {

  const location = useLocation()
  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
      <div className=' sidebarmenu overflow-x-hidden overflow-y-scroll ' style={{ maxHeight: '100vh' }} id='sidebar'>
        <div className="wrapper rounded">
          <div className="d-flex justify-content-between">
          <a className=" d-flex justify-content-center p-2 ">
            <span className="fs-6  ">Sparesandparts</span>
          </a>
          <div className="close d-md-none py-2 m-1" onClick={()=>closeSidebar()}>
          <FontAwesomeIcon icon={faX} style={{color: "#000000",}} />
          </div>
          </div>
          <hr  className='text-secondary'/>
          <ul className="nav nav-pills flex-column ">
            <li className={`nav-item mx-md-3 text-center sidebar-link my-1 rounded  ${isNavLinkActive('/') ? 'active' : ''}`}>
            <NavLink  to="/"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1 " aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded icon-bg' icon={faHouse} style={{color: "#000000",}}/>
                <span className=' d-md-inline my-1'>Dashboard</span>
              </a>
              </NavLink>
            </li>
            <li className={`nav-item mx-md-3 text-start sidebar-link my-1   rounded ${isNavLinkActive('/items') ? 'active' : ''}`}>
            <NavLink  to="/items"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded icon-bg' icon={faBoxesStacked} style={{color: "#000000",}}/>
                <span className='ms-2  d-md-inline my-1'>Items</span>
              </a>
            </NavLink>
            </li>
            <li className={`nav-item mx-md-3 text-start sidebar-link my-1   rounded ${isNavLinkActive('/cart') ? 'active' : ''}`}>
              <NavLink  to="/cart"  >
                <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
                <FontAwesomeIcon className='border p-2 rounded icon-bg'icon={faCartShopping} style={{color: "#000000",}} />
                  <span className='ms-2  d-md-inline my-1'>Cart</span>
                </a>
              </NavLink>
            </li>
            <li className={`nav-item mx-md-3 text-start sidebar-link my-1   rounded ${isNavLinkActive('/checkout') ? 'active' : ''}`}>
            <NavLink  to="/checkout"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded icon-bg' icon={faBoxesStacked} style={{color: "#000000",}}/>
                <span className='ms-2  d-md-inline my-1'>Checkout</span>
              </a>
              </NavLink>
            </li>
            
             <hr className="nav-item mx-md-3 text-start sidebar-link my-4  rounded "/>
            <li className={`nav-item mx-md-3 text-start sidebar-link my-1   rounded ${isNavLinkActive('/profile') ? 'active' : ''}`}>
            <NavLink  to="/profile"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded icon-bg' icon={faUser} style={{color: "#000000",}} />
                <span className='ms-2  d-md-inline my-1'>Profile</span>
              </a>
              </NavLink>
            </li>
            <li className={`nav-item mx-md-3 text-start sidebar-link my-1   rounded ${isNavLinkActive('/signin') ? 'active' : ''}`}>
            <NavLink  to="/signin"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded icon-bg' icon={faBusinessTime} style={{color: "#000000",}} />
                <span className='ms-2  d-md-inline my-1'>sign in</span>
              </a>
              </NavLink>
            </li>
            <li className={`nav-item mx-md-3 text-start sidebar-link my-1   rounded ${isNavLinkActive('/tables') ? 'active' : ''}`}>
            <NavLink  to="/tables"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded icon-bg ' icon={faTableList} style={{color: "#000000",}} />
                <span className='ms-2  d-md-inline my-1'>Tables</span>
              </a>
              </NavLink>
            </li>
            
          </ul>
        </div>
         

        </div>
  )
}

export default SidebarMenu