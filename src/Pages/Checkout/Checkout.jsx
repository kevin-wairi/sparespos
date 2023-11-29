import React from 'react'
import './Checkout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf,faCalendarDays } from '@fortawesome/free-solid-svg-icons';

function Checkout() {
  return (
    <div className='wrapper '>
        
        <div class="row p-4 m-0">
            
            {/* payments div */}
            <div class="col-lg-6 col-sm-12  p-0 ">
                <div class="card border-0 bg-light">
                    <div class="card-body rounded p-0 mb-2 bg-white">
                        <p>
                            <a class="btn btn-primary w-100 h-100 d-flex align-items-center justify-content-between"
                                data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true"
                                aria-controls="collapseExample">
                                <span class="fw-bold">M-Pesa</span>
                                <span class="fab fa-cc-m-pesa">
                                </span>
                            </a>
                        </p>
                        <div class="collapse p-3 pt-0" id="collapseExample">
                            <div class="row">
                                <div class="col-6">
                                    <p class="h4 mb-0">Summary</p>
                                    <p class="mb-0"><span class="fw-bold">Paybill:</span><span class="c-green">: 1234567890</span></p>
                                    <p class="mb-0"><span class="fw-bold">Account No:</span><span class="c-green">: 1234567890</span></p>
                                    <p class="mb-0"><span class="fw-bold">Price:</span><span
                                            class="c-green">:$452.90</span></p>
                                </div>
                                <div className="col-6">
                                <img className='imge-fluid' src="https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body bg-white rounded p-0 ">
                        <p>
                            <a class="btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between"
                                data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true"
                                aria-controls="collapseExample">
                                <span class="fw-bold">Credit Card</span>
                                <span class="">
                                    <span class="fab fa-cc-amex"></span>
                                    <span class="fab fa-cc-mastercard"></span>
                                    <span class="fab fa-cc-discover"></span>
                                </span>
                            </a>
                        </p>
                        <div class="collapse show p-3 pt-0 col-12" id="collapseExample">
                            <div class="row">
                                <div class="col-lg-12 mb-lg-0 mb-3">
                                    <div className="row">
                                        <div className="col-6">
                                        <p class="h4 mb-0">Summary</p>
                                    <p class="mb-0"><span class="fw-bold">Product:</span><span class="c-green">: Name of
                                            product</span>
                                    </p>
                                    <p class="mb-0">
                                        <span class="fw-bold">Price:</span>
                                        <span class="c-green">:$452.90</span>
                                    </p>
                                    
                                        </div>
                                        <div className="col-6">
                                        <img src="https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png" alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <form action="" class="form ">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form__div">
                                                    <input type="text" class="form-control" placeholder=" "/>
                                                    <label for="" class="form__label">Card Number</label>
                                                </div>
                                            </div>

                                            <div class="col-6">
                                                <div class="form__div">
                                                    <input type="text" class="form-control" placeholder=" "/>
                                                    <label for="" class="form__label">MM / yy</label>
                                                </div>
                                            </div>

                                            <div class="col-6">
                                                <div class="form__div">
                                                    <input type="password" class="form-control" placeholder=" "/>
                                                    <label for="" class="form__label">cvv code</label>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form__div">
                                                    <input type="text" class="form-control" placeholder=" "/>
                                                    <label for="" class="form__label">name on the card</label>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="btn btn-primary w-100">Sumbit</div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 py-3">
                <div class="btn btn-primary payment">
                    Make Payment
                </div>
            </div>
            </div>
            
            <div className="col-lg-5 col-sm-12 overflow-y-scroll invoice-div">
                <div class="card p-4 rounded  border-0">
                    <div class="card-body d-flex justify-content-between">
                        <h4 class="card-title fs-6">Invoices</h4>
                        <button className='btn border border-primary'>View all</button>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>

                        <li class="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div className="d-flex justify-content-between">
                            <div><p>March, 01, 2020</p>
                            </div>
                            <div>ksh. 3456</div>
                            <div><span><FontAwesomeIcon icon={faFilePdf} style={{color: "#000000",}} /></span>PDF</div>
                            </div>
                        </li>
                        <li class="list-group-item">
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
                <div class="card">
                    <div class="card-body">
                        <div className="d-flex justify-content-between">
                        <p>Your Transactions</p>
                        <p class="card-text "><span><FontAwesomeIcon icon={faCalendarDays} style={{color: "#000000",}} /></span>  23 - 30 March 2020</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout