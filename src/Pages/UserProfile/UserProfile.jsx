import React, { useContext, useState } from 'react'
import profile from '../../assets/images/profile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import './UserProfile.css'
import { UrlContext } from '../../Context/UrlProvider';
import { FileUploader } from 'react-drag-drop-files';
import { X } from 'react-feather';

function UserProfile({ user, setCurrentUser, children }) {

    const apiUrl = useContext(UrlContext)

    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')

    const [passwordError, setPasswordError] = useState('')
    const [openPasswordForm, setOpenPasswordForm] = useState(false)
    const [file, setFile] = useState(null);
    const [openUploader, setOpenUploader] = useState(false)
    const [showImageOption,setShowImageOption] = useState(false)

    const fileTypes = ["JPG", "PNG", "GIF"];



    function handleImageUpload(e) {
        e.preventDefault()
        console.log('OKRRRRRRRRR');
        const token = sessionStorage.getItem("jwt");
        const user_id = sessionStorage.getItem("user_id");
        const id = parseInt(user_id);

        const formData = new FormData();

        formData.append('profile_image', file);


        fetch(apiUrl + `/employees/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json()
            })
            .then((c) => {
                setCurrentUser(() => c);
                console.log(c);
                toggleFileUploader()
            })

    }

    const handleChange = (file) => {
        console.log('File', file)
        setFile(file)
    };


    function handlePasswordChange(e) {
        e.preventDefault()
        if (password === password_confirmation) {
            const token = sessionStorage.getItem("jwt");
            const user_id = sessionStorage.getItem("user_id");
            if (!token || !user_id) {
                return
            }
            const id = parseInt(user_id);

            fetch(apiUrl + `/employees/${id}`, {
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
    const toggleFileUploader = () => {
        setOpenUploader(prevVal => !prevVal)
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
                                <div className="rounded box-shaddow-77 profile_img position-relative" onMouseEnter={()=>setShowImageOption(true)} onMouseLeave={()=>setShowImageOption(false)} style={{ height: '40vh', width: '15vw', objectFit: 'cover' }}>
                                    <img className='img-fluid h-100 w-100 rounded ' src={user.profile_image} alt="info" />
                                    {showImageOption &&
                                        <div className=" position-absolute top-50" style={{left:"25%"}}>
                                            <div className="p-0 text-start" >
                                                <button className="btn btn-primary" onClick={() => toggleFileUploader()}>Change</button>
                                            </div>
                                        </div>
                                    }
                                </div>


                                {openUploader &&
                                    <div className="overlayDiv">

                                        <div className="card text-start">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-end  align-items-center g-2 pb-2">
                                                    <div>
                                                        <button className='btn p-0' onClick={toggleFileUploader}><X /></button>
                                                    </div>
                                                </div>

                                                <form onSubmit={handleImageUpload}>
                                                    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                                                    <div className="my-3 d-flex">
                                                        <button type='submit' className='btn btn-primary flex-fill'>Submit</button>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>

                                    </div>
                                }
                                <div className='text-start  p-2' style={{ width: '250px' }}><p className="m-0 text-capitalize">{user.firstname + " " + user.lastname}</p>
                                    <p className='fw-bold text-capitalize' style={{ letterSpacing: '1px' }}>{user.role}</p>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card p-3 border-0">
                                    <p className='text-start fw-bold'>Personal Details</p>
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