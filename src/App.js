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
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [width, setWidth] = useState(window.innerWidth);

  

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
      setCartItems([]);
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

    // update Items and Cart Quantity 
   async function addQuantityToCart(selectedCartItem,operator) {
  
    let selected_id = selectedCartItem.item_id
    let SelectedCart_id = selectedCartItem.id
    let selected = null;
    if (selectedItemId === null) {
       selected = items.find(item => item.item_id === selected_id);
      setSelectedItemId(selected)
    } else if(selectedItemId !== null && selectedItemId.item_id !== selected_id){
       selected = items.find(item => item.item_id === selected_id);
      setSelectedItemId(selected)
    }else if(selectedItemId.item_id === selected_id){
      selected = selectedItemId
    }
     // update cart quantity
    await fetch(`http://localhost:3000/cart/${SelectedCart_id}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "application/json",
        "accepts":"application/json"  
      },
      body:JSON.stringify({
        "cartQuantity": (selectedCartItem.cartQuantity += (operator === 'add' ? 1 : -1))
    })
    })
      .then(resp=>resp.json())
      .then(data=> {
        // setCartItems(data)
        console.log('cartDATA',data);
        })
      .catch((error) => {
        console.error('Fetch error:', error);
    })
  

    // update items quantity
   await fetch(`http://localhost:3000/parts/${selected.item_id}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "application/json",
        "accepts":"application/json"  
      },
      body:JSON.stringify({
        "quantity": (selected.quantity+= (operator === 'add' ? -1 : 1))
    })
    })
      .then(resp=>resp.json())
      .then(data=> {
        setItems(data)
        console.log(data);
        })
      .catch((error) => {
        console.error('Fetch error:', error);
    })
  }


    //add items to cart
  function handleAddToCart(spare_id,user_id){
    let selected = items.find((item) => item.item_id === spare_id);
    let foundItem = cartItems.find((item) => item.item_id === spare_id);
   
      if(foundItem && foundItem.user_id === parseInt(user_id)){

        fetch(`http://localhost:3000/cart/${foundItem.id}`,{
          method: "DELETE",
          headers:{
            "Content-Type": "application/json",
            "accepts":"application/json"
          }
        }) 
        .then(() => {
          fetch('http://localhost:3000/cart')
          .then(resp=>resp.json())
          .then(data=> {
            const myCart = data.filter(item=>parseInt(item.user_id )=== parseInt(user_id))
            setCartItems(myCart)
          })
          console.log('deleted');
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
      }else if(foundItem && foundItem.user_id !== parseInt(user_id)){
        fetch('http://localhost:3000/cart',{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "accepts":"application/json"
        },
        body:JSON.stringify({
            'carMake': foundItem.carMake,
            'carModel': foundItem.carModel,
            "description": foundItem.description,
            "markedPrice": foundItem.markedPrice,
            "category": foundItem.category,
            "year": foundItem.year,
            "sellingPrice":foundItem.status,
            "title":foundItem.title,
            "cartQuantity": 1,
            "user_id": foundItem.user_id,
            "image": selected.image,
            "item_id": selected.id,
            "rating":selected.rating,
            "status":selected.status,
          })
      })
      .then(resp=>resp.json())
      .then((data)=> {  setCartItems([...cartItems, data]) 
        console.log('added');
        // updates item quantity
        fetch(`http://localhost:3000/parts/${selected.item_id}`,{
          method:"PATCH",
          headers:{
            "Content-Type": "application/json",
            "accepts":"application/json"
          },
          body:JSON.stringify({
              "quantity": (selected.quantity-1)
        })
        })
        })
        
    }else if(selected ){
      console.log(selected);
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
            "item_id": selected.id,
            "rating":selected.rating,
            "status":selected.status,
            "title":selected.title,
            "cartQuantity": 1,
            "user_id": user_id
          })
      })
      .then(resp=>resp.json())
      .then((data)=> {  setCartItems([...cartItems, data]) 
        console.log('added');

        // update item quantity 
        fetch(`http://localhost:3000/parts/${selected.item_id}`,{
          method:"PATCH",
          headers:{
            "Content-Type": "application/json",
            "accepts":"application/json"
          },
          body:JSON.stringify({
              "quantity": (selected.quantity-1)
        })
        })
        })
      .catch((error) =>  console.log(error))
    }else{
      console.log('err');
    }
  }

   // fetches all cart Items
   useEffect(()=>{
    if (user) {
      fetch('http://localhost:3000/cart')
      .then(resp=>resp.json())
      .then(data=> {
        // console.log( user.id);
        const myCart = data.filter(item=>parseInt(item.user_id )=== parseInt(user.id))
        setCartItems(myCart)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
    }
  },[user])

    //counts cart items
  useEffect(()=>{
    const totalCount = cartItems.reduce((total,item)=>total = total + parseInt(item.cartQuantity),0)
    // console.log('totalCount',totalCount );
      setCartCount(totalCount)
  },[cartItems,setCartItems,handleAddToCart])

  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    const offset = document.getElementById('scrollableDiv').scrollTop;

    if (offset > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  // set width of main section
  const getWidth = () => {
    return width >= 1200 ? '82vw'  : '100vw';
  };

if (width === '80vw') {
  toggleState();
}

  // const getSidebarWidth = () => {
  //   return width >= 1200 ? '20vw' : '50%';
  // };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (width === '80vw') {
        toggleState(false);
      }
    };
    window.addEventListener('resize', handleResize);

  }, [width]);
  
  // discount function
  function getDiscount(item_id,user){
   
if (user.isAdmin) {
    console.log('granted',item_id);
    console.log(user);

} else {
 
}  
}
  return (
    <div className="App">
      <div className='container-fluid'>
        <div className='row flex-nowrap'>
    
        <div className={`${toggleMenu ? 'disp-overlay' : 'd-none'} ${isSticky && toggleMenu ? 'py-5' : ''} px-0   d-xl-flex`} style={{width: '18vw', height:'100vh'}} >
                    { !(location.pathname.includes('/signup') || location.pathname.includes('/signin')) && <SidebarMenu closeSidebar={toggleState} />}
        </div>
        <div id="scrollableDiv" className="main-section px-0  overflow-y-scroll" style={{  maxHeight: '100vh',width: getWidth()}} onScroll={handleScroll} >
        { !(location.pathname.includes('/profile') || location.pathname.includes('/signup') || location.pathname.includes('/signin')) && <Navbar sticky={isSticky} openSidebar={toggleState} cartCount={cartCount} user={user} loggedOut={setLoggedOut} onLogout={setUser} setCartItems={setCartItems}/>}
        
        <div className={`${isSticky ? 'sticky-bottom' : ''}`}></div>
        {!loading ?(
          <Routes>
            <Route path="/" element={<Dashboard  user={user}/>} />
            <Route path="/items" element={<Items  items={items} purchase={handleAddToCart} user={user}/>} />
            <Route path="/cart" element={<Cart updateCartQuantity={addQuantityToCart} cartItems={cartItems} setCartItems={setCartItems} handleDeleteCart={handleAddToCart} user={user} getDiscount={getDiscount} />}  />
            <Route path="/checkout" element={<Checkout  cartItems={cartItems}/>} />
            <Route path="/profile" element={<Profile   stock={items} updateStock={setItems} openSidebar={toggleState} cartCount={cartCount} user={user} loggedOut={setLoggedOut} onLogout={setUser} setCartItems={setCartItems}>
              
            </Profile>} />
            <Route path="/signin" element={<Signin  onLogin={setUser} loggedOut={setLoggedOut} onLogout={setUser}/>}/>
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
