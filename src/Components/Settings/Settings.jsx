import React,{useState,useEffect} from 'react'
import './Settings.css'
import Swal from 'sweetalert2';
import profile from '../../assets/images/profile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleDollarToSlot,faUser,faGear,faHouse,faSlash,faCartShopping,faBars,faBell} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom'

import {carMakes} from '../ArrayFiles/CarMakes'
import {carModels} from '../ArrayFiles/CarModel'
import {carModelsYears} from '../ArrayFiles/CarModelsYears'
import {carSparePartsCategories} from '../ArrayFiles/CarSparePartsCategories'

function Settings({stock,updateStock,openSidebar,cartCount,user,loggedOut,onLogout,setCartItems}) {

  const[description,setDescription] = useState('')
  const[carMake,setCarMake] = useState('')
  const[carModel,setCarModel] = useState('')
  const[year,setYear] = useState('')
  const [selectedFile, setSelectedFile] = useState(null);
  const[markedPrice,setMarkedPrice] = useState('')
  const[sellingPrice,setSellingPrice] = useState('')
  const[quantity,setQuantity] = useState('')
  const[category,setCategory] = useState('')
  const[title,setTitle] = useState('')
  const[selectedStatus,setSelectedStatus] = useState('')
  const [datePosted, setDatePosted] = useState(''); 

  const[error,setError] = useState('')
  const[goodsError,setGoodsError] = useState('')

  const[business,setBusiness] = useState("")
    const[username,setUsername] = useState("")
    const[fullname,setFullname] = useState("")
    const[phoneNumber,setPhoneNumber] = useState("")
    const[password,setPassword] = useState("")
    const[passwordConfirmation,setPasswordConfirmation] = useState("")

    const[image,setImage] = useState('')
    const[itemId,setItemId] = useState('')


    const[searchCategory,setSearchCategory] = useState('')
    const[searchCarMake,setSearchCarMake] = useState('')
    const[searchCarModel,setSearchCarModel] = useState('')
    const[filteredGoods,setFilteredGoods]= useState([])
    
  
  // add goods to stock
  async function handleAddGoods(){

    try{
    const response = await fetch('http://localhost:3000/parts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json',
            },
            body: JSON.stringify({
                title,
                category,
                description,
                carMake,
                carModel,
                year,
                image:selectedFile,
                markedPrice,
                sellingPrice,
                quantity,
                status:selectedStatus,
                datePosted
                
            }),
        })

        const data = await response.json();
        if (response.ok) {
            console.log('added goods',data);
            const updatedspares= [...stock,data]
            updateStock(updatedspares)
        }else {
            console.error('Failed to add goods:');
            setGoodsError('Failed to add goods:')
        }
    }catch (error) {
            console.error('Error:', error);
        }
}

const handleStatusChanged = (e)=>{
  setSelectedStatus(e.target.id)
  setDatePosted(new Date().toDateString()); 
}
const handleFileChange = (e)=>{
  setSelectedFile(URL.createObjectURL(e.target.files[0]))
  console.log(URL.createObjectURL(e.target.files[0]));
}

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
              creditWorthy:'false',
              discounted: 'false'
          }),
      });

      const data = await response.json();
      if (response.ok) {
          console.log('userData signup',data.username);
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
  useEffect(()=>{
        
    const filterForUpdates = stock.filter((spare) => {
        const spareCategory = (spare.category || '').toLowerCase();
        const carMake = (spare.carMake || '').toLowerCase();
        const carModel = (spare.carModel || '').toLowerCase();
    
        const isCategoryMatch = spareCategory.includes(searchCategory.toLowerCase());
        const isCarMakeMatch = carMake.includes(searchCarMake.toLowerCase());
        const isCarModelMatch = carModel.includes(searchCarModel.toLowerCase());

        return isCategoryMatch && isCarMakeMatch && isCarModelMatch;
      });
      setFilteredGoods(filterForUpdates)
      console.log('filterForUpdates',filterForUpdates);
},[searchCategory, searchCarMake, searchCarModel,stock])

// update goods
function handleUpdateGoods(e,item_id){
  e.preventDefault()
  const id = parseInt(item_id)
  fetch(`http://localhost:3000/parts/${id}`,{
      method:"PATCH",
      headers:{
          'Content-Type': "application/json"
      },
      body:JSON.stringify({
          description,
          carMake,
          carModelNumber:12345678,
          carModel,
          year,
          image,
          markedPrice,
          sellingPrice,
          quantity,
          status:selectedStatus,
          category
      })
  })
.then(resp=>resp.json())
.then(data=>{
  const updatedData = stock.map(spare => {
      if (spare.id === id) {
          return { ...stock, ...data };
      }
      return spare;
  });
  updateStock(updatedData)
  setDescription('')
  setCarMake('')
  setCarModel('')
  setYear('')
  setSelectedFile(null);
  setMarkedPrice('')
  setSellingPrice('')
  setQuantity('')
  setCategory('')
  setTitle('')
  setSelectedStatus('')
})

.catch((error) => {
  console.error('Fetch error:', error);
})

}


// update stock details
function handleEdit(spare){
  console.log('sparedddd',spare);
  setCarMake(spare.carMake);
  setCarModel(spare.carModel);
  setYear(spare.Year);
      
  setMarkedPrice(spare.markedPrice);
  setSellingPrice(spare.sellingPrice);
  setQuantity(spare.quantity);
  setCategory(spare.category);
  setDescription(spare.description)
  setSelectedStatus(spare.selectedStatus)
  setItemId(spare.id)
}

// handle delete stock
function handleDelete(spare_id,e){
  e.preventDefault()
  const id = parseInt(spare_id)
  fetch(`http://localhost:3000/parts/${id}`,{
      method:"DELETE"
  })
.then(resp=>{
  if(resp.ok){
          updateStock(stock.filter(spare => spare.id !== spare_id));
  
  } else {
      throw new Error('Network response was not ok.');
  }
})
.catch((error) => {
  console.error('Fetch error:', error);
})

}

const location = useLocation()
let pathname
if (location.pathname.length == 1) {
    pathname = 'Dashboard'
}  else{
    pathname = location.pathname.slice(1);
}

// handles logout
function handleLogout(){
  sessionStorage.clear();
  loggedOut(true)
  onLogout()
  setCartItems([])
}

  return (
    <div className="wrapper h-100 overflow-y-scroll" style={{width:'95vw'}}>
    <div class="row justify-content-center align-items-center g-2 my-3 mx-2  ">
        <div class="col-12  profile-bg rounded d-flex justify-content-center" style={{minHeight: '250px'}}>
        <div className=" container-fluid m-0  align-items-start w-100vw row ">
              <div
                class="row justify-content-center align-items-start g-2 m-0 rounded p-1 my-1 profile-nav"
              >
                <div class="col ">
                <nav className='d-flex justify-content-between  '>
                <div className="col-4">
                    <div className='text-start'>
                    <div className="d-flex gap-1">
                    <div><a href="/"><FontAwesomeIcon icon={faHouse} size="xs" style={{color: "#292929",}} /></a></div>
                    <div><FontAwesomeIcon icon={faSlash} rotation={90} size="2xs" /></div>
                    <p className='menu-p align-self-center m-0'>{pathname}</p>
                    </div>
                    
                    <a className="navbar-brand ">{pathname}</a>
                    </div>
                </div>
                   
                    <div className="col-7 d-flex justify-content-end align-items-end  ">
                        <div className="row d-flex justify-content-end align-items-end gap-2 m-0  ">
                            <div className="col-5 col-xl-4 pt-2 d-flex align-items-end gap-3 justify-content-end">
                                
                                <NavLink to='/cart'>
                                <div className="d-flex align-items-end justify-content-center gap-1">
                                    <FontAwesomeIcon icon={faCartShopping} style={{color: "#000000",}} />
                                    <p className='m-0 lh-1 '>{cartCount}</p>
                                </div>
                                </NavLink>
                                <FontAwesomeIcon className='d-xl-none d-md-flex' onClick={()=>openSidebar()} icon={faBars} />
                                <NavLink to='/settings'>
                                    <div className="d-flex align-items-end justify-content-center gap-1">
                                            <FontAwesomeIcon icon={faBell} />
                                            <p className='m-0 lh-1 '>0</p>
                                    </div>
                                </NavLink>
                                
                            </div>
                            <div className='d-flex menu-p col-6 col-xl-7 align-items-center gap-2 p-0'>
                                
                            
                                <div className="d-flex gap-2 align-items-end">
                                
                                {!user &&
                                    
                                    <NavLink to='/signin'>
                                    <div className="d-flex gap-2 align-items-center">
                                        <FontAwesomeIcon icon={faUser} style={{color: "#000000",}} />
                                        <p className='m-0'>sign in</p>
                                    </div>
                                    </NavLink>
                                }
                                {user  &&
                                    <div>
                                        <NavLink to='/profile'>
                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                            <FontAwesomeIcon icon={faUser} style={{color: "#000000",}} />
                                            <p className='m-0 d-none d-md-flex '>{(user.business).slice(0,10)+'..'}</p>
                                        </div>
                                        </NavLink>
                                        <div className="dropdown dropstart lh-1 mx-3">
                                                <FontAwesomeIcon className="dropdown-toggle "  id="dropdownMenuButton1" data-bs-toggle="dropdown" icon={faGear} style={{color: "#000000",}} />
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li onClick={()=>handleLogout()}><a className="dropdown-item menu-p" href="#">Logout</a></li>
                                            </ul>
                                        </div>
                                    </div>
                               }
                            
                                </div>
                                
                            </div>
                        </div>
                    </div>
                  </nav>
                </div>
              </div>
              
                
            </div>
            <div class="card profile-card border-0">
              <div class="card-body p-2">
               <div class="row justify-content-between align-items-center g-2 ">
                <div class="col-lg-4 col-md-4 col-8 d-flex gap-lg-2 gap-1 text-start ">
                    <div className="profile-img " style={{height: '70px', width:'70px'}}>
                      <img className='img-fluid rounded' src={profile} alt="username" />
                    </div>
                    <div className="profile-tag">
                      <h6>{user ? user.username : 'User'}</h6>
                      <p>{user ? user.business : 'Untitled'} </p>
                    </div>
                </div>
                <div class="col-lg-2 px-2  col-3  d-flex align-items-center align-self-end gap-2 justify-content-end">
                  <FontAwesomeIcon icon={faGear} style={{color: "#000000",}} />
                  <p className='m-0'>Settings</p>
                </div>
               </div>
              </div>
            </div>
        </div>
    </div>
  <div class="row justify-content-center align-items-center g-2 my-5 mx-1">
    <div class="col-lg-3 col-md-6 col-12">
          <div class="card border-0">
            <div class="card-body d-flex p-2">
            <div className="col-8">
              <p className='m-0'>Todays Sales</p>
              <p className='m-0'>Ksh. 34577</p>
            </div>
            <div className="col-4">
              <div className="btn border"><FontAwesomeIcon icon={faCircleDollarToSlot} style={{color: "#000000",}} /></div>
            </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
          <div class="card border-0">
            <div class="card-body d-flex p-2">
            <div className="col-8">
              <p className='m-0'>Todas users</p>
              <p className='m-0'>Ksh. 34577</p>
            </div>
            <div className="col-4">
              <div className="btn border"><FontAwesomeIcon icon={faCircleDollarToSlot} style={{color: "#000000",}} /></div>
            </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
          <div class="card border-0">
            <div class="card-body d-flex p-2">
            <div className="col-8">
              <p className='m-0'>New Clients</p>
              <p className='m-0'>Ksh. 34577</p>
            </div>
            <div className="col-4">
              <div className="btn border"><FontAwesomeIcon icon={faCircleDollarToSlot} style={{color: "#000000",}} /></div>
            </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
          <div class="card border-0">
            <div class="card-body d-flex p-2">
            <div className="col-8">
              <p className='m-0'>Sales</p>
              <p className='m-0'>Ksh. 34577</p>
            </div>
            <div className="col-4">
              <div className="btn border"><FontAwesomeIcon icon={faCircleDollarToSlot} style={{color: "#000000",}} /></div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center  g-2 p-2">
              {/* add products */}
       <div className="col-lg-6 col-11 ">
          <div class="card border-0 ">
            <div class="card-body">
            <p className='fw-bold text-start'>Add Items</p>
              <form className=" mx-1 mx-md-4 form" onSubmit={(e)=>handleAddGoods(e)}>
               <div className="row">
                  <div className="d-flex flex-row align-items-center mb-2 col-12 col-lg-6">
                          <div className="form__div m-1">
                            <input required type="text" className="form-control rounded"   value={title} onChange={(e) => setTitle(e.target.value)} />
                            <label className="form__label text-start text-capitalize">Name of Product</label>
                          </div>
                  </div>
                    <div className="form-outline flex-fill mb-0 col-12 col-lg-5">
                    <div className="form__div m-1">
                        <input required type="text" list='data3' className="form-control rounded"  value={category} onChange={(e) => setCategory(e.target.value)} />
                        <label className="form__label text-start text-capitalize">Category</label>
                    </div>
                        
                        
                        <datalist id='data3'>
                        {carSparePartsCategories.map((element) => (
                            <option key={element} value={element}>{element}</option>
                            ))}
                        </datalist>
                    </div>
                    <div className="form-outline flex-fill mb-0  col-12">
                        <div className="form__div m-1 ">
                          <input required type="file" className="form-control rounded"  onChange={(e)=>handleFileChange(e)} />
                        <label className="form__label text-start text-capitalize">Image</label>
                        </div>
                    </div>

                    <div className="form-outline  mb-0 col-lg-4 col-6">
                      <div className="form__div m-1 ">
                          <input type="text" required className='form-control rounded' list='data'  value={carMake} onChange={(e) => setCarMake(e.target.value)}/>
                          <label className="form__label text-start text-capitalize ">Car Make</label>
                      </div>
                        
                        <datalist id='data'>
                            {carMakes.map((element) => (
                            <option key={element} value={element}>{element}</option>
                            ))}
                        </datalist>
                    </div>
                    <div className="form-outline  mb-0 col-lg-4 col-6">
                      <div className="form__div m-1">
                        <input required type="text" list='data1' className="form-control rounded"  value={carModel} onChange={(e) => setCarModel(e.target.value)} />
                        <label className="form__label text-start text-capitalize">Car Model</label>
                      </div>
                        
                        <datalist id='data1'>
                        {carModels[carMake] && carModels[carMake].map((model) => (
                            <option key={model} value={model}>{model}</option>
                        ))}
                        </datalist>
                    </div>
                    <div className="form-outline  mb-0 col-6 col-lg-4">
                      <div className="form__div m-1">
                      <input required type="text" list='data2' className="form-control rounded"  value={year} onChange={(e) => setYear(e.target.value)} />
                      <label className="form__label text-start text-capitalize">Year</label>
                      </div>
                        
                        <datalist id='data2'>
                        {carModelsYears[carMake] && carModelsYears[carMake][carModel] && carModelsYears[carMake][carModel].map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                        </datalist>
                    </div>
                    <div className="form-outline  mb-0 col-6">
                      <div className="form__div m-1">
                        <input required type="number" className="form-control rounded" value={markedPrice} onChange={(e) => setMarkedPrice(e.target.value)} />
                        <label className="form__label text-start text-capitalize">Marked Price</label>
                      </div>
                        
                    </div>
                    <div className="form-outline  mb-0 col-6">
                        <div className="form__div m-1">
                          <input required type="number" className="form-control rounded"  value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
                          <label className="form__label text-start text-capitalize">Selling Price</label>
                        </div>
                    </div>
                
                
                <div className="form-outline  mb-0 col-6">
                      <div className="form__div m-1 ">
                        <input required type="number" className="form-control rounded"  value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                      <label className="form__label text-start text-capitalize">Quantity</label>
                      </div>
                        
                    </div>
                   <div className="form-outline  mb-0 col-6 col-12 col-lg-6">
                   <div className="form-check">
                        <input required class="form-check-input required" type="radio" name="shipmentStatus" id="arrived" onChange={handleStatusChanged} checked={selectedStatus === 'arrived'}  />
                        <label class="form-check-label" for="arrived">
                            Goods have arrived
                        </label>
                    </div>
                    <div className="form-check">
                        <input required class="form-check-input required" type="radio" name="shipmentStatus" id="inTransit" onChange={handleStatusChanged} checked={selectedStatus === 'inTransit'}  />
                        <label class="form-check-label" for="inTransit">
                            Goods are in transit
                        </label>
                    </div>
                   </div>
                <div className="d-flex flex-row align-items-center mb-2">
                    <div className="form-outline flex-fill mb-0">
                        <div className="form__div m-1">
                          <textarea className="form-control rounded" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <label className="form__label text-start text-capitalize">Description</label>
                        </div>
                        
                    </div>
                </div>
                
                {goodsError && <div className='text-danger align-text-center  col-6 mx-auto'>{goodsError}</div>}
                    <div className="d-flex justify-content-center ">
                        <button type="submit"  className="btn btn-primary ">Add </button>
                    </div>
                    </div>
                </form>
            </div>
          </div>

       </div>

       {/* add users */}
       <div className="col-lg-6 col-11">
       
       <div class="card border-0">
            <div class="card-body">
            <p className='fw-bold text-start'>Add Users</p>
            <form className="col-11 mx-auto" onSubmit={(e)=>handleSignupForm(e)}>
            <div className="form-outline  mb-0 col">
                    <div className="form__div m-1">
                      <input type="text" className="form-control rounded"  value={business} onChange={(e)=>setBusiness(e.target.value)}/>
                    <label className="form__label text-start text-capitalize" >Business Name</label>
                    </div>
                    
                </div>
            <div className="align-items-center  mb-2">
                <div className="form-outline  mb-0 col">
                    <div className="form__div m-1">
                      <input type="text" className="form-control rounded"  value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <label className="form__label text-start text-capitalize" >Username</label>
                    </div>
                    
                </div>
            </div>
            <div className="form-outline  mb-0 col">
                    <div className="form-outline flex-fill mb-0">
                    <div className="form__div m-1">
                      <input type="text" className="form-control rounded"  value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
                    <label className="form__label text-start text-capitalize" >Full Name</label>
                    </div>
                    
                    </div>
                </div>
            <div className="align-items-center mb-2">
               
                <div className="form-outline  mb-0 col">
                <div className="form__div m-1">
                  <input type="text" className="form-control rounded"  value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                <label className="form__label text-start text-capitalize" >Phone Number</label>
                </div>
                
                </div>
            </div>

            <div className="  align-items-center mb-2">
                <div className="form-outline mb-0">
                <div className="form__div m-1">
                  <input type="password" className="form-control rounded"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <label className="form__label text-start text-capitalize" >Password</label>
                </div>
                
                </div>
            </div>

            <div className=" align-items-center mb-2">
                <div className="form-outline  mb-0">
                <div className="form__div m-1">
                  <input type="password" className="form-control rounded"  value={passwordConfirmation} onChange={(e)=>setPasswordConfirmation(e.target.value)}/>
                <label className="form__label text-start text-capitalize" >confirm password</label>
                </div>
                
                </div>
            </div>
            {/* 
            <div className="form-check d-flex justify-content-center mb-5">
                <label className="form-check-label" for="form2Example3">
                I agree all statements in <a href="#!">Terms of service</a>
                </label>
            </div> */}

            {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 pb-md-4 pb-sm-2 ">
                <button type="submit"  className="btn btn-primary ">Register User</button>
            </div>
        </form>
            </div>
          </div>
       </div>

      </div>

      <div className="row d-flex m-0">
  
                      {/* update form for items */}
            <div className="col-12">
              <div class="card border-0 px-2">
              <div class="card-body">
                <p className='fw-bold text-start'>Filter Items to Update Items</p>
              <form className='form row'>
                  
                  <div class="form-outline mb-0 col-lg-4 col-12">
                      <div className="form__div">
                        <input type="text" list='data3' className="form-control rounded"  value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} />
                        <label className="form__label text-start text-capitalize">Category</label>
                      </div>
                  </div>
                  
                  <div className="form-outline  mb-0 col-lg-4 col-12">
                    <div className="form__div">
                      <input className='form-control rounded' list='data'  value={searchCarMake} onChange={(e) => setSearchCarMake(e.target.value)}/>
                      <label className="form__label text-start text-capitalize">Car Make</label>
                    </div>
                      <datalist id='data'>
                          {carMakes.map((element) => (
                          <option key={element} value={element}>{element}</option>
                          ))}
                      </datalist>
                  </div>
                  <div className="form-outline  mb-0 col-lg-4 col-12">
                    <div className="form__div">
                      <input type="text" list='data1' className="form-control rounded"  value={searchCarModel} onChange={(e) => setSearchCarModel(e.target.value)} />
                      <label className="form__label text-start text-capitalize">Car Model</label>
                    </div>
                      <datalist id='data1'>
                      {carModels[carMake] && carModels[carMake].map((model) => (
                          <option key={model} value={model}>{model}</option>
                      ))}
                      </datalist>
                  </div>
              </form>
              </div>
             </div>
              </div>
              <div class="col-12 my-3">
                <div class="card border-0">
                  <div class="card-body">
                  <p className='fw-bold text-start'>Change Item values here</p>
                  <form className=" row" onSubmit={(e)=>handleUpdateGoods(e,itemId)}>
                    
                    <div className="form-outline  mb-0 col-lg-3 col-6">
                      <div className="form__div">
                        <input className='form-control rounded' list='data'  value={carMake} onChange={(e) => setCarMake(e.target.value)}/>
                        <label className="form__label text-start text-capitalize">Car Make</label>
                      </div>
                        <datalist id='data'>
                            {carMakes.map((element) => (
                            <option key={element} value={element}>{element}</option>
                            ))}
                        </datalist>
                    </div>
                    <div className="form-outline  mb-0 col-lg-3 col-6">
                      <div className="form__div">
                        <input type="text" list='data1' className="form-control rounded"  value={carModel} onChange={(e) => setCarModel(e.target.value)} />
                        <label className="form__label text-start text-capitalize">Car Model</label>
                      </div>
                        <datalist id='data1'>
                        {carModels[carMake] && carModels[carMake].map((model) => (
                            <option key={model} value={model}>{model}</option>
                        ))}
                        </datalist>
                    </div>
                    <div className="form-outline  mb-0 col-lg-3 col-6">
                      <div className="form__div">
                        <input type="text" list='data2' className="form-control rounded"  value={year} onChange={(e) => setYear(e.target.value)} />
                        <label className="form__label text-start text-capitalize">Year</label>
                      </div>
                        <datalist id='data2'>
                        {carModelsYears[carMake] && carModelsYears[carMake][carModel] && carModelsYears[carMake][carModel].map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                        </datalist>
                    </div>
                    <div className="form-outline  mb-0 col-lg-3 col-6">
                      <div className="form__div">
                        <input type="number" className="form-control rounded" value={quantity}  onChange={(e) => setQuantity(e.target.value)} />
                        <label className="form__label text-start text-capitalize">Quantity</label>
                      </div>
                    </div>
                    
                    <div className="form-outline  mb-0 col-lg-3 col-6">
                      <div className="form__div">
                        <input type="number" className="form-control rounded" value={markedPrice}  onChange={(e) => setMarkedPrice(e.target.value)} />
                        <label className="form__label text-start text-capitalize">Marked Price</label>
                      </div>
                    </div>
                    <div className="form-outline  mb-0 col-lg-3 col-6">
                      <div className="form__div">
                        <input type="number" className="form-control rounded" value={sellingPrice}  onChange={(e) => setSellingPrice(e.target.value)} />
                        <label className="form__label text-start text-capitalize">Selling Price</label>
                      </div>
                    </div>
                    <div className="form-outline flex-fill mb-0 col-lg-4 col-12">
                      <div className="form__div">
                        <input type="file" className="form-control rounded" value={image}  onChange={(e) => setImage(e.target.value)} />
                        <label className="form__label text-start text-capitalize">Image</label>
                      </div>
                    </div>
                    <div className="form-outline flex-fill mb-0 col-lg-4 col-12">
                      <div className="form__div">
                        <input type="text" list='data3' className="form-control rounded" value={category}  onChange={(e) => setCategory(e.target.value)} />
                        <label className="form__label text-start text-capitalize">Category</label>
                      </div>
                        <datalist id='data3'>
                        {carSparePartsCategories.map((element) => (
                            <option key={element} value={element}>{element}</option>
                            ))}
                        </datalist>
                    </div>
                    <div className="col-lg-3 col-12 ">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="shipmentStatus" id="arrived" onChange={handleStatusChanged}  checked={selectedStatus === 'arrived'}/>
                        <label className="form-check-label" for="arrived">
                            Goods have arrived
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="shipmentStatus" id="inTransit" onChange={handleStatusChanged} checked={selectedStatus === 'inTransit'}/>
                        <label className="form-check-label" for="inTransit">
                            Goods are in transit
                        </label>
                    </div>
                    </div>
                
                    <div className="form-outline flex-fill mb-0">
                      <div className="form__div">
                        <textarea className="form-control rounded" rows="3" value={description}  onChange={(e) => setDescription(e.target.value)} />
                        <label className="form__label text-start text-capitalize">Description</label>
                      </div>
                    </div>
                
                {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
                    <div className="d-flex justify-content-center col-12">
                        <button type="submit"  className="btn btn-primary flex-fill">Update</button>
                    </div>
                </form>
                  </div>
                </div>
              </div>

      
            </div>
            {/* filtered goods */}
            <div class="row justify-content-center align-items-center g-2">
              <div className="card-container">
                      <div className='row '>
                      {filteredGoods.length < stock.length && filteredGoods.map((spare)=>(
                        <div className="col-lg-3 col-6">
                          <div className="card p-2">
                          <div className="image-container ">
                          <img className="img-fluid thumbnailImage" src={spare.image} alt="Card cap"/>
                          </div>
                          <div className="card-body p-0 d-flex flex-column justify-content-between">
                              <p className="card-title  m-0 text-md">{spare.description}</p>
                              <p className="card-title fw-bold ">{spare.category}</p>
                            <div className="row d-flex justify-content-between ">
                              <p className="card-text col-8"> <span className='fw-bold'>ksh.</span> <span className='fw-light'>{spare.markedPrice}</span> </p>
                              {/* <div className='col-3' onClick={()=>handleAddToCartClick(spare.id)}><img src={cartIsAdded ? redcartimg : cartimg}  alt='shopping'/></div> */}
                            </div>
                            <div className='row '>
                            <button className="btn border-success col-5 flex-fill m-2" onClick={(e)=>handleEdit(spare,e)}>Update </button>
                            <button className="btn border-danger col-5 flex-fill m-2" onClick={(e)=>handleDelete(spare.id,e)}>Delete </button>
                              </div>
                          </div>
                        </div>
                        </div>
                          
                  ))}
              </div>
            </div> 
      </div>  

    </div>
  )
}

export default Settings