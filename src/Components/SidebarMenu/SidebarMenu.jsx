import React from 'react'
import './SidebarMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faBoxesStacked,faUser,faDoorOpen,faTableList ,faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom'


function SidebarMenu({closeSidebar,getuser}) {

  const location = useLocation()
  
  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
      <div className=' sidebarmenu overflow-x-hidden overflow-y-scroll  border border-success' style={{ maxHeight: '100vh' }} id='sidebar'>
        <div className="wrapper rounded">
          <div className="d-flex justify-content-between">
          <a className=" d-flex justify-content-center p-2 ">
            <span className="fs-6 logo ">Sparesandparts</span>
          </a>
          <div className="d-md-none py-2 m-1" >
            <button  className="btn-close" onClick={()=>closeSidebar()}></button>
          </div>
          </div>
          <hr  className='text-secondary'/>

          <ul className="nav nav-pills mx-2 ">
            <li className={`nav-item mx-md-3 text-start sidebar-link my-1 flex-fill rounded  ${isNavLinkActive('/') ? 'active' : ''}`}>
            <NavLink  to="/"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1 " aria-current="page">
              <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg' icon={faHouse} />
                <span className=' d-md-inline my-1'>Dashboard</span>
              </a>
              </NavLink>
            </li>
            <li className={`  nav-item mx-md-3 text-start sidebar-link my-1 flex-fill  rounded ${isNavLinkActive('/items') ? 'active' : ''}`}>
            <NavLink  to="/items"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg' icon={faBoxesStacked} />
                <span className='ms-2  d-md-inline my-1 mx-1'>Items</span>
              </a>
            </NavLink>
            </li>
            <li className={` nav-item mx-md-3 text-start sidebar-link my-1 flex-fill  rounded ${isNavLinkActive('/cart') ? 'active' : ''}`}>
              <NavLink  to="/cart"  >
                <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
                <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg'icon={faCartShopping}  />
                  <span className='ms-2  d-md-inline my-1'>Cart</span>
                </a>
              </NavLink>
            </li>
            <li className={`nav-item mx-md-3 text-start sidebar-link my-1 flex-fill  rounded ${isNavLinkActive('/checkout') ? 'active' : ''}`}>
            <NavLink  to="/checkout"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg' icon={faBoxesStacked} />
                <span className='ms-2  d-md-inline my-1'>Checkout</span>
              </a>
              </NavLink>
            </li>
            
            <li className='w-100'>
              <hr className='text-secondary ' />
            </li>


            <li className={`nav-item mx-md-3 text-start sidebar-link my-1 flex-fill  rounded ${isNavLinkActive('/profile') ? 'active' : ''}`}>
            <NavLink  to="/profile"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg' icon={faUser}  />
                <span className='ms-2  d-md-inline my-1'>Profile</span>
              </a>
              </NavLink>
            </li>
            <li className={"nav-item mx-md-3 text-start sidebar-link my-1 flex-fill  rounded "}>
            <NavLink to={`${getuser ? '/signin' : '/'}`} >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg' icon={faDoorOpen}  />
                <span className='ms-2  d-md-inline my-1'>sign in</span>
              </a>
              </NavLink>
            </li>
            
            <li className={`nav-item mx-md-3 text-start sidebar-link my-1 flex-fill  rounded ${isNavLinkActive('/tables') ? 'active' : ''}`}>
            <NavLink  to="/tables"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg ' icon={faTableList}  />
                <span className='ms-2  d-md-inline my-1'>Tables</span>
              </a>
              </NavLink>
            </li>
            <li className={`nav-item mx-md-3 text-start sidebar-link my-1 flex-fill  rounded ${isNavLinkActive('/tables') ? 'active' : ''}`}>
            <NavLink  to="/tables"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg ' icon={faTableList}  />
                <span className='ms-2  d-md-inline my-1'>Tables</span>
              </a>
              </NavLink>
            </li>
            <li className={`nav-item mx-md-3 text-start sidebar-link my-1 flex-fill  rounded ${isNavLinkActive('/tables') ? 'active' : ''}`}>
            <NavLink  to="/tables"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg ' icon={faTableList}  />
                <span className='ms-2  d-md-inline my-1'>Tables</span>
              </a>
              </NavLink>
            </li>
            <li className={`nav-item mx-md-3 text-start sidebar-link my-1 flex-fill  rounded ${isNavLinkActive('/tables') ? 'active' : ''}`}>
            <NavLink  to="/tables"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg ' icon={faTableList}  />
                <span className='ms-2  d-md-inline my-1'>Tables</span>
              </a>
              </NavLink>
            </li>
            <li className={`nav-item mx-md-3 text-start sidebar-link my-1 flex-fill  rounded ${isNavLinkActive('/tables') ? 'active' : ''}`}>
            <NavLink  to="/tables"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg ' icon={faTableList}  />
                <span className='ms-2  d-md-inline my-1'>Tables</span>
              </a>
              </NavLink>
            </li>
            <li className={`nav-item mx-md-3 text-start sidebar-link my-1 flex-fill  rounded ${isNavLinkActive('/tables') ? 'active' : ''}`}>
            <NavLink  to="/tables"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-bg ' icon={faTableList}  />
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