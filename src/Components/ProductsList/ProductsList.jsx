import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Eye } from 'react-feather';
import { NavLink } from 'react-router-dom';

function ProductsList({ products }) {

    const [filteredProducts, setFilteredProducts] = useState(products);

    // !Products DataTable columns
    const products_columns = [
        {
            name: <span style={{ fontWeight: 'bold' }}>ID</span>,
            selector: row => row.id,
            sortable: true,
            style: {
                fontWeight: 'bold'
            }
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>image</span>,
            cell: row => {
                return (
                    <>
                        <div style={{ height: "8vh", objectFit: 'contain' }}>
                            <img className='img-fluid' src={row.image} alt="info" style={{ width: '100%', height: '100%' }} />
                        </div>
                    </>
                )
            },
            sortable: false
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>title</span>,
            selector: row => row.title,
            sortable: false
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Brand</span>,
            selector: row => row.product_brand,
            sortable: true
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Supplier</span>,
            selector: row => row.sku,
            sortable: true
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Inventory</span>,
            selector: row => row.quantity,
            sortable: true
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Retail Price</span>,
            selector: row => row.retail_price,
            sortable: true
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Active</span>,
            selector: row => row.status,
            sortable: true
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Created</span>,
            selector: row => {
                const dateParts = row.created_at.split('T')[0].split('-');
                return dateParts.reverse().join('-');
            },
            sortable: true
        }, {
            name: <span style={{ fontWeight: 'bold' }}>View</span>,
            cell: (row) => {
                return (
                    <>
                        <NavLink to={`/products/ProductShow/:${row.id}`}>
                            <Eye products={products} />
                        </NavLink>
                    </>
                );
            }
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Action</span>,
            cell: (row) => {
                return (
                    <>
                        <NavLink to={`/products/edit`}>
                            <Edit strokeWidth={1} color="blue" size={20} />
                        </NavLink>
                    </>
                );
            }
        },
    ];

    const HandleFilterProducts = (value) => {
        const filtered = products.filter(product => product.title.toLowerCase().includes(value.toLowerCase()))
        setFilteredProducts(filtered)
    }

    return (
        <div class="red row justify-content-center align-items-center g-2"
        >
            <div className="col-12">
                <div className="bg-grey-50 d-flex justify-content-between align-items-center g-2 p-2">
                    <div className="text-start">
                        <p className='m-0 text-white'>A list of Products.</p>
                    </div>
                    <div>
                        <NavLink to='/catalog/products/new'>
                            <button type="button" className="btn btn-primary"
                            > Add Product
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card border-0 text-start">
                    <div className="card-body">
                        <div className="row justify-content-between align-items-center g-2"
                        >
                            {/* <div className='col-3'><button className="btn text-primary py-1" onClick={handleAddNewProduct}><PlusCircle strokeWidth={1} />  Add Product</button></div> */}
                            <div className="text-end col-3"><input className='form-control form-control-sm rounded h-75' placeholder='Filter by Title' type="text" onChange={(e) => HandleFilterProducts(e.target.value)} /></div>
                        </div>
                        <DataTable
                            columns={products_columns}
                            data={filteredProducts}
                            fixedHeader
                            pagination
                            className="custom-data-table"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsList