import React from 'react'
import { NavLink } from 'react-router-dom'
import SuppliersTableRow from '../SuppliersTableRow/SuppliersTableRow'

function SuppliersList({suppliers}) {
  return (
    <div className="row justify-content-around align-items-start g-2 mt-3">
                <div className="col-12">
                    <div className="bg-grey-50 d-flex justify-content-between align-items-center g-2 p-2">
                        <div className="text-start">
                            <p className='m-0 text-white'>A list of Brands.</p>
                        </div>
                        <div>
                            <NavLink to='/catalog/suppliers/new'>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                > Add Supplier
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className="8">
                    <div className="table-responsive card border-0 p-2">
                        <table className="table table-hover">
                            <thead className="table-dark">
                                <tr className='text-start'>
                                    <th scope="col" >#</th>
                                    <th scope="col" >Supplier Name</th>
                                    <th scope="col" >Company Name</th>
                                    <th scope="col" >Phone Number</th>
                                    <th scope="col" >Email</th>
                                    <th scope="col" >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suppliers && suppliers.map((supplier) => {
                                    return <SuppliersTableRow supplier={supplier} />
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
  )
}

export default SuppliersList
