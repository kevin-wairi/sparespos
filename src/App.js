import Dashboard from './Pages/Dashboard/Dashboard';
import React, { useState, useEffect, useContext } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SidebarMenu from './Components/SidebarMenu/SidebarMenu';
import Items from './Pages/Items/Items';
import './App.css';
import Signin from './Components/Signin/Signin';
import Catalog from './Pages/Catalog/Catalog'
import UserProfile from './Pages/UserProfile/UserProfile';
import Navbar from './Components/Navbar/Navbar';
import Account from './Pages/Account/Account';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { UrlContext } from './Context/UrlProvider';
import ProductsList from './Components/ProductsList/ProductsList';
import EditBrands from './Components/EditBrands/EditBrands';
import SuppliersList from './Components/SuppliersList/SuppliersList';
import EditSupplier from './Components/EditSupplier/EditSupplier';
import Inventory from './Pages/Inventory/Inventory';
import CreateProduct from './Components/CreateProduct/CreateProduct';
import UsersList from './Components/UsersList/UsersList'
import CustomersList from './Pages/CustomersList/CustomersList';
import Setup from './Pages/Setup/Setup';
import CreateUser from './Components/CreateUser/CreateUser';
import PosRoles from './Components/PosRoles/PosRoles';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import EditProduct from './Components/EditProduct/EditProduct';
import { CableContext } from './Context/Cable';
import toast, { Toaster } from 'react-hot-toast';
import { Bell, Circle, HelpCircle, Package, Search, Settings } from 'react-feather';
import Order from './Pages/Order/Order';




function App() {

  const location = useLocation();
  const navigate = useNavigate()
  const apiUrl = useContext(UrlContext)
  const cable = useContext(CableContext)

  const [brands, setBrands] = useState([])


  const [products, setProducts] = useState([])
  const [inventoryList, setinventoryList] = useState([])
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState()
  const [isLogged, setIsLogged] = useState(false)
  const [allCustomers, setAllCustomers] = useState([])
  const [users, setUsers] = useState([])
  const [allSuppliers, setAllSuppliers] = useState([])
  const [allCat, setAllCat] = useState([])
  const [productTypes, setProductTypes] = useState([])
  const [selectedCatalog, setSelectedCatalog] = useState('products');
  const [newCustomer, setnewCustomer] = useState('')
  const [newWeekCustomers, setNewWeekCustomers] = useState([])
  const [filteredProducts, setfilteredProducts] = useState(products)
  const [titleFilter, settitleFilter] = useState('')
  const [typeFilter, settypeFilter] = useState('')
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [cart, setCart] = useState([])
  const [productTotal, setProductTotal] = useState(0)

  const formattedTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const formattedMeridiem = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).split(' ')[1];;






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
        .then((resp) => {
          if (!resp.ok) {
            throw new Error('Network response was not ok');
          }
          return resp.json()
        })
        .then((c) => {
          setCurrentUser(() => c);
          setIsLogged(true);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLogged(false);
        });
    } else {
      setIsLogged(false);
      setCurrentUser('')
    }
  }, []);

  // !fetches all products
  useEffect(() => {
    fetch(apiUrl + '/products')
      .then(resp => resp.json())
      .then(data => {
        setProducts(() => data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [])

  // !fetches all Inventories
  useEffect(() => {
    fetch(apiUrl + '/inventories')
      .then(resp => resp.json())
      .then(data => {
        console.log('INVVVVVVVVVVVVVVVV okRRRRRRRr');
        setinventoryList(() => data);
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
        setAllCustomers(() => d)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [setAllCustomers])


  // !fetches all users
  useEffect(() => {
    fetch(apiUrl + '/employees')
      .then(resp => resp.json())
      .then(d => {
        setUsers(() => d)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [currentUser])

  // !fetches all suppliers
  useEffect(() => {
    fetch(apiUrl + '/suppliers')
      .then(resp => resp.json())
      .then(d => {
        setAllSuppliers(() => d)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [setAllSuppliers])

  // !fetches all product Categories
  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    fetch(apiUrl + '/categories', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(resp => resp.json())
      .then(d => {
        setAllCat(() => d)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [])

  // !fetches all product product_types
  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    fetch(apiUrl + '/product_types', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(resp => resp.json())
      .then(d => {
        setProductTypes(() => d)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  }, [])



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
  }, [currentUser, isLogged])

  useEffect(() => {
    const fetchNewCustomers = async () => {
      try {
        const response = await fetch(apiUrl + '/new_customers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNewWeekCustomers(data);
      } catch (error) {
        console.error('Error fetching new customers:', error);
      }
    };
    fetchNewCustomers();
  }, [allCustomers]);

  // !close Loading
  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      {
        channel: 'CustomerNotificationsChannel',
      },
      {
        received: (data) => {
          setnewCustomer(data)
          console.log('WEBHOOK', data);
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [])

  // !filter products in items component

  const handleFilterByTitle = (value) => {
    settitleFilter(value);
  };

  const handleFilterByType = (value) => {
    settypeFilter(value);
  };


  useEffect(() => {
    const combinedFilter = products.filter(product =>
      (!titleFilter || product.title.toLowerCase().startsWith(titleFilter.toLowerCase())) &&
      (!typeFilter || parseInt(product.product_type_id) === parseInt(typeFilter))
    );
    setfilteredProducts(combinedFilter);
  }, [titleFilter, typeFilter, products]);


  useEffect(() => {
    setfilteredProducts(products)
  }, [currentUser, products])

  const handleClearFilter = () => {
    settitleFilter('');
    settypeFilter('');
    setfilteredProducts(products);
  }

   //!calculate total of all cart items
   useEffect(() => {
    const total = cart.reduce((acc, item) => {
      return acc + item.inventory.selling_price * item.cart_qty;
    }, 0);
    setProductTotal(total);
  }, [cart]);


  useEffect(() => {
    if (newCustomer) {
      toast.custom((t) => (
        <div className={`toast-container d-flex  ${t.visible ? 'show' : 'show'} shadow-lg rounded pointer-events-auto flex border`}
          style={{ maxWidth: '18rem', width: '100%', maxHeight: '5rem', backgroundColor: 'white', border: '1px solid black', borderOpacity: '5%' }}
        >
          <div className="d-flex flex-grow-1 p-2">
            <div className="d-flex align-items-start justify-content-around gap-3">
              <div className="flex-shrink-0 pt-1 "
              >
                <img
                  className="rounded img-fluid"
                  src={newCustomer.profile_image_url}
                  alt="inf"
                  style={{ width: '40px', height: '40px' }}
                />
              </div>
              <div className="ml-3 flex-grow-1">
                <p className="fw-1 text-dark mb-0">
                  {newCustomer.username}
                </p>
                <p className="mt-1 text-muted">
                  {newCustomer.phone_number}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex border-start">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="btn btn-link text-decoration-none text-primary border-0 rounded-0 rounded-right p-4 d-flex align-items-center justify-content-center"
              style={{ fontSize: '0.875rem' }}
            >
              Close
            </button>
          </div>
        </div>
      ));
    }
  }, [newCustomer]);


  return (
    <div className="App">
      <div className='bg-snow-white-100'>
        <Toaster />
        {!currentUser ?
          <div style={{ width: '100vw', height: '100vh', boxSizing: 'border-box' }}>
            <Signin setCurrentUser={setCurrentUser} setIsLogged={setIsLogged} onLogout={setCurrentUser} />
          </div>
          :
          <div style={{ maxHeight: '100vh', overflowY: 'hidden', height: '100vh', width: '100vw', boxSizing: 'border-box' }}>
            <div className="row justify-content-center align-items-center g-2 h-100 w-100 " >

              <div className='col-12 m-0 p-0' style={{ height: '10vh', width: '100vw', boxSizing: 'border-box' }}>
                {/* header section */}
                <div className='header_section h-100 bg-white'>
                  <div className="row justify-content-start align-items-center h-100 w-100 m-0 p-0 border-bottom" >
                    <div className="col-3  h-100 d-flex justify-content-ctart align-items-center border-end">
                      <h5 className='m-0 ' onClick={() => navigate('/')}>
                        <Package /> <span className='fw-bold'>[ Company Name ] POS</span>
                      </h5>
                    </div>
                    <div className="col-5 border-end h-100 d-flex justify-content-start align-items-center">
                      <form>
                        <div className='d-flex justify-content-start align-items-center g-2'>
                          <div><Search /></div>
                          <div className='flex-fill'><input
                            type="text"
                            className="form-control border-0 bg-transparent ps-1 no-outline"
                            placeholder="Search Products"
                            onChange={(e) => handleFilterByTitle(e.target.value)}
                          /></div>
                        </div>
                      </form>
                    </div>
                    <div className="col-2 border-end h-100 d-flex justify-content-center align-items-center" >
                      <h4 className='m-0 '>{formattedTime} <span className='text-muted'>{formattedMeridiem}</span></h4>
                    </div>
                    <div className="col-2 border-0 h-100 d-flex justify-content-center align-items-center ">
                      <div className='row d-flex justify-content-around align-items-center m-0'>
                        <div className='col-3'><HelpCircle /></div>
                        <div className='col-3'><Settings /></div>
                        <div className='col-3'><Bell /></div>
                        <div className='col-3'><Circle /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-12 m-0 p-0 ' style={{ height: '90vh', width: '100vw', boxSizing: 'border-box' }}>
                <div className="  d-flex justify-content-center align-items-center h-100 w-100">

                  {/* sidebar section */}
                  <div className="sidebar-section bg-white " style={{ height: '90vh', width: '7vw', boxSizing: 'border-box' }}>
                    <div className='d-flex justify-content-center align-items-start h-100 w-100'>
                      <div className='h-100 w-100'>
                        {!(location.pathname.includes('/signup') || location.pathname.includes('/signin')) &&
                          <SidebarMenu
                            setSelectedCatalog={setSelectedCatalog}
                            setIsLogged={setIsLogged}
                            onLogout={setCurrentUser}
                          />}
                      </div>
                    </div>
                  </div>

                  {/* main section */}
                  <div className=" main-section m-0 p-0" style={{ height: '90vh', width: '93vw' }}>
                    {!loading ? (
                      <>
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard user={currentUser} productTypes={productTypes} products={products} newWeekCustomers={newWeekCustomers} >
                            <Navbar user={currentUser} setIsLogged={setIsLogged} onLogout={setCurrentUser} />
                          </Dashboard>} />
                          <Route path="/" element={<Items
                            products={products}
                            user={currentUser}
                            productTypes={productTypes}
                            HandleFilterByTitle={handleFilterByTitle}
                            handleFilterByType={handleFilterByType}
                            setfilteredProducts={setfilteredProducts}
                            handleClearFilter={handleClearFilter}
                            filteredProducts={filteredProducts}
                            cart={cart}
                            setCart={setCart}
                            productTotal={productTotal}
                          />} >
                          </Route>
                            <Route path="/order" element={<Order products={products} setProducts={setProducts} productTotal={productTotal}  cart={cart} setCart={setCart} setCart={setCart} currentUser={currentUser}/>} />
                          <Route path="/inventories" element={<Inventory products={products} allCustomers={allCustomers} />} />

                          <Route path="/catalog" element={<Catalog />}>
                            <Route path="/catalog/products" element={<ProductsList products={products} />} />
                            <Route path="/catalog/suppliers" element={<SuppliersList allSuppliers={allSuppliers} setAllSuppliers={setAllSuppliers} />} />
                            <Route path="/catalog/users/new" element={<CreateUser currentUser={currentUser} />} />
                            <Route path="/catalog/users/roles" element={<PosRoles />} />
                            <Route path="/catalog/products/details/:productId" element={<ProductDetails products={products} />} />
                            <Route path="/catalog/products/edit/:productId" element={<EditProduct brands={brands} allSuppliers={allSuppliers} productTypes={productTypes} allCat={allCat} products={products} setProducts={setProducts} />} />
                          </Route>

                          <Route path="/customers" element={<CustomersList allCustomers={allCustomers} setAllCustomers={setAllCustomers} />} />
                          <Route path='/setup' element={<Setup brands={brands} setBrands={setBrands} allCat={allCat} setAllCat={setAllCat} productTypes={productTypes} />} >
                          </Route>
                          <Route path="/account" element={<Account stock={products} updateStock={products} user={currentUser} setIsLogged={setIsLogged} onLogout={setCurrentUser} allCat={allCat} />} >
                            <Route path="/account/user_profile" element={<UserProfile user={currentUser} updateUser={setCurrentUser} setCurrentUser={setCurrentUser} />} />
                            <Route path="/account/users" element={<UsersList users={users} setUsers={setUsers} />} />
                          </Route>

                          <Route path="/setup/brands/edit/:brandId" element={<EditBrands brands={brands} setBrands={setBrands} />} />
                          <Route path="/catalog/suppliers/edit/:supplierId" element={<EditSupplier allSuppliers={allSuppliers} setAllSuppliers={setAllSuppliers} />} />
                          <Route path="/catalog/products/new" element={<CreateProduct brands={brands} allSuppliers={allSuppliers} setAllSuppliers={setAllSuppliers} productTypes={productTypes} allCat={allCat} setAllCat={setAllCat} products={products} setProducts={setProducts} setBrands={setBrands} />} />

                        </Routes>
                      </>
                    ) : (
                      <p>Loading .....</p>
                    )}
                  </div>
                </div>
              </div>
              {/* end of row */}
            </div>
          </div>
        }
      </div>
    </div>

  );
}

export default App;
