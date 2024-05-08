import React from 'react'
import { Edit } from 'react-feather'
import { NavLink } from 'react-router-dom'

function SuppliersTableRow({supplier}) {
  return (
    <>
        <tr key={supplier.id} className='text-start'>
                <td > {supplier.id}</td>
                <td > {supplier.firstname +" "+ supplier.lastname} </td>
                <td > {supplier.company_name} </td>
                <td > {supplier.phone_number} </td>
                <td > {supplier.email} </td>
                <td >
                    <NavLink to={`/catalog/suppliers/edit/${supplier.id}`}><Edit className='td_edit'/></NavLink>
                </td>
            </tr>
    </>
  )
}

export default SuppliersTableRow