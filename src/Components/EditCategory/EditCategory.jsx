import React, { useContext, useState, useEffect } from 'react'
import { UrlContext } from '../../Context/UrlProvider';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function EditCategory({ altCat, allCat, setAllCat, handleEditCatCollapse }) {

    const apiUrl = useContext(UrlContext)

    const [categoryName, setCategoryName] = useState('');
    const [catDescription, setCatDescription] = useState('');

    useEffect(() => {
        if (altCat) {
            setCategoryName(altCat.name)
            setCatDescription(altCat.description)
        }
    }, [altCat])


    // !Update Category
    const handleCat = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("jwt");
        const cat_id = altCat.id 
        console.log(cat_id);
        
        const promise = new Promise((resolve, reject) => {
            fetch(apiUrl + `/categories/${cat_id}`, {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: categoryName,
                    description: catDescription
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
                    handleEditCatCollapse()
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
            <div className="row justify-content-center align-items-center g-2">
                <div className="col-12 col-sm-8 col-lg-6 col-xl-5">
                    <div className=" card text-start border-0 m-0 rounded-0">
                        <div className="card-body">
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-12">
                                    <div
                                        className="row justify-content-end align-items-center g-2 p-0 "
                                    >
                                        <div className="col-1 p-0 m-0 "><button onClick={() => handleEditCatCollapse()} className="btn  fw-bold fs-5"><FontAwesomeIcon icon={faX} /></button></div>
                                    </div>

                                </div>
                                <div className="col-8 text-center">
                                    <h5 className='fw-bold'>Update Category</h5>
                                </div>
                            </div>
                            <form onSubmit={(e) => handleCat(e)}>
                                <div className="mb-3">
                                    <label for="" className="form-label">Category Name</label>
                                    <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="form-control" placeholder="" required />
                                </div>
                                <div className="mb-3">
                                    <label for="" className="form-label">Description <small className='text-warning' >(optional)</small></label>
                                    <textarea value={catDescription} onChange={(e) => setCatDescription(e.target.value)} className="form-control" maxlength="50" placeholder="Enter a description for this sub category that your staff will find useful." style={{ height: '100px', fontSize: '13px' }} ></textarea>
                                    <small id="helpId" className="form-text text-muted">50 character limit</small>
                                </div>
                                <div className="mb-3">
                                    <div className='d-flex'><button type='submit' className="btn btn-primary flex-fill">Submit</button></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditCategory