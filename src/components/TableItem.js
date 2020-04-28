import React from 'react'

const TableItem = ({restaurants}) => {
    return(
    <React.Fragment>
            <td data-label="Name">{restaurants.name}</td>
            <td data-label="City">{restaurants.city}</td>
            <td data-label="State">{restaurants.state}</td>
            <td data-label="Number">{restaurants.telephone}</td>
            <td data-label="Genre">{restaurants.genre}</td>
    </React.Fragment>
    )
}

export default TableItem