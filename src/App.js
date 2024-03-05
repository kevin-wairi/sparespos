import Dashboard from './Pages/Dashboard/Dashboard';
import React,{useState,useEffect} from 'react'
import { Route,Routes, useLocation } from 'react-router-dom';
import SidebarMenu from './Components/SidebarMenu/SidebarMenu';
import Items from './Pages/Items/Items';
import './App.css';
import Signin from './Components/Signin/Signin';
import Settings from './Components/Settings/Settings'
import Tables from './Pages/Tables/Tables';



function App() {

  const location = useLocation();

 
  const[items,setItems] = useState([])
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



   // !fetches all items
   useEffect(()=>{
    fetch('http://localhost:3000/parts')
      .then(resp=>resp.json())
      .then(data=> {setItems(data);
        console.log('items',items);})
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  },[])



  return (
    <div className="App">
      <div className='container-fluid bg-blue-gray-50 p-0' style={{maxHeight:'100vh',maxWidth:'100vw'}}>
        <div className='d-flex h-100 w-100 '>
    
          <div className='p-0' style={{width:'5vw'}}>
            { !(location.pathname.includes('/signup') || location.pathname.includes('/signin')) && <SidebarMenu />}
          </div>
          
          <div className="main-section px-0" style={{  maxHeight: '100vh',width:'95vw'}} >
              {!loading ?(
                <div className='d-flex h-100 p-0'>
                <div style={{width:'95vw',height:'100vh'}}>
                <Routes>
                  <Route path="/" element={<Dashboard  user={user}/>} />
                  <Route path="/items"  element={<Items  items={items} user={user} />} />
                  <Route path="/settings" element={<Settings   stock={items} updateStock={setItems} user={user} loggedOut={setLoggedOut} onLogout={setUser} />} />
                  <Route path="/signin" element={<Signin  onLogin={setUser} loggedOut={setLoggedOut} onLogout={setUser}/>}/>
                  <Route path="/tables" element={<Tables stock={items}  allUser={allUser}/>} />
                </Routes>
                </div>
                </div>
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
