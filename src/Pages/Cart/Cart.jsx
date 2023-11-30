import React, { useRef,useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faMinus,faFilePdf} from '@fortawesome/free-solid-svg-icons';
import './Cart.css'


function Cart({cartItems,setCartItems,handleAddToCart,cartCount}){
    const navigate = useNavigate()
    let cardRef = useRef()

    const[selectedItem,setSelectedItem]= useState()
    const[productTotal,setProductTotal]= useState(0)

    //add cart quantity
    const addAmount = (selected) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === selected.id) {
                return { ...item, cartQuantity: item.cartQuantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
    }
    
    //minus cart quantity
    const minusAmount = (selected) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === selected.id && item.cartQuantity > 1) {
                return { ...item, cartQuantity: item.cartQuantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
    }

    //calculate total of all products
    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            return acc + item.markedPrice * item.cartQuantity;
        }, 0);
        setProductTotal(total);
    }, [cartItems]);

    const handleCartDetails = (item)=>{
        setSelectedItem(item)
        console.log('itemin',item);
    }


    function handleClose(){
        handleCartDetails(null)
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

      const handleCheckout = ()=>{
        navigate('/checkout')
      }

      function HandleDeleteCartItem(item_id){
        handleAddToCart(item_id)
      }
    return(
        <div className="container ">
           
            <section className="h-100 rounded bg-white" >
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-10">

                        <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-normal mb-0 text-black">Shopping Cart</h5>
                        <div>
                            <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!" className="text-body">price <i
                                className="fas fa-angle-down mt-1"></i></a></p>
                        </div>
                        </div>
                        {Array.isArray(cartItems) && cartItems.map((item,index)=>( 
                            <div className="card rounded-3 border-0 mb-2 bg-light" key={index}>
                                <div className="card-body ">
                                    <div className="row d-flex justify-content-around align-items-center ">
                                    <div className="col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center bg-white rounded p-1">
                                        <img
                                        style={{ width: '80px', height: '80px' }} 
                                        src={item.image}
                                        className="img-fluid rounded-3" alt={item.title}/>
                                    </div>
                                    <div className="col-md-4 col-lg-3 cart-card">
                                        <p className=" fw-light mb-1">{item.title}</p>
                                        <p ><div><span className="text-muted">model: </span>{item.carMake}
                                            </div>  
                                            <div>
                                            <span className="text-muted">Model: </span>{item.carModel}</div></p>
                                    </div>
                                    <div className="col-md-2 col-lg-2 col-xl-2 d-flex gap-1">
                                        <button className="btn btn-link px-2 border"
                                        onClick={()=>minusAmount(item)}>
                                        <FontAwesomeIcon icon={faMinus} style={{color: "#000000",}} />
                                        </button>

                                        <input id="form1" min="0" name="quantity" value={item.cartQuantity} type="number"
                                        className="form-control text-center" />

                                        <button className="btn btn-link px-2 border"
                                        onClick={()=>addAmount(item)}>
                                        <FontAwesomeIcon icon={faPlus} style={{color: "#000000",}} />
                                        </button>
                                    </div>
                                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                        <h6 className="mb-0 ">ksh. {Math.trunc((item.markedPrice*item.cartQuantity)*100)/100}</h6>
                                    </div>
                                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                        <a onClick={()=>HandleDeleteCartItem(item.id)} href="#!" className="text-danger"><i className="fas fa-trash fa-lg"></i></a>
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
                            <button className="btn border border-success">Back</button>
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
                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Shipping
                                    <span>Gratis</span>
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

                                <div className="d-flex gap-2">
                                    <button type="button" className="btn border-primary btn-lg btn-block">
                                    Checkout
                                    </button>
                                    <button type="button" className="btn border-primary btn-lg btn-block">
                                    <span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span> Invoice
                                    </button>
                                </div>
                            </div>
                            </div>
                        </div>


                        <div className="card mb-4">
                        <div className="card-body p-4 d-flex flex-row">
                            <div className="form-outline flex-fill">
                            <input type="text" id="form1" className="form-control form-control-lg" />
                            <label className="form-label" for="form1">Discound code</label>
                            </div>
                            <button type="button" className="btn btn-outline-warning btn-lg ms-3">Apply</button>
                        </div>
                        </div>

                        <div className="card">
                        <div className="card-body">
                            <button type="button" className="btn btn-warning btn-block btn-lg">Proceed to Pay</button>
                        </div>
                        </div>

                    </div>
                    </div>
                </div>
                </section>
        </div>
    )
}

export default Cart;