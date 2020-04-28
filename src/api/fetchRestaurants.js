import { useState,useEffect } from 'react'

const FetchRestaurants = async () => {
    const [selectedRestaurant,getSelectedRestaurant] = useState(null)
    const [restaurant,getRestaurant] = useState([])

    //Use Fetch to obtain response and then return the JSON response
        const response = await fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants',{
            headers: {
                'Authorization': 'Api-Key q3MNxtfep8Gt',
            },
        }).then((response) => response.json())

        //Uses a search query and filter to be able to look through each restaurants name,city of physical location, and restaurant genre   
        response.sort((a,b) => {
            if(a.name > b.name){
                return 1
            } else if(a.name < b.name) {
                return -1
            }
            return;
        })
        //If Search has no results than return the original list else give them the filtered list
        getRestaurant(response)
        getSelectedRestaurant(response[0])
        // setCurrentRows(1)

    return restaurant,selectedRestaurant
}

export default FetchRestaurants;