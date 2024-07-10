import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { Edit } from 'react-feather';
import { NavLink, useNavigate } from 'react-router-dom';

function ProductsList({ products }) {

    const navigate = useNavigate()

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
            name: <span style={{ fontWeight: 'bold' }}>Image</span>,
            cell: row => {
                return (
                    <>
                        <div style={{ height: "8vh", objectFit: 'contain' }}>
                            <img className='img-fluid' src={row.image} alt="info" />
                        </div>
                    </>
                )
            },
            sortable: false
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Product</span>,
            selector: row => row.title,
            sortable: false
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Status</span>,
            selector: row => (row.inventory.status ?'Active' : 'Inactive'),
            sortable: true
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Inventory</span>,
            selector: row => row.inventory.quantity,
            sortable: true
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Brand</span>,
            selector: row => row.brand?.name,
            sortable: true
        }, {
            name: <span style={{ fontWeight: 'bold' }}>sku</span>,
            selector: row => row.sku,
            sortable: true
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Selling Price</span>,
            selector: row => row.inventory.selling_price,
            sortable: true
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Added</span>,
            selector: row => {
                const dateParts = row.created_at.split('T')[0].split('-');
                return dateParts.reverse().join('-');
            },
            sortable: true
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Action</span>,
            cell: (row) => {
                return (
                    <>
                        <NavLink to={`/catalog/products/edit/:${row.id}`}>
                            <Edit strokeWidth={1} color="black" size={20} />
                        </NavLink>
                    </>
                );
            }
        },
    ];

    const customTableStyles = {
        rows: {
            style: {
                '&:hover': {
                    backgroundColor: '#f1f1f1',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                },
            },
        },
    }

    const HandleFilterProducts = (value) => {
        const filtered = products.filter(product => product.title.toLowerCase().includes(value.toLowerCase()))
        setFilteredProducts(filtered)
    }
    const handleRowClicked = (row) => {
        navigate(`/catalog/products/details/:${row.id}`);
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center g-2"
            >
                <div className="col-12">
                    <div className="card text-start bg-transparent border-0">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center g-2 p-2">
                                <div className="text-start">
                                    <h4 className="m-0">Products</h4>
                                    <p className='m-0'>A list of Products.</p>
                                </div>
                                <div>
                                    <NavLink to='/catalog/products/new'>
                                        <button type="button " className="btn btn-success"
                                        > Add Product
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-12">
                    <div className="card text-start box-shaddow-77">
                        <div className="card-body">
                            <div className="row justify-content-between align-items-center g-2">
                                <div className="text-end col-3"><input className='form-control form-control-sm rounded h-75' placeholder='Filter' type="text" onChange={(e) => HandleFilterProducts(e.target.value)} /></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card border-0 text-start box-shaddow-77">
                        <div className="card-body">
                            <DataTable
                                columns={products_columns}
                                data={filteredProducts}
                                fixedHeader
                                pagination
                                customStyles={customTableStyles}
                                onRowClicked={handleRowClicked}
                                className="custom-data-table"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsList