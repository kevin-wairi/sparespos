import React, { useRef, useState, useEffect, useContext } from 'react'
import { useReactToPrint } from 'react-to-print';
import { ChevronLeft, Delete, X } from 'react-feather';
import { NavLink, useNavigate } from 'react-router-dom';
import profile from '.././../assets/images/profile.jpg'
import { UrlContext } from '../../Context/UrlProvider';

function Order({products, setProducts, cart, setCart, currentUser, productTotal }) {

    const apiUrl = useContext(UrlContext)
    const navigate = useNavigate()

    const [showReciept, setShowReciept] = useState(false)
    const [recieptNo, setRecieptNo] = useState()
    const [receiptDate, setRecieptDate] = useState()
    const [cash, setcash] = useState('')
    const [cashBalance, setcashBalance] = useState(0)
    const [checkoutItems, setCheckoutItems] = useState([]);

    // !Update checkoutItems whenever cart change
    useEffect(() => {
        const items = cart.map(item => ({ id: item.id, title: item.title, inv_id: item.inventory.id, quantity: item.cart_qty }));
        setCheckoutItems(items);
    }, [cart]);


    const ref = useRef()
    const autoScroll = useRef(null);
    useEffect(() => {
        if (cart.length) {
            autoScroll.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [cart.length]);


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
    const printReciept = useReactToPrint({
        content: () => ref.current,
    });

    // !customer cash
    const handleCash = (value) => {
        if (value === '.' && cash.includes('.')) {
            return
        }
        const added = cash + value
        setcash(added)
    }

    // !calculate change to customer
    useEffect(() => {
        if (cash > productTotal) {
            const change = parseInt(cash) - parseInt(productTotal)
            setcashBalance(change)
        }
    }, [cash, productTotal])

    function generateReceiptNumber() {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const random = Math.round(date.getTime() / 1000)

        return `POS${year}${month}${day}- ${random}`;
    }

// !update current state
    const updateItemState = (updated_products) =>{
     
    }

    //!handle checkout
    const handleCheckout = async (e) => {
        e.preventDefault()
        let time = new Date();
        const token = sessionStorage.getItem("jwt");
        try {
            const response = await fetch(apiUrl + '/checkouts', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ items: checkoutItems })
            })
            if (response.status === 200) {
                const updated_products = response.json()
                updateItemState(updated_products)
                alert('Checkout successful!');
                setRecieptNo(generateReceiptNumber())
                setRecieptDate(formatDate(time))
                // setShowReciept(true)
                setCart([]);
                navigate('/')
            } else {
                console.error('Checkout failed.');
            }
        } catch (error) {
            console.error('There was an error checking out:', error);
            alert('An error occurred during checkout.');
        }


    }

    return (
        <div className="wrapper h-100 w-100">
            <div className="container-fluid w-100 h-100">
                <div className="row justify-content-center align-items-start g-2 gap-xl-3  w-100 h-100">
                    <div className="col-6 h-100">
                        <div className="d-flex justify-content-start align-items-center g-2" style={{ height: '10%' }}>
                            <NavLink to='/'>
                                <button type="button" className="btn">
                                    <ChevronLeft /> <span className='fw-bold lh-1'>Back</span>
                                </button>
                            </NavLink>
                        </div>
                        <div className='card rounded border-0' style={{ height: '90%' }}>
                            <div className='p-3'>
                                <p className=' m-0 border-bottom'>
                                    <th className='fs-5'>Total Item</th>
                                </p>
                            </div>
                            <div className="table-responsive p-3">
                                <table className="w-100">
                                    <tbody>
                                        {cart && cart.map(cart_item => {
                                            return (<tr key={cart_item.id} className=' border-bottom '>
                                                <td className='text-start'>
                                                    <ul className='list-unstyled'>
                                                        <li className='fw-bold'>{cart_item.title}</li>
                                                        <li className='fw-light'>{cart_item.cart_qty} X </li>
                                                    </ul>
                                                </td>
                                                <td className='text-end fw-bold '>{cart_item.inventory.selling_price * cart_item.cart_qty}</td>
                                            </tr>)
                                        })}
                                        <tr className=' border-bottom'>
                                            <td className='fw-bold'>
                                                <ul className="list-unstyled">
                                                    <li>Sub-Total</li>
                                                    <li>Tax</li>
                                                    <li>Promo code</li>
                                                </ul>
                                            </td>
                                            <td className='fw-bold text-end '>
                                                <ul className="list-unstyled">
                                                    <li>Sub-Total</li>
                                                    <li>Tax</li>
                                                    <li>Promo code</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='fw-bold '>Total</td>
                                            <td className='fw-bold text-end fs-5  '>Sh. {productTotal}</td>
                                        </tr>
                                        <tr>
                                            <td className='fw-bold'>Change</td>
                                            <td className='fw-bold text-end fs-5 '>Sh. {cashBalance}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='d-flex p-3'>
                                <button type="button" className="btn btn-warning flex-fill fw-bold"
                                    onClick={(e) => handleCheckout(e)}>
                                    Confirm Payment
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-xl-5  py-1">
                        <div className="card text-start border-0">
                            <div className="card-body">
                                <div className="row justify-content-center align-items-center g-2">
                                    <div className="row justify-content-center align-items-center g-2 mb-3">
                                        <div className="col-6">
                                            <h5 className="card-text fw-bold">Payable Amount</h5>
                                            <p className="card-text fw-bold fs-3">Sh. {productTotal} </p>
                                        </div>
                                        <div className="col-6">
                                            <div className="d-flex justify-content-center align-items-start gap-2 g-2">
                                                <div className='img_div' style={{ heigh: '8vh', width: '4vw', objectFit: 'contain' }}>
                                                    <img className='img-fluid w-100 h-100 rounded-circle' src={profile} alt="info" />
                                                </div>
                                                <div>
                                                    <h5 className="card-text fw-bold m-0">Customers Name</h5>
                                                    <p className="card-text">Phone Number </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 ">
                                        <div class="row justify-content-center align-items-center g-2">
                                            <div className="d-flex justify-content-between align-items-start gap-2 g-2">
                                                <div className="d-flex justify-content-start align-items-start gap-2 g-2">
                                                    <button className="btn btn-warning">Cash</button>
                                                    <button className="btn">Card</button>
                                                    <button className="btn">E-Wallet</button>
                                                </div>
                                                <div>
                                                    <button className="btn">+ Add Payment</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div class="mb-3">
                                            <input type="number" class="form-control text-end fw-bold fs-3" step="0.01" value={cash} placeholder="0" onChange={(e) => setcash(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div class="row justify-content-center align-items-center gap-3 g-2">
                                            <div className="col-3 d-flex keypad_1"><button className="btn  flex-fill btn-lg box-shaddow-77" onClick={() => handleCash(1)}>1</button></div>
                                            <div className="col-3 d-flex keypad_2"><button className="btn  flex-fill btn-lg box-shaddow-77" onClick={() => handleCash(2)}>2</button></div>
                                            <div className="col-3 d-flex keypad_3"><button className="btn  flex-fill btn-lg box-shaddow-77" onClick={() => handleCash(3)}>3</button></div>
                                            <div className="col-3 d-flex keypad_4"><button className="btn  flex-fill btn-lg box-shaddow-77" onClick={() => handleCash(4)}>4</button></div>
                                            <div className="col-3 d-flex keypad_5"><button className="btn  flex-fill btn-lg box-shaddow-77" onClick={() => handleCash(5)}>5</button></div>
                                            <div className="col-3 d-flex keypad_6"><button className="btn  flex-fill btn-lg box-shaddow-77" onClick={() => handleCash(6)}>6</button></div>
                                            <div className="col-3 d-flex keypad_7"><button className="btn  flex-fill btn-lg box-shaddow-77" onClick={() => handleCash(7)}>7</button></div>
                                            <div className="col-3 d-flex keypad_8"><button className="btn  flex-fill btn-lg box-shaddow-77" onClick={() => handleCash(8)}>8</button></div>
                                            <div className="col-3 d-flex keypad_9"><button className="btn  flex-fill btn-lg box-shaddow-77" onClick={() => handleCash(9)}>9</button></div>
                                            <div className="col-3 d-flex keypad_10"><button className="btn  flex-fill btn-lg box-shaddow-77" onClick={() => handleCash('00')}>00</button></div>
                                            <div className="col-3 d-flex keypad_11"><button className="btn  flex-fill btn-lg box-shaddow-77" onClick={() => handleCash('0')}>0</button></div>
                                            <div className="col-3 d-flex keypad_12"><button className="btn btn-danger flex-fill btn-lg box-shaddow-77" onClick={() => setcash(0)}><Delete /></button></div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>




                    {showReciept &&
                        <div className="overlayDiv  m-0" >
                            <div style={{ position: 'fixed', top: '20px', right: '20px' }}><button type="button" onClick={() => setShowReciept(false)} className="btn-close fs-1 text-white" aria-label="Close"></button></div>
                            <div class="d-flex justify-content-center align-items-center g-2 h-100 overflow-y-scroll">
                                <div className="card rounded-4" ref={ref}>
                                    <div className="card-body">
                                        <div className="text-center mb-3">
                                            <p className=' m-0 fw-bold'>[ Company_name ] POS</p>
                                            <p className=' m-0 fw-light'>[ Address ]</p>
                                            <p className='m-0'>{receiptDate}</p>
                                        </div>
                                        <hr className='dotted_hr' />
                                        <div className='d-flex w-100 justify-content-center m-1'><p className='m-0 fs-5 fw-bold'>Cash Reciept</p></div>
                                        <hr className='dotted_hr' />
                                        <div className="d-flex justify-content-between ">
                                            <div ><p className='m-0'><span className='fw-bold'>No.</span> {recieptNo}</p></div>
                                        </div>
                                        <hr className='dotted_hr' />
                                        <div className="cart_items">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Qty</th>
                                                            <th scope="col">Item</th>
                                                            <th scope="col">Subtotal</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {cart && cart.map((item, index) => {
                                                            return (<tr key={index} >
                                                                <td className='border-0 py-0' >x {item.cart_qty}</td>
                                                                <td className='border-0 py-0' > {item.title}</td>
                                                                <td className='border-0 py-0'>{item.cart_qty * item.inventory.selling_price}</td>
                                                            </tr>)
                                                        })}
                                                        <tr><td className='border-0' colSpan={3}><hr className='dotted_hr ' /></td></tr>
                                                        <tr>
                                                            <td className='border-0 py-0' colSpan={2}>Sub-Total</td>
                                                            <td className='border-0 py-0' >{productTotal}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='border-0 py-0' colSpan={2}>Tax</td>
                                                            <td className='border-0 py-0' >{productTotal}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='border-0 py-0' colSpan={2}>Total</td>
                                                            <td className='border-0 py-0' >{productTotal}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='border-0 py-0' colSpan={2}>Pay Amount</td>
                                                            <td className='border-0 py-0' >{cash}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='border-0 py-0' colSpan={2}>Balance</td>
                                                            <td className='border-0 py-0' >{cashBalance}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <hr className='dotted_hr' />
                                        <div className="row">
                                            <div className="col-12 text-center">
                                                <p className='m-0'>You were served by <span className='text-capitalize'>{currentUser.firstname}</span></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 text-center">
                                                <p className='fw-bold m-0'>Thank You</p>
                                            </div>
                                        </div>

                                        <div
                                            className="row justify-content-center align-items-center g-2"
                                        >
                                            <div className="col-6 d-flex w-100">
                                                <button className="btn border flex-fill nowrap" onClick={() => printReciept()}>Print Reciept</button>
                                            </div>
                                        </div>

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

export default Order