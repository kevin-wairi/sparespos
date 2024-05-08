import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Outlet } from 'react-router'

function Settings() {
  return (
    <div className="wrapper">
            <div className="container-fluid p-0 overflow-y-scroll " style={{ height: '100vh', width: '100%' }}>
                <div className="row justify-content-end align-items-center g-2 m-0"
                >
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

export default Settings