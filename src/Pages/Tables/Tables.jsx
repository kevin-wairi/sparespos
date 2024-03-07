import React,{useState,useEffect} from 'react'
import profile from '../../assets/images/profile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faX,faPenToSquare,faFilePdf,faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import './Tables.css'

function Tables({stock,allUsers}) {


    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
      setActiveTab(index);
    };

  return (
    <div className="wrapper" style={{width:'95vw'}}>
       <div class="row m-0">
        <div class="col-12 overflow-y-scroll  px-4 py-3" style={{height:'100vh'}}>
        <div className="card text-center">
          <div className="card-header px-3">
            <ul className="nav nav-tabs card-header-tabs  ">
              <li className="nav-item table-nav">
                <p
                  className={`nav-link px-1 px-sm-3  ${activeTab === 0 ? 'active' : ''}`}
                  onClick={() => handleTabClick(0)}
                  
                >
                  Items
                </p>
              </li>
              <li className="nav-item table-nav">
                <p
                  className={`nav-link px-1 px-sm-3  ${activeTab === 2 ? 'active' : ''}`}
                  onClick={() => handleTabClick(2)}
                  
                >
                  Invoices
                </p>
              </li>
              <li className="nav-item table-nav">
                <p
                  className={`nav-link px-1 px-sm-3  ${activeTab === 3 ? 'active' : ''}`}
                  onClick={() => handleTabClick(3)}
                  
                >
                  Customers
                </p>
              </li>
              <li className="nav-item table-nav">
                <p
                  className={`nav-link px-1 px-sm-3  ${activeTab === 4 ? 'active' : ''}`}
                  onClick={() => handleTabClick(4)}
                  
                >
                  Transactions
                </p>
              </li>
            </ul>
          </div>
          <div className="card-body">
            {`${activeTab === 0 ? 'active' : ''}` &&
              <>
             <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr className='table-header ' >
                            <th className='text-uppercase ' scope="col">#</th>
                            <th className='text-uppercase ' scope="col">image</th>
                            <th className='text-uppercase ' scope="col">Item Name</th>
                            <th className='text-uppercase ' scope="col">status</th>
                            <th className='text-uppercase ' scope="col">Model no.</th>
                            <th className='text-uppercase ' scope="col">Model</th>
                            <th className='text-uppercase ' scope="col">Make</th>
                            <th className='text-uppercase ' scope="col">Year</th>
                        </tr>
                    </thead>
                    <tbody>
                    { stock.map((item,index)=>(
                            <tr key={item.id} className="table-content">
                            <td>{index+1}</td>
                            <td>
                                <div className='img border rounded p-1' style={{height: '50px',width: '50px'}}>
                                    <img className='image-fluid' style={{width: '100%',height: '100%'}} src={item.image} alt="index" />
                                </div>
                            </td>
                            <td className='text-start' scope="row">{item.title}</td>
                            <td>{item.status}</td>
                            <td>number</td>
                            <td>{item.carModel}</td>
                            <td>{item.carMake}</td>
                            <td>{item.year}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
              </>
            }
          </div>
          <div className="card-body user-relative">
                    

            {`${activeTab === 2 ? 'active' : ''}` &&
              <>
              <div className="col-12 invoice-div ">
                <div className="card p-4 rounded  border-0">
                    <div className="card-body d-flex justify-content-start">
                        <h4 className="card-title fs-6">Invoices</h4>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                    
                    </ul>
                </div>
            </div>
              </>
            }
            { `${activeTab === 3 ? 'active' : ''}` &&
              <>
                <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                        <p>Customer Details</p>
                        <p className="card-text "><span><FontAwesomeIcon icon={faCalendarDays} style={{color: "#000000",}} /></span>  23 - 30 March 2020</p>
                        </div>
                    </div>
                </div>
            </div>
              </>
            }
            { `${activeTab === 4 ? 'active' : ''}` &&
              <>
                <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                        <p>Your Transactions</p>
                        <p className="card-text "><span><FontAwesomeIcon icon={faCalendarDays} style={{color: "#000000",}} /></span>  23 - 30 March 2020</p>
                        </div>
                    </div>
                </div>
            </div>
              </>
            }

          </div>
        </div>

        
        </div>
       </div>

       {/* overlay user div */}
       
       
        
    </div>
  )
}

export default Tables