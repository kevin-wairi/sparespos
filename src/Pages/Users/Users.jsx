import React, { useState, useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Trash2, Edit, X, PlusCircle, Search } from 'react-feather';
import DataTable from 'react-data-table-component';
import './Users.css'

function Users({ allCustomers, setAllCustomers, employees, setEmployees, setAllSuppliers, allSuppliers }) {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [credit_limit, setCredit_limit] = useState()
    const [password, setPassword] = useState("")
    const [password_confirmation, setPassword_confirmation] = useState("")

    const [updateCustomer, setUpdateCustomer] = useState(false)
    const [createCustomer, setCreateCustomer] = useState(false)
    const [altCustomer, setAltCustomer] = useState();
    const [error, setError] = useState("")
    const [customerRecords, setCustomerRecords] = useState(allCustomers);

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [business_name, setBusiness_name] = useState('')
    const [role, setRole] = useState('')
    const [office_phone, setOffice_phone] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [createEmployee, setCreateEmployee] = useState(false)
    const [createSupplier, setCreateSupplier] = useState(false)
    const [company_name, setCompany_name] = useState('')

    const [employeeRecords, setEmployeeRecords] = useState(employees)
    const [updateEmployee, setUpdateEmployee] = useState(false)
    const [altEmployee, setAltEmployee] = useState();

    const [supplierRecords, setSupplierRecords] = useState(allSuppliers)
    const [altSupplier, setAltSupplier] = useState();
    const [updateSupplier, setUpdateSupplier] = useState(false)

    const [activeTab, setActiveTab] = useState(0);


    //!delete Customers
    function handleDeleteCustomer(e, user_id) {
        e.preventDefault()
        fetch(`http://127.0.0.1:3000/customers/${user_id}`, {
            method: "DELETE",
        })
            .then(() => {
                const current = allCustomers.filter(user => user.id !== user_id)
                setAllCustomers(() => current)
            })
    }

    //!delete Employees
    function handleDeleteEmployee(e, user_id) {
        e.preventDefault()
        fetch(`http://127.0.0.1:3000/employees/${user_id}`, {
            method: "DELETE",
        })
            .then(() => {
                const current = employees.filter(user => user.id !== user_id)
                setEmployees(() => current)
            })
    }

    //!delete Supplier
    function handleDeleteSupplier(e, user_id) {
        e.preventDefault()
        fetch(`http://127.0.0.1:3000/suppliers/${user_id}`, {
            method: "DELETE",
        })
            .then(() => {
                const current = allSuppliers.filter(user => user.id !== user_id)
                setAllSuppliers(() => current)
            })
    }

    // !open create Customer overlay
    const openCreateCustomer = (e) => {
        e.preventDefault()
        setCreateCustomer(prevVal => !prevVal)
    }
    // !open create Employees overlay
    const openCreateEmployee = (e) => {
        e.preventDefault()
        setCreateEmployee(prevVal => !prevVal)
    }
    // !open create supplier overlay
    const openCreateSupplier = (e) => {
        e.preventDefault()
        setCreateSupplier(prevVal => !prevVal)
    }

    //!Update Customers
    function handleCustomer(e) {
        e.preventDefault()
        console.log('STARRT');
        if (username === '' || email === '') {
            setError('Please fill username and email fields');
            return;
        } else if (password !== password_confirmation) {
            setError('Passwords do not match');
            return;
        }
        console.log('CONT...');
        const user_id = altCustomer.id
        // const token = sessionStorage.getItem("jwt");
        // const user_id = sessionStorage.getItem("user_id");
        setError('');
        fetch(`http://127.0.0.1:3000/customers/${user_id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            //Authorization: `Bearer ${token}`,
            body: JSON.stringify({
                username,
                email,
                phone_number,
                credit_limit
            })
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json()
            })
            .then((updatedUser) => {
                console.log('D', updatedUser);
                setAllCustomers(prevUsers => {
                    return prevUsers.map(user => {
                        if (user.id === updatedUser.id) {
                            return updatedUser;
                        } else {
                            return user;
                        }
                    })
                })
                closeCreateUser(e)
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }

    //!Update Employee
    function handleEmployeeUpdate(e) {
        e.preventDefault()
        const user_id = altEmployee.id
        // const token = sessionStorage.getItem("jwt");
        // const user_id = sessionStorage.getItem("user_id");
        setError('');
        fetch(`http://127.0.0.1:3000/employees/${user_id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            //Authorization: `Bearer ${token}`,
            body: JSON.stringify({
                firstname,
                lastname,
                business_name,
                role,
                email,
                password,
                password_confirmation
            })
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json()
            })
            .then((updatedUser) => {
                console.log('D', updatedUser);
                setEmployees(prevUsers => {
                    return prevUsers.map(user => {
                        if (user.id === updatedUser.id) {
                            return updatedUser;
                        } else {
                            return user;
                        }
                    })
                })
                closeCreateUser(e)
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }

    //!Update Supplier
    function handleSupplierUpdate(e) {
        e.preventDefault()
        const user_id = altSupplier.id
        // const token = sessionStorage.getItem("jwt");
        // const user_id = sessionStorage.getItem("user_id");
        setError('');
        fetch(`http://127.0.0.1:3000/suppliers/${user_id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            //Authorization: `Bearer ${token}`,
            body: JSON.stringify({
                firstname,
                lastname,
                company_name,
                phone_number,
                email
            })
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json()
            })
            .then((updatedUser) => {
                console.log('D', updatedUser);
                setAllSuppliers(prevUsers => {
                    return prevUsers.map(user => {
                        if (user.id === updatedUser.id) {
                            return updatedUser;
                        } else {
                            return user;
                        }
                    })
                })
                closeCreateUser(e)
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }

    //!Create customers
    function handleCreateCustomers(e) {
        e.preventDefault()
        console.log('STARRT');
        if (username === '' || email === '' || phone_number === "") {
            setError('Please fill out all fields');
            return;
        } else if (password !== password_confirmation) {
            setError('Passwords do not match');
            return;
        }
        console.log('CONT...');
        setError('');
        fetch('http://127.0.0.1:3000/customers', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                phone_number,
                credit_limit
            })
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json()
            })
            .then((newUser) => {
                setAllCustomers(() => [...allCustomers, newUser])
                closeCreateUser(e)
                console.log('newUser', newUser);
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }


    //!Create Employees
    function handleCreateEmployee(e) {
        e.preventDefault()
        console.log('STARRT');
        if (lastname === '' || firstname === '' || business_name === '' || role === '' || office_phone === '' || phone_number === "") {
            setError('Please fill out all fields');
            return;
        } else if (password !== password_confirmation) {
            setError('Passwords do not match');
            return;
        }
        console.log('CONT...');
        // const token = sessionStorage.getItem("jwt");
        // const user_id = sessionStorage.getItem("user_id");
        setError('');
        fetch('http://127.0.0.1:3000/employees', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            //Authorization: `Bearer ${token}`,
            body: JSON.stringify({
                firstname,
                lastname,
                business_name,
                role,
                email,
                office_phone,
                phone_number,
                password,
                password_confirmation
            })
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json()
            })
            .then((newUser) => {
                setEmployees(() => [...employees, newUser])
                closeCreateUser(e)
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }

    //!Create Supplier
    function handleCreateSupplier(e) {
        e.preventDefault()
        console.log('STARRT');
        if (lastname === '' || firstname === '' || company_name === '' || phone_number === "") {
            setError('Please fill out all fields');
            return;
        } else if (password !== password_confirmation) {
            setError('Passwords do not match');
            return;
        }
        console.log('CONT...');
        // const token = sessionStorage.getItem("jwt");
        // const user_id = sessionStorage.getItem("user_id");
        setError('');
        fetch('http://127.0.0.1:3000/suppliers', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            //Authorization: `Bearer ${token}`,
            body: JSON.stringify({
                firstname,
                lastname,
                company_name,
                email,
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
                setAllSuppliers(() => [...allSuppliers, newUser])
                closeCreateUser(e)
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }

    // !closes create_customer_overlay
    const closeCreateUser = (e) => {
        e.preventDefault()
        setUpdateEmployee(false)
        setAltEmployee('')
        setUsername("")
        setCredit_limit()
        setFirstname("");
        setLastname("");
        setCompany_name("")
        setEmail("");
        setRole("")
        setBusiness_name("")
        setOffice_phone("")
        setPhone_number("")
        setPassword('');
        setPassword_confirmation('');
        setCreateEmployee(false)
        setCreateCustomer(false)
        setCreateSupplier(false)
        setUpdateCustomer(false)
        setUpdateSupplier(false)
        setError('')
    }


    const openCustomerOverlay = (e, user) => {
        e.preventDefault()
        setAltCustomer(user)
        setUpdateCustomer(true)
    }

    const openEmployeeOverlay = (e, user) => {
        e.preventDefault()
        setAltEmployee(user)
        setUpdateEmployee(true)
    }

    const openSupplierOverlay = (e, user) => {
        e.preventDefault()
        setAltSupplier(user)
        setUpdateSupplier(true)
    }

    // !Customer update form states
    useEffect(() => {
        if (altCustomer) {
            setUsername(altCustomer.username || "");
            setCredit_limit(altCustomer.credit_limit || 9);
            setEmail(altCustomer.email || "");
            setPhone_number(altCustomer.phone_number || "");
        }
    }, [altCustomer]);

    // !Employee update form states
    useEffect(() => {
        if (altEmployee) {
            setFirstname(altEmployee.firstname || "");
            setLastname(altEmployee.lastname || "");
            setBusiness_name(altEmployee.business_name || "")
            setRole(altEmployee.role || "")
            setEmail(altEmployee.email || "");
            setPhone_number(altEmployee.phone_number || "");
            setOffice_phone(altEmployee.office_phone || "");
        }
    }, [altEmployee]);

    // !Supplier update form states
    useEffect(() => {
        if (altSupplier) {
            setFirstname(altSupplier.firstname || "");
            setLastname(altSupplier.lastname || "");
            setCompany_name(altSupplier.company_name || "")
            setEmail(altSupplier.email || "");
            setPhone_number(altSupplier.phone_number || "");
        }
    }, [altSupplier]);

    // !customers DataTable columns
    const Customer_columns = [
        {
            name: <span style={{ fontWeight: 'bold' }}>ID</span>,
            selector: row => row.id,
            sortable: true,
            style: {
                fontWeight: 'bold'
            }
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Username</span>,
            selector: row => row.username,
            sortable: true
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Phone Number</span>,
            selector: row => row.phone_number,
            sortable: false
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>E-mail</span>,
            selector: row => row.email,
            sortable: false
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Credit Limit</span>,
            selector: row => row.credit_limit,
            sortable: true
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Action</span>,
            cell: (row) => {
                return (
                    <>
                        <button className="btn" onClick={(e) => handleDeleteCustomer(e, row.id)}>
                            <Trash2 strokeWidth={1} color="#ff0000" size={20} />
                        </button>
                        <button className="btn" onClick={(e) => openCustomerOverlay(e, row)}>
                            <Edit strokeWidth={1} color="blue" size={20} />
                        </button>
                    </>
                );
            }
        },
    ];

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
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Office No.</span>,
            selector: row => row.office_phone,
            sortable: false
        }, {
            name: <span style={{ fontWeight: 'bold' }}>Action</span>,
            cell: (row) => {
                return (
                    <>
                        <button className="btn" onClick={(e) => handleDeleteEmployee(e, row.id)}>
                            <Trash2 strokeWidth={1} color="#ff0000" size={20} />
                        </button>
                        <button className="btn" onClick={(e) => openEmployeeOverlay(e, row)}>
                            <Edit strokeWidth={1} color="blue" size={20} />
                        </button>
                    </>
                );
            }
        },
    ];

    // !supplier DataTable columns
    const supplier_columns = [
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
            name: <span style={{ fontWeight: 'bold' }}>Company Name</span>,
            selector: row => row.company_name,
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
                        <button className="btn" onClick={(e) => handleDeleteSupplier(e, row.id)}>
                            <Trash2 strokeWidth={1} color="#ff0000" size={20} />
                        </button>
                        <button className="btn" onClick={(e) => openSupplierOverlay(e, row)}>
                            <Edit strokeWidth={1} color="blue" size={20} />
                        </button>
                    </>
                );
            }
        },
    ];

    // !update filter state after refresh
    useEffect(() => {
        setCustomerRecords(() => allCustomers)
    }, [allCustomers])

    // !update filter state after refresh
    useEffect(() => {
        setEmployeeRecords(() => employees)
    }, [employees])

    // !update filter state after refresh
    useEffect(() => {
        setSupplierRecords(() => allSuppliers)
    }, [allSuppliers])



    // !form filter for Customers
    const handleFilterCustomers = (e) => {
        const searchQuery = e.target.value.toLowerCase().trim();
        const newData = allCustomers.filter(row => {
            return row.username.includes(searchQuery)
        })
        setCustomerRecords(() => newData)
    }

    // !form filter for Employee

    const handleFilteremployee = (e) => {
        e.preventDefault()
        const searchQuery = e.target.value.toLowerCase().trim();
        const newData = employees.filter(row => {
            return row.firstname.includes(searchQuery)
        })
        setEmployeeRecords(() => newData)
    }

    // !form filter for Employee
    const handleFiltersuppliers = (e) => {
        e.preventDefault()
        const searchQuery = e.target.value.toLowerCase().trim();
        const newData = allSuppliers.filter(row => {
            return row.firstname.includes(searchQuery)
        })
        setSupplierRecords(() => newData)
    }


    // !Switch between table tabs
    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="wrapper overflow-y-scroll" style={{ width: '95vw', height: '100vh' }}>
            <div className="container-fluid ">

                <div
                    className="row justify-content-center align-items-center g-2"
                >
                    <div className="col-12">
                        <Navbar />
                    </div>
                    <div className="col-12">
                        <div className="card text-center">
                            <div className="card-header px-3">
                                <ul className="nav nav-tabs card-header-tabs  ">
                                    <li className="nav-item table-nav">
                                        <p
                                            className={`nav-link px-1 px-sm-3  ${activeTab === 0 ? 'active' : ''}`}
                                            onClick={() => handleTabClick(0)}

                                        >
                                            Customers Information
                                        </p>
                                    </li>
                                    <li className="nav-item table-nav">
                                        <p
                                            className={`nav-link px-1 px-sm-3  ${activeTab === 1 ? 'active' : ''}`}
                                            onClick={() => handleTabClick(1)}

                                        >
                                            Suppliers Information
                                        </p>
                                    </li>
                                    <li className="nav-item table-nav">
                                        <p
                                            className={`nav-link px-1 px-sm-3  ${activeTab === 2 ? 'active' : ''}`}
                                            onClick={() => handleTabClick(2)}

                                        >
                                            Employees Information
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body">
                                {`${activeTab === 0 ? 'active' : ''}` &&
                                    <>
                                        {/* Customers table */}
                                        <div className="col-12">
                                            <div class="card border-0 text-start">
                                                <div class="card-body">
                                                    <div className="row justify-content-between align-items-center g-2"
                                                    >
                                                        <div className='col-3'><button className="btn text-primary py-1" onClick={(e) => openCreateCustomer(e)}><PlusCircle strokeWidth={1} />  Add Customers</button></div>
                                                        <div className="text-end col-3"><input className='form-control form-control-sm rounded-4 h-75 ps-3' placeholder='Filter data' type="text" onChange={(e) => handleFilterCustomers(e)} /></div>
                                                    </div>

                                                    <DataTable
                                                        columns={Customer_columns}
                                                        data={customerRecords}
                                                        fixedHeader
                                                        pagination
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                                {`${activeTab === 1 ? 'active' : ''}` &&
                                    <>
                                        {/* suppliers table */}
                                        <div className="col-12">
                                            <div class="card border-0  text-start">
                                                <div class="card-body">
                                                    <div className="row justify-content-between align-items-center g-2"
                                                    >
                                                        <div className='col-3'><button className="btn text-primary py-1" onClick={(e) => openCreateSupplier(e)}><PlusCircle strokeWidth={1} />  Add Supplier</button></div>
                                                        <div className="text-end col-3"><input className='form-control form-control-sm rounded-4 h-75 ps-3' placeholder='Filter data' type="text" onChange={(e) => handleFiltersuppliers(e)} /></div>
                                                    </div>

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

                                    </>
                                }
                                {`${activeTab === 2 ? 'active' : ''}` &&
                                    <>
                                        {/* Employees table */}
                                        <div className="col-12">
                                            <div class="card border-0 text-start">
                                                <div class="card-body">
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
                                    </>
                                }
                            </div>
                        </div>
                    </div>



                </div>
                {/* update Customers */}
                {updateCustomer &&
                    <div className='updateOverlay'>

                        <div className="card border-0 " style={{ width: '35vw' }}>
                            <div className="card-body">
                                <div className="row d-flex justify-content-between">
                                    <div className="col-6 m-0">
                                        <p className='fw-bold text-start'>Update Customer</p>
                                    </div>
                                    <div className="col-2  ">
                                        <button className='btn py-0' onClick={(e) => closeCreateUser(e)}>
                                            <X size={30} />
                                        </button>
                                    </div>
                                </div>
                                <form className="col mx-auto" onSubmit={(e) => handleCustomer(e)}>
                                    <div className="align-items-center  mb-3">
                                        <div className="form-outline  mb-0 col">
                                            <div className="form__div m-1">
                                                <input type="text" className="form-control rounded" value={username} onChange={(e) => setUsername(e.target.value)} />
                                                <label className="form__label text-start text-capitalize" >Username</label>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="align-items-center  mb-3">
                                        <div className="form-outline  mb-0 col">
                                            <div className="form__div m-1">
                                                <select className="form-control rounded form-select-lg"
                                                    value={parseInt(credit_limit)}
                                                    onChange={(e) => setCredit_limit(parseInt(e.target.value))}
                                                >
                                                    <option default value={10}>0</option>
                                                    <option value={20000}>20,000</option>
                                                    <option value={50000}>50,000</option>
                                                    <option value={100000}>100,000</option>
                                                </select>
                                                <label className="form__label text-start text-capitalize" >credit Limit</label>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="align-items-center mb-2">

                                        <div className="form-outline  mb-0 col">
                                            <div className="form__div m-1">
                                                <input type="email" className="form-control rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <label className="form__label text-start text-capitalize" >Email</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="align-items-center mb-2">

                                        <div className="form-outline  mb-0 col">
                                            <div className="form__div m-1">
                                                <input type="tel" className="form-control rounded" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} />
                                                <label className="form__label text-start text-capitalize" >Phone Number</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-outline  mb-0 col text-start pb-2 d-flex justify-content-around">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" />
                                            <label className="form-check-label" for="">
                                                Discounted
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" />
                                            <label className="form-check-label" for="">
                                                Block user
                                            </label>
                                        </div>
                                    </div>


                                    {/* 
                            <div className="form-check d-flex justify-content-center mb-5">
                                <label className="form-check-label" for="form2Example3">
                                I agree all statements in <a href="#!">Terms of service</a>
                                </label>
                            </div> */}

                                    {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 pb-md-4 pb-sm-2 ">
                                        <button type="submit" className="btn btn-primary ">Update Customer</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
                {/* Update employees */}
                {updateEmployee &&
                    <div className='updateOverlay'>

                        <div className="card border-0 " style={{ width: '30vw' }}>
                            <div className="card-body">
                                <div className="row d-flex justify-content-between">
                                    <div className="col-6 m-0">
                                        <p className='fw-bold text-start'>Update Employee</p>
                                    </div>
                                    <div className="col-2  ">
                                        <button className='btn py-0' onClick={(e) => closeCreateUser(e)}>
                                            <X size={30} />
                                        </button>
                                    </div>
                                </div>
                                <form className="col mx-auto" onSubmit={(e) => handleEmployeeUpdate(e)}>
                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className=" col-6 align-items-center  mb-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="text" className="form-control rounded" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >First Name</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-6 align-items-center  mb-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="text" className="form-control rounded" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Last Name</label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="align-items-center  mb-3">
                                        <div className="form-outline  mb-0 col">
                                            <div className="form__div m-1">
                                                <input type="text" className="form-control rounded" value={business_name} onChange={(e) => setBusiness_name(e.target.value)} />
                                                <label className="form__label text-start text-capitalize" >Business Name</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className="col-12 align-items-center mb-2">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="email" className="form-control rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Email</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 align-items-center mb-2">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <div class="mb-3 form__div">
                                                        <select
                                                            class="form-select"
                                                            value={role}
                                                             onChange={(e) =>setRole(e.target.value)}
                                                        >
                                                            <option selected>Select one</option>
                                                            <option value="default">Member</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="manager">Manager</option>
                                                            <option value="blocked">blocked</option>
                                                        </select>
                                                        <label className="form__label text-start text-capitalize" style={{top:'-10px',left:'10px',fontSize:'12px'}}>Role</label>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className="col-6 align-items-center mb-2">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="tel" className="form-control rounded" value={office_phone} onChange={(e) => setOffice_phone(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Office Phone</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 align-items-center  mb-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="tel" className="form-control rounded" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Phone Number</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="  align-items-center mb-2">
                                        <div className="form-outline mb-0">
                                            <div className="form__div m-1">
                                                <input type="password" className="form-control rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                <label className="form__label text-start text-capitalize" >Password</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className=" align-items-center mb-2">
                                        <div className="form-outline  mb-0">
                                            <div className="form__div m-1">
                                                <input type="password" className="form-control rounded" value={password_confirmation} onChange={(e) => setPassword_confirmation(e.target.value)} />
                                                <label className="form__label text-start text-capitalize" >confirm password</label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 
                  <div className="form-check d-flex justify-content-center mb-5">
                      <label className="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                      </label>
                  </div> */}

                                    {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
                                    <div className="d-flex justify-content-center mx-4  mb-lg-4 pb-sm-2 ">
                                        <button type="submit" className="btn btn-primary ">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
                {/* Update Supplier */}
                {updateSupplier &&
                    <div className='updateOverlay'>

                        <div className="card border-0 " style={{ width: '30vw' }}>
                            <div className="card-body">
                                <div className="row d-flex justify-content-between">
                                    <div className="col-6 m-0">
                                        <p className='fw-bold text-start'>Update Supplier</p>
                                    </div>
                                    <div className="col-2  ">
                                        <button className='btn py-0' onClick={(e) => closeCreateUser(e)}>
                                            <X size={30} />
                                        </button>
                                    </div>
                                </div>
                                <form className="col mx-auto" onSubmit={(e) => handleSupplierUpdate(e)}>
                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className=" col-6 align-items-center  mb-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="text" className="form-control rounded" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >First Name</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-6 align-items-center  mb-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="text" className="form-control rounded" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Last Name</label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="align-items-center  mb-3">
                                        <div className="form-outline  mb-0 col">
                                            <div className="form__div m-1">
                                                <input type="text" className="form-control rounded" value={company_name} onChange={(e) => setCompany_name(e.target.value)} />
                                                <label className="form__label text-start text-capitalize" >Company Name</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className="col-12 align-items-center mb-2">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="email" className="form-control rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Email</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 align-items-center  mb-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="tel" className="form-control rounded" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Phone Number</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 
                  <div className="form-check d-flex justify-content-center mb-5">
                      <label className="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                      </label>
                  </div> */}

                                    {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
                                    <div className="d-flex justify-content-center mx-4  mb-lg-4 pb-sm-2 ">
                                        <button type="submit" className="btn btn-primary ">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }


                {/* create new Customer form */}
                {createCustomer &&
                    <div className='createUserOverlay'>

                        <div className="card border-0 " style={{ width: '30vw' }}>
                            <div className="card-body">
                                <div className="row d-flex justify-content-between">
                                    <div className="col-6 m-0">
                                        <p className='fw-bold text-start'>Add Customer</p>
                                    </div>
                                    <div className="col-2  ">
                                        <button className='btn py-0' onClick={(e) => openCreateCustomer(e)}>
                                            <X size={30} />
                                        </button>
                                    </div>
                                </div>
                                <form className="col mx-auto" onSubmit={(e) => handleCreateCustomers(e)}>
                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className=" col-12 align-items-center  mb-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="text" className="form-control rounded" value={username} onChange={(e) => setUsername(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Username</label>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-12 align-items-center mb-2">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="email" className="form-control rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Email</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 align-items-center mb-2">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="tel" className="form-control rounded" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Phone Number</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className="col-6 align-items-center  mb-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <select className="form-control rounded form-select-lg"
                                                        value={parseInt(credit_limit)}
                                                        onChange={(e) => setCredit_limit(parseInt(e.target.value))}
                                                    >
                                                        <option selected value={0}>0</option>
                                                        <option value={20000}>20,000</option>
                                                        <option value={50000}>50,000</option>
                                                        <option value={100000}>100,000</option>
                                                    </select>
                                                    <label className="form__label text-start text-capitalize" >credit Limit</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-6 form-outline  mb-0 col text-start pb-2">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" />
                                                <label className="form-check-label" for="">
                                                    Discounted
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" />
                                                <label className="form-check-label" for="">
                                                    Block user
                                                </label>
                                            </div>
                                        </div>
                                    </div>




                                    {/* 
                  <div className="form-check d-flex justify-content-center mb-5">
                      <label className="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                      </label>
                  </div> */}

                                    {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 pb-md-4 pb-sm-2 ">
                                        <button type="submit" className="btn btn-primary ">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }

                {/* create new Employees form */}
                {createEmployee &&
                    <div className='createUserOverlay'>

                        <div className="card border-0 " style={{ width: '30vw' }}>
                            <div className="card-body">
                                <div className="row d-flex justify-content-between">
                                    <div className="col-6 m-0">
                                        <p className='fw-bold text-start'>Add Employee</p>
                                    </div>
                                    <div className="col-2  ">
                                        <button className='btn py-0' onClick={(e) => openCreateEmployee(e)}>
                                            <X size={30} />
                                        </button>
                                    </div>
                                </div>
                                <form className="col mx-auto" onSubmit={(e) => handleCreateEmployee(e)}>
                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className=" col-6 align-items-center  mb-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="text" className="form-control rounded" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >First Name</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-6 align-items-center  mb-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="text" className="form-control rounded" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Last Name</label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="align-items-center  mb-3">
                                        <div className="form-outline  mb-0 col">
                                            <div className="form__div m-1">
                                                <input type="text" className="form-control rounded" value={business_name} onChange={(e) => setBusiness_name(e.target.value)} />
                                                <label className="form__label text-start text-capitalize" >Business Name</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className="col-12 align-items-center mb-2">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="email" className="form-control rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Email</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 align-items-center mb-2">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <select
                                                        class="form-select"
                                                        value={role}
                                                        onChange={(e) => setRole(e.target.value)}>
                                                        
                                                        <option value="menmber" selected>Member</option>
                                                        <option value="Manager">Manager</option>
                                                        <option value="admin">admin</option>
                                                        <option value="Cashier">blocked</option>
                                                    </select>
                                                    <label className="form__label text-start text-capitalize" >Job Title</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className="col-6 align-items-center mb-2">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="tel" className="form-control rounded" value={office_phone} onChange={(e) => setOffice_phone(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Office Phone</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 align-items-center  mb-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="tel" className="form-control rounded" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Phone Number</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="  align-items-center mb-2">
                                        <div className="form-outline mb-0">
                                            <div className="form__div m-1">
                                                <input type="password" className="form-control rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                <label className="form__label text-start text-capitalize" >Password</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className=" align-items-center mb-2">
                                        <div className="form-outline  mb-0">
                                            <div className="form__div m-1">
                                                <input type="password" className="form-control rounded" value={password_confirmation} onChange={(e) => setPassword_confirmation(e.target.value)} />
                                                <label className="form__label text-start text-capitalize" >confirm password</label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 
                  <div className="form-check d-flex justify-content-center mb-5">
                      <label className="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                      </label>
                  </div> */}

                                    {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
                                    <div className="d-flex justify-content-center mx-4  mb-lg-4 pb-sm-2 ">
                                        <button type="submit" className="btn btn-primary ">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
                {/* create new Supplier form */}
                {createSupplier &&
                    <div className='createUserOverlay'>

                        <div className="card border-0 " style={{ width: '30vw' }}>
                            <div className="card-body">
                                <div className="row d-flex justify-content-between">
                                    <div className="col-6 m-0">
                                        <p className='fw-bold text-start'>Add Supplier</p>
                                    </div>
                                    <div className="col-2  ">
                                        <button className='btn py-0' onClick={(e) => openCreateSupplier(e)}>
                                            <X size={30} />
                                        </button>
                                    </div>
                                </div>
                                <form className="col mx-auto" onSubmit={(e) => handleCreateSupplier(e)}>
                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className=" col-6 align-items-center  mb-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="text" className="form-control rounded" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >First Name</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-6 align-items-center  mb-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="text" className="form-control rounded" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Last Name</label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="align-items-center  mb-3">
                                        <div className="form-outline  mb-0 col">
                                            <div className="form__div m-1">
                                                <input type="text" className="form-control rounded" value={company_name} onChange={(e) => setCompany_name(e.target.value)} />
                                                <label className="form__label text-start text-capitalize" >Company Name</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className="col-12 align-items-center mb-2">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="email" className="form-control rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Email</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className="col-12 align-items-center  mb-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="tel" className="form-control rounded" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Phone Number</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 
                  <div className="form-check d-flex justify-content-center mb-5">
                      <label className="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                      </label>
                  </div> */}

                                    {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
                                    <div className="d-flex justify-content-center mx-4  mb-lg-4 pb-sm-2 ">
                                        <button type="submit" className="btn btn-primary ">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Users