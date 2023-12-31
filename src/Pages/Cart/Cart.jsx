import React, { useRef,useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faMinus,faTrash,faTags} from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip'
import './Cart.css'

      


            
function Cart({cartItems,handleDeleteCart,  user,updateCartQuantity}){


    const navigate = useNavigate()
    let cardRef = useRef()

    const[selectedItem,setSelectedItem]= useState()
    const[productTotal,setProductTotal]= useState(0)


    
    //minus cart quantity
    const minusAmount = (selected) => {
        updateCartQuantity(selected,'minus')
    }
     //minus cart quantity
     const addAmount = (selected) => {
        updateCartQuantity(selected,'add')
    }

    //calculate total of all products
    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            return acc + item.markedPrice * item.cartQuantity;
        }, 0);
        setProductTotal(total);
    }, [cartItems,updateCartQuantity]);


    const handleCartDetails = (item)=>{
        setSelectedItem(item)
        console.log('itemin',item);
    }

    useEffect(()=>{
        let handler = (e)=>{
          if(cardRef.current && !cardRef.current.contains(e.target)){
            handleCartDetails(null)
          }
        }
        document.addEventListener('mousedown',handler)
        return()=>{
            document.removeEventListener('mousedown',handler)
        }
      })

      const handleCheckout = (cartItems)=>{
        navigate('/checkout')
        console.log(cartItems);
      }

      const handleDiscount = (item,user)=>{
        console.log('waiiit');
        if(user.isAdmin = true){
            console.log('YES');
        }else{
            console.log('NO');
        }
      }

     
    return(
           
            <section >
                <div className="container h-100 ">
                    <div className="row d-flex justify-content-start align-items-center h-100">
                    <div className="col-12">

                        {Array.isArray(cartItems) && cartItems.map((item,index)=>( 
                            <div className="card rounded-3 border-0 mb-2 " key={index}>
                                <div className="card-body p-3">
                                    <div className="row d-flex justify-content-around align-items-center ">
                                        <div className="col-md-2  col-4  d-flex justify-content-center rounded px-0">
                                            <div className="bg-white p-2 rounded">
                                            <img
                                            style={{ width: '60px', height: '60px' }} 
                                            src={item.image}
                                            className="img-fluid rounded-3 " alt={item.title}/>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-3 col-7 text-start cart-card">
                                            <p className=" m-0">{item.title}</p>
                                            <p ><div><span className="text-muted">model: </span>{item.carMake}
                                                </div>  
                                                <div>
                                                <span className="text-muted">Model: </span>{item.carModel}</div></p>
                                        </div>
                                        <div className="col-md-2 col-lg-2 col-3 d-flex gap-1 px-1">
                                            <button className="btn btn-link px-2 p-sm-1 border"
                                            onClick={()=>minusAmount(item)}>
                                            <FontAwesomeIcon icon={faMinus} style={{color: "#000000",}} />
                                            </button>
                                            <button className="btn btn-link px-3  border text-black text-decoration-none">{item.cartQuantity}</button>
                                            <button className="btn btn-link px-2  border"
                                            onClick={()=>addAmount(item)}>
                                            <FontAwesomeIcon icon={faPlus} style={{color: "#000000",}} />
                                            </button>
                                        </div>
                                        <div className="col-md-2 col-lg-2  col-5 ">
                                            <h6 className="mb-0">ksh. {Math.trunc((item.markedPrice*item.cartQuantity)*100)/100}</h6>
                                        </div>
                                        <div className="col-md-1 col-lg-1 col-xl-1 col-2 p-0 m-0 rel-discount-card">
                                            <button className="btn anchor-element"  onClick={()=>handleDiscount(item,user)}> <FontAwesomeIcon icon={faTags} /></button>
                                        <Tooltip anchorSelect=".anchor-element" place="top">
                                            Request Discount
                                        </Tooltip>
                                        </div>
                                        
                                        <div className="col-md-1 col-lg-1 col-xl-1 col-2  ">
                                            <button className="btn text-danger" onClick={()=>handleDeleteCart(item.item_id,user.id)}><FontAwesomeIcon icon={faTrash} /> </button>
                                            
                                        </div>
                                    </div>
                                </div>
                        </div>
                        )
                        )}
                        {
                            cartItems.length === 0 && (
                                <div className="card rounded-3 border-0 mb-2" >
                            <div className="card-body ">
                            <h6 className="text-warning">Cart is empty</h6>
                            <button className="btn border border-success" onClick={()=>navigate(-1)}>Back</button>
                            </div>
                            </div>
                            )
                        }
                        
                        <div className="col-md-12 col-sm-4">
                            <div className="card mb-4 ">
                            <div className="card-header py-3">
                                <h5 className="mb-0">Summary</h5>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                <li
                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Products
                                    <span>ksh. {productTotal}</span>
                                </li>
                                <li
                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                    <strong>Total amount</strong>
                                    {/* <strong>
                                        <p className="mb-0">(including VAT)</p>
                                    </strong> */}
                                    </div>
                                    <span><strong>ksh. {productTotal}</strong></span>
                                </li>
                                </ul>
                            </div>
                            </div>
                        </div>


                        <div className="card">
                        <div className="card-body d-flex justify-content-center gap-2">
                            <button type="button" className="btn btn-warning btn-block btn-lg">Invoice</button>
                            <button type="button" className="btn btn-warning btn-block btn-lg" onClick={()=>handleCheckout()}>Proceed to Pay</button>
                        </div>
                        </div>

                    </div>
                    </div>
                </div>
                </section>
    )
}

export default Cart;