import React, { useContext, useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { PlusCircle } from 'react-feather'
import { UrlContext } from '../../Context/UrlProvider'
import CreateSupplier from '../CreateSupplier/CreateSupplier'
import EditSupplier from '../EditSupplier/EditSupplier'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function SuppliersList({ setAllSuppliers, allSuppliers }) {


    const apiUrl = useContext(UrlContext)

    const [altSupplier, setAltSupplier] = useState()
    const [supplierRecords, setSupplierRecords] = useState(allSuppliers)

    const [createIsOpen, setCreateIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);


    // !supplier DataTable columns
    const supplier_columns = [
        {
            name: <span style={{ fontWeight: 'bold' }}>Supplier</span>,
            selector: row =>
                <div className='d-flex justify-content-between gap-2 align-items-center '>
                    <div style={{ height: '6vh', width: '3vw' }}>
                        <img className='img-fluid' src={row.profile_image} alt="info" />
                    </div>
                    <div>
                        <ul className=' list-unstyled mb-0'>
                            <li style={{ fontWeight: 'bold' }}>{row.firstname + " " + row.lastname}</li>
                            <li>{row.email}</li>
                        </ul>
                    </div>
                </div>
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Company Name</span>,
            selector: row => row.company_name,
            sortable: true
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Phone No.</span>,
            selector: row => row.phone_number,
            sortable: false
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Action</span>,
            cell: (row) => {
                return (
                    <>
                        <button className="btn fw-bold " onClick={(e) => { setAltSupplier(row); handleEditCollapse() }}>
                            Edit
                        </button>
                    </>
                );
            }
        },
    ];

    // //!delete Supplier
    // function handleDeleteSupplier(e, user_id) {
    //     e.preventDefault()
    //     fetch(apiUrl + `/${user_id}`, {
    //         method: "DELETE",
    //     })
    //         .then(() => {
    //             const current = allSuppliers.filter(user => user.id !== user_id)
    //             setAllSuppliers(() => current)
    //         })
    // }



    // !update filter state after refresh
    useEffect(() => {
        setSupplierRecords(() => allSuppliers)
    }, [allSuppliers])

    // !form filter for Suppliers
    const handleFiltersuppliers = (e) => {
        e.preventDefault()
        const searchQuery = e.target.value.toLowerCase().trim();
        const newData = allSuppliers.filter(row => {
            return row.firstname.toLowerCase().startsWith(searchQuery)
        })
        setSupplierRecords(() => newData)
    }

    // !collapse create form
    const handleCreateCollapse = () => {
        setCreateIsOpen(!createIsOpen);
    };

    // !collapse edit form
    const handleEditCollapse = () => {
        setEditIsOpen(!editIsOpen);
    };

    return (
        <div className="container-fluid h-100 w-100">
            <div className="row justify-content-around align-items-start g-2">
                <div className="col-12 ">
                    <div className="card text-start bg-transparent border-0">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center g-2">
                                <div><h4 className="card-text">Suppliers</h4>
                                    <p className='m-0'>Add, View and Edit your Suppliers all in one place</p>
                                </div>
                                <div>
                                    <button
                                        className="btn bg-success"
                                        onClick={() => { handleCreateCollapse() }}
                                    > Add Supplier
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {createIsOpen &&
                    <div className='overlayDiv m-0'>
                        <div className="row justify-content-center align-items-center g-2">
                            <div className='col-4'>
                                <div className="d-flex justify-content-end align-items-center g-2">
                                    <div><button onClick={() => handleCreateCollapse()} className="btn  fw-bold fs-5"><FontAwesomeIcon icon={faX} /></button></div>
                                </div>
                                <CreateSupplier altSupplier={altSupplier} setAllSuppliers={setAllSuppliers} handleCreateCollapse={handleCreateCollapse} />
                            </div>
                        </div>
                    </div>
                }
                {editIsOpen &&

                    <div className='overlayDiv m-0'>
                        <EditSupplier altSupplier={altSupplier} setAllSuppliers={setAllSuppliers} handleEditCollapse={handleEditCollapse} />
                    </div>
                }

                <div className="card text-start box-shaddow-77">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center g-2"
                        >
                            <div><button className="btn text-primary py-1" onClick={() => { handleCreateCollapse() }}><PlusCircle strokeWidth={1} />  Add Supplier</button></div>
                            <div className="text-end"><input className='form-control form-control-sm h-75 ps-3' placeholder='Filter Name' type="text" onChange={(e) => handleFiltersuppliers(e)} /></div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card border-0  text-start box-shaddow-77">
                        <div className="card-body">
                            <DataTable
                                columns={supplier_columns}
                                data={supplierRecords}
                                fixedHeader
                                pagination
                                className="custom-data-table"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuppliersList
