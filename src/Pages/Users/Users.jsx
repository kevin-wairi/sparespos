import React, { useState, useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Trash2, Edit, X, PlusCircle, Search } from 'react-feather';
import DataTable from 'react-data-table-component';
import './Users.css'

function Users({ allUsers, setAllUsers }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const nPages = Math.ceil(allUsers.length / recordsPerPage)

    // *user states
    const [firstname, setfirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [businessName, setBusinessName] = useState("")
    const [role, setRole] = useState()
    const [password, setPassword] = useState("")
    const [creditLimit, setCreditLimit] = useState(0)
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const [updateUser, setUpdateUser] = useState(false)
    const [createUser, setCreateUser] = useState(false)
    const [altUser, setAltUser] = useState();
    const [error, setError] = useState("")
    const [records, setRecords] = useState(allUsers)


    //!delete user
    function handleDeleteUser(e, user_id) {
        e.preventDefault()
        fetch(`http://localhost:3000/users/${user_id}`, {
            method: "DELETE",
        })
            .then(() => {
                const currentUsers = allUsers.filter(user => user.id === user_id)
                setAllUsers(() => currentUsers)
            })
    }
    // !open create user overlay
    const openCreateUser = (e) => {
        e.preventDefault()
        setCreateUser(true)
    }
    // !closes create user overlay
    const closeCreateUser = (e) => {
        e.preventDefault()
        setUpdateUser(false)
        setAltUser('')
        setLastname("");
        setfirstname("");
        setBusinessName("");
        setRole("");
        setEmail("");
        setPassword('');
        setPasswordConfirmation('');
        setCreateUser(false)

    }

    //!Update user
    function handleUserUpdate(e) {
        e.preventDefault()
        console.log('STARRT');
        if (lastname === '' || firstname === '' || role === '' || email === '') {
            setError('Please fill out all fields');
            return;
        } else if (password !== passwordConfirmation) {
            setError('Passwords do not match');
            return;
        }
        console.log('CONT...');
        const user_id = altUser.id
        // const token = sessionStorage.getItem("jwt");
        // const user_id = sessionStorage.getItem("user_id");
        setError('');
        fetch(`http://localhost:3000/users/${user_id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            //Authorization: `Bearer ${token}`,
            body: JSON.stringify({
                lastname,
                firstname,
                businessName,
                role,
                email,
                password,
                passwordConfirmation,
                creditLimit
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
                setAllUsers(prevUsers => {
                    return prevUsers.map(user => {
                        if (user.id === updatedUser.id) {
                            return updatedUser;
                        } else {
                            return user;
                        }
                    })
                })
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }

    //!Create user
    function handleCreateUser(e) {
        e.preventDefault()
        console.log('STARRT');
        if (lastname === '' || firstname === '' || role === '' || email === '' || businessName === "") {
            setError('Please fill out all fields');
            return;
        } else if (password !== passwordConfirmation) {
            setError('Passwords do not match');
            return;
        }
        console.log('CONT...');
        // const token = sessionStorage.getItem("jwt");
        // const user_id = sessionStorage.getItem("user_id");
        setError('');
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            //Authorization: `Bearer ${token}`,
            body: JSON.stringify({
                firstname,
                lastname,
                businessName,
                role,
                email,
                password,
                passwordConfirmation,
                creditLimit
            })
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json()
            })
            .then((newUser) => {
                console.log('D', newUser);
                setAllUsers(() => [...allUsers, newUser])
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }

    const openUserOverlay = (e, user) => {
        e.preventDefault()
        setAltUser(user)
        setUpdateUser(true)
    }
    const closeUserOverlay = (e) => {
        e.preventDefault()
        setUpdateUser(false)
        setLastname("");
        setAltUser('')
        setfirstname("");
        setBusinessName("");
        setRole("");
        setEmail("");
        setPassword('');
        setPasswordConfirmation('');
    }

    useEffect(() => {
        if (updateUser || altUser) {
            setLastname(altUser.lastname || "");
            setfirstname(altUser.firstname || "");
            setLastname(altUser.businessName || "");
            setRole(altUser.role || "");
            setEmail(altUser.email || "");
            setPassword(altUser.password); // You may or may not want to set a default password
            setPasswordConfirmation(altUser.passwordConfirmation);
        }
    }, [updateUser, altUser]);

    const columns = [
        {
            name: 'Fullname',
            selector: row => row.firstname + " " + row.lastname,
            sortable: true
        },
        {
            name: 'Business Name',
            selector: row => row.businessName,
            sortable: true
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true
        },
        {
            name: 'E-mail',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Credit Limit',
            selector: row => row.creditLimit,
            sortable: true
        }, {
            name: 'Action',
            cell: (row) => {
                return (
                    <>
                        <button className="btn" onClick={(e) => handleDeleteUser(e, row.id)}>
                            <Trash2 strokeWidth={1} color="#ff0000" size={20} />
                        </button>
                        <button className="btn" onClick={(e) => openUserOverlay(e, row)}>
                            <Edit strokeWidth={1} color="blue" size={20} />
                        </button>
                    </>
                );
            }
        },
    ];

    const data = records

    const handleFilter = (e) => {
        e.preventDefault()
        const newData = allUsers.filter(row => {
            return row.firstname.toLowerCase().includes(e.target.value)
        })
        setRecords(() => newData)
    }

    return (
        <div className="wrapper " style={{ width: '95vw' }}>
            <div className="container-fluid">

                <div
                    className="row justify-content-center align-items-center g-2"
                >
                    <div className="col-12">
                        <Navbar />
                    </div>
                    <div class="card border-0 text-start">
                        <div class="card-body">
                            <div className="row justify-content-between align-items-center g-2"
                            >
                                <div className='col-3'><button className="btn bg-primary text-white py-1" onClick={(e) => openCreateUser(e)}><PlusCircle strokeWidth={1} />  Add User</button></div>
                                <div className="text-end col-3"><input className='form-control form-control-sm rounded-4 h-75 ps-3' placeholder='Filter data' type="text" onChange={(e) => handleFilter(e)} /></div>
                            </div>

                            <DataTable
                                columns={columns}
                                data={data}
                                fixedHeader
                                pagination
                            />
                        </div>
                    </div>
                </div>
                {updateUser &&
                    <div className='updateUserOverlay'>

                        <div className="card border-0 " style={{ width: '35vw' }}>
                            <div className="card-body">
                                <div className="row d-flex justify-content-between">
                                    <div className="col-6 m-0">
                                        <p className='fw-bold text-start'>Update User</p>
                                    </div>
                                    <div className="col-2  ">
                                        <button className='btn py-0' onClick={(e) => closeUserOverlay(e)}>
                                            <X size={30} />
                                        </button>
                                    </div>
                                </div>
                                <form className="col mx-auto" onSubmit={(e) => handleUserUpdate(e)}>
                                    <div className="align-items-center  my-3">
                                        <div className="form-outline  mb-0 col">
                                            <div className="form__div m-1">
                                                <input type="text" className="form-control rounded" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                                <label className="form__label text-start text-capitalize" >lastname</label>
                                            </div>

                                        </div>
                                    </div>

                                    {altUser.role !== 'administrator' &&
                                        <>
                                            <div className="align-items-center  my-3">
                                                <div className="form-outline  mb-0 col">
                                                    <div className="form__div m-1">
                                                        <select className="form-control rounded form-select-lg"
                                                            onChange={(e) => setRole(e.target.value)}
                                                        >
                                                            <option selected>Select one</option>
                                                            <option value="sales">Sales/Cashier</option>
                                                            <option value="customer">Customer</option>
                                                            <option value="supplier">Supplier</option>
                                                        </select>
                                                        <label className="form__label text-start text-capitalize" >Role</label>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="align-items-center  my-3">
                                                <div className="form-outline  mb-0 col">
                                                    <div className="form__div m-1">
                                                        <select className="form-control rounded form-select-lg"
                                                            onChange={(e) => setCreditLimit(e.target.value)}
                                                        >
                                                            <option selected value="0">0</option>
                                                            <option value="20000">20,000</option>
                                                            <option value="50000">50,000</option>
                                                            <option value="100000">100000</option>
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
                                        </>
                                    }

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
                                                <input type="password" className="form-control rounded" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
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
                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 pb-md-4 pb-sm-2 ">
                                        <button type="submit" className="btn btn-primary ">Update User</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }

                {/* create new user form */}
                {createUser &&
                    <div className='createUserOverlay'>

                        <div className="card border-0 " style={{ width: '45vw' }}>
                            <div className="card-body">
                                <div className="row d-flex justify-content-between">
                                    <div className="col-6 m-0">
                                        <p className='fw-bold text-start'>Add User</p>
                                    </div>
                                    <div className="col-2  ">
                                        <button className='btn py-0' onClick={(e) => closeCreateUser(e)}>
                                            <X size={30} />
                                        </button>
                                    </div>
                                </div>
                                <form className="col mx-auto" onSubmit={(e) => handleCreateUser(e)}>
                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className=" col-6 align-items-center  my-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="text" className="form-control rounded" value={firstname} onChange={(e) => setfirstname(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >First Name</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-6 align-items-center  my-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="text" className="form-control rounded" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Last Name</label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="align-items-center  my-3">
                                        <div className="form-outline  mb-0 col">
                                            <div className="form__div m-1">
                                                <input type="text" className="form-control rounded" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                                                <label className="form__label text-start text-capitalize" >Business Name</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className="col-6 align-items-center mb-2">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <input type="email" className="form-control rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize" >Email</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 align-items-center  my-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <select className="form-control rounded form-select-lg"
                                                        onChange={(e) => setRole(e.target.value)}
                                                    >
                                                        <option selected>Select one</option>
                                                        <option value="sales">Sales/Cashier</option>
                                                        <option value="customer">Customer</option>
                                                        <option value="supplier">Supplier</option>
                                                    </select>
                                                    <label className="form__label text-start text-capitalize" >Role</label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row justify-content-center align-items-center g-2">
                                        <div className="col-6 align-items-center  my-3">
                                            <div className="form-outline  mb-0 col">
                                                <div className="form__div m-1">
                                                    <select className="form-control rounded form-select-lg"
                                                        onChange={(e) => setCreditLimit(e.target.value)}
                                                    >
                                                        <option selected value="0">0</option>
                                                        <option value="20000">20,000</option>
                                                        <option value="50000">50,000</option>
                                                        <option value="100000">100000</option>
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
                                                <input type="password" className="form-control rounded" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
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
                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 pb-md-4 pb-sm-2 ">
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