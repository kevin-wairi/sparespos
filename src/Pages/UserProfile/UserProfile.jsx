import React, { useState } from 'react'
import profile from '../../assets/images/profile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import './UserProfile.css'

function UserProfile({ user, updateUser, children }) {

    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')

    const [passwordError, setPasswordError] = useState('')
    const [openPasswordForm, setOpenPasswordForm] = useState(false)


    function handleImageUpload(e) {
        e.preventDefault()
    }

    function handlePasswordChange(e) {
        e.preventDefault()
        if (password === password_confirmation) {
            const token = sessionStorage.getItem("jwt");
            const user_id = sessionStorage.getItem("user_id");
            if (!token || !user_id) {
                return
            }
            const id = parseInt(user_id);

            fetch(`http://127.0.0.1:3000/employees/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    password,
                    password_confirmation
                })
            })
                .then(resp => resp.json())
                .then(() => setOpenPasswordForm(false))
        } else {
            setPasswordError('Password do not match')
            console.log('Password do not match');
            return
        }
    }

    const togglePasswordForm = () => {
        setOpenPasswordForm(prevVal => !prevVal)
    }

    return (
        <div className="wrapper">
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center g-2">
                    <div className="col-12">
                        {children}
                    </div>
                    <div className="main-section px-5">
                        <div
                            className="row justify-content-start align-items-start g-2"
                        >
                            <div className="col-12 text-start"><p className="fs-5 fw-bold">Basic Info  </p></div>
                            <div className="col-3">
                                <div className="profile_img " style={{ height: '250px', width: '250px', position: 'relative' }}>
                                    <img className="img-fluid image_fluid rounded" src={user.img ? user.img : profile} alt="Title" />
                                    <div className="float_btn p-0" >
                                        <button className="btn" onClick={(e) => handleImageUpload(e)}><FontAwesomeIcon icon={faImage} /></button>
                                    </div>
                                </div>
                                <div className='text-start  p-2' style={{width:'250px'}}><p className="m-0 text-capitalize">{user.firstname + " " + user.lastname}</p>
                                        <p className='fw-bold text-capitalize' style={{ letterSpacing: '1px' }}>{user.role}</p>
                                    </div>
                            </div>
                            <div className="col-8">
                                <div className="card p-3 border-0">
                                    <table className="table table-borderless text-start table-hover table-transparent" >
                                        <tbody>
                                            <tr>
                                                <td>Username.</td>
                                                <td>{user.lastname}</td>
                                            </tr>
                                            <tr>
                                                <td>Role.</td>
                                                <td>{user.role}</td>
                                            </tr>
                                            <tr>
                                                <td>Reg no.</td>
                                                <td>POSREG-{user.id}</td>
                                            </tr>
                                            <tr>
                                                <td>Email:</td>
                                                <td><span className='text-muted'>{user.email}</span></td>
                                            </tr>
                                            <tr>
                                                <td>Phone Number:</td>
                                                <td>{user.phone_number}</td>
                                            </tr>
                                            <tr>
                                                <td>Password:</td>
                                                <td><button className="btn btn-dark p-1" onClick={(() => togglePasswordForm())}>{openPasswordForm ? <><FontAwesomeIcon icon={faXmark} /> &nbsp;Cancel Reset</> : <><span><FontAwesomeIcon icon={faPencil} /></span> &nbsp;Reset Password</>}</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {openPasswordForm &&
                                        <form className="form" onSubmit={(e) => handlePasswordChange(e)}>
                                            <div
                                                className="d-flex justify-content-start gap-3 align-items-center g-2"
                                            >
                                                <div className="mb-3">
                                                    <input type="password" className="form-control h-75" placeholder='password' required onChange={(e) => { setPassword(e.target.value); setPasswordError('') }} />
                                                </div>
                                                <div className="mb-3">
                                                    <input type="password" className="form-control h-75" placeholder='password confirmation' required onChange={(e) => { setPassword_confirmation(e.target.value); setPasswordError('') }} />
                                                </div>

                                                <div className="mb-3 align-self-end">
                                                    <button type='submit' className="btn btn-success">Submit</button>
                                                </div>

                                            </div>
                                            {passwordError &&
                                                <p className='m-0 text-danger fw-light'>{passwordError}</p>
                                            }

                                        </form>}


                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserProfile