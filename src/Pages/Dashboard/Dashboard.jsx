import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse,faUser,faTableList ,faCartShopping,faCreditCard} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom'
import profileImg from '../../assets/images/profile.jpg'
import back from '../../assets/images/bg.jpg'
import './Dashboard.css'
import Quotes from '../../Components/ArrayFiles/Quotes'

function Dashboard({user={user}}) {

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

    // time function
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); 

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = currentDateTime.toLocaleDateString(undefined, options);
  const formattedTime = currentDateTime.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit', hour12: false });

  useEffect(() => {
    // Function to switch to the next quote after 10 seconds
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % Quotes.length);
    }, 86400000 );

    // Clean up the interval 
    return () => clearInterval(intervalId);
  }, [currentQuoteIndex, Quotes.length]);


  return (
    <div className="wrapper px-3">
      <div className="container  p-0">
         <div
          className="row  justify-content-start align-items-center g-2 mb-3"
         >
          <ul
            className="nav justify-content-around col-xl-3 col-7 col-md-3 col-sm-5  rounded bg-white"
            style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}
          >
            <li className="nav-item ">
            <NavLink  to="/items"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-Dash' icon={faWarehouse} />
              </a>
            </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink  to="/cart"  >
                <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
                <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-Dash'icon={faCartShopping}  />
                </a>
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink  to="/checkout"  >
                <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
                <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-Dash' icon={faCreditCard} />
                </a>
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink  to="/profile"  >
                <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
                <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-Dash' icon={faUser}  />
                </a>
              </NavLink>
            </li>
            <li className="nav-item ">
            <NavLink  to="/tables"  >
              <a href="#" className="nav-link p-0 d-flex gap-2 p-1" aria-current="page">
              <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-Dash ' icon={faTableList}  />
              </a>
              </NavLink>
            </li>
          </ul>
         
         </div>
         <div
          className="row justify-content-center align-items-start  g-2"
        >
          <div className="col-lg-8 ">
            <section>
              <div
                className="row justify-content-center align-items-start g-2"
              >
                <div className="col-lg-4 ">
                  <div className="card text-start border-0"
                  style={{boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'}}>
                    <div className="card-body p-0 "
                    style={{position:'relative',height:'35vh'}}>
                      <div className="profile_rounded ">
                      <img src={back} alt="info"
                      style={{height:'18vh',borderRadius: '5px 5px 0 0 '}} />
                    <img className="card-img-top rounded-circle"
                    style={{width: '100px',position:'absolute',left: '25%',top:'25%'}}
                     src={profileImg} alt="Title" />
                      </div>
                      <div className="px-3"
                      style={{marginTop:'8vh'}}>
                        <h4 className="card-title">{user ? user.username : 'username'}</h4>
                        <p className="card-text">{user ? user.business : 'user business'}</p>
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className="col-lg-8 ">
                    <div
                      className="row justify-content-center align-items-start g-2"
                    >
                      <div className="col-lg-3  ">
                      <div className="card border-0 "
                        style={{boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'}}>
                          <div className="card-body ">
                            <h4 className="card-text fs-3">{formattedTime}</h4>
                            <p className="card-title">{formattedDate}</p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="col-lg-3 ">
                        <div className="card border-0"
                        style={{boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'}}>
                          <div className="card-body">
                            <p className="card-title">New <br /> Customers</p>
                            <p className="card-text fs-2">5</p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="col-lg-6  text-start">
                        <div className="card border-0"
                        style={{boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'}}>
                          <div className="card-body">
                            <h4 className="card-title">Notifications</h4>
                            <p className="card-text fs-2">0</p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="col-lg-6  text-start">
                      <div className="card border-0"
                      style={{boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'}}>
                          <div className="card-body">
                            <h4 className="card-title">Qoute of the day</h4>
                            <p className='card-title'>{Quotes[currentQuoteIndex].text}</p>
                            <p className='card-title'>- {Quotes[currentQuoteIndex].author}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6  text-start">
                      <div className="card border-0"
                      style={{boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'}}>
                          <div className="card-body">
                            <h4 className="card-title">Invoices</h4>
                            <p className="card-text fs-2">0</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                </div>
              </div>
              
            </section>
            <section>
              <p className='fs-6 text-start mt-2'>Overview</p>
              <div
                className="row justify-content-center align-items-center g-2 text-start"
              >
                <div className="col-lg-3">
                  <div className="card border-0"
                  style={{boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'}}>
                    <div className="card-body">
                      <h4 className="card-title">Earnings Report</h4>
                      <p className="card-text">Text</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="card border-0"
                  style={{boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'}}>
                    <div className="card-body">
                      <h4 className="card-title">Total Products</h4>
                      <p className="card-text">Text</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="card border-0"
                  style={{boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'}}>
                    <div className="card-body">
                      <h4 className="card-title">Total Customers</h4>
                      <p className="card-text">Text</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="card border-0"
                  style={{boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'}}>
                    <div className="card-body">
                      <h4 className="card-title">Total Sales</h4>
                      <p className="card-text">Text</p>
                    </div>
                  </div>
                </div>
              </div>
              
            </section>
          </div>
          <div className="col-lg-4  -danger">
            <section>
              <div
                className="row justify-content-center align-items-center g-2"
              >
                <div className="col-12">
                  <div className="card border-0"
                  style={{boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'}}>
                    <div className="card-body">
                      <h4 className="card-title">Total Earnings</h4>
                      <p className="card-text">Text</p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card border-0"
                  style={{boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'}}>
                    <div className="card-body">
                      <h4 className="card-title">Total Earnings By Item types</h4>
                      <p className="card-text">Text</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, facilis. Similique labore deleniti voluptates dolorem molestias reprehenderit neque vitae sapiente sint at, tenetur, sed culpa accusantium? Placeat sint nulla soluta.</p>
                    </div>
                  </div>
                </div>
              </div>
              
            </section>
          </div>
        </div>
         
      </div>
       
        
    </div>

  )
}

export default Dashboard