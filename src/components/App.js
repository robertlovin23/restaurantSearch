import React, {useState,useEffect} from 'react'
import SearchBar from './Searchbar'
import TableRows from '../components/TableRows'

const App = () => {

    const [currentRows,setCurrentRows] = useState(1)
    const [itemsInTable] = useState(10)

    const [selectedRestaurant,getSelectedRestaurant] = useState(null)
    const [restaurant,getRestaurant] = useState([])

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
        getSelectedRestaurant(response[0])
        setCurrentRows(1)

    }

    //Sets the pagination for a page
    const handlePageCount = (event) => {
        setCurrentRows(Number(event.target.id))
    }

    //Filters Restaurants into a new array and sets the state of the new array
    const filterRestaurants = (query,states,genre,attire) => {
        const search = query;
        const stateDropdown = states;
        const genreDropdown = genre;
        const attireDropdown = attire;

        //Allows the ability to toggle between filters and combine them as well. You could use all the filters or just one.
        const filters = restaurant.filter(res => {
            if(
                (search === "" || 
                    (res.name.toLowerCase().includes(search.toLowerCase()) || 
                    res.city.toLowerCase().includes(search.toLowerCase()) ||
                    res.genre.toLowerCase().includes(search.toLowerCase()))
                ) &&
                    (stateDropdown === "" || res.state.toLowerCase().includes(stateDropdown.toLowerCase())) &&
                    (genreDropdown === "" || res.genre.toLowerCase().includes(genreDropdown.toLowerCase())) &&
                    (attireDropdown === "" || res.attire.toLowerCase().includes(attireDropdown.toLowerCase()))
              ){
                  console.log(stateDropdown,genreDropdown,search)
                  return res;
            }
        })

        //Sets the state of the restaurant array to filters
        getRestaurant(filters)
        setCurrentRows(1)
    }

    //Function passed down as a prop to TableRows that allows a user to select a single restaurant
    const selectRestaurant = (singleRes) => {
        getSelectedRestaurant(singleRes)
    }

    //Function passed down as a prop to the SearchBar that allows User's to reset their search filters
    const resetFilter = () => {
        fetchData();
    }

    //Mounts fetch data to the component, I use an array at the end of the argument so that it prevents and infinite loop
    useEffect(() => {
        fetchData();
    }, []);

    //Retains index of first and last items
    const indexOfLastItem = currentRows * itemsInTable;
    const indexOfFirstItem = indexOfLastItem - itemsInTable;

    const tablePage = [];

    //Slices restaurant array and pushes it to a new array
    const currentRestaurants = restaurant.slice(indexOfFirstItem, indexOfLastItem);
        for(let i = 1; i <= Math.ceil(restaurant.length/ itemsInTable); i++){
            tablePage.push(i)
    }

    //Renders pagination and sets the className depending on if the currently selected page number matches the TablePages array
    const renderPagination = (tablePage.length ? tablePage.map(number => {

        const className = number === currentRows ? "active item" : "item";
            return(
                <a className={className}
                    style={{display: 'inline-block'}}
                    key={number}
                    id={number}
                    onClick={handlePageCount}
                >
                    {number}
                </a>   
        )
    }) : tablePage.length === 0)

    const display = !restaurant.length ? 'none' : 'inline-block'
    //Checks is restaurants are empty and then maps the array of objects to a table
    return(
        <div className="ui container" style={{height:"100vh"}}>
            <SearchBar onSubmitString={filterRestaurants} resetFilter={resetFilter} restaurant={restaurant}/>
            <div>
                <div>   
                    <div className="ui pagination menu" style={{ display: display}}>
                        {renderPagination}
                    </div>
                    <div style={{float:"right",display:"inline-block"}}>
                        {restaurant.length > 1 || restaurant.length === 0 ? 
                            <div>{restaurant.length} Results</div> : 
                            <div>{restaurant.length} Result</div>
                        } 
                    </div>
                </div>
                <TableRows currentRestaurants={currentRestaurants} 
                            restaurant={restaurant} 
                            selectedRestaurant={selectedRestaurant} 
                            selectRestaurant={selectRestaurant}
                />
                <div className="ui pagination menu" style={{display: display}} >
                    {renderPagination}
                </div>
            </div>
        </div>
    )
}

export default App;