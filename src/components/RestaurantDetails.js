import React from 'react';
import ReactDOM from 'react-dom';
import keys from '../keys/keys'
import {GoogleApiWrapper, Map, InfoWindow, Marker} from 'google-maps-react'
import apiKeys from '../keys/keys';

const RestaurantDetails = (props) => {
   const { restaurant,closeModal } = props 
   
   const lat = Number(restaurant.lat)
   const lng = Number(restaurant.long)

   console.log(lat,lng)
   const coords = { lat: lat, lng: lng}

   const capitalizeAttire = (str) => {
        var splitAttireStr = str.toLowerCase().split(' ')
        for(var i = 0; i < splitAttireStr.length; i++){
            splitAttireStr[i]  = splitAttireStr[i].charAt(0).toUpperCase() + splitAttireStr[i].substring(1);
        }
        return splitAttireStr.join(' ');
   }

   return ReactDOM.createPortal(
        <div onClick={() => closeModal()} className="ui dimmer modals visible active" style={{position:'fixed',padding:'0', margin:'0',top:'0',left:'0',width:"100%",height:"100%"}}>
            <div onClick={(e) => e.stopPropagation()}className="ui standard modal visible active" style={{paddingBottom:"200px"}}>
                <i className="close icon" onClick={() => closeModal()}></i>
                <div className="header">
                    {restaurant.name}
                </div>
                <div className="description">
                    <div style={{paddingBottom:"10px",paddingLeft:"20px"}}>
                        <div style={{marginTop:"10px"}}>
                            <b style={{display:"inline-block"}}>Address: </b>
                            <p style={{display:"inline-block", paddingLeft:"5px"}}> {restaurant.address1}  {restaurant.city}, {restaurant.state}</p>   
                        </div>
                        <div  style={{marginTop:"10px", display:"inline-block"}}>
                            <b style={{display:"inline-block"}}>Attire: </b>
                            <p style={{display:"inline-block", paddingLeft:"5px"}}> {capitalizeAttire(restaurant.attire)}</p>   
                        </div>
                        <div  style={{marginTop:"10px"}}>
                            <b style={{display:"inline-block"}}>Hours: </b>
                            <p style={{display:"inline-block", paddingLeft:"5px"}}>{restaurant.hours}</p>   
                        </div>
                        <div  style={{marginTop:"10px"}}>
                            <b style={{display:"inline-block"}}>Website: </b>
                            <p style={{display:"inline-block", paddingLeft:"5px"}}>
                                <a href={restaurant.website}> {restaurant.website}</a>
                            </p>   
                        </div>
                    </div>
                    <Map google={props.google} 
                            zoom={14}
                            style={{height:"300px"}}
                            initialCenter={coords}>
                                <Marker
                                    name={restaurant.name}
                                    position={coords} 
                                />
                    </Map>
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
}

export default GoogleApiWrapper({
        apiKey: apiKeys.googleApiKey
})(RestaurantDetails)