import Dashboard from './components/Dashboard/Dashboard';
import React,{useState,useEffect} from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import SidebarMenu from './Pages/SidebarMenu/SidebarMenu';
import Navbar from './Pages/Navbar/Navbar';
import Items from './components/Items/Items';
import './App.css';

function App() {

  const[items,setItems] = useState([])

   // fetches all items
   useEffect(()=>{
    fetch('http://localhost:3000/parts')
      .then(resp=>resp.json())
      .then(data=> {setItems(data);console.log('items',items);})
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  },[])

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
        <BrowserRouter>
        <div className='d-none d-md-flex d-sm-flex col-md-3 col-lg-2 min-vh-100 col-sm-2 '>
        <SidebarMenu />
        </div>
        
        <div id="scrollableDiv" className="main-section col-md-9 col-lg-10 col-sm-10  overflow-y-scroll" style={{ maxHeight: '100vh' }}onScroll={handleScroll} >
        <Navbar sticky={isSticky}/>
        <div className={`${isSticky ? 'sticky-bottom' : ''} bg-black`}></div>
          <Routes>
            <Route path="/" element={<Dashboard  />} />
            <Route path="/items" element={<Items  items={items}/>} />
            </Routes>
          
        </div>
        </BrowserRouter>
        </div>
      </div>    
      
    </div>
  );
}

export default App;
