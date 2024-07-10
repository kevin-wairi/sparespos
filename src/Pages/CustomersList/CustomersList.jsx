import React, { useState, useEffect, useContext } from 'react'
import DataTable from 'react-data-table-component';
import { PlusCircle } from 'react-feather';
import { UrlContext } from '../../Context/UrlProvider';
import CreateCustomer from '../../Components/CreateCustomer/CreateCustomer';
import EditCustomer from '../../Components/EditCustomer/EditCustomer';

function CustomersList({ allCustomers, setAllCustomers }) {

  const apiUrl = useContext(UrlContext)

  const [customerRecords, setCustomerRecords] = useState(allCustomers);
  const [altCustomer, setAltCustomer] = useState('');

  const [createCollapse, setCreateCollapse] = useState(false);
  const [editCollapse, setEditCollapse] = useState(false);



  // !customers DataTable columns
  const Customer_columns = [
    {
      name: <span style={{ fontWeight: 'bold' }}>Customers</span>,
      selector: row =>
        <div className='d-flex justify-content-between gap-2 align-items-center '>
          <div style={{ height: '6vh', width: '3vw' }}>
            <img className='img-fluid' src={row.profile_image} alt="info" />
          </div>
          <div>
            <ul className=' list-unstyled mb-0'>
              <li className='text-capitalize' style={{ fontWeight: 'bold' }}>{row.username}</li>
              <li>{row.phone_number}</li>
            </ul>
          </div>
        </div>
    },
    {
      name: <span style={{ fontWeight: 'bold' }}>Active</span>,
      selector: row => row.customer_status ? 'True' : 'False',
      sortable: true
    },
    {
      name: <span style={{ fontWeight: 'bold' }}>Credit Limit</span>,
      selector: row => row.credit_limit,
      sortable: true
    },
    {
      name: <span style={{ fontWeight: 'bold' }}>Discounted</span>,
      selector: row => row.discounted ? 'True' : 'False',
      sortable: true
    },
    {
      name: <span style={{ fontWeight: 'bold' }}>Action</span>,
      cell: (row) => {
        return (
          <>
            <button className="btn fw-bold" onClick={() => { setAltCustomer(row); handleEditCollapse() }}>
              Edit
            </button>
          </>
        );
      }
    },
  ];



  // !form filter for Customers
  const handleFilterCustomers = (e) => {
    const searchQuery = e.target.value.toLowerCase().trim();
    const newData = allCustomers.filter(row => {
      return row.username.toLowerCase().startsWith(searchQuery)
    })
    setCustomerRecords(() => newData)
  }

  // !update filter state after refresh
  useEffect(() => {
    setCustomerRecords(() => allCustomers)
  }, [allCustomers])

  //!delete Customers
  function handleDeleteCustomer(e, user_id) {
    e.preventDefault()
    fetch(apiUrl + `/customers/${user_id}`, {
      method: "DELETE",
    })
      .then(() => {
        const current = allCustomers.filter(user => user.id !== user_id)
        setAllCustomers(() => current)
      })
  }


  // !collapse create form
  const handleCreateCollapse = () => {
    setCreateCollapse(!createCollapse);
  };
  // !collapse Edit form
  const handleEditCollapse = () => {
    setEditCollapse(!editCollapse);
  };


  return (
    <div className="wrapper h-100 w-100 overflow-y-scroll">
      <div className="container-fluid">
        <div
          className="row justify-content-center align-items-center g-2"
        >
          <div className="col-12">
            <div className="card text-start bg-transparent border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center g-2">
                  <div><h4 className="card-text">Customers</h4>
                    <p className='m-0'>Add, View and Edit your Customers all in one place</p>
                  </div>
                  <div>
                    <button
                      className="btn bg-white"
                      onClick={() => { handleCreateCollapse() }}
                    > Add Customers
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
          {createCollapse &&
            <div className="overlayDiv m-0">
              <CreateCustomer setAllCustomers={setAllCustomers} allCustomers={allCustomers} handleCreateCollapse={handleCreateCollapse} />
            </div>
          }
          {editCollapse &&
            <div className="overlayDiv m-0">
              <EditCustomer setAllCustomers={setAllCustomers} allCustomers={allCustomers} handleEditCollapse={handleEditCollapse} altCustomer={altCustomer} />
            </div>
          }

          <div className="card text-start box-shaddow-77">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center g-2"
              >
                <div><button className="btn text-primary py-1" onClick={() => { handleCreateCollapse() }}><PlusCircle strokeWidth={1} />  Add Customers</button></div>
                <div ><input className='form-control form-control-sm  h-75 ps-3' placeholder='Filter Username' type="text" onChange={(e) => handleFilterCustomers(e)} /></div>
              </div>
            </div>
          </div>

          {/* Customers table */}
          <div className="col-12">
            <div className="card border-0 box-shaddow-77 text-start ">
              <div className="card-body p-0 rounded">
                <DataTable
                  columns={Customer_columns}
                  data={customerRecords}
                  fixedHeader
                  pagination
                />
              </div>
            </div>
          </div>
        </div >
      </div >
    </div>
  )
}

export default CustomersList