
import React, { useState, useEffect, useRef } from 'react'
import './Items.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash, faCartShopping, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';
import useSound from 'use-sound';
import beep from '../../assets/sounds/beep-29.mp3'
import crash from '../../assets/sounds/button-21.mp3'
import { ChevronRight } from 'react-feather';
import { NavLink } from 'react-router-dom';

function Items({ productTypes, productTotal, cart, setCart, filteredProducts, handleFilterByType, handleClearFilter }) {

  const [cartCount, setCartCount] = useState(0)
  const [playSound] = useSound(beep);
  const [crashSound] = useSound(crash);


  const listRef = useRef(null)



  // const [isSticky, setSticky] = useState(false);

  // const handleScroll = () => {
  //   const offset = document.getElementById('scrollableDiv').scrollTop;
  //   if (offset > 2) {
  //     setSticky(true);
  //   } else {
  //     setSticky(false);
  //   }
  // };

  // !add to cart
  function AddToCart(product) {
    const item = cart.find(i => i.id === product.id)
    const item_quantity = product.inventory.quantity
    if(item_quantity === 0) return
    if (!item) {
      setCart(prevCart => [...prevCart, { ...product, cart_qty: 1 }]);
      playSound()
    } else {
      if (item.cart_qty < item.inventory.quantity) {
        const updatedCart = cart.map(i => {
          if (i.id === item.id) {
            return { ...i, cart_qty: i.cart_qty + 1 };
          }
          return i;
        });
        setCart(() => updatedCart);
        playSound()
      }
    }
  }

  //!update cart quantity
  const UpdateCartQty = (item_id, qty) => {
    const updatedCart = cart.map(item => {
      if (item.id === item_id) {

        const afterAdd = item.cart_qty + qty
        if (afterAdd > 0 && afterAdd <= item.inventory.quantity) {
          // *update item quantity
          playSound()
          return { ...item, cart_qty: afterAdd }
        } else if (afterAdd === 0) {
          //*remove item if qty is 0
          crashSound()
          return null
        }
      }
      return item
    }).filter(item => item !== null);
    setCart(() => updatedCart);
  }


  // !items count
  useEffect(() => {
    const totalcount = cart.reduce((acc, item) => {
      return acc + parseInt(item.cart_qty)
    }, 0);
    setCartCount(totalcount)
  }, [cart]);

  // !handles discount
  // const handleDiscount = (item,user)=>{
  //   console.log('waiiit');
  //   if(user.isAdmin = true){
  //       console.log('YES');
  //   }else{
  //       console.log('NO');
  //   }
  // }

  // !clear cart
  const handleDeleteCart = () => {
    setCart([])
    crashSound()
  }

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="wrapper h-100 w-100 m-0 p-0">
      <div className="row container-fluid justify-content-end h-100 w-100 p-0 m-0 " >
        {/* overall div */}
        {/* <div className="overflow-y-scroll h-100  col-8" id="scrollableDiv" onScroll={handleScroll}> */}
        <div className="overflow-y-scroll h-100  col-8" id="scrollableDiv">

          <div className="d-flex justify-content-center align-items-center g-2 gap-2 ">
            <div>
              <FontAwesomeIcon icon={faArrowDownWideShort} />
            </div>
            <div>
              <button onClick={(e) => handleClearFilter(e)} className="btn btn-warning" >
                ALL
              </button>
            </div>
            <div className='w-100 overflow-x-scroll hide_scrollbar my-2' ref={listRef}>
              <div className='d-flex gap-2' >
                {
                  productTypes.map(type => {
                    return <button className=' m-0 btn bg-white nowrap '
                      onClick={(e) => handleFilterByType(e.target.value)}
                      value={type.id}
                    >{type.name}</button>
                  })
                }
              </div>
            </div>
            <div>
              <button onClick={() => scrollRight()} className="btn px-0 btn_no_border" >
                <ChevronRight />
              </button>
            </div>

          </div>
          {/* 
          <div className={`${isSticky ? 'sticky-top' : 'bg-white'} rounded-3 mx-3 `}>
            <form className=' my-2 py-3 ' >
              <div className="form-row d-flex justify-content-around align-items-center flex-wrap">
                <div className="col-md-2 col-sm-6 col-lg-3">
                  <select
                    className="form-select"
                    onChange={(e) => setTypeFilter(e.target.value)}
                    value={typeFilter}>
                    <option value="" disabled selected>Select one</option>
                    {productTypes && productTypes.map((type) => {
                      return (
                        <option value={type.id}>{type.name}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="col-md-2 col-sm-6 col-lg-3">
                  <input className='form-control form-control-sm rounded' placeholder='Search menu here' type="text" onChange={(e) => HandleFilterByTitle(e.target.value)} />
                </div>

                <div className="col-md-1 col-sm-7 col-11 col-lg-1  navbar-toggle ">
                  <button onClick={(e) => handleClearFilter(e)} className="btn btn-danger h-75" >
                    <FontAwesomeIcon icon={faArrowDownAZ} />
                  </button>
                </div>
              </div>
            </form>
          </div> */}

          {/* <div className={`${isSticky ? 'sticky-bottom' : ''} col-12`}></div> */}

          <div className="d-flex justify-content-center align-items-start flex-wrap gap-3 ">
            {
              filteredProducts && filteredProducts.map((item) => (
                <div key={item.id}>
                  <div className="card mb-2 border-0" onClick={() => AddToCart(item)} style={{ width: '9rem', height: '13rem' }}>
                    <div className="card-body p-0">
                      <div className="d-flex justify-content-center align-items-center g-2">
                        <div className="p-1" style={{ width: '8rem', height: '8rem', objectFit: 'contain' }}>
                          <img className="img-fluid h-100 w-100 rounded" src={item.image} alt={item.id} />
                        </div>
                      </div>

                      <div className=" d-flex flex-column justify-content-around align-items-start g-2 ps-1" style={{ width: '8rem', height: '5rem' }}>
                        <div><p className="m-0">{item.title}</p></div>
                        <div><p className="m-0"><span className='fw-bold'>sh.{item.inventory.selling_price}</span></p></div>
                      </div>

                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* cart section */}
        <div className='col-4 h-100' >
          <div className='card py-3 m-2 rounded-4 border-0 h-100'>
            <div className="d-flex flex-column justify-content-between align-items-center g-2 h-100">
              {cart.length !== 0 &&
                <>
                  <div className='w-100' style={{ height: '85%', maxHeight: '85%' }}>
                    <div className="row d-flex justify-content-between align-items-center ps-3 pe-4 w-100 " style={{ height: '10%' }}>
                      <div className="col-1" style={{ position: 'relative' }} >
                        <FontAwesomeIcon icon={faCartShopping} />
                        <p style={{ position: 'absolute', top: '-10px', right: '-15px' }}><span  >{cartCount}</span></p></div>
                      <div className="col-1"><button className="btn text-danger p-0" onClick={() => handleDeleteCart()}><FontAwesomeIcon icon={faTrash} /> </button></div>
                    </div>
                    <div className="overflow-y-scroll p-2" style={{ maxHeight: '90%' }}>
                      {cart && cart.map((item, index) => (
                        <div className="card rounded-3 border-0 mb-2 bg-blue-gray-50" key={index}>
                          <div className="card-body py-1 px-0">
                            <div className="row d-flex justify-content-between align-items-center m-0 p-0">
                              <div className="col-2">
                                <div className="bg-white rounded"
                                  style={{ width: '50px', height: '50px', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px' }} >
                                  <img
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    src={item.image}
                                    className="img-fluid rounded p-1"
                                    alt={item.title} />
                                </div>
                              </div>
                              <div className="col-4 d-flex flex-column ">
                                <div><p className="m-0 fw-light text-start"><small>{item.title}</small></p></div>
                                <div><p className="m-0 fw-light text-start"><small>ksh.{item.inventory.selling_price}</small></p></div>
                              </div>
                              <div className="col-4 d-flex  align-items-cente">
                                <div className=" 1 d-flex gap-1 ">
                                  <button className="btn btn-link px-1"
                                    onClick={() => UpdateCartQty(item.id, -1)}>
                                    <FontAwesomeIcon icon={faMinus} style={{ color: "#000", fontSize: '13px' }} />
                                  </button>
                                  <button className="btn btn-link border text-black text-decoration-none">{item.cart_qty}</button>
                                  <p className="btn btn-link m-0 px-1"
                                    onClick={() => UpdateCartQty(item.id, 1)}>
                                    <FontAwesomeIcon icon={faPlus} style={{ color: "#000", fontSize: '12px' }} />
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                      )}

                    </div>
                  </div>
                  {/* total amount */}
                  <div className='w-100 px-3 ' style={{ height: '15%' }}>
                    <div className='w-100 mb-3'>
                      <div className="d-flex justify-content-between ">
                        <div className="col-4"><p className="m-0 fw-bold text-start">Total</p></div>
                        <div className="col-4"><p className="m-0 fw-bold">ksh. {productTotal}</p></div>
                      </div>
                    </div>
                    <NavLink to='/order' className='nav-link'>
                      <div className="d-flex w-100">
                        <button type="button" className="btn btn-warning flex-fill ">Proceed</button>
                      </div>
                    </NavLink>
                  </div>
                </>
              }
              {cart.length === 0 &&
                <div className="card border-0 h-100 d-flex justify-content-center align-items-center w-100" >

                  <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: '100px', color: '#74C0FC' }} />
                  <p style={{ color: "#74C0FC" }}>Cart is empty</p>
                </div>
              }


            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Items