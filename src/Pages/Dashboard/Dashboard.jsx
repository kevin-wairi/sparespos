import React from 'react'
import './Dashboard.css'
import dash from '../../assets/vectors/dash.png'
import back from '../../assets/vectors/back.png'

function Dashboard({items}) {
  return (
    <div className="wrapper">
      <div class="row justify-content-center align-items-center g-2">

        <div class="row justify-content-center align-items-center g-2">
          <div class="col-7">
            <div class="card" style={{maWidth: '540px'}}>
              <div class="row g-0">
                <div class="col-md-7">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
                </div>
                <div class="col-md-5">
                <img src={dash} class="img-fluid rounded-start" alt="Card title"/>
                </div>
              </div>
              </div>
          </div>
          <div class="col-5">
            <div class="card m-0 p-0">
              <div className="card-img " style={{maxHeight: '240px',maxWidht: 'auto'}}>
                <img class=" image-fluid img " src={back} alt="Title" style={{objectFit: 'contain',width: '100%' ,height:'100%'}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard