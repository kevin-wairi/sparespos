import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import './Catalog.css'
import { Outlet } from 'react-router';

function Catalog() {




    return (
        <div className="wrapper h-100 w-100 overflow-y-scroll">
            <div className="container-fluid p-0 ">
                <div className="row justify-content-end align-items-center g-2 m-0 px-5">
                    <div style={{ width: '93vw' }}>
                        <Navbar />
                    </div>
                    <div className="col-12">
                        <Outlet />
                    </div>

                </div >
            </div >
        </div>
    )
}

export default Catalog