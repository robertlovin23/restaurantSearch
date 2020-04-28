import React, {useState} from 'react'
import RestaurantDetails from './RestaurantDetails'

const TableRows = (props) => {
    const [modalOpen,setModalOpen] = useState(false)

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const renderModal = () => {
        if(modalOpen){
           return <RestaurantDetails restaurant={selectedRestaurant} closeModal={closeModal}/>
        }
    }

    const { restaurant,currentRestaurants,selectRestaurant,selectedRestaurant } = props

    if(!currentRestaurants.length){
        return(
            <div style={{margin:"0 auto"}}>No Results</div>
        )
    }
    const response = restaurant.length > 0 ? currentRestaurants.map(rest => {
        
        return(
            <tr rest={rest.id} onClick={() => {selectRestaurant(rest)}}>
                <td data-label="Name" onClick={openModal}>{rest.name}</td>
                <td data-label="City">{rest.city}</td>
                <td data-label="State">{rest.state}</td>
                <td data-label="Number">{rest.telephone}</td>
                <td data-label="Genre">{rest.genre}</td>
            </tr>
        
        )
    }) : <tr style={{alignContent:"center"}}>No results found.</tr>
    return(
    <React.Fragment>
        <table class="ui celled table">  
            <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Phone Number</th>
                    <th>Genre</th>
                </tr>
            </thead>
            <tbody>
                {response}
            </tbody>

        </table>
            {renderModal()}
    </React.Fragment>
    )
}


export default TableRows