import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Outlet } from 'react-router'
import DataTable from 'react-data-table-component';
import { Trash2, Edit } from 'react-feather'
import CreateBrand from '../../Components/CreateBrand/CreateBrand';
import CreateCategory from '../../Components/CreateCategory/CreateCategory';
import { UrlContext } from '../../Context/UrlProvider';
import EditCategory from '../../Components/EditCategory/EditCategory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function Setup({ brands, setBrands, allCat, setAllCat, productTypes, type, setType }) {

    const apiUrl = useContext(UrlContext)

    const [openCreateBrand, setOpenCrateBrand] = useState(false)
    const [openCreateCat, setOpenCreateCat] = useState(false)
    const [openEditCat, setOpenEditCat] = useState(false)

    const [brandRecords, setBrandRecords] = useState(brands)
    const [categoryRecords, setCategoryRecords] = useState(allCat)

    const [altCat, setAltCat] = useState('')
    const [openAltCat, setOpenAltCat] = useState(false)

    useEffect(() => {
        setBrandRecords(brands)
    }, [brands])

    useEffect(() => {
        setCategoryRecords(allCat)
    }, [allCat])

    // !brands DataTable columns
    const brands_column = [
        {
            name: <span style={{ fontWeight: 'bold' }}>Brand</span>,
            selector: row => row.name,
            sortable: false
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Description</span>,
            selector: row => row.description,
            sortable: false
        },
        // {
        //   name: <span style={{ fontWeight: 'bold' }}>Action</span>,
        //   cell: (row) => {
        //     return (
        //       <>
        //         <button className="btn" onClick={(e) => handleDeleteBrands(e, row.id)}>
        //           <Trash2 strokeWidth={1} color="#ff0000" size={20} />
        //         </button>
        //         <button className="btn" onClick={() => { setAltBrand(row); handleCollapse() }}>
        //           <Edit strokeWidth={1} color="blue" size={20} />
        //         </button>
        //       </>
        //     );
        //   }
        // },

    ];

    const handleCreateBrandCollapse = () => {
        setOpenCrateBrand(!openCreateBrand)
    }
    const handleCreateCatCollapse = () => {
        setOpenCreateCat(!openCreateCat)
    }

    const handleEditCatCollapse = () => {
        setOpenEditCat(!openEditCat)
    }

    // !Category DataTable columns
    const category_columns = [
        {
            name: <span style={{ fontWeight: 'bold' }}>Category</span>,
            selector: row => row.name,
            sortable: false
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Description</span>,
            selector: row => row.description,
            sortable: false
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Action</span>,
            cell: (row) => {
                return (
                    <>
                        <button className="btn" onClick={(e) => handleDeleteCat(e, row.id)}>
                            <Trash2 strokeWidth={1} color="#ff0000" size={20} />
                        </button>
                        <button className="btn" >
                            <Edit strokeWidth={1} color="blue" size={20} onClick={() => { setAltCat(row); handleEditCatCollapse() }} />
                        </button>
                    </>
                );
            }
        },

    ];

    const handleDeleteCat = (e, cat_id) => {
        e.preventDefault();
        const token = sessionStorage.getItem("jwt");
        console.log(cat_id);

        fetch(apiUrl + `/categories/${cat_id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
            .then(resp => {
                if (resp.ok) {
                    const filtered = allCat.filter(cat => cat.id !== cat_id)
                    setAllCat(filtered)
                }
            }

            )
    }

    const handleAltCatCollapse = () => {
        setOpenAltCat(!openAltCat)
    }

    return (
        <div className="wrapper h-100 w-100 m-0 p-0 overflow-y-scroll">
            <div className="container-fluid h-100 w-100">
            <div className='w-100'>
                        <Navbar />
                    </div>
                <div className="row justify-content-end align-items-center g-2 m-0  h-100 w-100">
                    
                    {openCreateBrand &&
                        <div className="overlayDiv m-0">
                            <div className="d-flex justify-content-center align-items-center g-2">
                                <div>
                                    <div className="d-flex justify-content-end align-items-center g-2">
                                        <div><button onClick={() => handleCreateBrandCollapse()} className="btn  fw-bold "><FontAwesomeIcon icon={faX} /></button></div>
                                    </div>
                                    <CreateBrand brands={brands} setBrands={setBrands} handleCreateBrandCollapse={handleCreateBrandCollapse}/>
                                </div>
                            </div>

                        </div>
                    }
                    {openCreateCat &&
                        <div className="overlayDiv m-0">
                            <div className="d-flex justify-content-center align-items-center g-2">
                                <div>
                                    <div className="d-flex justify-content-end align-items-center g-2">
                                        <div><button onClick={() => handleCreateCatCollapse()} className="btn  fw-bold fs-5"><FontAwesomeIcon icon={faX} /></button></div>
                                    </div>
                                    
                                    <CreateCategory allCat={allCat} setAllCat={setAllCat} productTypes={productTypes} handleCreateCatCollapse={handleCreateCatCollapse} />
                                </div>
                            </div>
                        </div>
                    }
                    {openEditCat &&
                        <div className="overlayDiv m-0">
                            <EditCategory altCat={altCat} allCat={allCat} setAllCat={setAllCat} handleEditCatCollapse={handleEditCatCollapse} />
                        </div>
                    }
                    <div className="col-12 mb-3 mx-0">
                        <div class="card text-start border-0">
                            <div className="d-flex justify-content-between align-items-center g-2 p-2">
                                <div className="text-start">
                                    <h5 className='m-0'>Brands Table</h5>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => handleCreateBrandCollapse()}
                                    > Add Brand
                                    </button>
                                </div>
                            </div>
                        </div>

                        <DataTable
                            columns={brands_column}
                            data={brandRecords}
                            fixedHeader
                            pagination
                        />
                    </div>
                    <div className="col-12 mb-3 mx-0">
                        <div class="card text-start border-0">
                            <div className="d-flex justify-content-between align-items-center g-2 p-2">
                                <div className="text-start">
                                    <h5 className='m-0'>Categories Table</h5>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => handleCreateCatCollapse()}
                                    > Add Category
                                    </button>
                                </div>
                            </div>
                        </div>

                        <DataTable
                            columns={category_columns}
                            data={categoryRecords}
                            fixedHeader
                            pagination
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <Outlet />
                    </div>

                </div >
            </div >
        </div >
    )
}

export default Setup