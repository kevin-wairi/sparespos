import React, { useContext, useState, useEffect } from 'react'
import { UrlContext } from '../../Context/UrlProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function EditCustomer({ setAllCustomers, allCustomers, handleEditCollapse, altCustomer }) {

    const apiUrl = useContext(UrlContext)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [credit_limit, setCredit_limit] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [customerStatus, setCustomerStatus] = useState(true)
    const [discounted, setDiscounted] = useState(false)

    useEffect(() => {
        if (altCustomer) {
            setUsername(altCustomer.username)
            setEmail(altCustomer.email)
            setPhone_number(altCustomer.phone_number)
            setCredit_limit(altCustomer.credit_limit)
            setCustomerStatus(altCustomer.customerStatus)
            setDiscounted(altCustomer.discounted)
        }
    }, [altCustomer])

    //!Update Customers
    function handleUpdateCustomers(e) {
        e.preventDefault()

        const user_id = altCustomer.id
        console.log(user_id);
        const token = sessionStorage.getItem("jwt");

        fetch(apiUrl + `/customers/${user_id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                username,
                email,
                phone_number,
                credit_limit,
                customer_status: customerStatus,
                discounted
            })
        })
            .then(resp => resp.json())
            .then((updatedUser) => {
                setAllCustomers(allCustomers => {
                    return allCustomers.map(user => {
                        if (user.id === updatedUser.id) {
                            return updatedUser;
                        } else {
                            return user;
                        }
                    })
                })
                handleEditCollapse()
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center g-2">
                <div className="col-lg-4 col-md-5 col-sm-6 col-10">
                    <div className="card border-0 rounded-0">
                        <div className="card-body">
                            <div className="row d-flex justify-content-center">
                                <div className="col-12">
                                    <div
                                        className="row justify-content-end align-items-center g-2 p-0"
                                    >
                                        <div className="col-1 p-0 m-0 text-end"><button onClick={() => handleEditCollapse()} className="btn  fw-bold fs-5"><FontAwesomeIcon icon={faX} /></button></div>
                                    </div>

                                </div>
                                <div className="col-8">
                                    <h5 className='fw-bold text-center mb-0'>Customer Update</h5>
                                </div>

                            </div>
                            <form className="col mx-auto" onSubmit={(e) => handleUpdateCustomers(e)}>
                                <div className="row justify-content-center align-items-center g-2 m-0">

                                    <div className=" col-12  align-items-center  mb-3">
                                        <div className="form-outline input_box mb-0">
                                            <input type="text" className="form-control rounded-0" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                            <label className="form-label text-start text-capitalize" >Username</label>
                                        </div>
                                    </div>


                                    <div className=" col-12  align-items-center  mb-3">
                                        <div className="form-outline input_box mb-0">
                                            <input type="tel" className="form-control rounded-0" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} required />
                                            <label className="form-label text-start text-capitalize" >Phone Number</label>
                                        </div>
                                    </div>
                                    <div className=" col-12  align-items-center  mb-3">
                                        <div className="form-outline mb-0">
                                            <label className="form-label text-start text-capitalize" >credit Limit</label>
                                            <select className="form-select rounded-0"
                                                value={parseInt(credit_limit)}
                                                onChange={(e) => setCredit_limit(parseInt(e.target.value))}
                                            >
                                                <option selected value={0}>0</option>
                                                <option value={20000}>20,000</option>
                                                <option value={50000}>50,000</option>
                                                <option value={100000}>100,000</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className=" col-12  align-items-center">
                                        <div className="d-flex justify-content-between align-items-center g-2"
                                        >
                                            <div>
                                                <div className="form-check  mb-0">
                                                    <input className="form-check-input" type="checkbox" checked={discounted} onChange={(e) => setDiscounted(e.target.checked)} />
                                                    <label className="form-check-label" for="">
                                                        Discounted
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" checked={customerStatus} onChange={(e) => setCustomerStatus(e.target.checked)} />
                                                    <label className="form-check-label" for="">
                                                        Active User
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div
                                            className="d-flex justify-content-end align-items-center g-2"
                                        >
                                            <div >
                                                <button type="submit" className="btn btn-primary ">Submit</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >

        </div >
    )
}

export default EditCustomer