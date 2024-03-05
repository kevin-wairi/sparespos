// import React, { useRef,useState ,useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus,faMinus,faTrash,faTags} from '@fortawesome/free-solid-svg-icons';
// import './Cart.css'

      


            
// function Cart(){


//     const navigate = useNavigate()
//     let cardRef = useRef()

//     const[selectedItem,setSelectedItem]= useState()
//     const[productTotal,setProductTotal]= useState(0)


    
//     //minus cart quantity
//     const minusAmount = (selected) => {
//         updateCartQuantity(selected,'minus')
//     }
//      //minus cart quantity
//      const addAmount = (selected) => {
//         updateCartQuantity(selected,'add')
//     }

//     //calculate total of all products
//     useEffect(() => {
//         const total = cartItems.reduce((acc, item) => {
//             return acc + item.markedPrice * item.cartQuantity;
//         }, 0);
//         setProductTotal(total);
//     }, [cartItems,updateCartQuantity]);


//     const handleCartDetails = (item)=>{
//         setSelectedItem(item)
//         console.log('itemin',item);
//     }

//     useEffect(()=>{
//         let handler = (e)=>{
//           if(cardRef.current && !cardRef.current.contains(e.target)){
//             handleCartDetails(null)
//           }
//         }
//         document.addEventListener('mousedown',handler)
//         return()=>{
//             document.removeEventListener('mousedown',handler)
//         }
//       })

//       const handleCheckout = (cartItems)=>{
//         navigate('/checkout')
//         console.log(cartItems);
//       }

   

     
//     return(
           
//             <section >
//                 <div className="container-fluid">
//                     <div className="row d-flex justify-content-start align-items-center" >
//                      <div className="card bg-light">
// <div className="card bg-light">

//                         <div className="overflow-y-scroll"  style={{height:'50vh'}}>
//                             {Array.isArray(cartItems) && cartItems.map((item,index)=>( 
//                                 <div className="card rounded-3 border-0 mb-2 " key={index}>
//                                     <div className="card-body p-1">
//                                         <div className="row d-flex justify-content-around align-items-start ">
//                                             <div className="col-2">
//                                             <div className=" rounded"
//                                             style={{ width: '50px', height: '50px' }} >
//                                                 <img
//                                                 style={{ width: '100%', height: '100%',objectFit:'contain' }} 
//                                                 src={item.image}
//                                                 className="img-fluid rounded-3 border"
//                                                 alt={item.title}/>
//                                             </div>
//                                         </div>
//                                         <div className="col-10 d-flex flex-column align-items-center">
//                                             <div className=" text-start cart-card overflow-hidden">
//                                                 <p className=" m-0">{item.title}</p>
//                                             </div>
//                                             <div className=" 1 d-flex gap-1">
//                                                 <p className="btn btn-link px-2 py-1 m-0 border"
//                                                 onClick={()=>minusAmount(item)}>
//                                                 <FontAwesomeIcon icon={faMinus} style={{color: "#000000",fontSize:'13px'}} />
//                                                 </p>
//                                                 <p className="btn btn-link border m-0 py-1 px-3 text-black text-decoration-none">{item.cartQuantity}</p>
//                                                 <p className="btn btn-link px-2 py-1 m-0  border"
//                                                 onClick={()=>addAmount(item)}>
//                                                 <FontAwesomeIcon icon={faPlus} style={{color: "#000000",fontSize:'13px'}} />
//                                                 </p>
//                                             </div>
//                                         </div>
//                                             {/* <div className="col-md-1 col-lg-1 col-xl-1 col-2 p-0 m-0 rel-discount-card">
//                                                 <button className="btn anchor-element"  onClick={()=>handleDiscount(item,user)}> <FontAwesomeIcon icon={faTags} /></button>
//                                             <Tooltip anchorSelect=".anchor-element" place="top">
//                                                 Request Discount
//                                             </Tooltip>
//                                          </div> */}
                                        
                                        
//                                         {/* <div className="col-md-1 col-lg-1 col-xl-1 col-2  ">
//                                             <button className="btn text-danger" onClick={()=>handleDeleteCart(item.item_id,user.id)}><FontAwesomeIcon icon={faTrash} /> </button>
                                            
//                                         </div> */}
//                                     </div>
//                                 </div>
//                         </div>
//                         )
//                         )}

//                         </div>
//                         {
//                             cartItems.length === 0 && (
//                                 <div className="card rounded-3 border-0 mb-2" >
//                             <div className="card-body ">
//                             <h6 className="text-warning">Cart is empty</h6>
//                             <button className="btn border border-success" onClick={()=>navigate(-1)}>Back</button>
//                             </div>
//                             </div>
//                             )
//                         }
                        
//                         <ul className="list-group list-group-flush">
//                                 <li
//                                     className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
//                                     Products
//                                     <span>ksh. {productTotal}</span>
//                                 </li>
//                                 <li
//                                     className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
//                                     <div>
//                                     <strong>Total amount</strong>
//                                     {/* <strong>
//                                         <p className="mb-0">(including VAT)</p>
//                                     </strong> */}
//                                     </div>
//                                     <span><strong>ksh. {productTotal}</strong></span>
//                                 </li>
//                                 </ul>

//                         <div className="d-flex gap-3 justify-content-center">
//                             <button type="button" className="btn btn-warning btn-block btn-lg">Invoice</button>
//                             <button type="button" className="btn btn-warning btn-block btn-lg" onClick={()=>handleCheckout()}>Proceed</button>
//                         </div>

//                     </div>
//                         <div className="overflow-y-scroll"  style={{height:'50vh'}}>
//                             {Array.isArray(cartItems) && cartItems.map((item,index)=>( 
//                                 <div className="card rounded-3 border-0 mb-2 " key={index}>
//                                     <div className="card-body p-1">
//                                         <div className="row d-flex justify-content-around align-items-start ">
//                                             <div className="col-2">
//                                             <div className=" rounded"
//                                             style={{ width: '50px', height: '50px' }} >
//                                                 <img
//                                                 style={{ width: '100%', height: '100%',objectFit:'contain' }} 
//                                                 src={item.image}
//                                                 className="img-fluid rounded-3 border"
//                                                 alt={item.title}/>
//                                             </div>
//                                         </div>
//                                         <div className="col-10 d-flex flex-column align-items-center">
//                                             <div className=" text-start cart-card overflow-hidden">
//                                                 <p className=" m-0">{item.title}</p>
//                                             </div>
//                                             <div className=" 1 d-flex gap-1">
//                                                 <p className="btn btn-link px-2 py-1 m-0 border"
//                                                 onClick={()=>minusAmount(item)}>
//                                                 <FontAwesomeIcon icon={faMinus} style={{color: "#000000",fontSize:'13px'}} />
//                                                 </p>
//                                                 <p className="btn btn-link border m-0 py-1 px-3 text-black text-decoration-none">{item.cartQuantity}</p>
//                                                 <p className="btn btn-link px-2 py-1 m-0  border"
//                                                 onClick={()=>addAmount(item)}>
//                                                 <FontAwesomeIcon icon={faPlus} style={{color: "#000000",fontSize:'13px'}} />
//                                                 </p>
//                                             </div>
//                                         </div>
//                                             {/* <div className="col-md-1 col-lg-1 col-xl-1 col-2 p-0 m-0 rel-discount-card">
//                                                 <button className="btn anchor-element"  onClick={()=>handleDiscount(item,user)}> <FontAwesomeIcon icon={faTags} /></button>
//                                             <Tooltip anchorSelect=".anchor-element" place="top">
//                                                 Request Discount
//                                             </Tooltip>
//                                          </div> */}
                                        
                                        
//                                         {/* <div className="col-md-1 col-lg-1 col-xl-1 col-2  ">
//                                             <button className="btn text-danger" onClick={()=>handleDeleteCart(item.item_id,user.id)}><FontAwesomeIcon icon={faTrash} /> </button>
                                            
//                                         </div> */}
//                                     </div>
//                                 </div>
//                         </div>
//                         )
//                         )}

//                         </div>
//                         {
//                             cartItems.length === 0 && (
//                                 <div className="card rounded-3 border-0 mb-2" >
//                             <div className="card-body ">
//                             <h6 className="text-warning">Cart is empty</h6>
//                             <button className="btn border border-success" onClick={()=>navigate(-1)}>Back</button>
//                             </div>
//                             </div>
//                             )
//                         }
                        
//                         <ul className="list-group list-group-flush">
//                                 <li
//                                     className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
//                                     Products
//                                     <span>ksh. {productTotal}</span>
//                                 </li>
//                                 <li
//                                     className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
//                                     <div>
//                                     <strong>Total amount</strong>
//                                     {/* <strong>
//                                         <p className="mb-0">(including VAT)</p>
//                                     </strong> */}
//                                     </div>
//                                     <span><strong>ksh. {productTotal}</strong></span>
//                                 </li>
//                                 </ul>

//                         <div className="d-flex gap-3 justify-content-center">
//                             <button type="button" className="btn btn-warning btn-block btn-lg">Invoice</button>
//                             <button type="button" className="btn btn-warning btn-block btn-lg" onClick={()=>handleCheckout()}>Proceed</button>
//                         </div>

//                     </div>
//                     </div>
//                 </div>
//                 </section>
//     )
// }

// export default Cart;