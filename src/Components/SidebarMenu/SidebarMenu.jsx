import React from 'react'
import './SidebarMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faWarehouse,faTableList ,faCartShopping,faCreditCard,faScrewdriverWrench} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom'


function SidebarMenu({closeSidebar}) {

  const location = useLocation()
  
  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
      <div className=' sidebarmenu overflow-x-hidden overflow-y-scroll ' style={{ maxHeight: '100vh',  borderRadius: '10px 0  0 10px'}} id='sidebar'>
        <div className="wrapper border h-100 w-100 d-flex flex-column  justify-content-between">
          
        <div>
            <div className="py-3">
              <p className="btn" onClick={()=>closeSidebar()}>
                <span className="logo fw-bold fs-1">C</span>
              </p>
              <hr  className='text-secondary mx-auto' style={{width:'80%'}}/>
            </div>

            <ul className="nav nav-pills mx-2 ">
              <li className={`nav-item mx-md-3 text-start sidebar-link my-1 flex-fill rounded  ${isNavLinkActive('/') ? 'active' : ''}`}>
              <NavLink  to="/"  >
                <div className="d-flex gap-2 p-1">
                  <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg' icon={faHouse} />
                  <span className=' d-md-inline my-1'>Dashboard</span>
                </div>
                </NavLink>
              </li>
              <li className={` nav-item col-12 mx-md-3 text-start sidebar-link my-1 flex-fill  rounded ${isNavLinkActive('/items') ? 'active' : ''}`}>
              <NavLink  to="/items"  >
                <div className="d-flex gap-2 p-1">
                  <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg' icon={faWarehouse} />
                  <span className='ms-2  d-md-inline my-1 mx-1'>Items</span>
                </div>
              </NavLink>
              </li>
              <li className={` nav-item  mx-md-3 text-start sidebar-link my-1 flex-fill  rounded ${isNavLinkActive('/cart') ? 'active' : ''}`}>
                <NavLink  to="/cart"  >
                  <div className="d-flex gap-2 p-1">
                    <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg'icon={faCartShopping}  />
                    <span className='ms-2  d-md-inline my-1'>Cart</span>
                  </div>
                </NavLink>
              </li>
              <li className={`nav-item mx-md-3 text-start sidebar-link my-1 flex-fill  rounded ${isNavLinkActive('/checkout') ? 'active' : ''}`}>
              <NavLink  to="/checkout"  >
                  <div className="d-flex gap-2 p-1">
                    <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg' icon={faCreditCard} />
                    <span className='ms-2  d-md-inline my-1'>Checkout</span>
                  </div>
                </NavLink>
              </li>
              
              <li className='w-100'>
                <hr className='text-secondary ' />
              </li> 
              <li className={`nav-item mx-md-3 text-start sidebar-link my-1 flex-fill  rounded ${isNavLinkActive('/tables') ? 'active' : ''}`}>
              <NavLink  to="/tables"  >
                  <div className="d-flex gap-2 p-1">
                    <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg ' icon={faTableList}  />
                    <span className='ms-2  d-md-inline my-1'>Tables</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="py-3">
          <hr  className='text-secondary mx-auto' style={{width:'80%'}}/>
              <div className={`nav-item mx-md-3 text-start sidebar-link my-1 flex-fill  rounded ${isNavLinkActive('/profile') ? 'active' : ''}`}>
              <NavLink  to="/profile"  >
                  <div className="d-flex gap-2 p-1">
                    <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg ' icon={faScrewdriverWrench}  />
                    <span className='ms-2  d-md-inline my-1'>Settings</span>
                  </div>
                </NavLink>
              </div>
            </div>
          
        </div>
         

        </div>
  )
}

export default SidebarMenu