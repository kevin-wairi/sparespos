import React, { useContext, useState } from 'react'
import { UrlContext } from '../../Context/UrlProvider';
import toast, { Toaster } from 'react-hot-toast';

function CreateBrand({ brands, setBrands }) {

    const apiUrl = useContext(UrlContext)

    const [brandName, setBrandName] = useState('');
    const [brandDescription, setBrandDescription] = useState('');

    // !Add brands
    const handleBrands = (e) => {
        e.preventDefault();
        if (brandName === '') {
            return
        }
        const token = sessionStorage.getItem("jwt");

        const promise = new Promise((resolve, reject) => {
            fetch(apiUrl + '/brands', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: brandName,
                    description: brandDescription
                })
            })
                .then(resp => {
                    if (!resp.ok) {
                        reject()
                        throw new Error('Failed to create brand');
                    }
                    return resp.json();
                })
                .then(d => {
                    setBrands(() => [...brands, d])
                    resolve()
                    setBrandName('')
                    setBrandDescription('')
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                })
        })
        toast.promise(promise, {
            loading: "Saving ...",
            success: <b>Settings saved!</b>,
            error: <b>Could not save.</b>,
        })
    }

    return (
        <div className="container-fluid" >
            <Toaster />
            <div className=" card text-start border-0 m-0">
                <div className="card-body">
                    <div
                        className="row justify-content-start  align-items-center g-2">
                        <div className="col-5">
                            <h5 className='fw-bold'>Add Brand</h5>
                        </div>
                    </div>

                    <form onSubmit={(e) => handleBrands(e)}>
                        <div className="mb-3">
                            <label for="" className="form-label">Brand Name</label>
                            <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} className="form-control" placeholder="" required />
                        </div>
                        <div className="mb-3">
                            <label for="" className="form-label">Description <small className='text-warning' >(optional)</small></label>
                            <textarea value={brandDescription} onChange={(e) => setBrandDescription(e.target.value)} className="form-control" maxlength="50" placeholder="Enter a description for this brand that your staff will find useful." style={{ height: '100px', fontSize: '13px' }} ></textarea>
                            <small id="helpId" className="form-text text-muted">50 character limit</small>
                        </div>
                        <div className="mb-3">
                            <div className='d-flex'><button type='submit' className="btn btn-primary flex-fill">Add Brand</button></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateBrand