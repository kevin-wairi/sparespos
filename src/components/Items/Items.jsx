import React from 'react'

function Items({items}) {
  return (
    <div class="container-fluid">
      <div className="row">
        {
          items.map((item)=>(
            <div className="col-3">
            <div class="card text-start">
              <div className="card-img-div">
              <img class="card-img-top image-fluid" src={item.image} alt="{item.title}"/>
              </div>
              <div class="card-body">
                <p class="card-title">{item.title}</p>
                <p class="card-text"><span className='fw-bold'>Ksh. </span>{item.markedPrice}</p>
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