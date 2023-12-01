import React,{useState} from 'react'
import './Signin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faHouse,faSlash} from '@fortawesome/free-solid-svg-icons';
import { useNavigate,useLocation,NavLink } from 'react-router-dom'

function Signin({onLogin,loggedOut}) {

    const location = useLocation()
  const pathname = location.pathname.slice(1);
    
    
    const navigate = useNavigate();

    // State variables to manage form inputs and user authentication
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState('');

    // Function to submit the login form
async function submitLoginForm(e) {
    e.preventDefault();
    // Validation checks for username and password
    if (username.trim() === '' || password.trim() === '') {
        setError('Please enter username and password');
        return;
    }
    setError('');

    // Fetching users to check login credentials
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();
    if (response.ok) {
        const user = data.find(user => user.username.toLowerCase === username.toLowerCase);

        if (user) {
            if (user.password === password) {
                // Update state and navigate to home page upon successful login
                onLogin(user);
                loggedOut(false)
                sessionStorage.setItem('username', user.username);
                navigate('/')
                setUsername('')
                setPassword('')
                console.log(user);
                // navigate('/')
            } else {
                setError('Invalid password');
            }
        } else {
            setError('User not found');
        }
    } else {
        setError('Failed to login');
    }
}

  return (
<div class="wrapper signin-wrapper">
   <div className='signup-container p-1 m-3 rounded' style={{minHeight: '20rem'}}>
    <div className="col-8 mx-auto my-3 text-white">
        <nav id='navbar '>
            <div className="row  m-0 p-0 d-flex justify-content-between align-items-center rounded">
                <div className="col-lg-3 col-12">
                    <div className='text-start'>
                    <div className="d-flex gap-1">
                    <div><a href="/"><FontAwesomeIcon icon={faHouse} size="xs" style={{color: "#fff",}} /></a></div>
                    <div><FontAwesomeIcon icon={faSlash} rotation={90} size="2xs" /></div>
                    <p className='menu-p align-self-center'>{pathname}</p>
                    </div>
                    
                    <a className="navbar-brand ">{pathname}</a>
                    </div>
                </div>
                <div className="col-lg-4 col-4">
                <NavLink to='/'>
                   <div className="d-flex gap-1 align-items-center ">
                   <FontAwesomeIcon className='p-2 ' icon={faHouse} style={{color: "#fff",}}/>
                   <p className='my-1 text-white'>Dashboard</p>
                    </div> 
                </NavLink>
                </div>
                <div className="col-lg-3 col-6 justify-content-end d-flex">
                    <NavLink to='/signin'>
                        <div className="d-flex gap-lg-2 gap-1 align-items-center">
                            <FontAwesomeIcon icon={faUser} style={{color: "#fff",}} />
                            <p className='my-1 text-white'>sign in</p>
                        </div>
                    </NavLink>
                </div>
            </div> 
        </nav>
    </div>

    <div className="text-white">
    <h4>Welcome!</h4>
    <p className='menu-p'>Use these awesome forms to login</p>
    
    </div>
            <div className=" form-container signinform rounded  col-lg-4 col-10" >
                    <p className="text-center h4 fw-bold mb-2 mx-1 mx-md-4 mt-2 pt-2">Log in</p>

                    <form className="mx-1 mx-md-4" onSubmit={(e)=>submitLoginForm(e)}>

                        <div className="d-flex flex-row align-items-center mb-2">
                            <div className="form-outline flex-fill mb-0 form__div">
                            <input type="text" className="form-control rounded" value={username}  onChange={(e)=>setUsername(e.target.value)}/>
                            <label className="form__label" >Username</label>
                            </div>
                            
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                            <div className="form-outline flex-fill mb-0 form__div">
                            <input type="password" className="form-control rounded" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            <label className="form__label" >Password</label>
                            </div>
                        </div>
                        {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 pb-md-4 pb-sm-2 ">
                            <button type="submit"  className="btn btn-primary ">Submit</button>
                        </div>

                    </form>

                    </div>
            </div>
  </div>
  )
}

export default Signin