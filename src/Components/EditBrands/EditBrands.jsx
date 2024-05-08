import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { UrlContext } from '../../Context/UrlProvider';
import { ArrowLeft } from 'react-feather';

function EditBrands({ brands, setBrands }) {

    const params = useParams()
    const navigate = useNavigate()
    const apiUrl = useContext(UrlContext)


    const [brandName, setBrandName] = useState('');
    const [brandDescription, setBrandDescription] = useState('');

    useEffect(() => {
        const br_id = parseInt(params.brandId) - 1
        if (brands[br_id]) {
            setBrandName(brands[br_id].name);
            setBrandDescription(brands[br_id].description);
        }
    }, [params.brandId, brands])



    // !Add brands
    const handleUpdateBrand = (e) => {
        e.preventDefault();

        const id = parseInt(params.brandId)
        if (brandName === '') {
            return
        }
        const token = sessionStorage.getItem("jwt")
        fetch(apiUrl + `/brands/${id}`, {
            method: 'PATCH',
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
                    throw new Error('Failed to create brand');
                }
                return resp.json();
            })
            .then(b => {
                const updatedBrands = brands.map(brand => {
                    if (brand.id === id) {
                        return { ...brand, brand: b.name, description: b.description };
                    }
                    return brand;
                });
                setBrands(updatedBrands);
                setBrandName('')
                setBrandDescription('')
                navigate(-1)
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            })
    }

    return (
        <div>
            <div className="row justify-content-center align-items-center g-2 mt-5" >
                <div className="col-lg-6 col-8">
                    <div className="card text-start border-0">
                        <div className="card-body">
                            <div className="row  justify-content-start  align-items-center g-2">
                                <div className="col-4 text-start">
                                    <button className="btn btn-warning" onClick={() => navigate('/settings/brands')}><ArrowLeft /></button>
                                </div>
                                <div className="col-5">
                                    <h5 className='fw-bold'>Update Brand</h5>
                                </div>
                                <div className="col-12">
                                    <p className='text-start'>id: {params.brandId}</p>
                                </div>
                            </div>
                            <form onSubmit={(e) => handleUpdateBrand(e)}>
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
                                    <div
                                        class="d-flex justify-content-end align-items-center g-2"
                                    >

                                        <div><button type='submit' className="btn btn-primary" >Update</button></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default EditBrands