import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import './ItemCard.css'

function ItemCard({AddToCart,item}) {
    
  const[viewDetails,setViewDetails] = useState(false)

  // !view cart Details
const handleViewDetails = (e) =>{
    e.preventDefault()
    setViewDetails(true)
    const timerId = setTimeout(() => {
      setViewDetails(false)
    }, 1500);
    // Cleanup function to clear the timer
    return () => clearTimeout(timerId);
  }

  return (
    <div>
      <div className="card item_card border-0 text-start mb-2 rounded-4" style={{width: '10rem',height: '11rem', position:'relative',boxShadow:'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'}}>
        <div className="card-img-div align-self-center mt-2" onClick={()=>AddToCart(item)}>
        <img className="card-img-top image-fluid " src={item.image} alt="{item.title}"/>
        </div>
        <div className="card-body p-0 ps-2 d-flex justify-content-between align-items-end" id='info'>
          <div><p className="card-text m-0"><span className='fw-bold'>Ksh. </span>{item.markedPrice}</p></div>
            <div className='exclamation_btn'><button className="btn py-0 px-1" onClick={(e)=>handleViewDetails(e)}  ><FontAwesomeIcon  icon={faCircleExclamation}/></button>
          </div>
        </div>
        <div className="card_details" style={{height:viewDetails ? 'auto' : '0' }}><p className="p-2 text-wrap" >{item.title}</p></div>
      </div>
  </div>
  )
}

export default ItemCard