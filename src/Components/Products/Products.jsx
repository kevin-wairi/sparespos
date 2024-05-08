import React from 'react'

function Products() {
    return (
        <div>
            <div>
                <div className=" m-0 bg-grey-50 row justify-content-end align-items-center g-2 py-2 mx-0">
                    <div className="col-6 text-start ">
                        <p className='m-0 text-white'>Add, Edit and View your Products all in one place.</p>
                    </div>
                    <div className="col-5 text-end m-0">
                        {/* <button className=" btn btn-primary" onClick={handleAddNewProduct}>{addNewProduct ? 'Back' : 'Add Product'}</button> */}
                    </div>
                </div>
               
                {/* {addNewProduct &&
                    } */}
            </div>
        </div>
    )
}

export default Products