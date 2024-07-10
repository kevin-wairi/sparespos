import React, { useState, useEffect } from 'react'
import { Edit, Trash, Trash2 } from 'react-feather'
import { useNavigate, useParams } from 'react-router'

function ProductDetails({ products }) {

  const { productId } = useParams();
  const id = parseInt(productId.split(':')[1])
  const product = products.find(product => product.id === id);
console.log('product',product);
  const [dateCreated, setDateCreated] = useState('')

  const navigate = useNavigate()


  useEffect(() => {
    // if (!product) return;
    const formattedDate = product.created_at.split('T')[0].split('-').reverse().join('-');
    setDateCreated(() => formattedDate);
  }, []);



  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center g-2" >
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center g-2" >
            <div><h5>{product?.title}</h5></div>
            <div><button className="btn btn-warning" onClick={() => navigate(-1)}>Back</button></div>
          </div>
        </div>
        {/* product card */}
        <div className="col-12">
          <div className="card text-start">
            <div className="card-body py-1">
              <div className="row justify-content-center align-items-center g-2" >
                <div className="col-12 d-flex justify-content-between">
                  <div>
                    <p className='card-text m-0'>{product.title}</p>
                  </div>
                  <div className="d-flex justify-content-end align-items-center gap-1 g-2">
                    <button className="btn border" onClick={()=>navigate(`/catalog/products/edit/:${id}`)}>
                      <div className="d-flex justify-content-center align-items-center gap-1 g-2" >
                        <Edit size={'15px'} />
                        <span className='lh-1 '>Edit Details</span>
                      </div>
                    </button>
                    <button className="btn btn-danger border">
                      <div className="d-flex justify-content-center align-items-center gap-1 g-2" >
                        <Trash size={'15px'} />
                        <span className='lh-1 '>Delete</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row justify-content-start align-items-center g-2"
                  >
                    <div className="img-container col-lg-3 col-md-4 col-6">
                      <img className=' img_fluid' src={product.image} alt="info" />
                    </div>
                    <div className="col-lg-9 col-md-8 col-12">
                      <div
                        className="row justify-content-start align-items-center g-2"
                      >
                        <div className="col-lg-3 col-md-4 col-6  ">
                          <p className='text-muted mb-0' style={{ fontSize: '12px' }}>Title</p>
                          <p className='mb-0'>{product.title}</p>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6  ">
                          <p className='text-muted mb-0' style={{ fontSize: '12px' }}>SKU (Stock Keeping Unit)</p>
                          <p className='mb-0'>{product.sku}</p>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6  ">
                          <p className='text-muted mb-0' style={{ fontSize: '12px' }}>Product Type</p>
                          <p className='mb-0'>{product.product_type.name}</p>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6  ">
                          <p className='text-muted mb-0' style={{ fontSize: '12px' }}>Brand</p>
                          <p className='mb-0' >{product.brand.name}</p>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6  ">
                          <p className='text-muted mb-0' style={{ fontSize: '12px' }}>Stock Date</p>
                          <p className='mb-0'>{dateCreated}</p>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6  ">
                          <p className='text-muted mb-0' style={{ fontSize: '12px' }}>Vendor</p>
                          <p className='mb-0'>{product.suppliers[0].company_name}</p>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6  ">
                          <p className='text-muted mb-0' style={{ fontSize: '12px' }}>Category</p>
                          <p className='mb-0'>{product.category.name}</p>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6  ">
                          <p className='text-muted mb-0' style={{ fontSize: '12px' }}>Quantity</p>
                          <p className='mb-0'>{product.inventory.quantity}</p>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6  ">
                          <p className='text-muted mb-0' style={{ fontSize: '12px' }}>Price</p>
                          <p className='mb-0'>Ksh. {product.inventory.selling_price}</p>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6  ">
                          <p className='text-muted mb-0' style={{ fontSize: '12px' }}>Status</p>
                          <p className='mb-0'>{product.inventory.status ? 'Active' : 'Inactive'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card text-start">
            <div className="card-body">
              <h4 className="card-title">Product Quantity statistics</h4>
              <p className="card-text">Body</p>
            </div>
          </div>

        </div>
        <div className="col-6">
          <div className="card text-start">
            <div className="card-body">
              <h4 className="card-title">Product Sales statistics</h4>
              <p className="card-text">Body</p>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card text-start">
            <div className="card-body">
              <h4 className="card-title">Product Invebtory Levels</h4>
              <p className="card-text">Body</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ProductDetails