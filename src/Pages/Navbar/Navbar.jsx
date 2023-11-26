import React,{useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faUser,faGear,faHouse,faSlash} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'

function Navbar({sticky}) {

   

  const navbarClasses = `navbar navbar-expand-lg my-3 p-1 rounded ${sticky ? 'sticky-top' : ''}`;

  return (
    <div wrapper>
        <nav className={navbarClasses} id='navbar'>
            <div className="container-fluid">
                <div className="col-md-6 col-ms-12 ">
                    <div className='text-start'>
                    <div className="d-flex gap-1">
                    <div><a href="/"><FontAwesomeIcon icon={faHouse} size="xs" style={{color: "#292929",}} /></a></div>
                    <div><FontAwesomeIcon icon={faSlash} rotation={90} size="2xs" /></div>
                    <p>Dashboard</p>
                    </div>
                    
                    <a className="navbar-brand " href="#">Dashboard</a>
                    </div>
                </div>
                   <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="col-md-4 col-ms-12 col-lg-4">
                        <div className="row d-flex justify-content-center">
                        <form className="d-flex col-8 p-0">
                            <div className="searcIcon">
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#000000",}} />
                            </div>
                            <input className="form-control me-2 searchFormInput" type="search" placeholder="Type here .." aria-label="Search"/>
                        </form>
                        <div className='d-flex  col-4 align-items-center gap-2 p-0'>
                        <FontAwesomeIcon icon={faUser} style={{color: "#000000",}} />
                            <div className='d-flex align-items-center gap-2'>
                            <p className='m-0'>sign in</p>
                            <FontAwesomeIcon icon={faGear} style={{color: "#000000",}} />
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