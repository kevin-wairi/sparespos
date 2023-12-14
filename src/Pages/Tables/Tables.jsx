import React,{useState,useEffect} from 'react'
import profile from '../../assets/images/profile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faX,faPenToSquare,faFilePdf,faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import './Tables.css'

function Tables({stock,allUser}) {

  const[business,setBusiness] = useState("")
  const[username,setUsername] = useState("")
  const[fullname,setFullname] = useState("")
  const[phoneNumber,setPhoneNumber] = useState("")
  const[password,setPassword] = useState("")
  const[creditWorthy,setCreditWorthy] = useState(false)
  const[passwordConfirmation,setPasswordConfirmation] = useState("")
  const[error,setError] = useState("")

    const [activeTab, setActiveTab] = useState(0);
    const [editUser, setEditUser] = useState(false);
    const [altUser, setAltUser] = useState('');

    const handleTabClick = (index) => {
      setActiveTab(index);
    };

    function openUserOverlay(e,user){
      e.preventDefault()
      setEditUser((prevEditUser) => !prevEditUser);
      setAltUser(user)
      
    }

    useEffect(() => {
      if (editUser && altUser) {
        setBusiness(altUser.business || "");
        setUsername(altUser.username || "");
        setFullname(altUser.fullname || "");
        setPhoneNumber(altUser.phoneNumber || "");
        setPassword(altUser.password); // You may or may not want to set a default password
        setPasswordConfirmation(altUser.passwordConfirmation); // You may or may not want to set a default password confirmation
      }
    }, [editUser, altUser]);

    const handleUpdateUser = async (e,altUser) => {
      e.preventDefault();
      console.log('loguser',altUser);
      

      if (business === '' || username === '' || fullname === '' || phoneNumber === '') {
          setError('Please fill out all fields');
          
          return;
        } else if (password !== passwordConfirmation) {
          setError('Passwords do not match');
          return;
        }
      setError('');
    
          const response = await fetch(`http://localhost:3000/users/${altUser.id}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  Accepts: 'application/json',
              },
              body: JSON.stringify({
                  business,
                  username,
                  fullname,
                  phoneNumber,
                  password,
                  passwordConfirmation,
                  creditWorthy
              }),
          });
    
          const data = await response.json();
          if (response.ok) {
              console.log('userData signup',data);
              setEditUser(false)
    
          }   
    }
      
    
  return (
    <div>
       <div class="row justify-content-center align-items-center g-2  rounded m-0">
        <div class="col-12">
        <div className="card text-center">
          <div className="card-header px-3">
            <ul className="nav nav-tabs card-header-tabs  ">
              <li className="nav-item table-nav">
                <a
                  className={`nav-link px-1 px-sm-3  ${activeTab === 0 ? 'active' : ''}`}
                  onClick={() => handleTabClick(0)}
                  href="#"
                >
                  Items
                </a>
              </li>
              <li className="nav-item table-nav">
                <a
                  className={`nav-link px-1 px-sm-3  ${activeTab === 1 ? 'active' : ''}`}
                  onClick={() => handleTabClick(1)}
                  href="#"
                >
                  Users
                </a>
              </li>
              <li className="nav-item table-nav">
                <a
                  className={`nav-link px-1 px-sm-3  ${activeTab === 2 ? 'active' : ''}`}
                  onClick={() => handleTabClick(2)}
                  href="#"
                >
                  Invoices
                </a>
              </li>
              <li className="nav-item table-nav">
                <a
                  className={`nav-link px-1 px-sm-3  ${activeTab === 3 ? 'active' : ''}`}
                  onClick={() => handleTabClick(3)}
                  href="#"
                >
                  Customers
                </a>
              </li>
              <li className="nav-item table-nav">
                <a
                  className={`nav-link px-1 px-sm-3  ${activeTab === 4 ? 'active' : ''}`}
                  onClick={() => handleTabClick(4)}
                  href="#"
                >
                  Transactions
                </a>
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
            {`${activeTab === 1 ? 'active' : ''}` &&
              <>
                <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr className='table-header '>
                                <th className='text-uppercase' scope="col">#</th>
                                <th className='text-uppercase' scope="col">image</th>
                                    <th className='text-uppercase' scope="col">Business Name</th>
                                    <th className='text-uppercase' scope="col">Username</th>
                                    <th className='text-uppercase' scope="col">Fullnames</th>
                                    <th className='text-uppercase' scope="col">Phone Number</th>
                                    <th className='text-uppercase' scope="col">Date Registered</th>
                                    <th className='text-uppercase' scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            { allUser.map((user,index)=>(
                                    <tr key={user.id} className="table-content">
                                    <td>{index+1}</td>
                                    <td>
                                        <div className='img rounded' style={{height: '40px',width: '40px'}}>
                                            <img className='image-fluid rounded' style={{width: '100%',height: '100%'}} src={profile} alt="index" />
                                        </div>
                                    </td>
                                    <td className='text-start' scope="row">{user.business}</td>
                                    <td>{user.username}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>Date reg</td>
                                    <td onClick={(e)=>openUserOverlay(e,user)}><FontAwesomeIcon icon={faPenToSquare} style={{color: "#000000",}} /></td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
              </>
            }


       {editUser && (
        <div className='updateUserOverlay'>
        
          <div class="card border-0">
            <div class="card-body">
            <div className="row d-flex justify-content-between">
              <div className="col-6 m-0">
              <p className='fw-bold text-start'>Add Users</p>
              </div>
              <div className="col-2  ">
              <button className='btn py-0 px-2' onClick={(e)=>openUserOverlay(e)}>
              <FontAwesomeIcon icon={faX} style={{color: "#000000",}} />
              </button>
              </div>
            </div>
            <form className="col mx-auto" onSubmit={(e)=>handleUpdateUser(e,altUser)}>
            <div className="align-items-center  my-3">
                <div className="form-outline  mb-0 col">
                    <div className="form__div m-1">
                      <input type="text" className="form-control rounded"  value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <label className="form__label text-start text-capitalize" >Username</label>
                    </div>
                    
                </div>
            </div>
            <div className="align-items-center mb-2">
               
                <div className="form-outline  mb-0 col">
                <div className="form__div m-1">
                  <input type="text" className="form-control rounded"  value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                <label className="form__label text-start text-capitalize" >Phone Number</label>
                </div>

                </div>
            </div>
            <div className="form-outline  mb-0 col text-start pb-2">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id=""/>
                  <label class="form-check-label" for="">
                    credit worthy
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" checked='' value="" id=""/>
                  <label class="form-check-label" for="">
                    Discounted
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id=""/>
                  <label class="form-check-label" for="">
                    Block user
                  </label>
                </div>
                </div>

            <div className="  align-items-center mb-2">
                <div className="form-outline mb-0">
                <div className="form__div m-1">
                  <input type="password" className="form-control rounded"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <label className="form__label text-start text-capitalize" >Password</label>
                </div>
                
                </div>
            </div>

            <div className=" align-items-center mb-2">
                <div className="form-outline  mb-0">
                <div className="form__div m-1">
                  <input type="password" className="form-control rounded"  value={passwordConfirmation} onChange={(e)=>setPasswordConfirmation(e.target.value)}/>
                <label className="form__label text-start text-capitalize" >confirm password</label>
                </div>
                
                </div>
            </div>
            {/* 
            <div className="form-check d-flex justify-content-center mb-5">
                <label className="form-check-label" for="form2Example3">
                I agree all statements in <a href="#!">Terms of service</a>
                </label>
            </div> */}

            {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 pb-md-4 pb-sm-2 ">
                <button type="submit"  className="btn btn-primary ">Update User</button>
            </div>
        </form>
            </div>
          </div>
       </div>
       )}

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