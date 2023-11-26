import React from 'react'
import './SidebarMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faBoxesStacked,faBars,faUser,faBusinessTime,faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom'


function SidebarMenu() {
  return (
      <div className=' sidebarmenu  overflow-y-scroll py-md-3 py-sm-2' style={{ maxHeight: '100vh' }} id='sidebar'>
        <div className="container-fluid rounded bg-white">
           <a className=" d-flex justify-content-center p-4 ">
          <FontAwesomeIcon className='d-inline d-md-none  ' icon={faBars} style={{color: "#000000",}} />
            <span className="fs-5 d-none d-md-inline ">Sparesandparts</span>
          </a>
          <hr  className='text-secondary'/>
          <ul className="nav nav-pills flex-column ">
            <li className="nav-item mx-md-3 text-center sidebar-link my-1 rounded ">
            <NavLink  to="/"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 " aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faHouse} style={{color: "#000000",}}/>
                <span className='d-none d-md-inline my-1'>Dashboard</span>
              </a>
              </NavLink>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
            <NavLink  to="/items"  >
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faBoxesStacked} style={{color: "#000000",}}/>
                <span className='ms-2 d-none d-md-inline my-1'>Items</span>
              </a>
            </NavLink>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faBoxesStacked} style={{color: "#000000",}}/>
                <span className='ms-2 d-none d-md-inline my-1'>Parts</span>
              </a>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faBoxesStacked} style={{color: "#000000",}}/>
                <span className='ms-2 d-none d-md-inline my-1'>Parts</span>
              </a>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faBoxesStacked} style={{color: "#000000",}}/>
                <span className='ms-2 d-none d-md-inline my-1'>Parts</span>
              </a>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
             <p className='text-uppercase'>Account Pages</p>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faUser} style={{color: "#000000",}} />
                <span className='ms-2 d-none d-md-inline my-1'>Profile</span>
              </a>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faBusinessTime} style={{color: "#000000",}} />
                <span className='ms-2 d-none d-md-inline my-1'>sign in</span>
              </a>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faSuitcase} style={{color: "#000000",}} />
                <span className='ms-2 d-none d-md-inline my-1'>sign up</span>
              </a>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faBoxesStacked} style={{color: "#000000",}}/>
                <span className='ms-2 d-none d-md-inline my-1'>Parts</span>
              </a>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faBoxesStacked} style={{color: "#000000",}}/>
                <span className='ms-2 d-none d-md-inline my-1'>Parts</span>
              </a>
            </li>
            <li className="nav-item mx-md-3 text-start sidebar-link my-1  rounded ">
              <a href="#" className="nav-link p-0 d-flex gap-2" aria-current="page">
              <FontAwesomeIcon className='border p-2 rounded' icon={faBoxesStacked} style={{color: "#000000",}}/>
                <span className='ms-2 d-none d-md-inline my-1'>Parts</span>
              </a>
            </li>
            
          </ul>
        </div>
         

        </div>
  )
}

export default SidebarMenu