import React, {useState,useEffect} from 'react'
import SearchBar from './Searchbar'
// import FetchRestaurants from '../../src/api/fetchRestaurants'

const App = () => {
    //Fetches Custom hook from FetchRestaurants hook

    // const restaurants = FetchRestaurants();
    const [currentRows,setCurrentRows] = useState(1)
    const [itemsInTable,setItemsInTable] = useState(10)
    const [restaurant,getRestaurant] = useState([])
    const [filteredList,getFilteredList] = useState([])

    //Use Fetch to obtain response and then return the JSON response
    const fetchData = async () => {
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
        setCurrentRows(1)
    }

    const handlePageCount = (event) => {
        setCurrentRows(Number(event.target.id))
    }

    //Filters Restaurants into a new array and sets the state of the new array
    const filterRestaurants = (query,states,genre) => {
        const search = query;
        const stateDropdown = states;
        const genreDropdown = genre;
        //
        const filters = restaurant.filter(res => {
            if(
                (search === "" || 
                    (res.name.toLowerCase().includes(search.toLowerCase()) || 
                    res.city.toLowerCase().includes(search.toLowerCase()) ||
                    res.genre.toLowerCase().includes(search.toLowerCase()))
                ) &&
                    (stateDropdown === "" || res.state.toLowerCase().includes(stateDropdown.toLowerCase())) &&
                    (genreDropdown === "" || res.genre.toLowerCase().includes(genreDropdown.toLowerCase()))
              ){
                  console.log(stateDropdown,genreDropdown,search)
                  return res;
            }
        })

        getRestaurant(filters)
        setCurrentRows(1)
    }

    //Helper methods for rendering tables
    const renderTable = (currentRestaurants) => {
        let restaurantArr = []
        restaurantArr = restaurant
        console.log(restaurant,restaurantArr)
        return (restaurant.length > 0 ? currentRestaurants.map(rest => {
            return(
              <tr rest={rest.id}>
                <td data-label="Name">{rest.name}</td>
                <td data-label="City">{rest.city}</td>
                <td data-label="State">{rest.state}</td>
                <td data-label="Number">{rest.telephone}</td>
                <td data-label="Number">{rest.genre}</td>
              </tr>
            )
        }) : <tr style={{alignContent:"center"}}>No results found.</tr>)
    }

    const resetFilter = () => {
        fetchData();
    }

    //Mounts fetch data to the component, I use an array at the end of the argument so that it prevents and infinite loop
    useEffect(() => {
        fetchData();
    }, []);

    const indexOfLastItem = currentRows * itemsInTable;
    const indexOfFirstItem = indexOfLastItem - itemsInTable;

    // const tableFilters = [];
    const tablePage = [];

    const currentRestaurants = restaurant.slice(indexOfFirstItem, indexOfLastItem);
        for(let i = 1; i <= Math.ceil(restaurant.length/ itemsInTable); i++){
            tablePage.push(i)
    }

    console.log(restaurant,currentRestaurants)

    // const currentFilters = filteredList.slice(indexOfFirstItem, indexOfLastItem);
    //     for(let i = 1; i <= Math.ceil(filteredList.length/ itemsInTable); i++){
    //         tablePage.push(i)
    // }

    const renderPagination = (tablePage.length ? tablePage.map(number => {
        if(number === currentRows){
            return(
            <li className="pageNumber"
                style={{color:"red",display: 'inline-block', marginRight:"10px"}}
                key={number}
                id={number}
                onClick={handlePageCount}
            >
                {number}
            </li>
            
            )
        } else {
            return(
            <li className="pageNumber"
                style={{display: 'inline-block', marginRight:"10px"}}
                key={number}
                id={number}
                onClick={handlePageCount}
            >
                {number}
            </li>
            
            )
        }
    }) : tablePage.length === 0)

    const renderChangeArrows = () => {
        return(
            {renderPagination}
        )
    }

    //Checks is restaurants are empty and then maps the array of objects to a table
    return(
        <div className="ui container">
            <SearchBar onSubmitString={filterRestaurants} resetFilter={resetFilter} restaurant={restaurant}/>
            <div>
                <div>   
                    <h4 style={{ display:"inline-block"}}>{renderPagination}</h4>
                    <div style={{float:"right",display:"inline-block"}}>
                        {restaurant.length > 1 || restaurant.length === 0 ? 
                            <div>{restaurant.length} Results</div> : 
                            <div>{restaurant.length} Result</div>
                        } 
                    </div>
                </div>
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
                        {renderTable(currentRestaurants)}
                    </tbody>
                </table>
                <h4>{renderPagination}</h4>
            </div>
        </div>
    )
}

export default App;