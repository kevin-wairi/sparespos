import React,{useState} from 'react'
import './Items.css'
import {carSparePartsCategories} from '../../Components/ArrayFiles/CarSparePartsCategories'
import {carModelsYears} from '../../Components/ArrayFiles/CarModelsYears'
import {carModels} from '../../Components/ArrayFiles/CarModel'
import {carMakes} from '../../Components/ArrayFiles/CarMakes'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

            
function Items({items,purchase,user}) {

  const[catFiltered,setCatFiltered]= useState('')
  const[carMakeFiltered,setCarMakeFiltered]= useState('')
  const[carModelFiltered,setCarModelFiltered]= useState('')
  const[yearFiltered,setYearFiltered]= useState('')

  function handleCatChange(e){
    e.preventDefault()
    setCatFiltered(e.target.value)
  }

  function handleCarMakeChange(e){
    e.preventDefault()
    setCarMakeFiltered(e.target.value)
  }

  function handleCarModelChange(e){
    e.preventDefault()
    setCarModelFiltered(e.target.value)
  }

  function handleYearChange(e){
    e.preventDefault()
    setYearFiltered(e.target.value)
  }

  function handleClearFilter(e){
    e.preventDefault()
    setCatFiltered('')
    setCarMakeFiltered('')
    setCarModelFiltered('')
    setYearFiltered('')
    // shopCatDropdown()
  }

  const filteredItems = items.filter((item) => {
    const spareCategory = item.category.toLowerCase();
    const carMake = item.carMake.toLowerCase();
    const carModel = item.carModel.toLowerCase();

    const isCatFiltered= spareCategory.includes(catFiltered.toLowerCase());
    const isCarMakeMatch = carMake.includes(carMakeFiltered.toLowerCase());
    const isCarModelMatch = carModel.includes(carModelFiltered.toLowerCase());


    return isCatFiltered && isCarMakeMatch && isCarModelMatch;
  });

  //filters spares based on year
  const filteredSparesByYear = filteredItems.filter((item) => parseInt(item.Year) === parseInt(yearFiltered));
  // allFilteredSpares
  const allFilteredSpares = yearFiltered ? filteredSparesByYear : filteredItems;


  function getAlert(){
    let timerInterval;
Swal.fire({
  title: "Please signin!",
  timer: 2000,

  willClose: () => {
    clearInterval(timerInterval);
  }
})
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="navbar-expand-lg">
          <button className="btn bg-white border col-12 d-lg-none mb-2 py-2 navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#myForm" aria-controls="formCollapse" aria-expanded="false" aria-label="Toggle navigation">Filter</button>

      <div className="collapse navbar-collapse" id="myForm" >
        <form  className='col-12 py-md-4 py-3 rounded my-2 bg-white  m-0 ' >
                        <div className="form-row d-flex justify-content-around flex-wrap">
                            <div className="col-md-2 col-sm-6 mb-sm-2 col-lg-3 ">
                                <input type="text" list='data4' className="form-control rounded mb-1" placeholder="Category " onChange={(e) => handleCatChange(e)} value={catFiltered}/>
                                <datalist id='data4'>
                                    {carSparePartsCategories.map((element) => (
                                        <option key={element} value={element}>{element}</option>
                                    ))}
                                </datalist>
                            </div>
                            <div className="col-md-2 col-sm-4 col-lg-2 ">
                                <input type="text" list='data1' className="form-control rounded mb-1" placeholder="Car make" onChange={(e) => handleCarMakeChange(e)} value={carMakeFiltered}/>
                                <datalist id='data1'>
                                    {carMakes.map((element) => (
                                        <option key={element} value={element}>{element}</option>
                                    ))}
                                </datalist>
                            </div>
                            <div className="col-md-2 col-sm-6 mb-sm-2 col-lg-2 ">
                                <input type="text" list='data2' className="form-control rounded mb-1" placeholder="Car model" onChange={(e) => handleCarModelChange(e)} value={carModelFiltered}/>
                                <datalist id='data2'>
                                    {carModels[carMakeFiltered] && carModels[carMakeFiltered].map((model) => (
                                        <option key={model} value={model}>{model}</option>
                                    ))}
                                </datalist>
                            </div>
                            <div className="col-md-2 col-sm-4 col-lg-2 ">
                                <input type="number" list='data3' className="form-control rounded mb-1" placeholder="Year" onChange={(e) => handleYearChange(e)} value={yearFiltered}/>
                                <datalist id='data3'>
                                    {carModelsYears[carMakeFiltered] && carModelsYears[carMakeFiltered][carModelFiltered] && carModelsYears[carMakeFiltered][carModelFiltered].map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </datalist>
                            </div>
                            <div className="col-md-1 col-sm-7 col-11 col-lg-1  navbar-toggle">
                              <button  onClick={(e)=>handleClearFilter(e)} className="btn border bg-danger text-white col-12 " >
                                Clear
                              </button>
                            </div>
                        </div>
                  </form>
                </div>
      </div>
      
      </div>
      <div className="row d-flex justiy-content-start">
        {
          allFilteredSpares.map((item)=>(
            <div className="col-md-3 col-lg-2 col-sm-4 col-6 p-0  d-flex align-items-center justify-content-center">
            <div className="card border-0 text-start mb-2 " style={{width: '9rem',height: '15rem'}} >
              <div className="card-img-div align-self-center my-2 border rounded">
              <img className="card-img-top image-fluid " src={item.image} alt="{item.title}"/>
              </div>
              <div className="card-body p-1 d-flex flex-column justify-content-center" >
              <div className="d-flex justify-content-between"><p className="card-text m-0"><span className='fw-bold'>Ksh. </span>{item.markedPrice}</p>
              <p  onClick={ user ? ()=>purchase(item.item_id,user.id) : () =>getAlert()}  style={{ cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faCartShopping} style={{ color: "#000000" }} />
              </p>

              </div>
                <p className=" card-title text-wrap m-0">{(item.title).slice(0,65)}</p>
                
              </div>
            </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Items