import React from 'react'
import './Checkout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf,faCalendarDays } from '@fortawesome/free-solid-svg-icons';

function Checkout() {
  return (
    <div className='wrapper '>
        
        <div className="row p-4 m-0">
            
            {/* payments div */}
            <div className="col-lg-6 col-sm-12  p-0 ">
                <div className="card border-0 bg-light">
                    <div className="card-body rounded p-0 mb-2 bg-white">
                        <p>
                            <a className="btn btn-primary w-100 h-100 d-flex align-items-center justify-content-between"
                                data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true"
                                aria-controls="collapseExample">
                                <span className="fw-bold">M-Pesa</span>
                                <span className="fab fa-cc-m-pesa">
                                </span>
                            </a>
                        </p>
                        <div className="collapse p-3 pt-0" id="collapseExample">
                            <div className="row">
                                <div className="col-6">
                                    <p className="h4 mb-0">Summary</p>
                                    <p className="mb-0"><span className="fw-bold">Paybill:</span><span className="c-green">: 1234567890</span></p>
                                    <p className="mb-0"><span className="fw-bold">Account No:</span><span className="c-green">: 1234567890</span></p>
                                    <p className="mb-0"><span className="fw-bold">Price:</span><span
                                            className="c-green">:$452.90</span></p>
                                </div>
                                <div className="col-6">
                                <img className='imge-fluid' src="https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body bg-white rounded p-0 ">
                        <p>
                            <a className="btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between"
                                data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true"
                                aria-controls="collapseExample">
                                <span className="fw-bold">Credit Card</span>
                                <span className="">
                                    <span className="fab fa-cc-amex"></span>
                                    <span className="fab fa-cc-mastercard"></span>
                                    <span className="fab fa-cc-discover"></span>
                                </span>
                            </a>
                        </p>
                        <div className="collapse show p-3 pt-0 col-12" id="collapseExample">
                            <div className="row">
                                <div className="col-lg-12 mb-lg-0 mb-3">
                                    <div className="row">
                                        <div className="col-6">
                                        <p className="h4 mb-0">Summary</p>
                                    <p className="mb-0"><span className="fw-bold">Product:</span><span className="c-green">: Name of
                                            product</span>
                                    </p>
                                    <p className="mb-0">
                                        <span className="fw-bold">Price:</span>
                                        <span className="c-green">:$452.90</span>
                                    </p>
                                    
                                        </div>
                                        <div className="col-6">
                                        <img src="https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png" alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <form action="" className="form ">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form__div">
                                                    <input type="text" className="form-control rounded" />
                                                    <label for="" className="form__label">Card Number</label>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form__div">
                                                    <input type="text" className="form-control rounded" />
                                                    <label for="" className="form__label">MM / yy</label>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form__div">
                                                    <input type="password" className="form-control rounded" />
                                                    <label for="" className="form__label">cvv code</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form__div">
                                                    <input type="text" className="form-control rounded" />
                                                    <label for="" className="form__label">name on the card</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="btn btn-primary w-100">Sumbit</div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 py-3">
                <div className="btn btn-primary payment">
                    Make Payment
                </div>
            </div>
            </div>
            
            <div className="col-lg-5 col-sm-12 overflow-y-scroll invoice-div">
                <div className="card p-4 rounded  border-0">
                    <div className="card-body d-flex justify-content-between">
                        <h4 className="card-title fs-6">Invoices</h4>
                        <button className='btn border border-primary'>View all</button>
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
                        <li className="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>

                        <li className="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
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
        </div>
    </div>
  )
}

export default Checkout