import React, {useState} from 'react'
import RestaurantDetails from './RestaurantDetails'
import TableItem from './TableItem'

const TableRows = ({currentRestaurants,selectRestaurant,selectedRestaurant }) => {
    const [modalOpen,setModalOpen] = useState(false)

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const renderModal = () => {
        if(modalOpen){
           return <RestaurantDetails restaurant={selectRestaurant} closeModal={closeModal}/>
        }
    }

    if(!currentRestaurants.length){
        return(
            <div style={{margin:"0 auto"}}>No Results</div>
        )
    } else {
        const response = currentRestaurants.map(rest => {
            return(
            <tr onClick={openModal} >
                <TableItem  key={rest.id} 
                        restaurants={rest} 
                        onClick={() => {selectRestaurant(rest)}}       
                />
            </tr>
            )
        })
        return(
            <React.Fragment>
                <table className="ui celled table">  
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
                {modalOpen && renderModal()}
            </React.Fragment>
        )
    }

}


export default TableRows
