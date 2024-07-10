import React, { useState, useEffect } from 'react'
import profileImg from '../../assets/images/profile.jpg'
import back from '../../assets/images/bg.jpg'
import './Dashboard.css'
import Quotes from '../../Components/ArrayFiles/Quotes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faMoneyBill, faCubesStacked, faArrowUpRightDots, faCubes, faHandshake, faDolly } from '@fortawesome/free-solid-svg-icons';


function Dashboard({ children, user, productTypes, products, newWeekCustomers }) {



  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [newWeekCustomerCount, setnewWeekCustomerCount] = useState()


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

  const zeroQuantityProducts = products.filter(product => parseInt(product.quantity) === 0).length || 0;

  const LowQuantityProducts = products.filter(product => parseInt(product.quantity) <= parseInt(product.restock_level)).length || 0;

  useEffect(() => {
  const count = newWeekCustomers.length || 0
  setnewWeekCustomerCount(count)
  }, [newWeekCustomers])
  

  

  return (
    <div className="wrapper h-100 w-100 overflow-y-scroll">
      <div className="container-fluid   h-100 w-100">
        <div className="row justify-content-center align-items-start bg-white me-0 ms-3 my-3  h-100 w-100" style={{ borderRadius: '30px 0 0 0 ' }}>
          <div className="col-12 p-0 m-0">
            {children}
          </div>
          <div className="col-12">
            <div className="row justify-content-between align-items-center g-2">
              <div className="col-sm-3 col-6">
                <div className="card text-start">
                  <div className="card-body p-2">
                    <h3 className="m-0 card-text"><FontAwesomeIcon icon={faMoneyBill} /></h3>
                    <p className="card-text m-0">Gross Revenue</p>
                    <h5 className="card-text">11,000</h5>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="card text-start">
                  <div className="card-body p-2">
                    <h3 className="m-0 card-text"><FontAwesomeIcon icon={faFileInvoiceDollar} /></h3>
                    <p className="card-text m-0">Require Invoice</p>
                    <h5 className="card-text">11</h5>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="card text-start">
                  <div className="card-body p-2">
                    <h3 className="card-text m-0"><FontAwesomeIcon icon={faHandshake} /></h3>
                    <p className="card-text m-0">Total Sold</p>
                    <h5 className="card-text">11</h5>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="card text-start">
                  <div className="card-body p-2">
                    <h3 className="card-text m-0"><FontAwesomeIcon icon={faHandshake} /></h3>
                    <p className="card-text m-0">New Customers</p>
                  
                      <div >
                        <h5 className="card-text">{newWeekCustomerCount}</h5>
                      </div>
                    

                  </div>
                </div>
              </div>

            </div>

          </div>
          <div className="col-12 ">
            <div className="card text-start ">
              <div className="card-body">
                <div className="row justify-content-around align-items-center g-2">

                  <div className='col-md-3 col-sm-6 col-12'>
                    <div className="d-flex justify-content-start align-items-start gap-2 g-2">
                      <div>
                        <FontAwesomeIcon icon={faCubesStacked} style={{ height: '5vh' }} />
                      </div>
                      <div>
                        <p className="card-text text-muted">Out of stock</p>
                        <p className="card-text">
                          {
                            zeroQuantityProducts
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-3 col-sm-6 col-12 card_before'>
                    <div className="d-flex justify-content-start align-items-start gap-2 g-2">
                      <div>
                        <FontAwesomeIcon icon={faCubes} style={{ height: '5vh' }} />
                      </div>
                      <div>
                        <p className="card-text text-muted">Low in stock</p>
                        <p className="card-text">
                          {
                            LowQuantityProducts
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6 col-12 card_before'>
                    <div className="d-flex justify-content-start align-items-start gap-2 g-2">
                      <div>
                        <FontAwesomeIcon icon={faArrowUpRightDots} style={{ height: '5vh' }} />
                      </div>
                      <div>
                        <p className="card-text text-muted">Highest Selling</p>
                        <p className="card-text">4</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6 col-12 card_before'>
                    <div className="d-flex justify-content-start align-items-start gap-2 g-2">
                      <div>
                        <FontAwesomeIcon icon={faDolly} style={{ height: '5vh' }} />
                      </div>
                      <div>
                        <p className="card-text text-muted">New Products</p>
                        <p className="card-text">4</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          
          <div className="col-md-4 col-12">
            <div className="card text-start">
              <div className="card-body">
                <h5 className="card-text">Recent Invoices</h5>
              </div>
            </div>
          </div>
          <div className="col-md-8 col-12">
            <div className="card text-start">
              <div className="card-body">
                <h5 className="card-text">Analytics</h5>
              </div>
            </div>
          </div>
          <div className="col-md-8 col-12">
            <div className="card text-start">
              <div className="card-body">
                <h5 className="card-text">Most Selling Product</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="card text-start">
              <div className="card-body">
                <h5 className="card-text">Stock History</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="card text-start">
              <div className="card-body">
                <h5 className="card-text">Stock Alert</h5>
                <div className="table-responsive ">
                  <table
                    className="table"
                  >
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productTypes && productTypes.map((type) => {
                        const totalQuantity = type.products?.reduce((acc, product) => acc + product.quantity, 0) || 0;
                        return (
                          <tr >
                            <td >{type.name}</td>
                            <td>{totalQuantity}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
          <div className="col-md-8 col-12">
            <div className="card text-start">
              <div className="card-body">
                <h5 className="card-text">Sales and Purchase</h5>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card text-start">
              <div className="card-body">
                <h5 className="card-text">Total Earnings by Item Types</h5>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-8 red">
            <section>
              <div
                className="row justify-content-center align-items-start g-2"
              >
                <div className="col-lg-4 red">
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
          </div> */}
          {/* <div className="col-lg-4  -danger">
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
          </div> */}
        </div>

      </div>


    </div>

  )
}

export default Dashboard