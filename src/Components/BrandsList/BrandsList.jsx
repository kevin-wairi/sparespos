import React from 'react'
import BrandTableRow from '../BrandTableRow/BrandTableRow'
import { NavLink } from 'react-router-dom'
import CreateBrand from '../CreateBrand/CreateBrand'

function BrandsList({ brands, setBrands }) {

    return (
        <div className='container-fluid'>
            <div className="row justify-content-center align-items-start g-2 mt-3">
                <div className="col-12">
                    <div className="bg-grey-50 d-flex justify-content-between align-items-center g-2 p-2">
                        <div className="text-start">
                            <p className='m-0 text-white'>A list of Brands.</p>
                        </div>
                        <div>
                            <NavLink to='/settings/brands'>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                > Add Brand
                                </button>

                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className='col-8'>
                    <div className="table-responsive card border-0 p-2">
                        <table className="table table-hover">
                            <thead className="table-dark">
                                <tr className='text-start'>
                                    <th scope="col" >#</th>
                                    <th scope="col" style={{ whiteSpace: 'nowrap' }}>Brand Name</th>
                                    <th scope="col" style={{ whiteSpace: 'textWrap' }}>Description</th>
                                    <th scope="col" >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brands && brands.map((brand) => {
                                    return <BrandTableRow brand={brand} />
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-4">
                <CreateBrand brands={brands} setBrands={setBrands} />
                </div>

            </div>
        </div>
    )
}

export default BrandsList