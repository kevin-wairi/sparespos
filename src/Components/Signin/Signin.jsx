import React,{useState} from 'react'
import './Signin.css'
import { useNavigate } from 'react-router-dom'

function Signin() {
    
    const navigate = useNavigate();

    // State variables to manage form inputs and user authentication
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState('');
const [showFormLogin, setShowFormLogin] = useState(false);
const [isLogged, setIsLogged] = useState(false);
const [currentUser, setCurrentUser] = useState('');

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
                // onLogin(user);
                setCurrentUser(user);
                setIsLogged(true);
                setShowFormLogin(false);
                navigate('/');
                console.log(user);
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
    <div class="wrapper">
   < div className='signup-container  m-0 p-0 container-fluid'>
            <div className=" form-container rounded col-md-8 col-lg-6 col-xl-5 col-10 order-lg-1  mx-auto">
            <div className="row d-flex justify-content-end">  
                    </div>  
                    <p className="text-center h4 fw-bold mb-2 mx-1 mx-md-4 mt-2 pt-2">Log in</p>

                    <form className="mx-1 mx-md-4" onSubmit={(e)=>submitLoginForm(e)}>

                        <div className="d-flex flex-row align-items-center mb-2">
                            <div className="form-outline flex-fill mb-0">
                            <input type="text" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                            <label className="form-label" >Username</label>
                            </div>
                            
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                            <div className="form-outline flex-fill mb-0">
                            <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            <label className="form-label" >Password</label>
                            </div>
                        </div>
                        
                        <div className="form-check d-flex justify-content-center mb-5">
                            <label className="form-check-label" for="form2Example3">
                            Don't have an account,  <a href="#!" onClick={()=>'openSignUpForm'()}>signup</a>
                            </label>
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