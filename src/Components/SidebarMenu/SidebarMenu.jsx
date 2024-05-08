import React from 'react'
import { Tooltip } from 'react-tooltip'
import './SidebarMenu.css'
import { Tag, User, Users, BarChart2, Package, Server, Grid, Truck, Box, Hash, UserPlus, Sliders, LogOut, Twitch, Monitor, Table, Image, Smile } from 'react-feather';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'


function SidebarMenu({ toggleSideNav, expandSideBar, setSelectedCatalog, setIsLogged, onLogout }) {

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
    <div style={{ maxHeight: '100vh', height: '100vh' }}>
      <div className="wrapper h-100">

        <div className=' d-flex flex-column justify-content-between align-items-start h-100'>
          <div className='d-flex justify-content-start align-items-center '>
            <ul className="list-unstyled">
              <li className="cursor py-3 ms-3 d-flex justify-content-start align-items-end  gap-1 rounded " onClick={() => toggleSideNav()}>
                <Package size={'35px'} />
                {expandSideBar && <p className='m-0'>POS SYSTEM</p>}
              </li>
              <li className={`p-2 ms-lg-3 mb-2 anchor-home  d-flex justify-content-start align-items-end lh-1 gap-1  cursor  rounded hover:bg-blue-200   ${isNavLinkActive('/') ? 'text-white bg-blue-700' : 'text-black'}`} onClick={() => navigate('/')}>
                <Monitor />
                {expandSideBar && <p className='m-0'>Sell</p>}
                {!expandSideBar &&
                  <Tooltip anchorSelect=".anchor-home" place="right" className="tooltip-above">
                    Sell
                  </Tooltip>}
              </li>
              <NavLink to='/dashboard' className='nav-link'>
                <li className={`p-2 ms-lg-3 mb-2 anchor-dash d-flex justify-content-start align-items-end lh-1 gap-1  cursor  rounded hover:bg-blue-200   ${isNavLinkActive('/dashboard') ? 'text-white bg-blue-700' : 'text-black'}`} >
                  <BarChart2 />
                  {expandSideBar && <p className='m-0'>Dashboard</p>}
                  {!expandSideBar &&
                    <Tooltip anchorSelect=".anchor-dash" place="right" className="tooltip-above">
                      Dashboard
                    </Tooltip>}
                </li>
                <NavLink to='/inventories' className='nav-link'>
                  <li className={`p-2 ms-lg-3 mb-2 anchor-inventory  d-flex justify-content-start align-items-end lh-1 gap-1  cursor  rounded hover:bg-blue-200   ${isNavLinkActive('/inventories') ? 'text-white bg-blue-700' : 'text-black'}`} >
                    <Table />
                    {expandSideBar && <p className='m-0'>Inventory</p>}
                    {!expandSideBar &&
                      <Tooltip anchorSelect=".anchor-inventory" place="right" className="tooltip-above">
                        Inventory
                      </Tooltip>}
                  </li>
                </NavLink>
              </NavLink>
              <li className={`p-2 ms-lg-3 mb-2 anchor-catalog d-flex justify-content-start align-items-end lh-1 gap-1  cursor rounded hover:bg-blue-200   ${isNavLinkActive('/catalog') ? 'text-white bg-blue-700' : 'text-black'}`} onClick={() => navigate('/catalog')} data-bs-toggle="collapse" href="#collapseCatalog" role="button" aria-expanded="false" aria-controls="collapseCatalog">
                <Server />
                {expandSideBar && <p className='m-0'>Catalog</p>}
                {!expandSideBar &&
                  <Tooltip anchorSelect=".anchor-catalog" place="right" className="tooltip-above">
                    Catalog
                  </Tooltip>}

              </li>
              <li className=' mb-1'>
                <ul className="ps-4 collapse list-unstyled text-start" id="collapseCatalog">
                  <NavLink to='/catalog/products' className='nav-link'>
                    <li className='text-muted anchor-products mb-2 d-flex justify-content-start align-items-center lh-1 gap-1  cursor' onClick={() => { navigate('/catalog'); setSelectedCatalog('products') }}>

                      <Grid strokeWidth={'0.5px'} style={{ color: "black" }} />
                      {expandSideBar && <p className='m-0'>Products</p>}
                      {!expandSideBar &&
                        <Tooltip anchorSelect=".anchor-products" place="right" className="tooltip-above">
                          Products
                        </Tooltip>}
                    </li>
                  </NavLink>
                  <NavLink to='/catalog/suppliers' className='nav-link'>
                    <li className='text-muted anchor-suppliers mb-2 d-flex justify-content-start align-items-center lh-1 gap-1  cursor' onClick={() => { navigate('/catalog'); setSelectedCatalog('suppliers') }}>
                      <Truck strokeWidth={'0.5px'} style={{ color: "black" }} />
                      {expandSideBar && <p className='m-0'>Suppliers</p>}
                      {!expandSideBar &&
                        <Tooltip anchorSelect=".anchor-suppliers " place="right" className="tooltip-above">
                          Suppliers
                        </Tooltip>}
                    </li>
                  </NavLink>

                  <NavLink to='/catalog/customers' className='nav-link'>
                    <li className='text-muted anchor-customers mb-2 d-flex justify-content-start align-items-center lh-1 gap-1  cursor' onClick={() => { navigate('/catalog'); setSelectedCatalog('customers') }}>
                      <Smile strokeWidth={'1px'} style={{ color: "black" }} />
                      {expandSideBar && <p className='m-0'>Customers</p>}
                      {!expandSideBar &&
                        <Tooltip anchorSelect=".anchor-customers" place="right" className="tooltip-above">
                          Customers
                        </Tooltip>}
                    </li>
                  </NavLink>
                  <NavLink to='/catalog/employees' className='nav-link'>
                    <li className='text-muted anchor-employees mb-2 d-flex justify-content-start align-items-center lh-1 gap-1  cursor' onClick={() => { navigate('/catalog'); setSelectedCatalog('employees') }}>
                      <Users strokeWidth={'0.5px'} style={{ color: "black" }} />
                      {expandSideBar && <p className='m-0'>Employees</p>}
                      {!expandSideBar &&
                        <Tooltip anchorSelect=".anchor-employees" place="right" className="tooltip-above">
                          Employees
                        </Tooltip>}
                    </li>
                  </NavLink>
                </ul>
              </li>

              <li className={`p-2 ms-lg-3 mb-2 anchor-setup  d-flex justify-content-start align-items-end lh-1 gap-1  cursor  rounded hover:bg-blue-200   ${isNavLinkActive('/settings') ? 'text-white bg-blue-700' : 'text-black'}`} onClick={() => navigate('/settings')} data-bs-toggle="collapse" href="#collapseSetup" role="button" aria-expanded="false" aria-controls="collapseSetup">
                <Sliders />
                {expandSideBar && <p className='m-0'>Setup</p>}
                {!expandSideBar &&
                  <Tooltip anchorSelect=".anchor-setup" place="right" className="tooltip-above">
                    Setup
                  </Tooltip>}
              </li>
              <li className="mb-1">
                <ul className="ps-4 collapse list-unstyled text-start" id="collapseSetup">
                  <NavLink to='/settings/brands' className='nav-link'>
                    <li className='text-muted anchor-brands mb-2 d-flex justify-content-start align-items-center lh-1 gap-1  cursor' >

                      <Hash strokeWidth={'0.5px'} style={{ color: "black" }} />
                      {expandSideBar && <p className='m-0'>Brands</p>}
                      {!expandSideBar &&
                        <Tooltip anchorSelect=".anchor-brands " place="right" className="tooltip-above">
                          Brands
                        </Tooltip>}
                    </li>
                  </NavLink>
                  <NavLink to='/settings/categories' className='nav-link'>
                    <li className='text-muted anchor-categories mb-2 d-flex justify-content-start align-items-center lh-1 gap-1  cursor' >
                      <Tag strokeWidth={'0.5px'} style={{ color: "black" }} />
                      {expandSideBar && <p className='m-0'>Categories</p>}
                      {!expandSideBar &&
                        <Tooltip anchorSelect=".anchor-categories " place="right" className="tooltip-above">
                          Category
                        </Tooltip>}
                    </li>
                  </NavLink>
                </ul>
              </li>
              <li className={`p-2 ms-lg-3 mb-2 anchor-account  d-flex justify-content-start align-items-end lh-1 gap-1  cursor  rounded hover:bg-blue-200   ${isNavLinkActive('/account') ? 'text-white bg-blue-700' : 'text-black'}`} onClick={() => navigate('/account')} data-bs-toggle="collapse" href="#collapseAccount" role="button" aria-expanded="false" aria-controls="collapseAccount">
                <User />
                {expandSideBar && <p className='m-0'>Account</p>}
                {!expandSideBar &&
                  <Tooltip anchorSelect=".anchor-account" place="right" className="tooltip-above">
                    Account
                  </Tooltip>}
              </li>
              <li className=' mb-1'>
                <ul className="ps-4 collapse list-unstyled text-start" id="collapseAccount">
                  <NavLink to='/account/new' className='nav-link'>
                    <li className='text-muted anchor-new mb-2 d-flex justify-content-start align-items-center lh-1 gap-1  cursor'>
                      <UserPlus strokeWidth={'0.5px'} style={{ color: "black" }} />
                      {expandSideBar && <p className='m-0'>New</p>}
                      {!expandSideBar &&
                        <Tooltip anchorSelect=".anchor-new" place="right" className="tooltip-above">
                          New
                        </Tooltip>}
                    </li>
                  </NavLink>
                  <NavLink to='/account/user_profile' className='nav-link'>
                    <li className='text-muted anchor-profile mb-2 d-flex justify-content-start align-items-center lh-1 gap-1  cursor' >
                      <Image strokeWidth={'0.5px'} style={{ color: "black" }} />
                      {expandSideBar && <p className='m-0'>Profile</p>}
                      {!expandSideBar &&
                        <Tooltip anchorSelect=".anchor-profile" place="right" className="tooltip-above">
                          Profile
                        </Tooltip>}
                    </li>
                  </NavLink>
                  <li className='text-muted anchor-signout mb-2 d-flex justify-content-start align-items-center lh-1 gap-1  cursor' onClick={handleLogout}>
                    <LogOut strokeWidth={'0.5px'} style={{ color: "black" }} />
                    {expandSideBar && <p className='m-0'>Sign out</p>}
                    {!expandSideBar &&
                      <Tooltip anchorSelect=".anchor-signout" place="right" className="tooltip-above">
                        Sign out
                      </Tooltip>}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div >
    </div >
  )
}

export default SidebarMenu