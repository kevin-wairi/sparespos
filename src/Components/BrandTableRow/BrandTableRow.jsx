import React from 'react'
import { Edit } from 'react-feather'
import {  NavLink } from 'react-router-dom';


function BrandTableRow({ brand}) {

    return (
            <tr key={brand.id} className='text-start'>
                <td >{brand.id}</td>
                <td > {brand.name} </td>
                <td > {brand.description} </td>
                <td >
                    <NavLink to={`/settings/brands/edit/${brand.id}`}><Edit className='td_edit'/></NavLink>
                </td>
            </tr>
    )
}
export default BrandTableRow