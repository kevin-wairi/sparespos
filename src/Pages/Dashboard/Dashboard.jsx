import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse, faUser, faLinesLeaning, faGear } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom'
import profileImg from '../../assets/images/profile.jpg'
import back from '../../assets/images/bg.jpg'
import './Dashboard.css'
import Quotes from '../../Components/ArrayFiles/Quotes'
import Navbar from '../../Components/Navbar/Navbar'

function Dashboard({ user }) {

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const navigate = useNavigate()

  // time function
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = currentDateTime.toLocaleDateString(undefined, options);
  const formattedTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  useEffect(() => {
    // Function to switch to the next quote after 10 seconds
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % Quotes.length);
    }, 86400000);

    // Clean up the interval 
    return () => clearInterval(intervalId);
  }, [currentQuoteIndex, Quotes]);


  return (
    <div className="wrapper">
      <div className="container-fluid bg-cyan-500 p-0 d-flex justify-content-end align-items-end" style={{ height: '100vh' }}>

        <div className="row justify-content-center align-items-start bg-white ps-3  m-0   g-2" style={{ height: '98vh', width: '94vw', borderRadius: '30px 0 0 0 ' }}>
          <div className="col-12">
            <Navbar />
          </div>
          <div className="col-lg-8 ">
            <section>
              <div
                className="row justify-content-center align-items-start g-2"
              >
                <div className="col-lg-4 ">
                  <div className="card text-start border-0"
                    style={{ boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
                    <div className="card-body p-0 "
                      style={{ position: 'relative', height: '35vh' }}>
                      <div className="profile_rounded ">
                        <img src={back} alt="info"
                          style={{ height: '18vh', borderRadius: '5px 5px 0 0 ' }} />
                        <img className="card-img-top rounded-circle"
                          style={{ width: '100px', position: 'absolute', left: '25%', top: '25%' }}
                          src={profileImg} alt="Title" />
                      </div>
                      <div className="px-3"
                        style={{ marginTop: '8vh' }}>
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
                        style={{ boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
                        <div className="card-body ">
                          <h4 className="card-text fs-3">{formattedTime}</h4>
                          <p className="card-title">{formattedDate}</p>
                        </div>
                      </div>

                    </div>
                    <div className="col-lg-3 ">
                      <div className="card border-0"
                        style={{ boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
                        <div className="card-body">
                          <p className="card-title">New <br /> Customers</p>
                          <p className="card-text fs-2">5</p>
                        </div>
                      </div>

                    </div>
                    <div className="col-lg-6  text-start">
                      <div className="card border-0"
                        style={{ boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
                        <div className="card-body">
                          <h4 className="card-title">Notifications</h4>
                          <p className="card-text fs-2">0</p>
                        </div>
                      </div>

                    </div>
                    <div className="col-lg-6  text-start">
                      <div className="card border-0"
                        style={{ boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
                        <div className="card-body">
                          <h4 className="card-title">Qoute of the day</h4>
                          <p className='card-title'>{Quotes[currentQuoteIndex].text}</p>
                          <p className='card-title'>- {Quotes[currentQuoteIndex].author}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6  text-start">
                      <div className="card border-0"
                        style={{ boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
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
                    style={{ boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
                    <div className="card-body">
                      <h4 className="card-title">Earnings Report</h4>
                      <p className="card-text">Text</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="card border-0"
                    style={{ boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
                    <div className="card-body">
                      <h4 className="card-title">Total Products</h4>
                      <p className="card-text">Text</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="card border-0"
                    style={{ boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
                    <div className="card-body">
                      <h4 className="card-title">Total Customers</h4>
                      <p className="card-text">Text</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="card border-0"
                    style={{ boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
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
                    style={{ boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
                    <div className="card-body">
                      <h4 className="card-title">Total Earnings</h4>
                      <p className="card-text">Text</p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card border-0"
                    style={{ boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
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