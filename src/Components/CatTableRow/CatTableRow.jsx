import React from 'react'
import { Edit } from 'react-feather'
import { NavLink } from 'react-router-dom'

function CatTableRow({cat}) {
  return (
    <tr key={cat.id} className='text-start'>
    <td >{cat.id}</td>
    <td > {cat.name} </td>
    <td > {cat.description} </td>
    <td >
        <NavLink to={`/settings/categories/edit/${cat.id}`}><Edit className='td_edit'/></NavLink>
    </td>
</tr>
  )
}

export default CatTableRow