import React, { useState, useEffect, useContext } from 'react'
import { Trash2, Edit, PlusCircle } from 'react-feather';
import DataTable from 'react-data-table-component'
import { UrlContext } from '../../Context/UrlProvider';

function Employees({ employees }) {

    const apiUrl = useContext(UrlContext)
    const [error, setError] = useState("")

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [business_name, setBusiness_name] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [role, setRole] = useState('member')
    const [email, setEmail] = useState("")
    const [employeeRecords, setEmployeeRecords] = useState(employees)

    const [altEmployee, setAltEmployee] = useState();
    const [createEmployee, setCreateEmployee] = useState(false)
    const [updateEmployee, setUpdateEmployee] = useState(false)

    //!Create Employees
    function handleCreateEmployee(e) {
        e.preventDefault()
        console.log('STARRT');

        const token = sessionStorage.getItem("jwt");

        fetch(apiUrl + '/employees', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                firstname,
                lastname,
                role,
                email,
                business_name,
                phone_number
            })
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json()
            })
            .then((newUser) => {
                console.log('NEW USER', newUser);
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }

    // !update filter state after refresh
    useEffect(() => {
        setEmployeeRecords(() => employees)
    }, [employees])

    // !form filter for Employee

    const handleFilteremployee = (e) => {
        e.preventDefault()
        const searchQuery = e.target.value.toLowerCase().trim();
        const newData = employees.filter(row => {
            return row.firstname.includes(searchQuery)
        })
        setEmployeeRecords(() => newData)
    }

    //!delete Employees
    function handleDeleteEmployee(e, user_id) {
        e.preventDefault()
        fetch(`http://127.0.0.1:3000/employees/${user_id}`, {
            method: "DELETE",
        })
            .then(() => {
                const current = employees.filter(user => user.id !== user_id)
                console.log('DELETED');
            })
    }

    // !employees DataTable columns
    const employee_columns = [
        {
            name: <span style={{ fontWeight: 'bold' }}>ID</span>,
            selector: row => row.id,
            sortable: true,
            style: {
                fontWeight: 'bold' // Make this header bold
            }
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Fullname</span>,
            selector: row => row.firstname + " " + row.lastname,
            sortable: true
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Business Name</span>,
            selector: row => row.business_name,
            sortable: true
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Roles</span>,
            selector: row => row.role,
            sortable: true
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>E-mail</span>,
            selector: row => row.email,
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
                        <button className="btn" onClick={(e) => handleDeleteEmployee(e, row.id)}>
                            <Trash2 strokeWidth={1} color="#ff0000" size={20} />
                        </button>
                        <button className="btn" onClick={(e) => viewEmployee(e, row)}>
                            <Edit strokeWidth={1} color="blue" size={20} />
                        </button>
                    </>
                );
            }
        },
    ];

    const viewEmployee = (user) => {
        setAltEmployee(user)
        setUpdateEmployee(prevVal => !prevVal)
    }

    // !open create Employees
    const openCreateEmployee = () => {
        setCreateEmployee(prevVal => !prevVal)
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center g-2">
                <div className="red col-12">
                    <div className=" card border-0 ">
                        <div className="card-body">
                            <div className="row d-flex justify-content-start align-items-center">
                                <div className="col-6 m-0">
                                    <p className='fw-bold text-start'>Add Employee</p>
                                </div>
                            </div>
                            <form className="mx-auto" onSubmit={(e) => handleCreateEmployee(e)}>
                                <div className="row justify-content-start align-items-center g-2">
                                    <div className=" col-lg-3 col-md-4 col-sm-6 col-12  align-items-center  mb-3">
                                        <div className="form-outline  mb-0 col">
                                            <div className="m-1">
                                                <label className="form-label text-start text-capitalize" >First Name</label>
                                                <input type="text" className="form-control rounded" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                                            </div>

                                        </div>
                                    </div>
                                    <div className=" col-lg-3 col-md-4 col-sm-6 col-12  align-items-center  mb-3">
                                        <div className="form-outline  mb-0 col">
                                            <div className="m-1">
                                                <label className="form-label text-start text-capitalize" >Last Name</label>
                                                <input type="text" className="form-control rounded" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                                            </div>

                                        </div>
                                    </div>
                                    <div className=" col-lg-3 col-md-4 col-sm-6 col-12  align-items-center  mb-3">
                                        <div className="form-outline  mb-0 col">
                                            <div className="m-1">
                                                <label className="form-label text-start text-capitalize" >Email</label>
                                                <input type="email" className="form-control rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            </div>
                                        </div>
                                    </div>


                                    <div className=" col-lg-3 col-md-4 col-sm-6 col-12  align-items-center  mb-3">
                                        <div className="form-outline  mb-0 col">
                                            <div className="m-1">
                                                <label className="form-label text-start text-capitalize" >Job Title</label>
                                                <select
                                                    className="form-select"
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}>

                                                    <option value="member" selected>Member</option>
                                                    <option value="manager">Manager</option>
                                                    <option value="admin">admin</option>
                                                    <option value="cashier">blocked</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-lg-3 col-md-4 col-sm-6 col-12  align-items-center  mb-3">
                                        <div className="form-outline  mb-0 col">
                                            <div className="m-1">
                                                <label className="form-label text-start text-capitalize" >Business Name</label>
                                                <input type="tel" className="form-control rounded" value={business_name} onChange={(e) => setBusiness_name(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-lg-3 col-md-4 col-sm-6 col-12  align-items-center  mb-3">
                                        <div className="form-outline  mb-0 ">
                                            <div className="m-1">
                                                <label className="form-label text-start text-capitalize" >Phone Number</label>
                                                <input type="tel" className="form-control rounded" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-lg-3 col-md-4 col-sm-6 col-12  align-items-center  mb-3">
                                        <div className=" d-flex align-items-center mt-4 ">
                                            <button type="submit" className="btn btn-primary flex-fill p-2">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* Employees table */}
                <div className="col-12">
                    <div className="card border-0 text-start">
                        <div className="card-body">
                            <div className="row justify-content-between align-items-center g-2"
                            >
                                <div className='col-3'><button className="btn text-primary py-1" onClick={(e) => openCreateEmployee(e)}><PlusCircle strokeWidth={1} />  Add Employees</button></div>
                                <div className="text-end col-3"><input className='form-control form-control-sm rounded-4 h-75 ps-3' placeholder='Filter data' type="text" onChange={(e) => handleFilteremployee(e)} /></div>
                            </div>

                            <DataTable
                                columns={employee_columns}
                                data={employeeRecords}
                                fixedHeader
                                pagination
                                className="custom-data-table"
                            />
                        </div>
                    </div>
                </div>

            </div>

        </div >
    )
}

export default Employees