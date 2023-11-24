import React from 'react'
import './SidebarMenu.css'

function SidebarMenu() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="bg-light col-auto col-md-3 min-vh-100">
          <a className="text-decoration-none  d-flex align-items-center">
            <i className="bi bi-speedometer"></i>
            <span className="ms-1 fs-4">Brand</span>
          </a>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item  fs-4">
              <a href="#" className="nav-link " aria-current="page">
                {/* <i className="bi bi-speedometer2"></i> */}
                <span className='ms-2'>Dashboard</span>
              </a>
            </li>
            <li className="nav-item  fs-4">
              <a href="#" className="nav-link " aria-current="page">
                {/* <i className="bi bi-home"></i> */}
                <span className='ms-2'>Orders</span>
              </a>
            </li>
            <li className="nav-item  fs-4">
              <a href="#" className="nav-link " aria-current="page">
                {/* <i className="bi bi-tables"></i> */}
                <span className='ms-2'>Tables</span>
              </a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  )
}

export default SidebarMenu