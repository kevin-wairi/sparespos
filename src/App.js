import Dashboard from './Pages/Dashboard/Dashboard';
import React,{useState,useEffect} from 'react'
import { Route,Routes, useLocation } from 'react-router-dom';
import SidebarMenu from './Components/SidebarMenu/SidebarMenu';
import Navbar from './Components/Navbar/Navbar';
import Items from './Pages/Items/Items';
import Cart from './Pages/Cart/Cart';
import './App.css';
import Checkout from './Pages/Checkout/Checkout';
import Signin from './Components/Signin/Signin';
import Profile from './Components/Profile/Profile';
import Tables from './Pages/Tables/Tables';



function App() {

  const location = useLocation();

 
  const[items,setItems] = useState([])
  const[cartItems,setCartItems] = useState([])
  const[toggleMenu,setToggle] = useState(false)
  const [cartCount,setCartCount] = useState(0)
  const [loading, setLoading] = useState(true);
  const[user,setUser]= useState()
  const[allUser,setAllUser]= useState()
  const [userLoggedOut,setLoggedOut] = useState(true)


  useEffect(()=>{
    const username = sessionStorage.getItem('username');
    if (username) {
      fetch('http://localhost:3000/users')
      .then(resp=>resp.json())
      .then(data=>{
        const currentUser = data.filter((user)=>user.username === username)
      setAllUser(data)
      setUser(currentUser[0])
      setLoading(false)
      console.log('useUser',currentUser[0]);})
    } else {
      setUser(null)
      setLoading(false)
    }
    
  },[userLoggedOut])


  // const navigate = useNavigate();
  // const isSignupPage = window.location.pathname === '/signup';

  const toggleState = () => {
    // Use the callback function to toggle the state
    setToggle(prevState => !prevState);
  };

   // fetches all items
   useEffect(()=>{
    fetch('http://localhost:3000/parts')
      .then(resp=>resp.json())
      .then(data=> {setItems(data);
        console.log('items',items);})
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  },[])

    //add items to cart
  function handleAddToCart(spare_id){
    
    let selected = items.find((item) => item.id === spare_id);
    let foundItem = cartItems.find((item) => item.id === spare_id);


      if(foundItem ){
        fetch(`http://localhost:3000/cart/${spare_id}`,{
          method: "DELETE",
          headers:{
            "Content-Type": "application/json",
            "accepts":"application/json"
          }
        }) 
        .then(() => {
          const updatedCartItems = cartItems.filter((item) => item.id !== spare_id);
          setCartItems(updatedCartItems); 
          console.log('deleted');
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    }else{
      fetch('http://localhost:3000/cart',{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "accepts":"application/json"
        },
        body:JSON.stringify({
            'carMake': selected.carMake,
            'carModel': selected.carModel,
            "description": selected.description,
            "markedPrice": selected.markedPrice,
            "category": selected.category,
            "year": selected.year,
            "sellingPrice":selected.sellingPrice,
            "image": selected.image,
            "id": selected.id,
            "rating":selected.rating,
            "status":selected.status,
            "title":selected.title,
            "cartQuantity": 1
          })
      })
      .then(resp=>resp.json())
      .then((data)=> {  setCartItems([...cartItems, data]) 
        console.log('added');
        })
      .catch((error) =>  console.log(error))
    }
  }

   // fetches all cart Items
   useEffect(()=>{
    fetch('http://localhost:3000/cart')
      .then(resp=>resp.json())
      .then(data=> {setCartItems(data)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  },[])

    //counts cart items
  useEffect(()=>{
    const totalCount = cartItems.reduce((total,item)=>total = total + parseInt(item.cartQuantity),0)
    // console.log('totalCount',totalCount );
      setCartCount(totalCount)
  },[cartItems,setCartItems])

  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    const offset = document.getElementById('scrollableDiv').scrollTop;

    if (offset > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  
  return (
    <div className="App bg-light ">
      <div className='container-fluid'>
        <div className='row'>
    
        <div className={`${toggleMenu ? 'disp-overlay' : 'd-none'} ${isSticky && toggleMenu ? 'py-5' : ''}py-4 d-sm-flex col-sm-3 col-md-3 col-lg-2 min-vh-100`} >
                    { !(location.pathname.includes('/signup') || location.pathname.includes('/signin')) && <SidebarMenu closeSidebar={toggleState}/>}
        </div>
        
        <div id="scrollableDiv" className="main-section col-md-9 col-lg-10 col-sm-9  overflow-y-scroll" style={{ maxHeight: '100vh' }}onScroll={handleScroll} >
          
        { !(location.pathname.includes('/profile') || location.pathname.includes('/signup') || location.pathname.includes('/signin')) && <Navbar sticky={isSticky} openSidebar={toggleState} cartCount={cartCount} user={user} loggedOut={setLoggedOut} onLogout={setUser}/>}
        
        <div className={`${isSticky ? 'sticky-bottom' : ''}`}></div>
        {!loading ?(
          <Routes>
            <Route path="/" element={<Dashboard  />} />
            <Route path="/items" element={<Items  items={items} purchase={handleAddToCart}/>} />
            <Route path="/cart" element={<Cart  cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/checkout" element={<Checkout  />} />
            <Route path="/profile" element={<Profile   stock={items} updateStock={setItems}>
              <Navbar openSidebar={toggleState} cartCount={cartCount} user={user} loggedOut={setLoggedOut} onLogout={setUser}/>
            </Profile>} />
            <Route path="/signin" element={<Signin  onLogin={setUser} loggedOut={setLoggedOut} onLogout={setUser}>
              <Navbar openSidebar={toggleState} cartCount={cartCount} user={user} loggedOut={setLoggedOut} onLogout={setUser}/>
            </Signin>} />
            <Route path="/tables" element={<Tables stock={items}  allUser={allUser}/>} />
          </Routes>
            ) : (
          <p>Loading .....</p>
        )}
        </div>
        </div>
      </div>    
      
    </div>
  );
}

export default App;
