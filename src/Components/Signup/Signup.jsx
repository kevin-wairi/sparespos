import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

function Signup() {

    const navigate = useNavigate();

    // State variables to manage form inputs and user authentication
const [business, setBusiness] = useState("");
const [username, setUsername] = useState("");
const [fullname, setFullname] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [password, setPassword] = useState("");
const [passwordConfirmation, setPasswordConfirmation] = useState("");
const [error, setError] = useState('');
const [showFormSignup, setShowFormSignup] = useState(false);
const [showFormLogin, setShowFormLogin] = useState(false);
const [isLogged, setIsLogged] = useState(false);
const [currentUser, setCurrentUser] = useState('');


// Function to handle form submission for user registration
async function handleSignupForm(e) {
    e.preventDefault();
    // Validation checks for form fields
    if (business === '' || username === '' || fullname === '' || phoneNumber === '' || password === '' || passwordConfirmation === '') {
        setError('Please fill out all fields');
        return;
    } else if (password !== passwordConfirmation) {
        setError('Passwords do not match');
        return;
    }
    setError('');

    // Fetching registered users to check if the username already exists
    const resp = await fetch('http://localhost:3000/users');
    const registeredUsers = await resp.json();

    if (resp.ok) {
        const existingUser = registeredUsers.find(user => user.username === username);

        if (existingUser) {
            setError('Username already exists');
            return;
        }
    }

    // Sending a POST request to register the user
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
        },
        body: JSON.stringify({
            business,
            username,
            fullname,
            phoneNumber,
            password,
            passwordConfirmation,
            isAdmin: false,
        }),
    });

    const data = await response.json();
    if (response.ok) {
        // Update state and navigate to home page upon successful registration
        // onSignup(data);
        setCurrentUser(data.username);
        setIsLogged(true);
        setShowFormSignup(false);
        navigate('/');
    }
}

  return (
    < div className='signup-container   m-0 p-0'>
    <div className=" form-container rounded border bg-white col-md-8 col-lg-6 col-xl-5 col-10 order-lg-1  mx-auto" >
            <p className="text-center h4 fw-bold mb-2 mx-1 mx-md-4 mt-2 pt-2">Sign up</p>

            <form className="mx-1 mx-md-4" onSubmit={(e)=>handleSignupForm(e)}>

                <div className="d-flex flex-row align-items-center mb-2">
                    <div className="form-outline flex-fill mb-0">
                    <input type="text" className="form-control" value={business} onChange={(e)=>setBusiness(e.target.value)}/>
                    <label className="form-label" >Business Name</label>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                    <div className="form-outline flex-fill mb-0">
                    <input type="text" className="form-control" value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
                    <label className="form-label" >Full Name</label>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                    <div className="form-outline  mb-0 col-5">
                    <input type="text" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <label className="form-label" >Username</label>
                    </div>
                    <div className="form-outline  mb-0 col-5">
                    <input type="text" className="form-control" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                    <label className="form-label" >Phone Number</label>
                    </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-2">
                    <div className="form-outline flex-fill mb-0">
                    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <label className="form-label" >Password</label>
                    </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-2">
                    <div className="form-outline flex-fill mb-0">
                    <input type="password" className="form-control" value={passwordConfirmation} onChange={(e)=>setPasswordConfirmation(e.target.value)}/>
                    <label className="form-label" >Repeat your password</label>
                    </div>
                </div>
                {/* 
                <div className="form-check d-flex justify-content-center mb-5">
                    <label className="form-check-label" for="form2Example3">
                    I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                </div> */}
                
                <div className="form-check d-flex justify-content-center mb-5">
                    <label className="form-check-label" for="form2Example3">
                    Already have an account,  <a href="#!" onClick={()=>'handleLoginForm'()}>Log in</a>
                    </label>
                </div>
                {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 pb-md-4 pb-sm-2 ">
                    <button type="submit"  className="btn btn-primary ">Register</button>
                </div>

            </form>

            </div>
    </div>
  )
}

export default Signup