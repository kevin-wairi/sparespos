import React, { useState } from 'react'
import './Signin.css'
import { useNavigate, useLocation } from 'react-router-dom'

function Signin({ onLogin, setIsLogged }) {

    const location = useLocation()
    const pathname = location.pathname.slice(1);


    const navigate = useNavigate();

    // State variables to manage form inputs and user authentication
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //!Function to submit the login form
    function handleSubmit(e){
        e.preventDefault()
        console.log('STARRRT');
        console.log('cont...');
        // *Fetching users to check login credentials
        fetch('http://127.0.0.1:3000/login', {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Accepts: "application/json",
            },
            body: JSON.stringify({
                username,
                password
            })
        }
        ).then(resp => resp.json())
        .then(data => {
            console.log('DATA', data);
            onLogin(data.user);
            setIsLogged(true)
            sessionStorage.setItem('jwt',data.jwt);
            sessionStorage.setItem('user_id', data.user.id);
            navigate('/dashboard')
            setUsername('')
            setPassword('')
        })
        .catch(error=>console.log(error))
       
    }

    

    return (
        <div className="wrapper">
            <div className="container-fliud bg-blue-gray-300" >
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="p-3 signin_section  d-flex flex-column justify-content-center align-items-center" style={{ height: '50vh', width: '35vw' }}>
                        <p className='fs-3  m-0'>Get started Today</p>
                        <form className='form-group' onSubmit={handleSubmit}>
                            <p className=''>signin to your Account</p>
                            <div className="text-start form_field pt-2 mb-3">
                                <div className="d-flex">
                                    <div className='input_box'>
                                        <input type="text" className="form-control" onChange={(e)=>setUsername(e.target.value)} required style={{borderRadius:'0'}}/>
                                        <label for="" className="form-label">Username</label>
                                    </div>
                                    <p className="m-0  align-self-center">|</p>
                                    <div className='input_box'>
                                        <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} required style={{borderRadius:'0'}}/>
                                        <label for="" className="form-label">Password</label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn bg-dark w-100 text-white mb-3"
                            >
                                Submit
                            </button>
                        </form>
                        <p><small>forgot Password?</small></p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Signin