import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faHouse, faSlash, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import profile from '../../assets/images/profile.jpg'
import './Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom'


function Navbar({ sticky, openSidebar, user, setIsLogged, onLogout }) {


    const navigate = useNavigate()
    const location = useLocation()
    let pathname
    if (location.pathname.length == 1) {
        pathname = 'Dashboard'
    } else {
        pathname = location.pathname.slice(1);
    }



    function handleLogout() {
        sessionStorage.clear();
        setIsLogged(false)
        onLogout('')
    }

    const navbarClassNamees = `navbar mx-2 my-4 p-2 rounded  ${sticky ? 'sticky-top' : ''}`;


    return (
        <div className='wrapper'>
            <nav className={navbarClassNamees} >
                <div className=" container-fluid m-0  align-items-end w-100vw row  d-flex justify-content-between">
                    <div className="col-md-4 col-4">
                        <div className='text-start'>
                            <div className="d-flex gap-1">
                                <div><a href="/"><FontAwesomeIcon icon={faHouse} size="xs" style={{ color: "#292929", }} /></a></div>
                                <div><FontAwesomeIcon icon={faSlash} rotation={90} size="2xs" /></div>
                                <p className='menu-p align-self-center m-0'>{pathname}</p>
                            </div>

                            <p className="navbar-brand  p-0 lh-1 m-0 text-capitalize">{pathname}</p>
                        </div>
                    </div>
                    {/* <button className="navbar-toggler border-0" type="button" onClick={()=>openSidebar()}>
                    <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div className="col-md-5 col-4 d-flex justify-content-end">
                        <div className="btn-group d-flex justify-content-end align-items-center gap-2 m-0  ">
                            <div onClick={() => navigate('/user_profile')}><FontAwesomeIcon icon={faGear} /></div>
                            {user &&
                                <div className="dash_profile d-flex justify-content-between align-items-center gap-1 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="dash_profile_div">
                                        <img className='img-fluid img' src={user.img ? user.img : profile} alt="profile" />
                                    </div>
                                    <div className='d-flex align-items-center gap-1'>
                                        <p className="m-0 text-capitalize">{user.firstname}</p>
                                    </div>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><button className='dropdown-item' disabled>{user.email}</button></li>
                                        <li><button className='dropdown-item' disabled><hr className='m-0 text-black' /></button></li>
                                        <li><button className="dropdown-item" type="button" onClick={() => navigate('/user_profile')}><p className="m-0"><span><FontAwesomeIcon icon={faUser} /></span>&nbsp;&nbsp;Profile</p></button></li>
                                        <li><button className="dropdown-item" onClick={() => handleLogout()} type="button"><p className="m-0"><span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span>&nbsp;&nbsp;Signout</p></button></li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Navbar