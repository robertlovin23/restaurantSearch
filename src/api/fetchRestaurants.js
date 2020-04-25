// import { useState,useEffect } from 'react'

// const FetchRestaurants = () => {
//     const [restaurant,getRestaurant] = useState([])

//         //Use Fetch to obtain response, convert to JSON and then set the state via getRestaurant
//         const fetchData = async () => {
//             const response = await fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants',{
//                 headers: {
//                     'Authorization': 'Api-Key q3MNxtfep8Gt',
//                 },
//             }).then((response) => response.json())
//             getRestaurant(response)
//         }

//         //Mounts fetch data to the component, I use an array at the end of the argument so that it prevents and infinite loop
//         useEffect(() => {
//             fetchData();
//         }, [])

//         return restaurant;
//     }

// export default FetchRestaurants;