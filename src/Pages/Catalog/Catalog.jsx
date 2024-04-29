import React, { useEffect, useState } from 'react'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { FileUploader } from "react-drag-drop-files";
import Navbar from '../../Components/Navbar/Navbar';
import './Catalog.css'

function Catalog({ allCat, allSuppliers, brands, setBrands, products }) {

    const [description, setDescription] = useState('')
    const [variantSelect, setVariantSelect] = useState(false)
    const [variants, setVariants] = useState([]);
    const [file, setFile] = useState(null);

    const [selectedFile, setSelectedFile] = useState('');
    const [retailPrice, setRetailPrice] = useState('')
    const [productType, setProductType] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [supplier, setSupplier] = useState('');
    const [supplierPrice, setSupplierPrice] = useState('');
    const [brandName, setBrandName] = useState('');
    const [reOrderLevel, setReOrderLevel] = useState('');
    const [reOrderQuantity, setReOrderQuantity] = useState('');
    const [brandDescription, setBrandDescription] = useState('');
    const [selectedOption, setSelectedOption] = useState(false);
    const [sku, setSku] = useState('');


    const [addNewProduct, setAddNewProduct] = useState(false)
    const [goodsError, setGoodsError] = useState('')
    const [openBrandOverlay, setOpenBrandOverlay] = useState(false);

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


    const handleFileChange = (e) => {
        // setSelectedFile(URL.createObjectURL(e.target.files[0]))
        console.log(URL.createObjectURL(e.target.files[0]));
    }

    //!add goods to stock
    async function handleAddGoods() {

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category_id', category);
        formData.append('description', description);
        formData.append('image', selectedFile);
        formData.append('quantity', quantity);
        formData.append('supplier', supplier);
        formData.append('restock_level', reOrderLevel);
        formData.append('restock_quantity', reOrderQuantity);
        formData.append('retail_price', retailPrice);
        formData.append('supplier_price', supplierPrice);
        formData.append('sku', sku);

        console.log('FORMDATA', formData);
        const response = await fetch('http://localhost:3000/products', {
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
            setGoodsError('Failed to add goods:')
        }
    }

    // methods for the quills textarea

    React.useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                const content = quillRef.current?.firstChild?.innerHTML;
                setDescription(content)
            });
        }
    }, [quill, quillRef]);


    const handleOpenVariants = (e) => {
        setVariantSelect(true);
    };


    const handleVariantSelect = (e) => {
        console.log(e.target.value);
        const value = e.target.value
        const newVariant = {
            name: value,
            image: file,
            variantDesc: '',
            price: ''
        }
        setVariants([...variants, newVariant]);
        // setVariantSelect(false)
    }

    const fileTypes = ["JPG", "JPEG", "PNG"];

    const handleChange = (files) => {
        const file = files[0];
        console.log("FILE", files)
        setSelectedFile(files);
    };

    const handleBrand = () => {
        setOpenBrandOverlay(prevVal => !prevVal)
    }


    const handleSelected = (e) => {
        e.preventDefault()
        const value = e.target.value
        setBrandName(() => value)
        if (value === '') {
            console.log('WAIT');
            setSelectedOption(true)
        } else {
            setSelectedOption(false)
        }
    }

    const handleUpdateBrands = (e) => {
        if (brandName === null) {
            return
        }
        const token = sessionStorage.getItem("jwt");
        fetch('http://127.0.0.1:3000/brands', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                brand_name: brandName,
                description: brandDescription
            })
        })
            .then(resp => {
                if (resp.ok) {
                    // Close overlay here (e.g., by setting a state variable)
                    handleBrand()
                    setBrandName('')
                    setBrandDescription('')
                    setSelectedOption(false)
                }
                return resp.json()
            })
            .then(d => {
                setBrands(() => [...brands, d])
                console.log('BRANDS', d);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            })
    }

    // !opens create product form
    const handleAddNewProduct = () => {
        setAddNewProduct(prevVal => !prevVal)
    }

    useEffect(() => {
        const time = new Date();
        function generateSKU(){
            const brandCode = brandName.substring(0, 2).toUpperCase();
            const randomNumber = `${Math.round(time.getTime() / 1000)}`
            return `SKU-${brandCode}${randomNumber}`;
        }
        generateSKU()
        setSku(generateSKU())
    }, [ brandName])
    return (
        <div className="wrapper">
            <div className="container-fluid p-0 overflow-y-scroll " style={{ height: '100vh', width: '100%' }}>
                <div className="row justify-content-end align-items-center g-2 m-0"
                >
                    <div style={{ width: '93vw' }}>
                        <Navbar />
                    </div>
                    <div className=" m-0 bg-blue-gray-400 row justify-content-end align-items-center g-2 py-2 mx-0">
                        <div className="col-6 text-start ">
                            <p className='m-0 text-white'>Add, Edit and View your Products all in one place.</p>
                        </div>
                        <div className="col-5 text-end m-0">
                            <button className=" btn btn-primary" onClick={handleAddNewProduct}>{addNewProduct ? 'Back' : 'Add Product'}</button>
                        </div>
                    </div>
                    {!addNewProduct &&
                        <div className=" container my-3">
                            <div
                                class="d-flex justify-content-start align-items-start g-2 gap-2"
                            >
                                {products && products.map(product => {
                                    return (
                                        <div>
                                            <div className="card  border-0 text-start mb-2" style={{ width: '15vw', height: '40vh', boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px' }}>
                                                <div className="card-img-div align-self-start mt-2 mx-2 ">
                                                    <img className="card-img-top image-fluid " src={product.image} alt="info" />
                                                </div>
                                                <div className="card-body p-0 ps-2 d-flex justify-content-between align-items-end" id='info'>
                                                    <ul className='list-unstyled'>
                                                        <li className='card-text'><span className='text-muted'>Name: </span>{product.title}</li>
                                                        <li className='card-text'><span className='text-muted'>Ksh. </span>{product.retail_price}</li>
                                                        <li className='card-text'><span className='text-muted'>Quantity: </span>{product.quantity}</li>
                                                        <li className='card-text'><span className='text-muted'>Category: </span>{product.category.category_name}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    }
                    {addNewProduct &&
                        <div className=" pe-5  mb-5" style={{ width: '90vw' }}>
                            {/* start */}
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
                                {/* brand */}
                                <div className="col-md-4 col-12">
                                    <div className="card  text-start border-0 box-shaddow-77">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between my-1">
                                                <p className='fw-bold'>Brand</p>
                                            </div>
                                            <div>
                                                <select className="form-select" onChange={(e) => handleSelected(e)}>
                                                    <option value="" disabled selected>Select one</option>
                                                    <option value="">Custom *</option>
                                                    {brands && brands.map((brand) => {
                                                        return (
                                                            <option value={brand.brand_name}>{brand.brand_name}</option>
                                                        )
                                                    })}
                                                </select>

                                                {selectedOption &&
                                                    <div className="my-3">
                                                        <input type="text" className="form-control form-control-sm" placeholder="Custom Brand Name" onChange={(e) => setBrandName(e.target.value)} value={brandName} />
                                                    </div>
                                                }
                                                {/* <p className="mt-3 text-primary btn border-0" onClick={() => handleBrand()}><Plus /> create new Brand</p> */}
                                            </div>
                                            {openBrandOverlay &&
                                                <>
                                                    <div className="brandOverlay">
                                                        <div
                                                            className="border row justify-content-center align-items-center g-2 w-100 h-100"
                                                        >
                                                            <div className="col-5">
                                                                <div className="card text-start border-0 box-shaddow-77 box-shaddow-77">
                                                                    <div className="card-body">
                                                                        <div
                                                                            className="row justify-content-between  align-items-center g-2"
                                                                        >
                                                                            <div className="col-3">
                                                                                <h5 className='fw-bold'>Add Brand</h5>
                                                                            </div>
                                                                            <div className="col-1">
                                                                                <button className="btn fs-4" onClick={handleBrand}>X</button>
                                                                            </div>
                                                                        </div>

                                                                        <div className="mb-3">
                                                                            <label for="" className="form-label">Brand Name</label>
                                                                            <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} className="form-control" placeholder="" />
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label for="" className="form-label">Description <small>(optional)</small></label>
                                                                            <textarea value={brandDescription} onChange={(e) => setBrandDescription(e.target.value)} className="form-control" maxlength="200" placeholder="Enter a description for this brand that your staff will find useful." style={{ height: '100px', fontSize: '13px' }} ></textarea>
                                                                            <small id="helpId" className="form-text text-muted">200 character limit</small>
                                                                        </div>

                                                                        <div
                                                                            className="row justify-content-end align-items-center g-2 "
                                                                        >
                                                                            <div className="col-4 text-end m-0">
                                                                                <button className="btn btn-primary" onClick={(e) => handleUpdateBrands(e)}>Add Brand</button>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </>}

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
                                <div className="col-md-4">
                                    <div className="card  text-start border-0 box-shaddow-77">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between my-1">
                                                <p className='fw-bold'>Product Type</p>
                                            </div>
                                            <div className="mb-3">
                                                <select
                                                    className="form-select"
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    value={category}>
                                                    <option value="" disabled selected>Select one</option>
                                                    <option value="1">Apparel and Accessories</option>
                                                    <option value="2">Art and Crafts</option>
                                                    <option value="3">Automotive</option>
                                                    <option value="4">Books and Stationery</option>
                                                    <option value="5">Education and Learning</option>
                                                    <option value="6">Electrical and Plumbing</option>
                                                    <option value="7">Electronics</option>
                                                    <option value="8">Entertainment</option>
                                                    <option value="9">Food and Beverages</option>
                                                    <option value="10">Gifts and Novelties</option>
                                                    <option value="11">Health and Beauty</option>
                                                    <option value="12">Home and Garden</option>
                                                    <option value="13">Jewelry and Watches</option>
                                                    <option value="14">Medical and Pharmaceutical</option>
                                                    <option value="15">Office Equipment and Supplies</option>
                                                    <option value="16">Pets and Pet Supplies</option>
                                                    <option value="17">Services</option>
                                                    <option value="18">Sports and Fitness</option>
                                                    <option value="19">Toys and Games</option>
                                                    <option value="20">Travel and Tourism</option>

                                                </select>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                {/* <section>
                        {
                            <div className="col-12 col-md-6 ">
                            <div className="card text-start border-0 box-shaddow-77">
                                <div className="card-body">
    
                                    <div className=" text-start">
                                        <p className="card-text my-2 fw-bold">Name</p>
                                        <input className='form-control w-75' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                </div>
    
                                <div className="text-start  " >
                                    <div className=" p-2 ">
                                        <p className="m-0 fw-bold">Variants</p>
                                        <hr className='m-0' />
                                    </div>
                                    <div className='overflow-y-scroll p-2' style={{ maxHeight: '40vh' }}>
                                        {variants.length > 0 &&
                                            <ul className='list-unstyled' >
                                                {variants.map((variant, index) => {
                                                    return (<li key={index}>
                                                        <div className="card text-start border-0 box-shaddow-77 p-0 mb-1">
                                                            <div className="p-2 m-0 row justify-content-around  align-items-end">
                                                                <div className='col-2 px-0'>
                                                                    <p className="m-0 text-capitalize fw-bold ">{variant.name}</p>
    
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className="m-0">{variant.name} description</p>
                                                                    <input className='form-control  h-50' type="text" />
                                                                </div>
                                                                <div className='col-4'>
                                                                    <p className="m-0">Price</p>
                                                                    <input className='form-control  h-50 w-75' type="number" />
                                                                </div>
                                                                <div className="col-8 my-1">
                                                                    <input type="file" className="form-control" onChange={handleChange} placeholder="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>)
                                                })
                                                }
                                            </ul>}
                                        {!variantSelect && <button className="btn text-start text-primary" onClick={() => handleOpenVariants()}><Plus /> {variants.length === 0 ? 'Add options like Color, Material and Size' : 'Add another Variant'}</button>}
                                        {variantSelect &&
                                            <div className="mb-3">
                                                <select className="form-select" value={''} onChange={(e) => handleVariantSelect(e)}>
                                                    <option selected>{variants.length === 0 ? 'Select One' : 'Select another'}</option>
                                                    <option value="size">Size</option>
                                                    <option value="color">Color</option>
                                                    <option value="material">Material</option>
                                                    <option value="style">Style</option>
                                                </select>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <button className='btn btn-primary form-control align-self-end m-3 w-25 h-75' onClick={() => handleAddGoods} type="submit">Submit</button>
                            </div>
                        </div>
                        }
                     </section> */}
                            </div>
                            <hr />
                            {/* inventory */}
                            <div className="row  justify-content-end align-items-start g-2 text-start m-0">
                                <div className="col-4">
                                    <p className="fs-5 fw-bold">Inventory</p>
                                    <p>The type of product we choose determines how we manage Inventory and reporting</p>
                                </div>
                                <div className="col-8">
                                    <div className="d-flex gap-3">
                                        <div className="card text-start border-0 card_hover box-shaddow-77" onClick={() => setProductType('standart')}>
                                            <div className="card-body">
                                                <p className="fs-5 fw-bold">Standard Product</p>
                                                <hr />
                                                <p>This product is a single SKU with its own inventory</p>
                                            </div>
                                        </div>
                                        <div className="card text-start border-0 card_hover box-shaddow-77" onClick={() => setProductType('variant')}>
                                            <div className="card-body">
                                                <p className="fs-5 fw-bold">Variant Product</p>
                                                <hr />
                                                <p>This product is a single SKU with its own inventory</p>
                                            </div>
                                        </div>
                                        <div className="card text-start border-0 card_hover box-shaddow-77" onClick={() => setProductType('composite')}>
                                            <div className="card-body">
                                                <p className="fs-5 fw-bold">Composite Product</p>
                                                <hr />
                                                <p>This product is a single SKU with its own inventory</p>
                                            </div>
                                        </div>

                                    </div>
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
                                            <label for="" className="form-label fw-bold">Supplier Price</label>
                                            <input type="number" className="form-control text-end" placeholder="0" value={supplierPrice} onChange={(e) => setSupplierPrice(e.target.value)} />
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
                                        <button className="btn btn-danger w-25" onClick={handleAddNewProduct}>Back</button>
                                        <button className="btn btn-primary w-25" onClick={(e) => handleAddGoods(e)}>Add Product</button>
                                    </div>
                                </div>
                            </div>


                        </div>}


                </div>
                {/* high level */}
            </div>
        </div >
    )
}

export default Catalog