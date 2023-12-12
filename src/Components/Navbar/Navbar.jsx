import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faGear,faHouse,faSlash,faCartShopping,faBars,faBell} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import { NavLink, useLocation } from 'react-router-dom'


function Navbar({sticky,openSidebar,cartCount,user,loggedOut,onLogout,setCartItems}) {


    const location = useLocation()
    let pathname
    if (location.pathname.length == 1) {
        pathname = 'Dashboard'
    }  else{
        pathname = location.pathname.slice(1);
    }
    
    
 
    function handleLogout(){
        sessionStorage.clear();
        loggedOut(true)
        onLogout()
        setCartItems([])
    }

  const navbarClassNamees = `navbar mx-2 my-4 p-2  rounded  ${sticky ? 'sticky-top' : ''}`;


  return (
    <div className='wrapper'>
        <nav className={navbarClassNamees}  >
            <div className=" container-fluid m-0  align-items-end w-100vw row  d-flex justify-content-between">
                <div className="col-md-4 col-4">
                    <div className='text-start'>
                    <div className="d-flex gap-1">
                    <div><a href="/"><FontAwesomeIcon icon={faHouse} size="xs" style={{color: "#292929",}} /></a></div>
                    <div><FontAwesomeIcon icon={faSlash} rotation={90} size="2xs" /></div>
                    <p className='menu-p align-self-center m-0'>{pathname}</p>
                    </div>
                    
                    <a className="navbar-brand ">{pathname}</a>
                    </div>
                </div>
                   {/* <button className="navbar-toggler border-0" type="button" onClick={()=>openSidebar()}>
                    <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div className="col-md-5 col-4 d-flex justify-content-end">
                        <div className="row d-flex justify-content-end align-items-end gap-2 m-0  ">
                            <div className="col-5 col-xl-4 pt-2 d-flex align-items-end gap-3 justify-content-end">
                                
                                <NavLink to='/cart'>
                                <div className="d-flex align-items-end justify-content-center gap-1">
                                    <FontAwesomeIcon icon={faCartShopping} style={{color: "#000000",}} />
                                    <p className='m-0 lh-1 '>{cartCount}</p>
                                </div>
                                </NavLink>
                                <FontAwesomeIcon className='d-xl-none d-md-flex' onClick={()=>openSidebar()} icon={faBars} />
                                <NavLink to='/profile'>
                                    <div className="d-flex align-items-end justify-content-center gap-1">
                                            <FontAwesomeIcon icon={faBell} />
                                            <p className='m-0 lh-1 '>0</p>
                                    </div>
                                </NavLink>
                                
                            </div>
                            <div className='d-flex menu-p col-6 col-xl-7 align-items-center gap-2 p-0'>
                                
                            
                                <div className="d-flex gap-2 align-items-end ">
                                
                                {!user ?  (
                                    
                                    <NavLink to='/signin'>
                                    <div className="d-flex gap-2 align-items-center">
                                        <FontAwesomeIcon icon={faUser} style={{color: "#000000",}} />
                                        <p className='m-0'>sign in</p>
                                    </div>
                                    </NavLink>
                                ) : (
                                    <>
                                        <div >
                                            <NavLink to='/profile'>
                                            <div className="d-flex align-items-center justify-content-center gap-2">
                                                <FontAwesomeIcon icon={faUser} style={{color: "#000000",}} />
                                                <p className='m-0 d-none d-md-flex '>{user.business}</p>
                                            </div>
                                            </NavLink>
                                        </div>
                                        <div className="dropdown dropstart lh-1 mx-3">
                                        <FontAwesomeIcon className="dropdown-toggle"  id="dropdownMenuButton1" data-bs-toggle="dropdown" icon={faGear} style={{color: "#000000",}} />
                                
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li onClick={()=>handleLogout()}><a className="dropdown-item menu-p " href="#">Logout</a></li>
                                    </ul>
                                </div>
                                    </>
                                ) }
                            
                                </div>
                                
                            </div>
                        </div>
                    </div>
                
            </div>
            </nav>
    </div>
  )
}

export default Navbar