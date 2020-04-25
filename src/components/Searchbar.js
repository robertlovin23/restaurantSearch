import React, { useState } from 'react'

const Searchbar = (props) => {
    const [queryString,setQueryString] = useState('')
    const [stateFilter, setStateFilter] = useState('')
    const [genreFilter, setGenreFilter] = useState('')
    const { restaurant } = props


    const handleQueryChange = (event) => {
        setQueryString(event.target.value)
    }

    const handleStatesChange = (event) => {
        setStateFilter(event.target.value)
    }

    const handleGenresChange = (event) => {
        setGenreFilter(event.target.value)
    }

    const onSubmitString = (event) => {
        event.preventDefault();
        props.onSubmitString(
            queryString,
            stateFilter,
            genreFilter
        )
    }

    const resetFilters = () => {
        setQueryString('')
        setStateFilter('')
        setGenreFilter('')
    }

    const genres = [];

    restaurant.forEach(name => {
        name.genre.split(',').filter(a => {
            return genres.push(a)
        })
    });

    const filteredSet = new Set(genres)
    const filteredArray = [...filteredSet]


    return(
        <form className="ui form segment">
            <div className="field">
                <label>Search for Restaurants by Name/City/Genre</label>
                <input onChange={handleQueryChange} value={queryString} name="text-search"/>
                    <select className="ui search selection dropdown" name="state-search" onChange={handleStatesChange} value={stateFilter}>
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
                    <select className="ui search selection dropdown" name="genre-search" onChange={handleGenresChange} value={genreFilter}>
                        <option value="">All</option>
                        {filteredArray.map(genres => {
                           return <option key={genres} value={genres}>{genres}</option>
                        })}
                    </select>
                <div className="ui button primary" type="submit" onClick={(e) => onSubmitString(e)}>Submit</div>
                <div className="ui button clear" onClick={() => resetFilters}>Reset</div>
            </div>
        </form>
    )
}

export default Searchbar