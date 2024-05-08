import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import { UrlContext } from '../../Context/UrlProvider';
import { ArrowLeft } from 'react-feather';

function EditSupplier({ allSuppliers, setAllSuppliers }) {

    const params = useParams()
    const navigate = useNavigate()
    const apiUrl = useContext(UrlContext)


    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const sup_id = parseInt(params.supplierId) - 1
        console.log('OKRR', typeof id);

        setFirstname(allSuppliers[sup_id]?.firstname)
        setLastname(allSuppliers[sup_id]?.lastname)
        setCompanyName(allSuppliers[sup_id]?.company_name);
        setEmail(allSuppliers[sup_id]?.email);
        setPhoneNumber(allSuppliers[sup_id]?.phone_number);

    }, [params.supplierId, allSuppliers])



    // !Update Supplier
    const handleUpdateSupplier = (e) => {
        e.preventDefault();

        const id = parseInt(params.supplierId)
        console.log('okrr', typeof id);
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
            .then(b => {
                console.log('OKRR');
                const updatedSupplier = allSuppliers.map(supplier => {
                    if (supplier.id === id) {
                        return { ...supplier, firstname: b.firstname, lastname: b.lastname, company_name: b.company_name, email: b.email, phone_number: b.phone_number };
                    }
                    return supplier;
                });
                setAllSuppliers(updatedSupplier)
                setFirstname('')
                setLastname('')
                setCompanyName('')
                setEmail('')
                setPhoneNumber('')
                navigate(-1)
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            })
    }


    return (
        <div>
            <div className="row justify-content-center align-items-center g-2 mt-5" >
                <div className=" col-xl-4 col-md-6 col-sm-8 col-10">
                    <div className="card text-start border-0">
                        <div className="card-body">
                            <div className="row justify-content-start  align-items-center g-2">
                                <div className="col-4">
                                    <button className="btn btn-warning " onClick={() => navigate('/catalog/suppliers')}><ArrowLeft /></button>
                                </div>
                                <div className="col-5">
                                    <h5 className='fw-bold'>Update Supplier</h5>
                                </div>
                                <div className="col-12">
                                    <p className='text-start'>id: {params.supplierId}</p>
                                </div>
                            </div>
                            <div>
                                <form onSubmit={(e) => handleUpdateSupplier(e)}>
                                    <div className="mb-3">
                                        <div
                                            className="d-flex justify-content-start gap-3 align-items-center g-2"
                                        >
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
                                        <div
                                            className="d-flex justify-content-start gap-3 align-items-center g-2"
                                        >
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
                                        <div
                                            className="d-flex justify-content-end align-items-center g-2"
                                        >
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