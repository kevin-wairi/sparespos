import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faGear,faHouse,faSlash,faCartShopping} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import { NavLink, useLocation } from 'react-router-dom'
import Profile from '../Profile/Profile';

function Navbar({sticky,openSidebar,cartCount,user,loggedOut,onLogout}) {


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
    }

  const navbarClassNamees = `navbar navbar-expand-sm my-3 p-1 rounded ${sticky ? 'sticky-top' : ''}`;


  return (
    <div wrapper>
        <nav className={navbarClassNamees} id='navbar'>
            <div className="container-fluid">
                <div className="col-md-6 col-8 ">
                    <div className='text-start'>
                    <div className="d-flex gap-1">
                    <div><a href="/"><FontAwesomeIcon icon={faHouse} size="xs" style={{color: "#292929",}} /></a></div>
                    <div><FontAwesomeIcon icon={faSlash} rotation={90} size="2xs" /></div>
                    <p>{pathname}</p>
                    </div>
                    
                    <a className="navbar-brand ">Dashboard</a>
                    </div>
                </div>
                   <button className="navbar-toggler border-0" type="button" onClick={()=>openSidebar()}>
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="col-md-6 col-12 col-lg-4 ">
                        <div className="row d-flex justify-content-end">
                        <div className="col-lg-2 col-md-5 col-6 py-2">
                            <NavLink to='/cart'>
                                <div className="d-flex align-items-center justify-content-center gap-1">
                            <FontAwesomeIcon icon={faCartShopping} style={{color: "#000000",}} />
                            <p className='m-0'>{cartCount}</p>
                            </div>
                            </NavLink>
                        </div>
                        <div className='d-flex menu-p col-lg-4 col-md-5  col-6 align-items-center gap-2 p-0 '>
                             
                        
                            <div className="d-flex gap-2 align-items-center">
                             
                            {!user ?  (
                                
                                <NavLink to='/signin'>
                                <div className="d-flex gap-2 align-items-center">
                                    <FontAwesomeIcon icon={faUser} style={{color: "#000000",}} />
                                    <p className='m-0'>sign in</p>
                                </div>
                                </NavLink>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faUser} style={{color: "#000000",}} />
                                    <p className='m-0'>{user.business}</p>
                                    <div className="dropdown dropstart">
                                    <FontAwesomeIcon className="dropdown-toggle"  id="dropdownMenuButton1" data-bs-toggle="dropdown" icon={faGear} style={{color: "#000000",}} />
                               
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={()=>handleLogout()}><a className="dropdown-item menu-p" href="#">Logout</a></li>
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