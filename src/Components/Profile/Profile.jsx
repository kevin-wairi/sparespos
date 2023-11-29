import React from 'react'
import './Profile.css'
import profile from '../../assets/images/profile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar/Navbar';

function Profile() {
  return (
    <div class="row justify-content-center align-items-center g-2 my-4 ">
        <div class="col-12 profile-bg rounded d-flex justify-content-center" style={{minHeight: '250px'}}>
            <div className="col-12">
              <Navbar />
            </div>
            <div class="card profile-card ">
              <div class="card-body p-2">
               <div class="row justify-content-between align-items-center g-2 ">
                <div class="col-lg-4 col-md-4 col-12 d-flex gap-lg-2 gap-1 text-start align-items-center">
                    <div className="profile-img " style={{height: '70px', width:'70px'}}>
                      <img className='img-fluid rounded' src={profile} alt="username" />
                    </div>
                    <div className="profile-tag">
                      <h4>Alex Thompson</h4>
                      <p>CEO / Co-founder</p>
                    </div>
                </div>
                <div class="col-lg-2 px-2  col-12  d-flex align-items-center gap-2 justify-content-end">
                  <FontAwesomeIcon icon={faScrewdriverWrench} style={{color: "#000000",}} />
                  <p className='m-0'>Settings</p>
                </div>
               </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Profile