import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import { UrlContext } from '../../Context/UrlProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function EditSupplier({ allSuppliers, setAllSuppliers, altSupplier,handleEditCollapse }) {

    const params = useParams()
    const navigate = useNavigate()
    const apiUrl = useContext(UrlContext)


    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        if (altSupplier) {
            setFirstname(altSupplier.firstname)
            setLastname(altSupplier.lastname)
            setCompanyName(altSupplier.company_name)
            setPhoneNumber(altSupplier.phone_number)
            setEmail(altSupplier.email)
        }
    }, [altSupplier])



    // !Update Supplier
    const handleUpdateSupplier = (e) => {
        e.preventDefault();

        const id = parseInt(altSupplier.id)

        const token = sessionStorage.getItem("jwt")
        fetch(apiUrl + `/suppliers/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
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
                    throw new Error('Failed to create brand');
                }
                return resp.json();
            })
            .then(updatedSuppliers => {
                setAllSuppliers(allSuppliers => {
                    return allSuppliers.map(supplier => {
                      if (supplier.id === updatedSuppliers.id) {
                        return updatedSuppliers;
                      } else {
                        return supplier;
                      }
                    })
                  })
                  setFirstname('')
                  setLastname('')
                  setCompanyName('')
                  setEmail('')
                  setPhoneNumber('')
                  handleEditCollapse()
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            })
    }


    return (
        <div>
            <div className="row justify-content-center align-items-center g-2" >
                <div className=" col-12">
                    <div className="card text-start border-0">
                        <div className="card-body">
                            <div className="row justify-content-start  align-items-center g-2">
                                <div className="col-12 text-end">
                                <button onClick={() => handleEditCollapse()} className="btn  fw-bold fs-5"><FontAwesomeIcon icon={faX} /></button>
                                </div>
                                <div className="col-12 text-center">
                                    <h5 className='fw-bold'>Update Supplier</h5>
                                </div>
                                <div className="col-12">
                                    <p className='text-start'>id: {altSupplier.id}</p>
                                </div>
                            </div>
                            <div>
                                <form onSubmit={(e) => handleUpdateSupplier(e)}>
                                    <div className="mb-3">
                                        <div
                                            className="d-flex justify-content-start gap-3 align-items-center g-2"
                                        >
                                            <div className='input_box'>
                                                <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="form-control rounded-0" placeholder="" required />
                                                <label for="" className="form-label">First Name</label>
                                            </div>
                                            <div className='input_box'>
                                                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="form-control rounded-0" placeholder="" required />
                                                <label for="" className="form-label">Last Name</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 input_box">
                                        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="form-control rounded-0" placeholder="" required />
                                        <label for="" className="form-label">Company Name</label>
                                    </div>
                                    <div className="mb-3">
                                        <div
                                            className="d-flex justify-content-start gap-3 align-items-center g-2"
                                        >
                                            <div className='input_box'>
                                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control rounded-0" placeholder="" required />
                                                <label for="" className="form-label">email</label>
                                            </div>
                                            <div className='input_box'>
                                                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control rounded-0" placeholder="" required />
                                                <label for="" className="form-label">Phone Number</label>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="mb-3">
                                        <div className="d-flex justify-content-end align-items-center g-2">
                                            <div><button type='submit' className="btn btn-primary">Update</button></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditSupplier