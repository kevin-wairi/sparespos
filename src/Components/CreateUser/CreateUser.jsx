import React, { useContext, useEffect, useState } from 'react'
import { UrlContext } from '../../Context/UrlProvider'
import { useNavigate } from 'react-router'

function CreateUser({ altUser, setUsers, currentUser }) {

    const navigate = useNavigate()

    const apiUrl = useContext(UrlContext)
    const [selectedMethod, setSelectedMethod] = useState("")

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [business_name, setBusiness_name] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [role, setRole] = useState('member')
    const [email, setEmail] = useState("")

    useEffect(() => {
        console.log('ALT', altUser)
        if (altUser === '') {
            setSelectedMethod('add')
            setFirstname("")
            setLastname("")
            setBusiness_name("")
            setPhone_number("")
            setRole('member')
            setEmail("")
        } else if (altUser) {
            setSelectedMethod('edit')

            setFirstname(altUser.firstname)
            setLastname(altUser.business_name)
            setBusiness_name(altUser.business_name)
            setPhone_number(altUser.phone_number)
            setRole(altUser.role)
            setEmail(altUser.email)
        }
    }, [altUser])


    //!Create Users
    function handleCreateUser(e) {
        e.preventDefault()
        console.log('START');
        const token = sessionStorage.getItem("jwt");

        fetch(apiUrl + '/employees', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                firstname: firstname.toLowerCase(),
                lastname: lastname.toLowerCase(),
                role,
                email,
                business_name: currentUser.business_name,
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
                setFirstname("")
                setLastname("")
                setBusiness_name("")
                setPhone_number("")
                setRole('member')
                setEmail("")
                navigate('/catalof/users')

            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }


    


    const handleDiscard = () => {
        navigate('/catalog/users')
        setFirstname("")
        setLastname("")
        setBusiness_name("")
        setPhone_number("")
        setRole('member')
        setEmail("")
    }
    return (
        <div className="container-fluid">
            <form_div >
                <section>
                    <div className="contact_informaton">
                        <div className="row justify-content-center align-items-start g-2" >
                            <div className="col-sm-4 col-12">Contact Information</div>
                            <div className="col-sm-8 col-12">
                                <div className="card text-start">
                                    <div className="card-body">
                                        <div className="row justify-content-around align-items-center g-2" >
                                            <div className="col-md-5 col-11">
                                                <div className="form-group">
                                                    <label className="form-label text-start text-capitalize" >First Name</label>
                                                    <input type="text" className="form-control rounded" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-11">
                                                <div className="form-group">
                                                    <label className="form-label text-start text-capitalize" >Last Name</label>
                                                    <input type="text" className="form-control rounded" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-11">
                                                <div className="form-group">
                                                    <label className="form-label text-start text-capitalize" >Email</label>
                                                    <input type="email" className="form-control rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-11">
                                                <div className="form-group">
                                                    <label className="form-label text-start text-capitalize" >Phone <span className='text-warning'>(Optional)</span></label>
                                                    <input type="text" className="form-control rounded" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                </section>
                <hr />
                <section>
                    <div className="permissions">
                        <div className="row justify-content-center align-items-start g-2" >
                            <div className="col-sm-4 col-12">Point of sale access</div>
                            <div className="col-sm-8 col-12">
                                <div className="card text-start">
                                    <div className="card-body">
                                        <div
                                            className="row justify-content-center align-items-center g-2"
                                        >
                                            <div className="col-12"><p className="fw-bold">Permissions</p></div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label className="form-label text-start text-capitalize" >POS Role</label>
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

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>
                <hr />
                <section>
                    <div className="save">
                        <div
                            class="row justify-content-end align-items-center g-2"
                        >
                            <div class="col-md-3 col-4">
                                <div
                                    class="d-flex justify-content-center align-items-center gap-3 g-2"
                                >
                                    <div ><button className='btn bg-white border' onClick={handleDiscard}>Discard</button></div>
                                    <div ><button className='btn btn-primary' onClick={(e) => handleCreateUser(e)}>Save</button></div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>
            </form_div>
        </div>
    )
}

export default CreateUser