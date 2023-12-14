import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2';
import './Checkout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

function Checkout({cartItems}) {

    const[business,setBusiness] = useState("")
    const[username,setUsername] = useState("")
    const[phoneNumber,setPhoneNumber] = useState("")
    const[error,setError] = useState('')

    const [activeCheckTab, setActiveCheckTab] = useState(0);

    const[productTotal,setProductTotal]= useState(0)

    const handleCHeckTabClick = (index) => {
        setActiveCheckTab(index);
      };

    const handleSignupForm = async (e) => {
        e.preventDefault();
        if (business === '' || username === ''  || phoneNumber === '' ) {
            setError('Please fill out all fields');
            
            return;
          }
        setError('');
      
          const resp = await fetch('http://localhost:3000/users');
          const registeredUsers = await resp.json();
      
          if (resp.ok) {
            // Check if the username already exists
            const existingUser = registeredUsers.find(user => user.username === username);
      
            if (existingUser) {
              setError('Username already exists');
              return;
            }
          }
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accepts: 'application/json',
                },
                body: JSON.stringify({
                    business,
                    username,
                    phoneNumber,
                    creditWorthy:'false',
                    discounted: 'false'
                }),
            });
      
            const data = await response.json();
            if (response.ok) {
                console.log('userData signup',data.username);
                setBusiness("")
                setUsername("")
                setPhoneNumber("")
                Swal.fire('Success!', 'User has been registered.', 'success');
      
            }   
      }

      //calculate total of all products
    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            return acc + item.markedPrice * item.cartQuantity;
        }, 0);
        setProductTotal(total);
    }, [cartItems]);

  return (
    <div className='wrapper '>
        
        <div className=" row px-2 m-0">
            <div
                className="row justify-content-center align-items-start g-2"
            >
                <div className="col-12 col-md-6 col-lg-6 ">
                    <div className="card border-0 mb-2">
                    <div className="card-body">
                    <p className='fw-bold text-start'>Billing Customer Details</p>
                        <form className="col-11 mx-auto" onSubmit={(e)=>handleSignupForm(e)}>
                            <div className="form-outline  mb-0 col">
                                    <div className="form__div m-1">
                                    <input type="text" className="form-control rounded"  value={business} onChange={(e)=>setBusiness(e.target.value)}/>
                                    <label className="form__label text-start text-capitalize" >Business Name</label>
                                    </div>
                                    
                                </div>
                            <div className="align-items-center  mb-2">
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
                        

                        

                            {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
                            {/* <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 pb-md-4 pb-sm-2 ">
                                <button type="submit"  className="btn btn-primary ">Add Customer</button>
                            </div> */}
                        </form>
                    
                        </div>
                  </div>

                    <div className="card border-0">
                    <div className="card-body">
                    <p className='fw-bold text-start'>Payment Method</p>
                       <div
                        className="row justify-content-center align-items-center g-2"
                       >
                        <div className={`col-6 border border-black rounded rounded-end-0 btn   ${activeCheckTab === 0 ? 'active' : ''}`}  onClick={() => handleCHeckTabClick(0)}><p className='m-1'>Credit card</p></div>
                        <div className={`col-6 border border-black border-start-0 rounded rounded-start-0 btn  ${activeCheckTab === 1 ? 'active' : ''}`} onClick={() => handleCHeckTabClick(1)}><p  className='m-1'>Mobile</p></div>
                       </div>
                       <div className="payment-details py-4" style={{minHeight: '47vh'}}>
                       {`${activeCheckTab === 0 ? 'active' : ''}` &&
                        <>
                            <form action="" className="form px-3 ">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form__div">
                                            <input type="text" className="form-control rounded" />
                                            <label for="" className="form__label text-start text-capitalize">Card Number</label>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="form__div">
                                            <input type="text" className="form-control rounded" />
                                            <label for="" className="form__label text-start text-capitalize">MM / yy</label>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="form__div">
                                            <input type="password" className="form-control rounded" />
                                            <label for="" className="form__label text-start text-capitalize">cvv code</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form__div">
                                            <input type="text" className="form-control rounded" />
                                            <label for="" className="form__label text-start text-capitalize">name on the card</label>
                                        </div>
                                    </div>
                                    {/* <div className="col-12">
                                        <div className="btn btn-primary w-100">Sumbit</div>
                                    </div> */}
                                </div>
                            </form>
                        </>
                       }
                       {`${activeCheckTab === 1 ? 'active' : ''}` &&
                        <>
                            <div className="row">
                            <div className="col-12">
                            <form action="" className="form px-3 ">
                                <div className="row">
                                    <label className='text-start my-2' htmlFor="#">MPESA</label>
                                    <div className="col-12">
                                        <div className="form__div">
                                            <input type="number" className="form-control rounded" />
                                            <label for="number" className="form__label text-start text-capitalize">Phone Number</label>
                                        </div>
                                    </div>

                                
                                    {/* <div className="col-12">
                                        <div className="btn btn-primary w-100">Sumbit</div>
                                    </div> */}
                                </div>
                            </form>
                                {/* <p className="mb-0"><span className="fw-bold">Paybill:</span><span className="c-green">: 1234567890</span></p>
                                <p className="mb-0"><span className="fw-bold">Account No:</span><span className="c-green">: 1234567890</span></p>
                                <p className="mb-0"><span className="fw-bold">Price:</span><span
                                        className="c-green">:$452.90</span></p> */}
                            </div>
                        </div>
                        </>
                       }
                       </div>
                    
                        </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                          <div className="card mb-2 border-0">
                                <div className="card-body">
                                <p className='fw-bold text-start'>Order Summary</p>
                                    <ul className="list-group list-group-flush list-unstyled">
                                        {cartItems.map((item)=>(
                                            <li>
                                                <div className="card m-0  rounded-0 border border-start-0  border-end-0">
                                                    <div className="card-body p-0 d-flex justify-content-between">
                                                    <div className='img  rounded p-1 col-4' style={{height: '50px',width: '50px'}}>
                                                        <img className='image-fluid' style={{width: '100%',height: '100%'}} src={item.image} alt="index" />
                                                    </div>
                                                      <div className='col-4 align-self-center justify-content-center  d-flex gap-2'> <p className='m-0'>X</p> <p className='m-0'>{item.cartQuantity}</p></div>
                                                      <div className='col-3 align-self-center text-end '> <p className='m-0'>sh.{item.markedPrice}</p></div>
                                                    </div>
                                                    
                                                    
                                                </div>
                                                
                                            </li>
                                        ))}
                                        <div className="card-footer px-1">
                                            <div
                                                className="row justify-content-between align-items-center g-2"
                                            >
                                                <div className="col-6 text-start">Total</div>
                                                <div className="col-6 text-end"><p className='m-0'><span><strong>ksh. {productTotal}</strong></span></p></div>
                                            </div>
                                            
                                        </div>
                                        
                                    </ul>
                                    
                                </div>
                                
                            </div>
                            <button className="btn btn-success col-12">Confirm Order</button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Checkout