import React, { useContext, useState } from 'react'
import { UrlContext } from '../../Context/UrlProvider';
import toast, { Toaster } from 'react-hot-toast';

function CreateCategory({ allCat, setAllCat,productTypes }) {

    const apiUrl = useContext(UrlContext)

    const [categoryName, setCategoryName] = useState('');
    const [catDescription, setCatDescription] = useState('');
    const [productType, setProductType] = useState('')

    // !Add Category
    const handleCat = (e) => {
        e.preventDefault();
        if (categoryName === '') {
            return
        }
        const token = sessionStorage.getItem("jwt");

        const promise = new Promise((resolve, reject) => {
            fetch(apiUrl + '/categories', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: categoryName,
                    description: catDescription,
                    product_type_id: productType
                })
            })
                .then(resp => {
                    if (!resp.ok) {
                        reject()
                        throw new Error('Failed to create Category: ' + categoryName);
                    }
                    return resp.json();
                })
                .then(d => {
                    setAllCat(() => [...allCat, d])
                    resolve()
                    setCategoryName('')
                    setCatDescription('')
                    // navigate('/settings/brands')
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                })
        })
        toast.promise(promise, {
            loading: "Saving ...",
            success: <b>Settings saved!</b>,
            error: <b>Could not save.</b>,
            iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
            },
        })
    }


    return (
        <div className="container-fluid" >
            <Toaster />
            <div className=" card text-start border-0 m-0">
                <div className="card-body">
                    <div className="row justify-content-start  align-items-center g-2">
                        <div className="col-12">
                            <h5 className='fw-bold'>Create Category</h5>
                        </div>
                    </div>
                    <form onSubmit={(e) => handleCat(e)}>
                    <div className="mb-3">
                    <label for="" className="form-label">Select  Type</label>
                            <select
                                className="form-select"
                                onChange={(e) => setProductType(e.target.value)}
                                value={productType}>
                                <option value="" disabled selected>Select one</option>
                                {productTypes && productTypes.map((type) => {
                                    return (
                                        <option value={type.id}>{type.name}</option>
                                    )
                                })}

                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="" className="form-label">Category Name</label>
                            <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="form-control" placeholder="" required />
                        </div>
                        <div className="mb-3">
                            <label for="" className="form-label">Description <small className='text-warning' >(optional)</small></label>
                            <textarea value={catDescription} onChange={(e) => setCatDescription(e.target.value)} className="form-control" maxlength="50" placeholder="Enter a description for this brand that your staff will find useful." style={{ height: '100px', fontSize: '13px' }} ></textarea>
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

export default CreateCategory