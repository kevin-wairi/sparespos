import React, { useState } from 'react'
import { carMakes } from '../../Components/ArrayFiles/CarMakes'
import { carModels } from '../../Components/ArrayFiles/CarModel'
import { carModelsYears } from '../../Components/ArrayFiles/CarModelsYears'

function Inventory({ carpartCategories }) {

    const [description, setDescription] = useState('')
    const [carMake, setCarMake] = useState('')
    const [carModel, setCarModel] = useState('')
    const [year, setYear] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const [markedPrice, setMarkedPrice] = useState('')
    const [sellingPrice, setSellingPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('')
    const [datePosted, setDatePosted] = useState('');

    const [addNewProduct, setAddNewProduct] = useState(true)
    const [goodsError, setGoodsError] = useState('')



    // ! goods status change
    const handleStatusChanged = (e) => {
        setSelectedStatus(e.target.id)
        setDatePosted(new Date().toDateString());
    }
    const handleFileChange = (e) => {
        setSelectedFile(URL.createObjectURL(e.target.files[0]))
        console.log(URL.createObjectURL(e.target.files[0]));
    }

    //!add goods to stock
    async function handleAddGoods() {

        try {
            const response = await fetch('http://localhost:3000/parts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accepts: 'application/json',
                },
                body: JSON.stringify({
                    title,
                    category,
                    description,
                    carMake,
                    carModel,
                    year,
                    image: selectedFile,
                    markedPrice,
                    sellingPrice,
                    quantity,
                    status: selectedStatus,
                    datePosted

                }),
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
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div className="wrapper">
            <div className="container-fluid overflow-y-scroll" style={{ height: '100vh' }}>
                {addNewProduct &&
                    <div className="row justify-content-center  g-2 p-2">
                        {/* add products */}
                        <div className="col-lg-6 col-11 ">
                            <div className="card border-0 ">
                                <div className="card-body">
                                    <p className='fw-bold text-start'>Add Items</p>
                                    <form className=" mx-1 mx-md-4 form" onSubmit={(e) => handleAddGoods(e)}>
                                        <div className="row">
                                            <div className="d-flex flex-row align-items-center mb-2 col-12 col-lg-6">
                                                <div className="form__div m-1">
                                                    <input required type="text" className="form-control rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize">Name of Product</label>
                                                </div>
                                            </div>
                                            <div className="form-outline flex-fill mb-0 col-12 col-lg-5">
                                                <div className="form__div m-1">
                                                    <input required type="text" list='data3' className="form-control rounded" value={category} onChange={(e) => setCategory(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize">Category</label>
                                                </div>


                                                <datalist id='data3'>
                                                    {carpartCategories.map((element,index) => (
                                                        <option key={index} value={element.category_name}>{element.category_name}</option>
                                                    ))}
                                                </datalist>
                                            </div>
                                            <div className="form-outline flex-fill mb-0  col-12">
                                                <div className="form__div m-1 ">
                                                    <input required type="file" className="form-control rounded" onChange={(e) => handleFileChange(e)} />
                                                    <label className="form__label text-start text-capitalize">Image</label>
                                                </div>
                                            </div>

                                            <div className="form-outline  mb-0 col-lg-4 col-6">
                                                <div className="form__div m-1 ">
                                                    <input type="text" required className='form-control rounded' list='data' value={carMake} onChange={(e) => setCarMake(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize ">Car Make</label>
                                                </div>

                                                <datalist id='data'>
                                                    {carMakes.map((element) => (
                                                        <option key={element} value={element}>{element}</option>
                                                    ))}
                                                </datalist>
                                            </div>
                                            <div className="form-outline  mb-0 col-lg-4 col-6">
                                                <div className="form__div m-1">
                                                    <input required type="text" list='data1' className="form-control rounded" value={carModel} onChange={(e) => setCarModel(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize">Car Model</label>
                                                </div>

                                                <datalist id='data1'>
                                                    {carModels[carMake] && carModels[carMake].map((model) => (
                                                        <option key={model} value={model}>{model}</option>
                                                    ))}
                                                </datalist>
                                            </div>
                                            <div className="form-outline  mb-0 col-6 col-lg-4">
                                                <div className="form__div m-1">
                                                    <input required type="text" list='data2' className="form-control rounded" value={year} onChange={(e) => setYear(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize">Year</label>
                                                </div>

                                                <datalist id='data2'>
                                                    {carModelsYears[carMake] && carModelsYears[carMake][carModel] && carModelsYears[carMake][carModel].map((year) => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
                                                </datalist>
                                            </div>
                                            <div className="form-outline  mb-0 col-6">
                                                <div className="form__div m-1">
                                                    <input required type="number" className="form-control rounded" value={markedPrice} onChange={(e) => setMarkedPrice(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize">Marked Price</label>
                                                </div>

                                            </div>
                                            <div className="form-outline  mb-0 col-6">
                                                <div className="form__div m-1">
                                                    <input required type="number" className="form-control rounded" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize">Selling Price</label>
                                                </div>
                                            </div>


                                            <div className="form-outline  mb-0 col-6">
                                                <div className="form__div m-1 ">
                                                    <input required type="number" className="form-control rounded" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                                    <label className="form__label text-start text-capitalize">Quantity</label>
                                                </div>

                                            </div>
                                            <div className="form-outline  mb-0 col-6 col-12 col-lg-6">
                                                <div className="form-check">
                                                    <input required className="form-check-input required" type="radio" name="shipmentStatus" id="arrived" onChange={handleStatusChanged} checked={selectedStatus === 'arrived'} />
                                                    <label className="form-check-label" for="arrived">
                                                        Goods have arrived
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input required className="form-check-input required" type="radio" name="shipmentStatus" id="inTransit" onChange={handleStatusChanged} checked={selectedStatus === 'inTransit'} />
                                                    <label className="form-check-label" for="inTransit">
                                                        Goods are in transit
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <div className="form-outline flex-fill mb-0">
                                                    <div className="form__div m-1">
                                                        <textarea className="form-control rounded" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
                                                        <label className="form__label text-start text-capitalize">Description</label>
                                                    </div>

                                                </div>
                                            </div>

                                            {goodsError && <div className='text-danger align-text-center  col-6 mx-auto'>{goodsError}</div>}
                                            <div className="d-flex justify-content-center ">
                                                <button type="submit" className="btn btn-primary ">Add </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>


                    </div>

                }
            </div>
        </div>
    )
}

export default Inventory