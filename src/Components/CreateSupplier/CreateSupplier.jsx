import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { UrlContext } from '../../Context/UrlProvider'
import { ArrowLeft } from 'react-feather'

function CreateSupplier({ setAllSuppliers, allSuppliers }) {

  const navigate = useNavigate()
  const apiUrl = useContext(UrlContext)

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState("")

  //!Create Supplier
  function handleCreateSupplier(e) {
    e.preventDefault()
    const token = sessionStorage.getItem("jwt");
    setError('');
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
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json()
      })
      .then((newUser) => {
        setAllSuppliers([...allSuppliers, newUser])
        navigate('/catalog/suppliers')
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  }

  return (
    <>
      <div className="row justify-content-center align-items-center g-2 mt-5">
        <div className="col-lg-6 col-md-8 col-11">
          <div className="card border-0 ">
            <div className="card-body">
              <div className="row d-flex justify-content-start mb-3">
                <div className="col-3">
                  <button className="btn btn-warning" onClick={() => navigate('/catalog/suppliers')}><ArrowLeft /></button>
                </div>
                <div className="col-4 m-0">
                  <p className='fw-bold text-center'>Add Supplier</p>
                </div>
              </div>
              <form onSubmit={(e) => handleCreateSupplier(e)}>
                <div className="mb-3">
                  <div className="d-flex justify-content-start gap-3 align-items-center g-2">
                    <div>
                      <label for="" className="form-label">First Name</label>
                      <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="form-control" placeholder="" required />
                    </div>
                    <div>
                      <label for="" className="form-label">Last Name</label>
                      <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="form-control" placeholder="" required />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label for="" className="form-label">Comapny Name</label>
                  <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="form-control" placeholder="" required />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-start gap-3 align-items-center g-2" >
                    <div>
                      <label for="" className="form-label">email</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="" required />
                    </div>
                    <div>
                      <label for="" className="form-label">Phone Number</label>
                      <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" placeholder="" required />
                    </div>
                  </div>

                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-end gap-3 align-items-center g-2" >
                    <div><button type="submit" className="btn btn-primary">Submit</button></div>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </ >
  )
}

export default CreateSupplier