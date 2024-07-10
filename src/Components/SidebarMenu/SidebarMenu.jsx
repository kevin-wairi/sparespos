import React from 'react'
import { Tooltip } from 'react-tooltip'
import './SidebarMenu.css'
import { User, Users, Server, Grid, Truck, LogOut, Monitor,  Settings, PieChart, Box, Share2, Home } from 'react-feather';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'


function SidebarMenu({ setSelectedCatalog, setIsLogged, onLogout }) {

  const location = useLocation()
  const navigate = useNavigate()

  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  function handleLogout() {
    sessionStorage.clear();
    setIsLogged(false)
    onLogout('')
  }

  return (
    <div className="wrapper h-100 w-100">
      <div className=' d-flex flex-column justify-content-between align-items-center '>
        <div className='d-flex justify-content-start align-items-center '>
          <ul className="list-unstyled mt-3">
            <NavLink to='/dashboard' className='nav-link'>
              <li className={`p-2  mb-2 anchor-dash d-flex justify-content-start align-items-center lh-1 gap-1  cursor  rounded hover:bg-blue-200   ${isNavLinkActive('/dashboard') ? 'text-white bg-blue-700' : 'text-black'}`} >
                <Home />
                <Tooltip anchorSelect=".anchor-dash" place="right" className="tooltip-above">
                  Dashboard
                </Tooltip>
              </li>
            </NavLink>
            <NavLink to='/' className='nav-link'>
              <li className={`p-2  mb-2 anchor-home  d-flex justify-content-start align-items-center lh-1 gap-1  cursor  rounded hover:bg-blue-200   ${isNavLinkActive('/') ? 'text-white bg-blue-700' : 'text-black'}`} >
                <Monitor />
                <Tooltip anchorSelect=".anchor-home" place="right" className="tooltip-above">
                  Sell
                </Tooltip>
              </li>
            </NavLink>
            <NavLink to='/inventories' className='nav-link'>
              <li className={`p-2  mb-2 anchor-inventory  d-flex justify-content-start align-items-center lh-1 gap-1  cursor  rounded hover:bg-blue-200   ${isNavLinkActive('/inventories') ? 'text-white bg-blue-700' : 'text-black'}`} >
                <Grid />
                <Tooltip anchorSelect=".anchor-inventory" place="right" className="tooltip-above">
                  Inventory
                </Tooltip>
              </li>
            </NavLink>
            <NavLink to='/setup' className='nav-link'>
              <li className={`p-2  mb-2 anchor-setup  d-flex justify-content-start align-items-center lh-1 gap-1  cursor  rounded hover:bg-blue-200   ${isNavLinkActive('/setup') ? 'text-white bg-blue-700' : 'text-black'}`}>
                <Share2 />
                <Tooltip anchorSelect=".anchor-setup" place="right" className="tooltip-above">
                  Setup
                </Tooltip>
              </li>
            </NavLink>
            <li className={`p-2  mb-2 anchor-catalog d-flex justify-content-start align-items-center lh-1 gap-1  cursor rounded hover:bg-blue-200   ${isNavLinkActive('/catalog') ? 'text-white bg-blue-700' : 'text-black'}`} onClick={() => navigate('/catalog')} data-bs-toggle="collapse" href="#collapseCatalog" role="button" aria-expanded="false" aria-controls="collapseCatalog">
              <Server />
              <Tooltip anchorSelect=".anchor-catalog" place="right" className="tooltip-above">
                Catalog
              </Tooltip>
            </li>
            <li className=' mb-1'>
              <ul className="ps-4 collapse list-unstyled text-start" id="collapseCatalog">
                <NavLink to='/catalog/products' className='nav-link'>
                  <li className='text-muted anchor-products mb-2 d-flex justify-content-start align-items-center lh-1 gap-1  cursor' onClick={() => { navigate('/catalog'); setSelectedCatalog('products') }}>

                    <Box strokeWidth={'0.5px'} style={{ color: "black" }} />
                    <Tooltip anchorSelect=".anchor-products" place="right" className="tooltip-above">
                      Products
                    </Tooltip>
                  </li>
                </NavLink>
                <NavLink to='/catalog/suppliers' className='nav-link'>
                  <li className='text-muted anchor-suppliers mb-2 d-flex justify-content-start align-items-center lh-1 gap-1  cursor' onClick={() => { navigate('/catalog'); setSelectedCatalog('suppliers') }}>
                    <Truck strokeWidth={'0.5px'} style={{ color: "black" }} />
                    <Tooltip anchorSelect=".anchor-suppliers " place="right" className="tooltip-above">
                      Suppliers
                    </Tooltip>
                  </li>
                </NavLink>

              </ul>
            </li>
            {/* <NavLink to='/catalog/customers' className='nav-link'>
                <li className=' anchor-customers mb-2 d-flex justify-content-start align-items-center lh-1 gap-1  cursor' onClick={() => { navigate('/catalog'); setSelectedCatalog('customers') }}>
                  <Users strokeWidth={'0.5px'} style={{ color: "black" }} />
                  <Tooltip anchorSelect=".anchor-customers" place="right" className="tooltip-above">
                    Customers
                  </Tooltip>
                </li>
              </NavLink> */}
            <NavLink to={'/customers'} className='nav-link'>
              <li className={`p-2  mb-2 anchor-customers  d-flex justify-content-start align-items-center lh-1 gap-1  cursor  rounded hover:bg-blue-200   ${isNavLinkActive('/customers') ? 'text-white bg-blue-700' : 'text-black'}`} >
                <Users />
                <Tooltip anchorSelect=".anchor-customers" place="right" className="tooltip-above">
                  Customers
                </Tooltip>
              </li>
            </NavLink>
            <NavLink to={'/sales_report'} className='nav-link'>
              <li className={`p-2  mb-2 anchor-salesReport  d-flex justify-content-start align-items-center lh-1 gap-1  cursor  rounded hover:bg-blue-200   ${isNavLinkActive('/sales_report') ? 'text-white bg-blue-700' : 'text-black'}`} >
                <PieChart />
                <Tooltip anchorSelect=".anchor-salesReport" place="right" className="tooltip-above">
                  Sales Report
                </Tooltip>
              </li>
            </NavLink>
            <li className={`p-2  mb-2 anchor-account  d-flex justify-content-start align-items-center lh-1 gap-1  cursor  rounded hover:bg-blue-200   ${isNavLinkActive('/account') ? 'text-white bg-blue-700' : 'text-black'}`} onClick={() => navigate('/account')} data-bs-toggle="collapse" href="#collapseAccount" role="button" aria-expanded="false" aria-controls="collapseAccount">
              <User />
              <Tooltip anchorSelect=".anchor-account" place="right" className="tooltip-above">
                Account
              </Tooltip>
            </li>
            <li className=' mb-1'>
              <ul className="ps-4 collapse list-unstyled text-start" id="collapseAccount">
                <NavLink to='/account/users' className='nav-link'>
                  <li className='text-muted anchor-users mb-2 d-flex justify-content-start align-items-center lh-1 gap-1  cursor' onClick={() => { navigate('/catalog'); setSelectedCatalog('users') }}>
                    <Users strokeWidth={'0.5px'} style={{ color: "black" }} />
                    <Tooltip anchorSelect=".anchor-users" place="right" className="tooltip-above">
                      Staff
                    </Tooltip>
                  </li>
                </NavLink>
                <NavLink to='/account/user_profile' className='nav-link'>
                  <li className='text-muted anchor-profile mb-2 d-flex justify-content-start align-items-center lh-1 gap-1  cursor' >
                    <Settings strokeWidth={'0.5px'} style={{ color: "black" }} />
                    <Tooltip anchorSelect=".anchor-profile" place="right" className="tooltip-above">
                      Profile
                    </Tooltip>
                  </li>
                </NavLink>
                <li className='text-muted anchor-signout mb-2 d-flex justify-content-start align-items-center lh-1 gap-1  cursor' onClick={handleLogout}>
                  <LogOut strokeWidth={'0.5px'} style={{ color: "black" }} />
                  <Tooltip anchorSelect=".anchor-signout" place="right" className="tooltip-above">
                    Sign out
                  </Tooltip>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div >
  )
}

export default SidebarMenu