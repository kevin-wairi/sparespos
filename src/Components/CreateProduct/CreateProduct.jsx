import React, { useState, useEffect, useContext } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { UrlContext } from '../../Context/UrlProvider';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router';
import CreateCategory from '../CreateCategory/CreateCategory';
import CreateBrand from '../CreateBrand/CreateBrand';
import { Plus, X } from 'react-feather';
import CreateSupplier from '../CreateSupplier/CreateSupplier';

function CreateProduct({ brands, setBrands, allSuppliers, setAllSuppliers, allCat, setAllCat, productTypes, products, setProducts }) {

    const apiUrl = useContext(UrlContext)
    const navigate = useNavigate()

    const [type, setType] = useState('')

    const [selectedFile, setSelectedFile] = useState('');
    const [sellingPrice, setsellingPrice] = useState('')
    const [productType, setProductType] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')
    const [filteredCat, setFilteredCat] = useState([])
    const [title, setTitle] = useState('')
    const [supplier, setSupplier] = useState('');
    const [buyingPrice, setbuyingPrice] = useState('');
    const [reOrderLevel, setReOrderLevel] = useState('');
    const [reOrderQuantity, setReOrderQuantity] = useState('');
    const [productStatus, setProductStatus] = useState(true);
    const [brand_id, setBrand_id] = useState(null);
    const [sku, setSku] = useState('');
    const [productError, setProductError] = useState('')
    const [expandCatForm, setExpandCatForm] = useState(false)
    const [expandBrandForm, setExpandBrandForm] = useState(false)
    const [profit, setProfit] = useState(0)
    const [profitMargin, setProfitMargin] = useState(0)
    const [skuCat, setskuCat] = useState('')
    const [skuBrand, setskuBrand] = useState('')
    const [skuType, setskuType] = useState('')

    const [expandSupplierForm, setexpandSupplierForm] = useState()

    useEffect(() => {
        if (allCat.length === 0) return;
        setExpandCatForm(false)
    }, [allCat])

    useEffect(() => {
        if (brands.length === 0) return;
        setExpandBrandForm(false)
    }, [brands])

    // !set product_type
    const handleType = (e) => {
        console.log(e.target.options[e.target.selectedIndex].text);
        const selectedText = e.target.options[e.target.selectedIndex].text
        setProductType(e.target.value)
        setskuType(selectedText)
    }
    // !set product category
    const handleCat = (e) => {
        console.log(e.target.options[e.target.selectedIndex].text);
        const selectedText = e.target.options[e.target.selectedIndex].text
        setCategory(e.target.value)
        setskuCat(selectedText)
    }

    // !set product Brand
    const handleBrand = (e) => {
        console.log(e.target.options[e.target.selectedIndex].text);
        const selectedText = e.target.options[e.target.selectedIndex].text
        setBrand_id(e.target.value)
        setskuBrand(selectedText)
    }

    //!add goods to stock
    async function handleCreateProduct(e) {
        e.preventDefault()
        console.log('Okrr');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', selectedFile);
        formData.append('quantity', quantity);
        formData.append('restock_level', reOrderLevel);
        formData.append('restock_quantity', reOrderQuantity);
        formData.append('selling_price', sellingPrice);
        formData.append('buying_price', buyingPrice);
        formData.append('sku', sku);
        formData.append('status', productStatus);
        formData.append('brand_id', brand_id);
        formData.append('category_id', category);
        formData.append('supplier_id', supplier);
        formData.append('product_type_id', productType);

        console.log('FORMDATA', formData);
        const response = await fetch(apiUrl + '/products', {
            method: 'POST',
            body: formData,
        })

        const p = await response.json();
        if (response.ok) {
            console.log('added goods', p);
            const updatedproducts = [...products, p]
            setProducts(() => updatedproducts)

            navigate('/catalog/products')
        } else {
            console.error('Failed to add goods:');
            setProductError('Failed to add goods:')
        }
    }

    useEffect(() => {
        const filtered = allCat?.filter(cat => cat.product_type.id === parseInt(productType))
        setFilteredCat(filtered || []);
    }, [productType, allCat])

    useEffect(() => {
        const time = new Date();
        if (skuCat === '' || skuBrand === '' || skuType === '') {
            return
        }
        function generateSKU() {
            function getTypeCode(skuType) {
                const words = skuType.split(' ');
                const filteredWords = words.filter(word => word.toLowerCase() !== 'and');
                if (filteredWords.length === 1) {
                    const word = words[0];
                    if (/^[aeiou]/i.test(word)) {
                        // Word starts with a vowel, take the first two letters
                        return word.slice(0, 2).toUpperCase();
                    } else {
                        // Word starts with a consonant, take the first two consecutive consonants

                        return filteredWords[0].replace(/[aeiouAEIOU]/g, '').slice(0, 2).toUpperCase();
                    }
                } else {
                    return filteredWords.map(word => word[0].toUpperCase()).join('');
                }
            }
            function getCategoryCode(skuCat) {
                const words = skuCat.split(' ');
                if (words.length === 1) {
                    const word = words[0];
                    if (/^[aeiou]/i.test(word)) {
                        return word.slice(0, 2).toUpperCase();
                    } else {
                        return words[0].replace(/[aeiouAEIOU]/g, '').slice(0, 2).toUpperCase();
                    }
                } else if (words.length === 1) {
                    return words[0].replace(/[aeiouAEIOU]/g, '').slice(0, 2).toUpperCase();
                } else {
                    return words.map(word => word[0].toUpperCase()).join('');
                }
            }
            const prod_type = getTypeCode(skuType)
            const prod_cat = getCategoryCode(skuCat)
            const prod_brand = skuBrand.replace(/[aeiouAEIOU]/g, '').slice(0, 2).toUpperCase();
            const randomNumber = `${Math.round(time.getTime() / 1000)}`
            return `${prod_type}-${prod_cat}-${prod_brand}${randomNumber}`;
        }
        generateSKU()
        setSku(generateSKU())
    }, [skuCat, skuBrand, skuType])

    // !Calculate Profit
    useEffect(() => {
        if (sellingPrice === '' || buyingPrice === '') {
            setProfit(0)
            setProfitMargin(0)
            return
        } else if (isNaN(sellingPrice) || isNaN(buyingPrice)) {
            setProfit(0)
            setProfitMargin(0)
        } else {
            const value = sellingPrice - buyingPrice
            const value_percentage = ((value / sellingPrice) * 100).toFixed(1)
            setProfit(value)
            setProfitMargin(value_percentage)
        }

    }, [sellingPrice, buyingPrice])




    const fileTypes = ["JPG", "JPEG", "PNG"];

    const handleChange = (files) => {
        console.log("FILE", files)
        setSelectedFile(files);
    };

    const handleFileChange = (e) => {
        // setSelectedFile(URL.createObjectURL(e.target.files[0]))
        console.log(URL.createObjectURL(e.target.files[0]));
    }

    const HandleCreateCat = () => {
        setExpandCatForm(prevVal => !prevVal)
    }
    const HandleCreateBrand = () => {
        setExpandBrandForm(prevVal => !prevVal)
    }
    const HandleCreateSupplier = () => {
        setexpandSupplierForm(prevVal => !prevVal)
    }

    return (
        <div className='container-fluid w-100 h-100 overflow-y-scroll'>
            <div className="row justify-content-center align-items-center g-2" >
                <div className="col-12">
                    <Navbar />
                </div>
                <div className="form-section">
                    <div className="row justify-content-center align-items-start g-2" >
                        <div className="col-md-7 col-12">
                            <div className="card text-start mb-3">
                                <div className="card-body">
                                    <p className="card-text fw-bold">Title</p>
                                    <input className='form-control form-control-sm' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                            </div>
                            <div className="card text-start mb-3">
                                <div className="card-body">
                                    <p className="card-text fw-bold">Media</p>
                                    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                                </div>
                            </div>
                            <div className="card text-start mb-3">
                                <div className="card-body">
                                    <div className="row justify-content-start align-items-center g-2" >
                                        <div className="col-12"><p className="card-text fw-bold ">Pricing</p></div>
                                        <div className="col-6 col-lg-4">
                                            <label for="" className="form-label">Selling Price (Ksh)</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="" value={sellingPrice} onChange={(e) => setsellingPrice(e.target.value)} required/>
                                        </div>
                                        <hr />
                                        <div className="col-4">
                                            <label for="" className="form-label">Cost per Item (Ksh)</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="" value={buyingPrice} onChange={(e) => setbuyingPrice(e.target.value)} required/>
                                        </div>
                                        <div className="col-4">
                                            <label for="" className="form-label">Profit</label>
                                            <input type="text" disabled className="form-control form-control-sm" placeholder="" value={profit} />
                                        </div>
                                        <div className="col-4">
                                            <label for="" className="form-label">Gross Profit Margin (GPM)</label>
                                            <input type="text" disabled className="form-control form-control-sm" placeholder="" value={profitMargin} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card text-start mb-3">
                                <div class="card-body">
                                    <div class="row justify-content-center align-items-center g-2"
                                    >
                                        
                                        <div className="col-12"><p className="card-text fw-bold">Product Variant</p></div>
                                        <div className="col-lg-4 col-6">
                                            <label for="" className="form-label">Current Inventory</label>
                                            <input type="text" className="form-control form-control-sm" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="" />
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="card text-start mb-3">
                                <div className="card-body">
                                    <p className="card-text fw-bold"> Status</p>
                                    <select
                                        className="form-select"
                                        onChange={(e) => setProductStatus(e.target.value)}>
                                        <option value={true} selected>Active</option>
                                        <option value={false}>Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="card text-start mb-3">
                                <div className="card-body">
                                    <div
                                        className="row justify-content-center align-items-center g-2"
                                    >
                                        <div className="col-12"><p className="card-text fw-bold">Product Organisation</p></div>
                                        <div className="col-12  mb-3">
                                            <label for="" className="form-label ">Product Type</label>
                                            <br />
                                            <select
                                                className="form-select"
                                                onChange={(e) => handleType(e)}
                                                value={productType}>
                                                <option value="" disabled selected>Select one</option>
                                                {productTypes && productTypes.map((type) => {
                                                    return (
                                                        <option value={type.id}>{type.name}</option>
                                                    )
                                                })}
                                            </select>
                                            <small id="helpId" className="form-text text-muted">The type of product we choose determines how we manage Inventory and reporting</small>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-flex justify-content-center align-items-center g-2">
                                                <div className="col"><label for="" className="form-label">Product Category</label></div>
                                                <div>
                                                    <button type="button" className="btn btn-warning py-0 mb-2 px-1" onClick={HandleCreateCat}>
                                                    {expandCatForm ? 
                                                        <><X size={'15px'} /> <small>Close</small></>
                                                            : 
                                                        <><Plus size={'15px'} /> <small>Add Category</small></>
                                                        }
                                                    </button>

                                                </div>
                                            </div>
                                            <div className={expandCatForm ? 'd-flex' : 'd-none'} >
                                                <CreateCategory allCat={allCat} setAllCat={setAllCat} productTypes={productTypes} type={type} setType={setType} />
                                            </div>
                                            <select className="form-select" onChange={(e) => handleCat(e)}>
                                                <option value="" disabled selected>Select</option>
                                                {filteredCat && filteredCat.map((cat) => {
                                                    return (
                                                        <option value={cat.id}>{cat.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-flex justify-content-center align-items-center g-2">
                                                <div className="col"><label for="" className="form-label">Brand</label></div>
                                                <div>
                                                    <button type="button" className="btn btn-warning py-0 mb-2 px-1" onClick={HandleCreateBrand}>
                                                        {expandBrandForm ? 
                                                        <><X size={'15px'} /> <small>Close</small></>
                                                            : 
                                                        <><Plus size={'15px'} /> <small>Add Brand</small></>
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={expandBrandForm ? 'd-flex' : 'd-none'}>
                                                <CreateBrand brands={brands} setBrands={setBrands} />
                                            </div>
                                            <select className="form-select" onChange={(e) => handleBrand(e)}>
                                                <option value="" disabled selected>Select one</option>
                                                {brands && brands.map((brand) => {
                                                    return (
                                                        <option value={brand.id}>{brand.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-flex justify-content-center align-items-center g-2">
                                                <div className="col"><label for="" className="form-label">Supplier</label></div>
                                                <div>
                                                    <button type="button" className="btn btn-warning py-0 mb-2 px-1" onClick={HandleCreateSupplier}>
                                                    {expandSupplierForm ? 
                                                        <><X size={'15px'} /> <small>Close</small></>
                                                            : 
                                                        <><Plus size={'15px'} /> <small>Add Supplier</small></>
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={expandSupplierForm ? 'd-flex' : 'd-none'}>
                                                <CreateSupplier setAllSuppliers={setAllSuppliers} allSuppliers={allSuppliers} />
                                            </div>
                                            <select className="form-select" onChange={(e) => setSupplier(e.target.value)}>

                                                <option disabled selected>Choose a supplier</option>
                                                {allSuppliers && allSuppliers.map((supplier) => {
                                                    return (
                                                        <option value={supplier.id}>{supplier.company_name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="card text-start mb-3">
                                <div className="card-body">
                                    <div className="row justify-content-start align-items-start g-2">
                                        <div className="col-12"><p className="card-text fw-bold">Inventory Levels</p></div>
                                        <div className="col-md-6 col-12">
                                            <label for="" className="form-label">Current Inventory</label>
                                            <input type="text" className="form-control form-control-sm" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="" />
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <label for="" className="form-label">Re-Order point</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="" value={reOrderLevel} onChange={(e) => setReOrderLevel(e.target.value)} />
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <label for="" className="form-label">Re-Order Quantity</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="" value={reOrderQuantity} onChange={(e) => setReOrderQuantity(e.target.value)} />
                                        </div>
                                        
                                        <div className="col-md-6 col-12">
                                            <label for="" className="form-label">SKU (Stock Keeping Unit)</label>
                                            <input type="text" className="form-control form-control-sm" disabled placeholder="" value={sku} onChange={(e) => setSku(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <hr />
                        <div className="col-12 mb-5">
                            <div className="row justify-content-end align-items-center g-2" >
                                <div className="col-md-4 col-12 text-end">
                                    <div className="d-flex justify-content-center align-items-center g-2 gap-3"
                                    >
                                        <div> <button className="btn bg-white border">Decline</button></div>
                                        <div> <button onClick={(e) => handleCreateProduct(e)} className="btn btn-primary">Add Product</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct