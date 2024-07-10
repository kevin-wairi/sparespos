import React, { useState, useEffect } from 'react'

import profile from '../../../assets/images/profile.jpg'
import { useNavigate } from 'react-router'

function SingleUser({ user }) {

    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [business_name, setBusiness_name] = useState('')
    const [role, setRole] = useState('')
    const [phone_number, setPhone_number] = useState('')

    const navigate = useNavigate()

    // !Employee update form states
    useEffect(() => {
        if (user) {
            setFirstname(user.firstname || "");
            setLastname(user.lastname || "");
            setBusiness_name(user.business_name || "")
            setRole(user.role || "")
            setEmail(user.email || "");
            setPhone_number(user.phone_number || "");
        }
    }, [user]);

    return (
        <div className="wrapper">
            <div className="container-fluid">

                <div className="row justify-content-center align-items-start g-2 pt-3">
                    <button className="btn" onClick={()=>navigate(-1)}>back</button>
                    <div className="col-3 border">
                        <div className="text-start">
                            <div className="img_div">
                                <div className='border' style={{ height: '20vh', width: '20vw' }}>
                                    <img style={{ height: '100%', width: ' 100%', objectFit: 'cover' }} className="img-fluid" src={profile} alt="Title" />
                                </div>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title mt-3">{user.firstname + " " + user.lastname}</h4>
                                <p className="card-text text-capitalize">{user.role}</p>
                            </div>
                        </div>
                        <button className="btn text-primary border-dark w-75 mb-3 ">Update profile</button>
                        <button className="btn text-primary border-dark w-75 mb-3 ">Delete profile</button>

                    </div>

                    <div className="col-5 border">
                        <div class="card py-1 text-start">
                            <p className='m-0 ps-3'>Personal Details</p>
                            <div class="card-body">
                                <table className="table table-borderless text-start table-hover table-transparent" >
                                    <tbody>
                                        <tr>
                                            <td>Username.</td>
                                            <td>{user.lastname}</td>
                                        </tr>
                                        <tr>
                                            <td>Role.</td>
                                            <td>{user.role}</td>
                                        </tr>
                                        <tr>
                                            <td>Reg no.</td>
                                            <td>POSREG-{user.id}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td><span className='text-muted'>{user.email}</span></td>
                                        </tr>
                                        <tr>
                                            <td>Phone Number:</td>
                                            <td>{user.phone_number}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                    <div className="col-4">
                        <div class="card text-start">
                            <div class="card-body">
                                <h4 class="card-title">Transactions</h4>
                                <p class="card-text">Body</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div >
        </div >
    )
}

export default SingleUser