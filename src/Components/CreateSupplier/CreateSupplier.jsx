import React, { useContext, useState } from 'react'
import { UrlContext } from '../../Context/UrlProvider'

function CreateSupplier({ setAllSuppliers, allSuppliers }) {

  const apiUrl = useContext(UrlContext)

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  //!Create Supplier
  function handleCreateSupplier(e) {
    e.preventDefault()

    const token = sessionStorage.getItem("jwt");

    fetch(apiUrl + '/suppliers', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstname,
        lastname,
        company_name: companyName,
        phone_number: phoneNumber,
        email
      })
    })
      .then(resp => {
        if (resp.ok) return resp.json()
      })
      .then((newSupplier) => {
        setAllSuppliers([...allSuppliers, newSupplier])
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  }

  return (
    <div className="container-fluid">
      <div className="card border-0  ">
        <div className="card-body">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-8">
              <h5 className='fw-bold text-center mb-0'>Add Supplier</h5>
            </div>
          </div>

          <form onSubmit={(e) => handleCreateSupplier(e)}>
            <div
              className="row justify-content-start align-items-center g-2"
            >
              <div className="mb-1">
                <label className="form-label">First Name</label>
                <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="form-control " placeholder="" required />
              </div>

              <div className="mb-1">
                <label className="form-label">Last Name</label>
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="form-control " placeholder="" required />
              </div>

              <div className="mb-1">
                <label className="form-label">email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control " placeholder="" required />
              </div>
              <div className="mb-1">
                <label className="form-label">Phone Number</label>
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control " placeholder="" required />
              </div>
              <div className="mb-1">
                <label className="form-label">Comapny Name</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="form-control " placeholder="" required />
              </div>
              <div>
                <div className='d-flex'><button type="submit" className="btn btn-primary flex-fill">Submit</button></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateSupplier