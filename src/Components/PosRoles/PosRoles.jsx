import React from 'react'
import { AlertCircle } from 'react-feather'
import { NavLink } from 'react-router-dom'

function PosRoles() {
    return (
        <div className="container-fluid">
            <section >
                <div className="card text-start mb-3 bg-transparent">
                    <div className="card-body">
                        <div
                            className="row justify-content-between align-items-center g-2"
                        >
                            <div className="col-8">
                                <p className="card-text ">
                                    <span><AlertCircle /></span>  Staff permission are set in the App and apply to that device only
                                </p>
                            </div>
                            <div className="col-sm-2 col-12 text-end">
                                <NavLink to={'/catalog/users'}>
                                    <button className='btn btn-primary'>Back</button>
                                </NavLink>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <hr />
            <section>
                <div className="roles">
                    <div
                        className="row justify-content-center align-items-start g-2"
                    >
                        <div className="col-md-4 col-11">
                            <p>POS Permissions</p>
                        </div>
                        <div className="col-md-8 col-11">
                            <div className="card text-start mb-3">
                                <div className="card-body">
                                    <h5 className='card-text'>Member</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item border-0">Can view their own sales and transaction history.</li>
                                        <li className="list-group-item border-0">Can edit their own profile information.</li>
                                        <li className="list-group-item border-0">Cannot access sensitive settings or financial reports.</li>
                                        <li className="list-group-item border-0">Cannot add or remove other users.</li>
                                    </ul>

                                </div>
                            </div>
                            <div className="card text-start mb-3">
                                <div className="card-body">
                                    <h5 className="card-text">Cashier</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item border-0">Can process sales transactions.</li>
                                        <li className="list-group-item border-0">Can view limited sales reports for their own transactions.</li>
                                        <li className="list-group-item border-0">Cannot access settings or reports related to inventory management, finances, or employee management.</li>
                                        <li className="list-group-item border-0">Cannot add or remove other users.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="card text-start mb-3">
                                <div className="card-body">
                                    <h5 className="card-text">Manager</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item border-0">Can process sales transactions.</li>
                                        <li className="list-group-item border-0">Can view detailed sales reports, including reports for all cashiers.</li>
                                        <li className="list-group-item border-0">Can manage inventory, including adding, removing, and updating products.</li>
                                        <li className="list-group-item border-0">Can view and manage customer information.</li>
                                        <li className="list-group-item border-0">Cannot access sensitive financial reports or settings related to user management.</li>
                                        <li className="list-group-item border-0">Cannot add or remove other users.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="card text-start mb-3">
                                <div className="card-body">
                                    <h5 className="card-text">Admin</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item border-0">Has full access to all features and settings of the POS system.</li>
                                        <li className="list-group-item border-0">Can process sales transactions.</li>
                                        <li className="list-group-item border-0">Can view and manage all reports, including financial reports.</li>
                                        <li className="list-group-item border-0">Can manage inventory, customers, and user accounts.</li>
                                        <li className="list-group-item border-0">Can configure system settings and permissions for other users.</li>
                                        <li className="list-group-item border-0">Can add or remove other users.</li>
                                    </ul>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </section>

        </div>
    )
}

export default PosRoles