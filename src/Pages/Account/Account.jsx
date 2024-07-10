import React, { useState, useEffect } from 'react'
import './Account.css'
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons';
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar';

function Account({ stock, updateStock, openSidebar, cartCount, user, setIsLogged, onLogout, setCartItems, allCat }) {

  const [error, setError] = useState('')
  const [goodsError, setGoodsError] = useState('')

  const [business, setBusiness] = useState("")
  const [username, setUsername] = useState("")
  const [fullname, setFullname] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")


  const handleSignupForm = async (e) => {
    e.preventDefault();
    if (business === '' || username === '' || fullname === '' || phoneNumber === '' || password === '' || passwordConfirmation === '') {
      setError('Please fill out all fields');

      return;
    } else if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    const resp = await fetch('http://localhost:3000/users');
    const registeredUsers = await resp.json();

    if (resp.ok) {
      // Check if the username already exists
      const existingUser = registeredUsers.find(user => user.username === username);

      if (existingUser) {
        setError('Username already exists');
        return;
      }
    }
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
        creditWorthy: 'false',
        discounted: 'false'
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('userData signup', data.username);
      setBusiness("")
      setUsername("")
      setFullname("")
      setPhoneNumber("")
      setPassword("")
      setPasswordConfirmation("")
      Swal.fire('Success!', 'User has been registered.', 'success');

    }
  }

  // filter goods from form
  // useEffect(() => {

  //   const filterForUpdates = stock.filter((spare) => {
  //     const spareCategory = (spare.category_name || '').toLowerCase();
  //     const carMake = (spare.carMake || '').toLowerCase();
  //     const carModel = (spare.carModel || '').toLowerCase();

  //     const isCategoryMatch = spareCategory.includes(searchCategory.toLowerCase());
  //     const isCarMakeMatch = carMake.includes(searchCarMake.toLowerCase());
  //     const isCarModelMatch = carModel.includes(searchCarModel.toLowerCase());

  //     return isCategoryMatch && isCarMakeMatch && isCarModelMatch;
  //   });
  //   setFilteredGoods(filterForUpdates)
  //   console.log('filterForUpdates', filterForUpdates);
  // }, [searchCategory, searchCarMake, searchCarModel, stock])



  const location = useLocation()
  let pathname
  if (location.pathname.length === 1) {
    pathname = 'Dashboard'
  } else {
    pathname = location.pathname.slice(1);
  }

  // handles logout
  function handleLogout() {
    sessionStorage.clear();
    setIsLogged(false)
    onLogout()
    setCartItems([])
  }

  return (
    <div className="wrapper h-100 w-100 overflow-y-scroll p-3">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="col-12  profile-bg rounded d-flex justify-content-center" style={{ minHeight: '250px' }}>
            <div className="container-fluid m-0  align-items-start w-100vw row ">
              <div className="row justify-content-center align-items-center g-2" >
                <div className="col-12 glass rounded-4">
                  <Navbar />
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="row justify-content-center align-items-center g-2 my-5 mx-1">
          <div className="col-lg-3 col-md-6 col-12">
            <div className="card border-0">
              <div className="card-body d-flex p-2">
                <div className="col-8">
                  <p className='m-0'>Todays Sales</p>
                  <p className='m-0'>Ksh. 34577</p>
                </div>
                <div className="col-4">
                  <div className="btn border"><FontAwesomeIcon icon={faCircleDollarToSlot} style={{ color: "#000000", }} /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <div className="card border-0">
              <div className="card-body d-flex p-2">
                <div className="col-8">
                  <p className='m-0'>Todas users</p>
                  <p className='m-0'>Ksh. 34577</p>
                </div>
                <div className="col-4">
                  <div className="btn border"><FontAwesomeIcon icon={faCircleDollarToSlot} style={{ color: "#000000", }} /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <div className="card border-0">
              <div className="card-body d-flex p-2">
                <div className="col-8">
                  <p className='m-0'>New Clients</p>
                  <p className='m-0'>Ksh. 34577</p>
                </div>
                <div className="col-4">
                  <div className="btn border"><FontAwesomeIcon icon={faCircleDollarToSlot} style={{ color: "#000000", }} /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <div className="card border-0">
              <div className="card-body d-flex p-2">
                <div className="col-8">
                  <p className='m-0'>Sales</p>
                  <p className='m-0'>Ksh. 34577</p>
                </div>
                <div className="col-4">
                  <div className="btn border"><FontAwesomeIcon icon={faCircleDollarToSlot} style={{ color: "#000000", }} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row d-flex m-0">
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default Account