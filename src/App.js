import Dashboard from './Pages/Dashboard/Dashboard';
import React, { useState, useEffect, useContext } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import SidebarMenu from './Components/SidebarMenu/SidebarMenu';
import Items from './Pages/Items/Items';
import './App.css';
import Signin from './Components/Signin/Signin';
import Tables from './Pages/Inventory/Inventory';
import Catalog from './Pages/Catalog/Catalog'
import UserProfile from './Pages/UserProfile/UserProfile';
import Navbar from './Components/Navbar/Navbar';
import Account from './Pages/Account/Account';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Users from './Pages/Users/Users';
import { UrlContext } from './Context/UrlProvider';
import BrandsList from './Components/BrandsList/BrandsList';
import ProductsList from './Components/ProductsList/ProductsList';
import EditBrands from './Components/EditBrands/EditBrands';
import SuppliersList from './Components/SuppliersList/SuppliersList';
import CreateSupplier from './Components/CreateSupplier/CreateSupplier';
import EditSupplier from './Components/EditSupplier/EditSupplier';
import Settings from './Pages/Settings/Settings';
import CategoryList from './Components/CategoryList/CategoryList';
import Inventory from './Pages/Inventory/Inventory';
import CreateProduct from './Components/CreateProduct/CreateProduct';
import CreateCategory from './Components/CreateCategory/CreateCategory';
import Customers from './Pages/Customers/Customers';
import Employees from './Pages/Employees/Employees';


function App() {

  const location = useLocation();
  const apiUrl = useContext(UrlContext)

  const [brands, setBrands] = useState([])


  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState()
  const [isLogged, setIsLogged] = useState(false)
  const [allCustomers, setAllCustomers] = useState([])
  const [employees, setEmployees] = useState([])
  const [allSuppliers, setAllSuppliers] = useState([])
  const [allCat, setAllCat] = useState([])
  const[productTypes,setProductTypes] = useState([])

  const [expandSideBar, setExpandSideBar] = useState(false)
  const [selectedCatalog, setSelectedCatalog] = useState('products');


  // !persist Curent User
  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    const user_id = sessionStorage.getItem("user_id");

    if (token && user_id) {
      const id = parseInt(user_id);

      fetch(apiUrl + `/employees/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((current_user) => {
          setUser(current_user);
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

  // !fetches all products
  useEffect(() => {
    fetch(apiUrl + '/products')
      .then(resp => resp.json())
      .then(data => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [])


  // !fetches all customers
  useEffect(() => {
    fetch(apiUrl + '/customers')
      .then(resp => resp.json())
      .then(d => {
        setAllCustomers(d)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [setAllCustomers])


  // !fetches all employees
  useEffect(() => {
    fetch(apiUrl + '/employees')
      .then(resp => resp.json())
      .then(d => {
        setEmployees(d)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [setEmployees])

  // !fetches all suppliers
  useEffect(() => {
    fetch(apiUrl + '/suppliers')
      .then(resp => resp.json())
      .then(d => {
        setAllSuppliers(d)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [setAllSuppliers])

  // !fetches all product Categories
  useEffect(() => {
    const token = sessionStorage.getItem("jwt");

    fetch(apiUrl + '/categories',{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(resp => resp.json())
      .then(d => {
        setAllCat(d)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [])

  // !fetches all product product_types
  useEffect(() => {
    const token = sessionStorage.getItem("jwt");

    fetch(apiUrl + '/product_types',{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(resp => resp.json())
      .then(d => {
        setProductTypes(d) 
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [])



  const toggleSideNav = () => {
    setExpandSideBar(prevVal => !prevVal)
  }


  // !fetches brands
  useEffect(() => {
    fetch(apiUrl + '/brands')
      .then(resp => resp.json())
      .then(d => {
        setBrands(d)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [user, isLogged])

  // !close Loading
  useEffect(() => {
    setLoading(false)
  }, [])


  return (
    <div className="App">
      <div className='container-fluid bg-snow-white-100 p-0' style={{ maxHeight: '100vh', maxWidth: '100vw' }}>
        <div className='d-flex h-100 w-100 '>

          {!user ?
            <div style={{ width: '100vw', height: '100vh' }}>
              <Signin onLogin={setUser} setIsLogged={setIsLogged} onLogout={setUser} setUser={setUser} />
            </div>
            :
            <>

              <div className='p-0' style={{ width: expandSideBar ? '12vw' : '6vw' }}>
                {!(location.pathname.includes('/signup') || location.pathname.includes('/signin')) &&
                  <SidebarMenu
                    toggleSideNav={toggleSideNav}
                    expandSideBar={expandSideBar}
                    setSelectedCatalog={setSelectedCatalog}
                    setIsLogged={setIsLogged} 
                    onLogout={setUser}
                  />}
              </div>


              <div className="main-section px-0" style={{ maxHeight: '100vh', width: expandSideBar ? '88vw' : '94vw' }} >
                {!loading ? (
                  <div className='d-flex h-100 p-0'>
                    <div style={{ width: '95vw', height: '100vh',overflowY:'scroll' }}>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard user={user} >
                          <Navbar user={user} setIsLogged={setIsLogged} onLogout={setUser}/>
                        </Dashboard>} />
                        <Route path="/" element={<Items items={products} user={user} />} />
                        <Route path="/inventories" element={<Inventory stock={products} allCustomers={allCustomers} />} />

                        <Route path="/catalog" element={<Catalog />}>
                          <Route path="/catalog/products" element={<ProductsList products={products} />} />
                          <Route path="/catalog/suppliers" element={<SuppliersList suppliers={allSuppliers} />} />
                          <Route path="/catalog/users" element={<Users />} />
                          <Route path="/catalog/customers" element={<Customers allCustomers={allCustomers} setAllCustomers={setAllCustomers}/>} />
                          <Route path="/catalog/employees" element={<Employees />} />
                        </Route>
                        <Route path='/settings' element={<Settings />} >
                          <Route path="/settings/brands" element={<BrandsList brands={brands} setBrands={setBrands} />} />
                          <Route path='/settings/categories' element={<CategoryList allCat={allCat} setAllCat={setAllCat}>
                            <CreateCategory allCat={allCat} setAllCat={setAllCat} productTypes={productTypes}/>
                          </CategoryList>} />
                          {/* <Route path="/settings/brands" element={<CreateBrand brands={brands} setBrands={setBrands} />} /> */}
                        </Route>
                        <Route path="/account" element={<Account stock={products} updateStock={products} user={user} setIsLogged={setIsLogged} onLogout={setUser} allCat={allCat} />} >
                          <Route path="/account/user_profile" element={<UserProfile user={user} updateUser={setUser} />} />
                        </Route>

                        <Route path="/settings/brands/edit/:brandId" element={<EditBrands brands={brands} setBrands={setBrands} />} />
                        <Route path="/catalog/suppliers/new" element={<CreateSupplier allSuppliers={allSuppliers} setAllSuppliers={setAllSuppliers} />} />
                        <Route path="/catalog/suppliers/edit/:supplierId" element={<EditSupplier allSuppliers={allSuppliers} setAllSuppliers={setAllSuppliers} />} />
                        <Route path="/catalog/products/new" element={<CreateProduct  brands={brands} allSuppliers={allSuppliers} productTypes={productTypes} allCat={allCat}/>} />
                        <Route path="/catalog/products/edit/:productId" element={<CreateProduct  brands={brands} allSuppliers={allSuppliers} productTypes={productTypes} allCat={allCat}/>} />
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
