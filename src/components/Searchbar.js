import React, { useState } from 'react'

const Searchbar = (props) => {
    const [values,setValues] = useState({query: '', genre:'', state:'',attire:''})

    const { restaurant } = props

    const handleValueChange = (event) => {
        const {name,value} = event.target
        setValues({...values, [name]: value})
    }

    const onSubmitString = (event) => {
        event.preventDefault();
        props.onSubmitString(
            values.query,
            values.state,
            values.genre,
            values.attire
        )
    }

    const resetFilter = (event) => {
        event.preventDefault();
        setValues({query: '', genre:'', state:'',attire:''})
        props.resetFilter();            
        onSubmitString(event);

    }

    const capitalizeAttire = (str) => {
        var splitAttireStr = str.toLowerCase().split(' ')
        for(var i = 0; i < splitAttireStr.length; i++){
            splitAttireStr[i]  = splitAttireStr[i].charAt(0).toUpperCase() + splitAttireStr[i].substring(1);
        }
        return splitAttireStr.join(' ');
   }


    const genres = [];
    const dressCode = [];

    restaurant.forEach(restGenre => {
        restGenre.genre.split(',').filter(a => {
            return genres.push(a)
        })
    });

    restaurant.forEach(restAttire => {
        const capString = capitalizeAttire(restAttire.attire)
        capString.split(',').filter(a => {
            return dressCode.push(a)
        })
    });

    const filteredGenre = new Set(genres)
    const filteredGenreArray = [...filteredGenre]

    const filteredAttire = new Set(dressCode)
    const filteredAttireArray = [...filteredAttire]

    return(
        <form className="ui form segment">
            <div className="field">
                <label>Search for Restaurants by Name/City/Genre</label>
                <input onChange={handleValueChange} disabled={restaurant.length <= 1} value={values.query} name="query"/>    
            </div>
            <div className="two fields">
                <div className="field">
                        <label>Filter By</label>
                        <select className="ui search selection dropdown" 
                            disabled={restaurant.length <= 1} 
                            name="state" 
                            onChange={handleValueChange} 
                            value={values.state}
                        >
                            <option value="">All</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </div>
                    <div className="field">
                        <label>Filter By Genre</label>
                        <select className="ui search selection dropdown" 
                            disabled={restaurant.length <= 1} 
                            name="genre" 
                            onChange={handleValueChange} 
                            value={values.genre}
                        >
                            <option value="">All</option>
                                {filteredGenreArray.map(genres => {
                                    return <option key={genres} value={genres}>{genres}</option>
                                })}
                        </select>
                    </div>
                    <div className="field">
                        <label>Filter By Attire</label>
                        <select className="ui search selection dropdown" 
                            disabled={restaurant.length <= 1} 
                            name="attire" 
                            onChange={handleValueChange} 
                            value={values.attire}
                        >
                            <option value="">All</option>
                                {filteredAttireArray.map(attire => {
                                    return <option key={attire} value={attire}>{attire}</option>
                                })}
                        </select>
                    </div>
                </div>
                <button className="ui button primary" disabled={restaurant.length <= 1} type="submit" style={{display:'inline-block'}} onClick={(event) => onSubmitString(event)}>Apply Filters</button>
                <button className="ui button clear" style={{display:'inline-block'}}  onClick={(e) => resetFilter(e)}>Reset All Filters</button>
        </form>
    )
}

export default Searchbar