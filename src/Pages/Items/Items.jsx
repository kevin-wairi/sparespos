import React, { useState, useEffect, useRef } from 'react'
import './Items.css'
import { carSparePartsCategories } from '../../Components/ArrayFiles/CarSparePartsCategories'
import { carModelsYears } from '../../Components/ArrayFiles/CarModelsYears'
import { carModels } from '../../Components/ArrayFiles/CarModel'
import { carMakes } from '../../Components/ArrayFiles/CarMakes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faArrowDownAZ, faTrash, faCartShopping, faTags, faThumbsUp, faWarehouse, faUser, faGear, faLinesLeaning } from '@fortawesome/free-solid-svg-icons';
import ItemCard from './ItemCard/ItemCard'
import { Tooltip } from 'react-tooltip'
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router'
import useSound from 'use-sound';
import beep from '../../assets/sounds/beep-29.mp3'
import crash from '../../assets/sounds/button-21.mp3'


function Items({ user, items }) {

  const [cart, setCart] = useState([])
  const [productTotal, setProductTotal] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [cartBalance, setCartBalance] = useState(0)
  const [cash, setCash] = useState(0)
  const [noChange, setNoChange] = useState(false)
  const [showReciept, setShowReciept] = useState(false)
  const [recieptNo, setRecieptNo] = useState()
  const [receiptDate, setRecieptDate] = useState()
  const [cashAlert, setCashAlert] = useState(false)

  const [catFiltered, setCatFiltered] = useState('')
  const [carMakeFiltered, setCarMakeFiltered] = useState('')
  const [carModelFiltered, setCarModelFiltered] = useState('')
  const [yearFiltered, setYearFiltered] = useState('')

  const [playSound] = useSound(beep);
  const [crashSound] = useSound(crash);

  const ref = useRef();
  const navigate = useNavigate()


  // !clears filter fields
  function handleClearFilter(e) {
    e.preventDefault()
    setCatFiltered('')
    setCarMakeFiltered('')
    setCarModelFiltered('')
    setYearFiltered('')
  }

  const filteredItems = items.filter((item) => {
    const spareCategory = item.category.toLowerCase();
    const carMake = item.carMake.toLowerCase();
    const carModel = item.carModel.toLowerCase();

    const isCatFiltered = spareCategory.includes(catFiltered.toLowerCase());
    const isCarMakeMatch = carMake.includes(carMakeFiltered.toLowerCase());
    const isCarModelMatch = carModel.includes(carModelFiltered.toLowerCase());


    return isCatFiltered && isCarMakeMatch && isCarModelMatch;
  });

  //*filters spares based on year
  const filteredSparesByYear = filteredItems.filter((item) => parseInt(item.Year) === parseInt(yearFiltered));
  //*allFilteredSpares
  const allFilteredSpares = yearFiltered ? filteredSparesByYear : filteredItems;


  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    const offset = document.getElementById('scrollableDiv').scrollTop;

    if (offset > 2) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  // !add to cart
  function AddToCart(product) {
    const item = cart.find(i => i.id === product.id)
    if (item === undefined) {
      setCart(prevCart => [...prevCart, { ...product, cart_qty: 1 }]);
      playSound()
    } else {
      if (item.cart_qty < item.qty) {
        const updatedCart = cart.map(item => {
          if (item.id === product.id) {
            return { ...item, cart_qty: item.cart_qty + 1 };
          }
          return item;
        });
        setCart(() => updatedCart);
        playSound()
      }
      // else{
      //   setRestock(true)
      // }

    }
  }

  //!update cart quantity
  const UpdateCartQty = (item_id, qty) => {
    const updatedCart = cart.map(item => {
      console.log('ITEM', item);
      if (item.id === item_id) {

        const afterAdd = item.cart_qty + qty
        if (afterAdd > 0 && afterAdd <= item.qty) {
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


  //!calculate total of all products
  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      return acc + item.markedPrice * item.cart_qty;
    }, 0);
    setProductTotal(total);
  }, [cart]);

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
    setCash(0)
    setCartBalance(0)
    setCashAlert(false)
    crashSound()
  }

  // !calculate change to customer
  useEffect(() => {
    if (cash > productTotal) {
      const balance = cash - productTotal
      setCartBalance(() => balance)
      setNoChange(() => false)
      setCashAlert(false)
    } else if (parseInt(cash) === productTotal) {
      setNoChange(() => true)
      setCashAlert(false)
    } else if (cash < productTotal) {
      setCashAlert(() => true)
      setNoChange(() => false)
    }
  }, [cash, productTotal])

  // !add cash
  const updateCash = (val) => {
    const total = parseInt(cash) + parseInt(val)
    setCash(() => total)
  }

  //!handle checkout
  function handleCartSubmit() {
    if (cash < productTotal) {
      //  *request cash update
      setCashAlert(true)
      return
    } else {
      setCashAlert(false)
    }
    let time = new Date();
    console.log('time', time);
    setShowReciept(true)
    setRecieptNo('BSPOS-' + (Math.round(time / 1000)))
    setRecieptDate(formatDate(time))
  }

  // !change date format
  const formatDate = (date) => {
    const options = {
      weekday: 'short', // abbreviated weekday name (e.g., "Mon")
      day: '2-digit', // day of the month (e.g., "12")
      hour: '2-digit', // hour (e.g., "02")
      minute: '2-digit', // minute (e.g., "00")
      hour12: true // use 12-hour clock (true) or 24-hour clock (false)
    };
    return new Date(date).toLocaleString('en-US', options);
  }

  // !print reciept
  // function printReciept(){
  //   ref.print();
  // }
  const printReciept = useReactToPrint({
    content: () => ref.current,
  });

  return (
  <div className="wrapper" style={{height:'100vh',width:'95vw'}}>

    <div className="d-flex container-fluid justify-content-end p-0 " style={{ height: '100vh', width: '95vw' }}>
      {/* overall div */}
      <div className='d-flex overflow-hidden ' style={{ height: '100vh', width: '95vw', boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px' }}>
        <div className="overflow-y-scroll " style={{ height: '100vh', width: '70%' }} id="scrollableDiv" onScroll={handleScroll} >

          <div className={`${isSticky ? 'sticky-top' : 'bg-white'} rounded-3 mx-3`} style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px' }} >
            <form className=' my-2 py-3 ' >
              <div className="form-row d-flex justify-content-around align-items-center flex-wrap">
                <div className="col-md-2 col-sm-6 col-lg-3">
                  <input type="text" list='data4' className="form-control rounded ps-3 " placeholder="Category " onChange={(e) => setCatFiltered(e.target.value)} value={catFiltered} />
                  <datalist id='data4'>
                    {carSparePartsCategories.map((element) => (
                      <option key={element} value={element}>{element}</option>
                    ))}
                  </datalist>
                </div>
                <div className="col-md-2 col-sm-4 col-lg-2 ">
                  <input type="text" list='data1' className="form-control rounded ps-3 " placeholder="Car make" onChange={(e) => setCarMakeFiltered(e.target.value)} value={carMakeFiltered} />
                  <datalist id='data1'>
                    {carMakes.map((element) => (
                      <option key={element} value={element}>{element}</option>
                    ))}
                  </datalist>
                </div>
                <div className="col-md-2 col-sm-6 col-lg-2 ">
                  <input type="text" list='data2' className="form-control rounded ps-3  " placeholder="Car model" onChange={(e) => setCarModelFiltered(e.target.value)} value={carModelFiltered} />
                  <datalist id='data2'>
                    {carModels[carMakeFiltered] && carModels[carMakeFiltered].map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </datalist>
                </div>
                <div className="col-md-2 col-sm-4 col-lg-2 ">
                  <input type="number" list='data3' className="form-control rounded ps-3 " placeholder="Year" onChange={(e) => setYearFiltered(e.target.value)} value={yearFiltered} />
                  <datalist id='data3'>
                    {carModelsYears[carMakeFiltered] && carModelsYears[carMakeFiltered][carModelFiltered] && carModelsYears[carMakeFiltered][carModelFiltered].map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </datalist>
                </div>
                <div className="col-md-1 col-sm-7 col-11 col-lg-1  navbar-toggle ">
                  <button onClick={(e) => handleClearFilter(e)} className="btn btn-danger h-75" >
                    <FontAwesomeIcon icon={faArrowDownAZ} />
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className={`${isSticky ? 'sticky-bottom' : ''} col-12`}></div>
          <div className="d-flex justify-content-center align-items-start flex-wrap gap-3 ">
            {
              allFilteredSpares.map((item) => (
                <div key={item.id}>
                  <ItemCard AddToCart={AddToCart} item={item} />
                </div>
              ))
            }
          </div>
        </div>

        {/* cart section */}
        <div className="" style={{ width: '30%' }}>
          <div className='card  pe-3 border-0 d-flex  align-items-end justify-content-center' style={{ height: '10%' }}>
            <ul className='d-flex list-unstyled align-items-center justify-content-end gap-3 m-0'>
              <li className="nav-item " onClick={() => navigate('/items')}>
                <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-Dash' icon={faWarehouse} />
              </li>
              <li className="nav-item" onClick={() => navigate('/settings')}>
                <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-Dash' icon={faGear} />
              </li>
              <li className="nav-item" onClick={() => navigate('/tables')}>
                <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-Dash ' icon={faLinesLeaning} />
              </li>
              <li className="nav-item" onClick={() => navigate('/settings')}>
                <FontAwesomeIcon className='sidenav-icon p-2 rounded icon-Dash ' icon={faUser} />
              </li>
            </ul>
          </div>
          <div className='card pt-3 m-2 rounded-4' style={{ height: '90%', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px' }}>
            <div style={{ height: '5%' }}>
              {cart.length !== 0 && <div className="row d-flex justify-content-between align-items-center ps-3 pe-4">
                <div className="col-1" style={{ position: 'relative' }} >
                  <FontAwesomeIcon icon={faCartShopping} />
                  <p style={{ position: 'absolute', top: '-10px', right: '-15px' }}><span  >{cartCount}</span></p></div>
                <div className="col-1"><button className="btn text-danger p-0" onClick={() => handleDeleteCart()}><FontAwesomeIcon icon={faTrash} /> </button></div>
              </div>}
            </div>

            <div className="overflow-y-scroll p-2" style={{ height: '45%' }}>
              {cart && cart.map((item, index) => (
                <div className="card rounded-3 border-0 mb-2 bg-blue-gray-50" key={index}>
                  <div className="card-body py-1 px-0">
                    <div className="row d-flex justify-content-between align-items-center m-0 p-0">
                      <div className="col-2">
                        <div className="bg-white rounded"
                          style={{ width: '50px', height: '50px', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px' }} >
                          <img
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            src={item.image}
                            className="img-fluid rounded p-1"
                            alt={item.title} />
                        </div>
                      </div>
                      <div className="col-4 d-flex flex-column ">
                        <div><p className="m-0 fw-light text-start"><small>{item.carModel}</small></p></div>
                        <div><p className="m-0 fw-light text-start"><small>ksh.{item.markedPrice * item.cart_qty}</small></p></div>
                      </div>
                      <div className="col-4 d-flex  align-items-cente ">
                        <div className=" 1 d-flex gap-1 ">
                          <p className="btn btn-link px-2 py-1 m-0 border"
                            style={{ backgroundColor: '#000' }}
                            onClick={() => UpdateCartQty(item.id, -1)}>
                            <FontAwesomeIcon icon={faMinus} style={{ color: "#ffffff", fontSize: '13px' }} />
                          </p>
                          <p className="btn btn-link border m-0 py-1 px-3 text-black text-decoration-none">{item.cart_qty}</p>
                          <p className="btn btn-link px-2 py-1 m-0  border"
                            style={{ backgroundColor: '#000' }}
                            onClick={() => UpdateCartQty(item.id, 1)}>
                            <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff", fontSize: '13px' }} />
                          </p>
                        </div>
                      </div>
                      <div className="col-2 ">
                        <button className="btn anchor-element p-0" onClick={() => 'handleDiscount'(item)}> <FontAwesomeIcon icon={faTags} /></button>
                        <Tooltip anchorSelect=".anchor-element" place="top">
                          Request Discount
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              )
              )}
              {
                cart.length === 0 && (
                  <div className="card border-0 h-100 d-flex justify-content-center align-items-center" >
                    <div className=" w-50 h-50">
                      <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: '100px', color: '#74C0FC' }} />
                      <p style={{ color: "#74C0FC" }}>Cart is empty</p>
                    </div>
                  </div>
                )
              }
            </div>
            {/* total amount */}
            <div style={{ height: '5%' }}>
              {cart.length !== 0 &&
                <div className="d-flex justify-content-between px-3">
                  <div className="col-4"><p className="m-0 fw-bold text-start">Total</p></div>
                  <div className="col-4"><p className="m-0 fw-bold">ksh. {productTotal}</p></div>
                </div>}
            </div>

            <div style={{ height: '20%' }}>
              {cart.length !== 0 && <div className="row border m-0 mx-1 rounded-4 p-2 ">
                <div className="col-6 p-0 text-start">
                  <p className='fs-5 m-0'>Cash</p>
                </div>
                <div className="col-6  p-0 d-flex align-items-center gap-2">
                  <p className='m-0'>Ksh.</p>
                  <input className='rounded-4 ps-2 text-end' type="number" value={cash} onChange={(e) => setCash(e.target.value)} style={{ width: '100%', border: cashAlert ? '1px solid red' : '1px solid grey', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }} />
                </div>
                <div className="col-4 my-2">
                  <button className='btn border rounded-4 p-1 pe-2 lh-1 w-100 text-end' onClick={() => updateCash(50)}>+50</button>
                </div>
                <div className="col-4 my-2">
                  <button className='btn border rounded-4 p-1 pe-2 lh-1 w-100 text-end' onClick={() => updateCash(100)}>+100</button>
                </div>

                <div className="col-4 my-2">
                  <button className='btn border rounded-4 p-1 pe-2 lh-1 w-100 text-end' onClick={() => updateCash(500)}>+500</button>
                </div>
                <div className="col-4 my-2">
                  <button className='btn border rounded-4 p-1 pe-2 lh-1 w-100 text-end' onClick={() => updateCash(1000)}>+1000</button>
                </div>
                <div className="col-4 my-2">
                  <button className='btn border rounded-4 p-1 pe-2 lh-1 w-100 text-end' onClick={() => updateCash(10000)}>+10,000</button>
                </div>
                <div className="col-4 my-2">
                  <button className='btn border rounded-4 p-1 pe-2 lh-1 w-100 text-end' onClick={() => updateCash(20000)}>+20000</button>
                </div>
              </div>}
            </div>

            {/* cusntomer change */}
            <div className='my-2' style={{ height: '10%' }}>
              {cart.length !== 0 &&
                <div className="row d-flex justify-content-end border mx-1 my-2 rounded-3  ">
                  {noChange === false &&
                    <div className="col-6 d-flex align-items-center justify-content-end m-2 gap-2">
                      <p className="m-0 ">Ksh.</p>
                      <p className="btn m-0 rounded-4 lh-1 text-end" style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset', width: '100%' }}>{cartBalance}</p>
                    </div>
                  }
                  {noChange === true &&
                    <div className='bg-light p-2 rounded-3'>
                      <FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: '25px' }} />
                    </div>
                  }
                </div>}
            </div>
            <div className="d-flex gap-3 justify-content-around">
              <button type="button" className="btn btn-warning ">Invoice</button>
              <button type="button" className="btn btn-warning " onClick={() => handleCartSubmit()}>Submit</button>
            </div>
          </div>

        </div>
        {showReciept &&
          <div className="overlay_reciept" >
            <div className="card p-3 rounded-4" ref={ref} style={{ width: '30vw' }}>
              <div style={{ position: 'fixed', top: '20px', right: '20px' }}><button type="button" onClick={() => setShowReciept(false)} className="btn-close fs-1 text-white" aria-label="Close"></button></div>
              <div className="text-center">
                <p className='fw-bold'>SAMMIS POS</p>
                <p className='fw-light'>Business Name</p>
              </div>
              <div className="d-flex justify-content-between ">
                <div ><p className='mb-1'>No. {recieptNo}</p></div>
                <div ><p className='mb-1'>{receiptDate}</p></div>
              </div>
              <hr />
              <div className="cart_items">
                <div className="row">
                  <div className="col-1">#</div>
                  <div className="col-5">item</div>
                  <div className="col-2">Qty</div>
                  <div className="col-4">Subtotal</div>
                </div>
                <ul className='list-unstyled'>
                  {cart && cart.map((item, index) => {
                    return (
                      <li key={index}>
                        <div className="row d-flex align-items-center">
                          <div className="col-1">
                            {index + 1}
                          </div>
                          <div className="col-5 d-flex flex-column">
                            <div><p className='m-0 lh-1'><small>{item.carMake}</small></p></div>
                            <div><p className='m-0 lh-1'><small>{item.markedPrice}</small></p></div>
                          </div>
                          <div className="col-2">{item.cart_qty}</div>
                          <div className="col-4">{item.cart_qty * item.markedPrice}</div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <hr />
              <div className="row d-flex justify-content-between">
                <div className="col-5 text-start">
                  Total
                </div>
                <div className="col-5">
                  ksh. {productTotal}
                </div>
                <div className="col-5 text-start">
                  Pay Amount
                </div>
                <div className="col-5">
                  ksh. {cash}
                </div>
              </div>
              <hr />
              {noChange === false &&
                <div className="row d-flex justify-content-between">
                  <div className="col-5 text-start">
                    Change
                  </div>
                  <div className="col-5">
                    ksh. {cartBalance}
                  </div>
                </div>}
              <div className="row">
                <div className="col-12">
                  <p>You were served by {user}</p>
                </div>
              </div>

              <div
                className="row justify-content-center align-items-center g-2"
              >
                <div className="col-6">
                  <button className="btn bg-primary w-100" onClick={() => printReciept()}>Submit</button>
                </div>
              </div>

            </div>
          </div>
        }
      </div>
    </div>
        
  </div>
  )
}

export default Items