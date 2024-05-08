import React, { useState, useEffect, useContext } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useNavigate } from 'react-router';
import { UrlContext } from '../../Context/UrlProvider';

function CreateProduct({ brands, allSuppliers, allCat, productTypes }) {

    const navigate = useNavigate()
    const apiUrl = useContext(UrlContext)

    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState('');
    const [retailPrice, setRetailPrice] = useState('')
    const [productType, setProductType] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')
    const [filteredCat, setFilteredCat] = useState([])
    const [title, setTitle] = useState('')
    const [supplier, setSupplier] = useState('');
    const [wholesalePrice, setWholesalePrice] = useState('');
    const [reOrderLevel, setReOrderLevel] = useState('');
    const [reOrderQuantity, setReOrderQuantity] = useState('');
    const [productStatus, setProductStatus] = useState(false);
    const [brandName, setBrandName] = useState(null);
    const [sku, setSku] = useState('');
    const [productError, setProductError] = useState('')

    //!add goods to stock
    async function handleCreateProduct(e) {
        e.preventDefault()
        console.log('Okrr');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', selectedFile);
        formData.append('quantity', quantity);
        formData.append('restock_level', reOrderLevel);
        formData.append('restock_quantity', reOrderQuantity);
        formData.append('retail_price', retailPrice);
        formData.append('wholesale_price', wholesalePrice);
        formData.append('sku', sku);
        formData.append('status', productStatus);
        formData.append('brand_id', brandName);
        formData.append('category_id', category);
        formData.append('supplier_id', supplier);

        console.log('FORMDATA', formData);
        const response = await fetch(apiUrl + '/products', {
            method: 'POST',
            body: formData,
        })

        const data = await response.json();
        if (response.ok) {
            console.log('added goods', data);
            // const updatedspares = [...stock, data]
            // updateStock(updatedspares)
        } else {
            console.error('Failed to add goods:');
            setProductError('Failed to add goods:')
        }
    }

    useEffect(() => {
        console.log('OKRR');
        const filtered = allCat?.filter(cat => cat.product_type.id === parseInt(productType))
        setFilteredCat(filtered || []);
    }, [productType, allCat])

    useEffect(() => {
        const time = new Date();
        function generateSKU() {
            const brandCode = brandName?.substring(0, 2).toUpperCase();
            const randomNumber = `${Math.round(time.getTime() / 1000)}`
            return `SKU-${brandCode}${randomNumber}`;
        }
        generateSKU()
        setSku(generateSKU())
    }, [brandName])

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }],
        ],
    };

    const { quill, quillRef } = useQuill({ modules });

    // methods for the quills textarea
    React.useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                const content = quillRef.current?.firstChild?.innerHTML;
                setDescription(content)
            });
        }
    }, [quill, quillRef]);

    const fileTypes = ["JPG", "JPEG", "PNG"];

    const handleChange = (files) => {
        const file = files[0];
        console.log("FILE", files)
        setSelectedFile(files);
    };

    const handleFileChange = (e) => {
        // setSelectedFile(URL.createObjectURL(e.target.files[0]))
        console.log(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <>
            <div className="red pe-5  mb-5" style={{ width: '90vw' }}>
                {/* start */}
                <form onSubmit={(e) => handleCreateProduct(e)}>
                    <div className="m-0 row justify-content-end align-items-start g-2 my-3">
                        <div className="col-6 col-md-4 text-start ">
                            <p className='fs-5 fw-bold '>General</p>
                            <p>Change the general information for this product</p>
                        </div>
                        {/* name */}
                        <div className="col-8 col-md-4">
                            <div className="card text-start border-0 box-shaddow-77">
                                <div className="card-body">
                                    <div className=" text-start">
                                        <p className="card-text my-2 fw-bold">Name</p>
                                        <input className='form-control ' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card  text-start border-0 box-shaddow-77">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between my-1">
                                        <p className='fw-bold'>Product Type</p>
                                    </div>
                                    <div className="mb-3">
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


                                </div>
                            </div>
                        </div>
                        {/* description */}
                        <div className="col-12 col-md-9 rounded py-3 bg-white" style={{ maxHeight: '30vh', height: '50vh' }}>
                            <div className='text-start ' style={{ height: '20vh', width: '100%', background: 'white', color: 'black' }}>
                                <div ref={quillRef} style={{ height: '100%' }} />
                            </div>
                        </div>
                        {/* images */}
                        <div className="col-md-4 ">
                            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />

                        </div>
                        {/* brand */}
                        <div className="col-md-4 col-12">
                            <div className="card  text-start border-0 box-shaddow-77">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between my-1">
                                        <p className='fw-bold'>Brand</p>
                                    </div>
                                    <div>
                                        <select className="form-select" onChange={(e) => setBrandName(e.target.value)}>
                                            <option value="" disabled selected>Select one</option>
                                            {brands && brands.map((brand) => {
                                                return (
                                                    <option value={brand.id}>{brand.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>


                                </div>
                            </div>
                        </div>
                        {/* brand */}
                        <div className="col-md-4 col-12">
                            <div className="card  text-start border-0 box-shaddow-77">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between my-1">
                                        <p className='fw-bold'>Category</p>
                                    </div>
                                    <div>
                                        <select className="form-select" onChange={(e) => setCategory(e.target.value)}>
                                            <option value="" disabled selected>Select</option>
                                            {filteredCat && filteredCat.map((cat) => {
                                                return (
                                                    <option value={cat.id}>{cat.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>


                                </div>
                            </div>
                        </div>


                    </div>
                    <hr />
                    {/* inventory */}
                    <div className="row  justify-content-end align-items-start g-2 text-start m-0">
                        <div className="col-4">
                            <p className="fs-5 fw-bold">Inventory</p>
                            <p>The type of product we choose determines how we manage Inventory and reporting</p>
                        </div>

                        <div className="col-8 ">
                            <p className="fs-5 fw-bold">SKU CODES</p>
                            <div className="row justify-content-center align-items-center g-2"
                            >
                                <div className="col-3">
                                    <div className="d-flex">
                                        <div>
                                            <div className="mb-3">
                                                <label for="" className="form-label">SKU Code Type</label>
                                                <select className="form-select"
                                                >
                                                    <option selected>Auto-generated</option>
                                                    <option value="">EAN</option>
                                                    <option value="">ISBN</option>
                                                    <option value="">ITF</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="mb-3">
                                        <label for="" className="form-label">SKU Code</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="" value={sku} onChange={(e) => setSku(e.target.value)} />
                                    </div>

                                </div>
                                <div className="col-6 ">
                                    <p>Preview</p>
                                    <div
                                        className="d-flex justify-content-start gap-3 align-items-center g-2"
                                    >
                                        <div>
                                            <div >
                                                <h2>Selected Image</h2>
                                                {file && (
                                                    <div style={{ height: '50px', width: '50px' }}>
                                                        <img className="img-fluid rounded-top" src={URL.createObjectURL(file)} alt="Selected" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div >
                                            <p className="m-0">Product title</p>
                                            <p className="m-0">Product sku</p>

                                        </div>
                                    </div>


                                </div>
                            </div>


                        </div>
                    </div>
                    <hr />
                    {/* supplier */}
                    <div className=" row justify-content-end align-items-center g-2">
                        <div className="col-8 ">
                            <p className="text-start text-uppercase fw-bold">Supplier Information</p>
                            <div className="d-flex gap-3 justify-content-center  align-items-center text-start">
                                <div className="mb-3 flex-fill">
                                    <label for="" className="form-label fw-bold">Supplier</label>
                                    <select className="form-select" onChange={(e) => setSupplier(e.target.value)}>

                                        <option disabled selected>Choose a supplier</option>
                                        {allSuppliers && allSuppliers.map((supplier) => {
                                            return (
                                                <option value={supplier.id}>{supplier.company_name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-3 flex-fill">
                                    <label for="" className="form-label fw-bold">Wholesale Price</label>
                                    <input type="number" className="form-control text-end" placeholder="0" value={wholesalePrice} onChange={(e) => setWholesalePrice(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <p className="text-start text-uppercase fw-bold">Inventory Levels</p>
                            <div className="d-flex gap-3 justify-content-center  align-items-center text-start">
                                <div className="mb-3 flex-fill">
                                    <label for="" className="form-label fw-bold ">Current Inventory</label>
                                    <input type="number" className="form-control text-end " placeholder="0" onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                                <div className="mb-3 flex-fill">
                                    <label for="" className="form-label fw-bold ">Re-Order point</label>
                                    <input type="number" className="form-control text-end" placeholder="0" value={reOrderLevel} onChange={(e) => setReOrderLevel(e.target.value)} />
                                </div>
                                <div className="mb-3 flex-fill">
                                    <label for="" className="form-label fw-bold ">Re-Order Quantity</label>
                                    <input type="number" className="form-control text-end" placeholder="0" value={reOrderQuantity} onChange={(e) => setReOrderQuantity(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    {/* tax */}
                    <div className="row justify-content-end align-items-center g-2">
                        <div className="col-12 text-start">
                            <p className="fs-5 fw-bold">Tax</p>
                        </div>
                        <div className="col-8 text-start">
                            <div className="mb-3">
                                <label for="" className="form-label fw-bold">Tax</label>
                                <select className="form-select">
                                    <option selected>Default Sales Tax</option>
                                    <option value="">GST (+15%)</option>
                                    <option value="">No Tax(0%)</option>
                                    <option value="">Tax the rich(+99%)</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    {/* prices */}
                    <div className="row justify-content-end align-items-center g-2">
                        <div className="col-12 text-start">
                            <p className="fs-5 fw-bold">Prices</p>
                        </div>
                        <div className="col-8">
                            <ul className='list-unstyled'>
                                <li>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div><p className="m-0">Supply Price </p></div>
                                        <div><p className="m-0">SH. Price</p></div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div><p className="m-0">Markup</p></div>
                                        <div><p className="m-0">00.0% </p></div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div><p className="m-0">Tax</p></div>
                                        <div><p className="m-0">SH. Price</p></div>
                                    </div>
                                </li>
                                <hr />
                                <li>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div><p className="m-0">Retail Price</p></div>
                                        <div>
                                            <input type="number" className="form-control text-end" placeholder="" value={retailPrice} onChange={(e) => setRetailPrice(e.target.value)} />
                                        </div>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <hr />
                    <div className="row justify-content-end align-items-center g-2">
                        <div className="col-6">
                            <div className="d-flex gap-3 justify-content-end align-items-center g-2">
                                {/* <button className="btn btn-danger w-25" onClick={navigate('/catalog/products')}>Back</button> */}
                                <button type='submit' className="btn btn-primary w-25">Add Product</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateProduct