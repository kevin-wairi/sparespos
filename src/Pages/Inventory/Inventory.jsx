import React, { useState } from 'react'
import './Inventory.css'
import DataTable from 'react-data-table-component';
import { NavLink, useNavigate } from 'react-router-dom';
import { Edit } from 'react-feather';
import Navbar from '../../Components/Navbar/Navbar';

function Inventory({ products }) {

  const navigate = useNavigate()

  const [filteredProducts, setFilteredProducts] = useState(products);


  // !Products DataTable columns
  const products_columns = [
    {
      name: <span style={{ fontWeight: 'bold' }}>Product</span>,
      cell: row => {
        return (
          <>
            <div className='m-1' style={{ height: "6vh", width: '5vw', objectFit: 'cover' }}>
              <img className='img-fluid w-100 h-100 rounded' src={row.image} alt="info" />
            </div>
          </>
        )
      },
      sortable: false
    },
    {
      name: <span style={{ fontWeight: 'bold' }}>Name</span>,
      selector: row => row.title,
      sortable: false
    }, {
      name: <span style={{ fontWeight: 'bold' }}>Status</span>,
      selector: row => (row.inventory.status ? 'Active' : 'Inactive'),
      sortable: true
    }, {
      name: <span style={{ fontWeight: 'bold' }}>Inventory</span>,
      selector: row => row.inventory.quantity,
      sortable: true
    }, {
      name: <span style={{ fontWeight: 'bold' }}>Category</span>,
      selector: row => row.category.name,
      sortable: true
    }, {
      name: <span style={{ fontWeight: 'bold' }}>sku</span>,
      selector: row => row.sku,
      sortable: true
    }, {
      name: <span style={{ fontWeight: 'bold' }}>Added At</span>,
      selector: row => {
        const dateParts = row.created_at.split('T')[0].split('-');
        return dateParts.reverse().join('-');
      },
      sortable: true
    }, {
      name: <span style={{ fontWeight: 'bold' }}>Action</span>,
      cell: (row) => {
        return (
          <>
            <NavLink to={`/catalog/products/edit/:${row.id}`}>
              <Edit strokeWidth={1} color="blue" size={20} />
            </NavLink>
          </>
        );
      }
    },
  ];

  const customTableStyles = {
    rows: {
      style: {
        '&:hover': {
          backgroundColor: '#f1f1f1',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        },
      },
    },
  }

  const handleRowClicked = (row) => {
    navigate(`/catalog/products/details/:${row.id}`);
  };

  const HandleFilterProducts = (value) => {
    const filtered = products.filter(product => product.title.toLowerCase().includes(value.toLowerCase()))
    setFilteredProducts(filtered)
  }


  return (
    <div className="wrapper  h-100 w-100 overflow-y-scroll px-3">
      <div className="container-fluid p-0">
        <div className="row justify-content-center align-items-center g-2">
          <div style={{ width: '93vw' }}>
            <Navbar />
          </div>
          <div className="col-12">
            <div className="card text-start box-shaddow-77">
              <div className="card-body">
                <div className="row justify-content-between align-items-center g-2">
                  <div className="text-end col-3"><input className='form-control form-control-sm rounded h-75' placeholder='Filter' type="text" onChange={(e) => HandleFilterProducts(e.target.value)} /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div class="card text-start border-0">
              <div className="d-flex justify-content-between align-items-center g-2 p-2">
                <div className="text-start">
                  <h5 className='m-0'>Inventory Table</h5>
                </div>
              </div>
            </div>
            <DataTable
              columns={products_columns}
              data={filteredProducts}
              fixedHeader
              pagination
              customStyles={customTableStyles}
              onRowClicked={handleRowClicked}
              className="custom-data-table"
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Inventory