import Dashboard from './Pages/Dashboard/Dashboard';
import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import SidebarMenu from './Components/SidebarMenu/SidebarMenu';
import Items from './Pages/Items/Items';
import './App.css';
import Signin from './Components/Signin/Signin';
import Settings from './Components/Settings/Settings'
import Tables from './Pages/Tables/Tables';
import Users from './Pages/Users/Users';
import Inventory from './Pages/Inventory/Inventory';
import UserProfile from './Pages/UserProfile/UserProfile';
import Navbar from './Components/Navbar/Navbar';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



function App() {

  const location = useLocation();


  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState()
  const [isLogged, setIsLogged] = useState(false)
  const [allCustomers, setAllCustomers] = useState([])
  const [employees, setEmployees] = useState([])
  const [allSuppliers, setAllSuppliers] = useState([])
  const [carpartCategories, setCarpartCategories] = useState([])

  // !persist Curent User
  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    const user_id = sessionStorage.getItem("user_id");

    if (token && user_id) {
      const id = parseInt(user_id);

      fetch(`http://127.0.0.1:3000/employees/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) =>resp.json())
        .then((current_user) => {
          console.log('CURRENT', current_user);
          setUser(()=>current_user);
          setIsLogged(true);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLogged(false);
        });
    } else {
      setIsLogged(false);
    }
  }, []);

  // !fetches all items
  useEffect(() => {
    fetch('http://127.0.0.1:3000/products')
      .then(resp => resp.json())
      .then(data => {
        setItems(data);
        console.log('items', items);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [])


  // !fetches all customers
  useEffect(() => {
    fetch('http://127.0.0.1:3000/customers')
      .then(resp => resp.json())
      .then(d => {
        setAllCustomers(() => d)
        console.log('CUSTOMERS', allCustomers)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [setAllCustomers])


  // !fetches all employees
  useEffect(() => {
    fetch('http://127.0.0.1:3000/employees')
      .then(resp => resp.json())
      .then(d => {
        setEmployees(() => d)
        console.log('employees', d);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [setEmployees])

  // !fetches all suppliers
  useEffect(() => {
    fetch('http://127.0.0.1:3000/suppliers')
      .then(resp => resp.json())
      .then(d => {
        setAllSuppliers(() => d)
        console.log('suppliers', d);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [setAllSuppliers])

  // !fetches all product Categories
  useEffect(() => {
    fetch('http://127.0.0.1:3000/categories')
      .then(resp => resp.json())
      .then(d => {
        setCarpartCategories(() => d)
        console.log('suppliers', d);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [setAllSuppliers])



  // !close Loading
  useEffect(() => {
    setLoading(false)
  }, [])


  return (
    <div className="App">
      <div className='container-fluid bg-blue-gray-50 p-0' style={{ maxHeight: '100vh', maxWidth: '100vw' }}>
        <div className='d-flex h-100 w-100 '>

          {!user ?
            <div style={{ width: '100vw', height: '100vh' }}>
              <Signin onLogin={setUser} setIsLogged={setIsLogged} onLogout={setUser} setUser={setUser} />
            </div>
            :
            <>

              <div className='p-0' style={{ width: '5vw' }}>
                {!(location.pathname.includes('/signup') || location.pathname.includes('/signin')) && <SidebarMenu />}
              </div>


              <div className="main-section px-0" style={{ maxHeight: '100vh', width: '95vw' }} >
                {!loading ? (
                  <div className='d-flex h-100 p-0'>
                    <div style={{ width: '95vw', height: '100vh' }}>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard user={user} >
                          <Navbar user={user} setIsLogged={setIsLogged}/>
                        </Dashboard>} />
                        <Route path="/" element={<Items items={items} user={user} />} />
                        <Route path="/settings" element={<Settings stock={items} updateStock={setItems} user={user} setIsLogged={setIsLogged} onLogout={setUser} carpartCategories={carpartCategories} />} />
                        <Route path="/tables" element={<Tables stock={items} allCustomers={allCustomers} />} />
                        <Route path="/users" element={<Users stock={items} allCustomers={allCustomers} setAllCustomers={setAllCustomers} employees={employees} setEmployees={setEmployees} allSuppliers={allSuppliers} setAllSuppliers={setAllSuppliers}/>} />
                        <Route path="/inventory" element={<Inventory carpartCategories={carpartCategories} />} />
                        <Route path="/user_profile" element={<UserProfile user={user} updateUser={setUser} >
                            <Navbar user={user}/>
                          </UserProfile>} />
                      </Routes>
                    </div>
                  </div>
                ) : (
                  <p>Loading .....</p>
                )}
              </div>
            </>
          }

        </div>
      </div>

    </div>
  );
}

export default App;
