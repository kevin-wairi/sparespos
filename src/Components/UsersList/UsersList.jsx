import React, { useState, useEffect, useContext } from 'react'
import { Edit, PlusCircle, X } from 'react-feather';
import DataTable from 'react-data-table-component'
import './UsersList.css'
import { NavLink } from 'react-router-dom';
import { UrlContext } from '../../Context/UrlProvider';

function UsersList({ users, setUsers }) {

    const apiUrl = useContext(UrlContext)

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [phone_number, setPhone_number] = useState('')
    const [role, setRole] = useState('member')
    const [email, setEmail] = useState("")

    const [usersRecords, setUsersRecords] = useState(users)

    const [altUser, setAltUser] = useState();
    const [filterByRole, setFilterByRole] = useState('')
    const [filterByName, setFilterByName] = useState('')

    const [isCollapsed, setIsCollapsed] = useState(true);

    // !collapse form
    useEffect(() => {
        if (altUser) {
            setIsCollapsed(false);
            setFirstname(altUser.firstname)
            setLastname(altUser.lastname)
            setPhone_number(altUser.phone_number)
            setRole(altUser.role)
            setEmail(altUser.email)
        }
    }, [altUser])


    // !update filter state after refresh
    useEffect(() => {
        setUsersRecords(() => users)
    }, [users])

    // !form filter for Users

    useEffect(() => {
        console.log('OKRR');
        const searchQuery1 = filterByName.toLowerCase().trim();
        const searchQuery2 = filterByRole
        const newData = users.filter(user => {
            const matchName = user.firstname.startsWith(searchQuery1.toLowerCase())
            const matchRole = !searchQuery2 || user.role === searchQuery2
            return matchName && matchRole;
        })
        setUsersRecords(() => newData)
    }, [filterByName, filterByRole, users])

    //!delete Users
    function handleDeleteUsers(e, user_id) {
        e.preventDefault()
        fetch(`http://127.0.0.1:3000/employees/${user_id}`, {
            method: "DELETE",
        })
            .then(() => {
                const current = users.filter(user => user.id !== user_id)
                console.log('DELETED');
            })
    }

    // !Users DataTable columns
    const users_columns = [
        {
            name: <span style={{ fontWeight: 'bold' }}>Employee</span>,
            selector: row =>
                <div className='d-flex justify-content-between gap-2 align-items-center '>
                    <div style={{height:'6vh', width:'3vw'}}>
                        <img className='img-fluid' src={row.profile_image} alt="info" />
                    </div>
                    <div>
                        <ul className=' list-unstyled mb-0'>
                            <li style={{fontWeight:'bold'}}>{row.firstname + " " + row.lastname}</li>
                            <li>{row.email}</li>
                        </ul>
                    </div>
                </div>
            
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Business Name</span>,
            selector: row => row.business_name,
            sortable: true
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Function</span>,
            selector: row => <span className='text-capitalize'>{row.role}</span>,
            sortable: true
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Status</span>,
            selector: row => row.status,
            sortable: true
        },
        {
            name: <span style={{ fontWeight: 'bold' }}>Action</span>,
            cell: (row) => {
                return (
                    <>
                        <button className="btn fw-bold text-muted" onClick={() => setAltUser(row)}>
                            Edit
                        </button>
                    </>
                );
            }
        },
    ];

    //!Update Users
    function handleUpdateUser(e) {
        e.preventDefault()
        const user_id = altUser.id
        const token = sessionStorage.getItem("jwt");
        fetch(apiUrl + `/employees/${user_id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                firstname,
                lastname,
                phone_number,
                role,
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
                setUsers(prevUsers => {
                    return prevUsers.map(user => {
                        if (user.id === updatedUser.id) {
                            return updatedUser;
                        } else {
                            return user;
                        }
                    })
                })
                setFirstname("")
                setLastname("")
                setPhone_number("")
                setRole('member')
                setEmail("")
                setIsCollapsed(true)
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }
    const handleCollapse = () => {
        setFirstname("")
        setLastname("")
        setPhone_number("")
        setRole('member')
        setEmail("")
        setIsCollapsed(true)
    }



    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center g-2">
                <div className="col-12 ">
                    <div className="bg-grey-50 rounded d-flex justify-content-between align-items-center g-2 p-2">
                        <div className="">
                            <p className='m-0 text-white fs-4'>Users</p>
                        </div>
                        <div>
                            <div
                                class="d-flex justify-content-center align-items-center gap-3 g-2"
                            >
                                <NavLink to='/catalog/users/roles'>
                                    <button type="button" className="btn bg-white">
                                        View POS Roles
                                    </button>
                                </NavLink>
                                <NavLink to='/catalog/users/new'>
                                    <button type="button" className="btn btn-primary" >
                                        Add Staff
                                    </button>
                                </NavLink>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={`users_card col-12 ${isCollapsed ? 'closed' : 'opened'}`} >
                    {/* <UserFormCard altUser={altUser} setUsers={setUsers} handleCollapse={handleCollapse} /> */}
                    <div className="card text-start">
                        <div className='px-3 pt-3'>
                            <div
                                class="d-flex justify-content-between align-items-start g-2"
                            >
                                <div><p>Edit Staff</p></div>
                                <div onClick={() => handleCollapse(true)}><X /></div>
                            </div>

                        </div>
                        <div className="card-body">
                            <form onSubmit={(e) => handleUpdateUser(e)}>
                                <div className="row justify-content-around align-items-center g-2 " >
                                    <div className="col-md-3 col-11">
                                        <div className="form-group">
                                            <label className="form-label text-start text-capitalize" >First Name</label>
                                            <input type="text" className="form-control rounded" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-11">
                                        <div className="form-group">
                                            <label className="form-label text-start text-capitalize" >Last Name</label>
                                            <input type="text" className="form-control rounded" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-11">
                                        <div className="form-group">
                                            <label className="form-label text-start text-capitalize" >Email</label>
                                            <input type="email" className="form-control rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-11">
                                        <div className="form-group">
                                            <label className="form-label text-start text-capitalize" >Phone </label>
                                            <input type="text" className="form-control rounded" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-11">
                                        <div className="form-group">
                                            <label className="form-label text-start text-capitalize" >Roles </label>
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
                                    <div className="col-md-4 col-11">
                                        <div
                                            class="d-flex justify-content-center align-items-end mt-4 g-2"
                                        >
                                            <button type='submit' className="btn btn-primary flex-fill">Submit</button>
                                        </div>

                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                {/* Users table */}
                <div className="col-12">
                    <div className="card border-0 text-start">
                        <div className="card-body">
                            <div className="row justify-content-between align-items-center g-2 mb-3"
                            >
                                <div className='col-3'>
                                    <NavLink to={'/catalog/users/new'}>
                                        <button className="btn text-primary py-1" >
                                            <PlusCircle strokeWidth={1} />  Add Staff
                                        </button>
                                    </NavLink>
                                </div>

                                <div className="col-5 ">
                                    <div
                                        className="d-flex justify-content-center gap-3 align-items-center g-2"
                                    >
                                        <div>
                                            <select
                                                className="form-select py-1"
                                                onChange={(e) => setFilterByRole(e.target.value)}
                                            >
                                                <option value='' selected>All users</option>
                                                <option value="default">Default</option>
                                                <option value="member">Members</option>
                                                <option value="manager">Managers</option>
                                                <option value="admin">Admins</option>
                                            </select>
                                        </div>

                                        <div><input className='form-control h-75' placeholder='Filter by Firstname' type="text" onChange={(e) => setFilterByName(e.target.value)} /></div>
                                    </div>

                                </div>
                            </div>

                            <DataTable
                                columns={users_columns}
                                data={usersRecords}
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

export default UsersList