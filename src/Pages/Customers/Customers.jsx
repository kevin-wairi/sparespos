import React, { useState, useEffect, useContext } from 'react'
import DataTable from 'react-data-table-component';
import { Trash2, Edit, PlusCircle } from 'react-feather';
import { UrlContext } from '../../Context/UrlProvider';

function Customers({ allCustomers, setAllCustomers }) {

  const apiUrl = useContext(UrlContext)

  const [customerRecords, setCustomerRecords] = useState(allCustomers);
  const [altCustomer, setAltCustomer] = useState('');
  const [createCustomer, setCreateCustomer] = useState(false) 

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [credit_limit, setCredit_limit] = useState('')
  const [phone_number, setPhone_number] = useState('')

  //!Create customers
  function handleCreateCustomers(e) {
    e.preventDefault()
    console.log('STARRT');
    if (username === '' || email === '' || phone_number === "") {
      return;
    }
    console.log('CONT...');
    fetch('http://127.0.0.1:3000/customers', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        phone_number,
        credit_limit
      })
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json()
      })
      .then((newUser) => {
        setAllCustomers(() => [...allCustomers, newUser])
        console.log('newUser', newUser);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  }

  // !customers DataTable columns
  const Customer_columns = [
    {
      name: <span style={{ fontWeight: 'bold' }}>ID</span>,
      selector: row => row.id,
      sortable: true,
      style: {
        fontWeight: 'bold'
      }
    },
    {
      name: <span style={{ fontWeight: 'bold' }}>Username</span>,
      selector: row => row.username,
      sortable: true
    },
    {
      name: <span style={{ fontWeight: 'bold' }}>Phone Number</span>,
      selector: row => row.phone_number,
      sortable: false
    },
    {
      name: <span style={{ fontWeight: 'bold' }}>E-mail</span>,
      selector: row => row.email,
      sortable: false
    },
    {
      name: <span style={{ fontWeight: 'bold' }}>Credit Limit</span>,
      selector: row => row.credit_limit,
      sortable: true
    }, {
      name: <span style={{ fontWeight: 'bold' }}>Action</span>,
      cell: (row) => {
        return (
          <>
            <button className="btn" onClick={(e) => handleDeleteCustomer(e, row.id)}>
              <Trash2 strokeWidth={1} color="#ff0000" size={20} />
            </button>
            <button className="btn" onClick={() => openCustomerOverlay(row)}>
              <Edit strokeWidth={1} color="blue" size={20} />
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
      return row.username.includes(searchQuery)
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

  const openCustomerOverlay = (user) => {
    setAltCustomer(user)
  }

  // !open create Customer overlay
  const openCreateCustomer = () => {
    setCreateCustomer(prevVal => !prevVal)
  }

  return (
    <div className="container-fluid">
      <div
        className="row justify-content-center align-items-center g-2"
      >
        <div className="col-12">
          <div className="card border-0 ">
            <div className="card-body">
              <div className="row d-flex justify-content-between">
                <div className="col-6 m-0">
                  <p className='fw-bold text-start'>Add Customer</p>
                </div>
              </div>
              <form className="red col mx-auto" onSubmit={(e) => handleCreateCustomers(e)}>
                <div className="row justify-content-center align-items-center g-2 m-0">
                  <div className=" col-4 align-items-center  mb-3">
                    <div className="form-outline  mb-0 col">
                      <div className="m-1">

                        <label className="form-label text-start text-capitalize" >Username</label>
                        <input type="text" className="form-control rounded" value={username} onChange={(e) => setUsername(e.target.value)} />
                      </div>

                    </div>
                    <div className="form-outline  mb-0 col">
                      <div className="m-1">

                        <label className="form-label text-start text-capitalize" >Email</label>
                        <input type="email" className="form-control rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className="col-4 align-items-center mb-2">
                    <div className="form-outline  mb-0 col">
                      <div className="m-1">

                        <label className="form-label text-start text-capitalize" >Phone Number</label>
                        <input type="tel" className="form-control rounded" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} />
                      </div>
                    </div>
                    <div className="form-outline  mb-0 col">
                      <div className="m-1">
                        <label className="form-label text-start text-capitalize" >credit Limit</label>
                        <select className="form-control rounded form-select-lg"
                          value={parseInt(credit_limit)}
                          onChange={(e) => setCredit_limit(parseInt(e.target.value))}
                        >
                          <option selected value={0}>0</option>
                          <option value={20000}>20,000</option>
                          <option value={50000}>50,000</option>
                          <option value={100000}>100,000</option>
                        </select>
                      </div>

                    </div>
                  </div>
                  <div className="col-4 ">
                    <div className="form-outline ">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" />
                        <label className="form-check-label" for="">
                          Discounted
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" />
                        <label className="form-check-label" for="">
                          Block user
                        </label>
                      </div>
                    </div>
                    <div className="form-outline ">
                      <button type="submit" className="btn btn-primary ">Submit</button>
                    </div>
                  </div>


                </div>


              </form>
            </div>
          </div>
        </div>
        {/* Customers table */}
        <div className="col-12">
          <div className="card border-0 text-start">
            <div className="card-body">
              <div className="row justify-content-between align-items-center g-2"
              >
                <div className='col-3'><button className="btn text-primary py-1" onClick={() => openCreateCustomer()}><PlusCircle strokeWidth={1} />  Add Customers</button></div>
                <div className="text-end col-3"><input className='form-control form-control-sm rounded-4 h-75 ps-3' placeholder='Filter data' type="text" onChange={(e) => handleFilterCustomers(e)} /></div>
              </div>

              <DataTable
                columns={Customer_columns}
                data={customerRecords}
                fixedHeader
                pagination
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Customers