import React, { useState, useContext, useEffect } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { useNavigate, useParams } from 'react-router';
import { ToggleSlider } from 'react-toggle-slider';
import { UrlContext } from '../../Context/UrlProvider';

function EditProduct({ products, brands, setProducts }) {

  const { productId } = useParams()
  const id = parseInt(productId.split(':')[1])
  const product = products.find(product => product.id === id);

  const apiUrl = useContext(UrlContext)
  const navigate = useNavigate()
  

  useEffect(() => {
    if (!product) return
    // setSelectedFile(product.image);
    setsellingPrice(product.retail_price);
    setTitle(product.title);
    setProductStatus(product.inventory.status);
    setQuantity(product.inventory.quantity);
    setReOrderLevel(product.inventory.restock_level);
    setReOrderQuantity(product.inventory.restock_quantity);
    setbuyingPrice(product.inventory.buying_price);
    setSku(product.sku);
  }, [product])


  // if (!product) {
  //   return <div>Product not found</div>;
  // }

  const [productStatus, setProductStatus] = useState(product.inventory.status);
  const [selectedFile, setSelectedFile] = useState('');
  const [changeImg, setChangeImg] = useState(false)
  const [sellingPrice, setsellingPrice] = useState('')
  const [title, setTitle] = useState('')
  const [quantity, setQuantity] = useState('')
  const [reOrderLevel, setReOrderLevel] = useState('');
  const [reOrderQuantity, setReOrderQuantity] = useState('');
  const [buyingPrice, setbuyingPrice] = useState('');
  const [sku, setSku] = useState('');


  const fileTypes = ["JPG", "JPEG", "PNG"];

  const handleChange = (files) => {
    console.log("FILE", files)
    setSelectedFile(files);
  };

  useEffect(() => {
    if (selectedFile) {
      setChangeImg(false)
    }
  }, [selectedFile])


  const handleChangeImg = () => {
    setChangeImg(prevVal => !prevVal)
  }

  //!add goods to stock
  async function updateProduct(e, prod_id) {
    e.preventDefault()
    console.log('first')

    const formData = new FormData();
    formData.append('title', title);
    formData.append('quantity', quantity);
    formData.append('restock_level', reOrderLevel);
    formData.append('restock_quantity', reOrderQuantity);
    formData.append('selling_=rice', sellingPrice);
    formData.append('buying_price', buyingPrice);
    formData.append('sku', sku);
    formData.append('status', productStatus);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    const response = await fetch(apiUrl + `/products/${prod_id}`, {
      method: 'PATCH',
      body: formData,
    })

    const p = await response.json();
    if (response.ok) {
      console.log('added goods', p);
      const updatedProducts = products.map(prod => {
        if (prod.id === prod_id) {
          return p
        }
        return prod;
      });
      setProducts(updatedProducts);

      navigate('/catalog/products')
    } else {
      console.error('Failed to add goods:');
    }
  }

  return (

    <div className="container-fluid">
      <div className="row justify-content-center align-items-start g-2">
        <div className="col-md-4 col-12">
          <div className="card text-start">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center g-2" >
                <h5 className="card-text">Product_id: {product.id}</h5>
                <h5 className="card-text"> sh.{product.inventory.retail_price}</h5>
              </div>
              <p className="card-text text-lowercase">{product.sku}</p>
              <div className="img_container mb-3 ">
                <img className='img-fluid rounded-3' src={product.image} alt="" />
              </div>
              <div className="d-flex"><button className="btn btn-primary flex-fill" onClick={handleChangeImg}>Change Image</button></div>
              {changeImg &&
                <div className='overlayDiv'>
                  <div className="card text-start mb-3">
                    <div className="card-body">
                      <div
                        className="d-flex justify-content-between align-items-center g-2"
                      >
                        <div><p className="card-text fw-bold">Media</p></div>
                        <div><button className="btn " onClick={handleChangeImg}>Back</button></div>
                      </div>

                      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="col-md-8 col-12">
          <div className="card text-start mb-3">
            <div className="card-body">
              <h5 className="card-text">Edit Product</h5>
              <div
                className="row justify-content-start align-items-center g-2"
              >
                <div className="mb-3 col-8">
                  <label for="" className="form-label">Product</label>
                  <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="" />
                </div>
                <div className="mb-3 col-4">
                  <label className="form-label"> Status</label>
                  <ToggleSlider active={productStatus} onToggle={() => setProductStatus(prevVal => !prevVal)} />
                  <small>Product is {productStatus ? "active" : "inactive"}</small>
                </div>
                <div className="mb-3 col-6">
                  <label for="" className="form-label">SKU (Stock Keeping Unit)</label>
                  <input type="text" className="form-control form-control-sm" placeholder="" value={sku} onChange={(e) => setSku(e.target.value)} />
                </div>
                <hr />
                <div className="col-12 ">
                  <p>Inventory Levels</p>
                  <div className="row justify-content-center align-items-center g-2" >
                    <div className="mb-3 col-4">
                      <label for="" className="form-label">Quantity</label>
                      <input type="text" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="" />
                    </div>
                    <div className="mb-3 col-4">
                      <label for="" className="form-label">Restock Level</label>
                      <input type="text" className="form-control" value={reOrderLevel} placeholder="" onChange={(e) => setReOrderLevel(e.target.value)} />
                    </div>
                    <div className="mb-3 col-4">
                      <label for="" className="form-label">Restock Quantity</label>
                      <input type="text" className="form-control" value={reOrderQuantity} placeholder="" onChange={(e) => setReOrderQuantity(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-4">
                  <label for="" className="form-label">Selling Price</label>
                  <input type="text" className="form-control form-control-sm" placeholder="" value={sellingPrice} onChange={(e) => setsellingPrice(e.target.value)} />
                </div>
                <div className="col-6 col-lg-4">
                  <label for="" className="form-label">Cost per Item</label>
                  <input type="text" className="form-control form-control-sm" placeholder="" value={buyingPrice} onChange={(e) => setbuyingPrice(e.target.value)} />
                </div>
              </div>

            </div>
          </div>
          <div
            class="row justify-content-end align-items-center g-2"
          >
            <div className="col-sm-6 col-md-4 col-6 d-flex"><button className="flex-fill btn btn-primary" onClick={(e) => updateProduct(e, product.id)}>Update</button></div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default EditProduct