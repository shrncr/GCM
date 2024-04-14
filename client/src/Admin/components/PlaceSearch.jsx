// This sample uses the Places Autocomplete widget to:
// 1. Help the user select a place
// 2. Retrieve the address components associated with that place
// 3. Populate the form fields with those address components.
// This sample requires the Places library, Maps JavaScript API.
// Include the libraries=places parameter when you first load the API.
// For example: <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
import React, { useContext, useState, useEffect, useRef } from "react";
export default function PlaceSearch (props) {
    const address = props.addy
    const address1FieldRef = useRef(null);
    const [latt, setLat] = useState();
    const [long, setLong] = useState();
    const [addy, setAddy] = useState(address)
    useEffect(()=>{
        let Autocomplete = (new window.google.maps.places.Autocomplete(address1FieldRef.current, {
            componentRestrictions: { country: ["us", "ca"] },
            fields: ["address_components", "geometry"],
            types: ["address"],
          }));
          address1FieldRef.current.focus();
          Autocomplete.addListener("place_changed", ()=>{
            let place = Autocomplete.getPlace();
            console.log(place);
            props.latSet(place.geometry.location.lat);
            props.longSet(place.geometry.location.lng);
            let address1 = "";
            for (const component of place.address_components) {
                // @ts-ignore remove once typings fixed
                const componentType = component.types[0];
                
                
                switch (componentType) {
                    case "street_number": {
                      address1 = `${component.long_name} ${address1}`;
                      break;
                    }
            
                    case "route": {
                      address1 += component.short_name;
                      break;
                    }
                }
                
            

          };
          setAddy(address1);
          props.addSet(address1);
          // When the user selects an address from the drop-down, populate the
          // address fields in the form.
          //autocomplete.addListener("place_changed", fillInAddress);
    })},[addy])


return(
    <>
    <input ref={address1FieldRef}
    type="text"
    value={addy}
    onChange={(e) => setAddy(e.target.value)}
    />
    </>
)
}
