import React from 'react'
import './SidebarMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faBoxesStacked,faUser,faX,faBusinessTime,faSuitcase,faTableList ,faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom'


function SidebarMenu({closeSidebar}) {
  return (
      <div className=' sidebarmenu overflow-x-hidden overflow-y-scroll ' style={{ maxHeight: '100vh' }} id='sidebar'>
        <div className="wrapper rounded">
          <div className="d-flex justify-content-between">
          <a className=" d-flex justify-content-center p-2 ">
            <span className="fs-5  ">Sparesandparts</span>
          </a>
          <div className="close d-md-none py-2 m-1" onClick={()=>closeSidebar()}>
          <FontAwesomeIcon icon={faX} style={{color: "#000000",}} />
          </div>
          </div>
          <hr  className='text-secondary'/>
          <ul className="nav nav-pills flex-column ">
            <li className="nav-item mx-md-3 text-center sidebar-link my-1 rounded ">
            <NavLink  to="/"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 " aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faHouse} style={{color: "#000000",}}/>
                <span className=' d-md-inline my-1'>Dashboard</span>
              </a>
              </NavLink>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
            <NavLink  to="/items"  >
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faBoxesStacked} style={{color: "#000000",}}/>
                <span className='ms-2  d-md-inline my-1'>Items</span>
              </a>
            </NavLink>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
              <NavLink  to="/cart"  >
                <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
                <FontAwesomeIcon className='border p-2 rounded'icon={faCartShopping} style={{color: "#000000",}} />
                  <span className='ms-2  d-md-inline my-1'>Cart</span>
                </a>
              </NavLink>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
            <NavLink  to="/checkout"  >
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faBoxesStacked} style={{color: "#000000",}}/>
                <span className='ms-2  d-md-inline my-1'>Checkout</span>
              </a>
              </NavLink>
            </li>
            
             <hr className="nav-item mx-md-3 text-start sidebar-link my-4  rounded "/>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
            <NavLink  to="/profile"  >
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faUser} style={{color: "#000000",}} />
                <span className='ms-2  d-md-inline my-1'>Profile</span>
              </a>
              </NavLink>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
            <NavLink  to="/signin"  >
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faBusinessTime} style={{color: "#000000",}} />
                <span className='ms-2  d-md-inline my-1'>sign in</span>
              </a>
              </NavLink>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
            <NavLink  to="/signup"  >
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faSuitcase} style={{color: "#000000",}} />
                <span className='ms-2  d-md-inline my-1'>sign up</span>
              </a>
              </NavLink>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
            <NavLink  to="/checkout"  >
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faTableList} style={{color: "#000000",}} />
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