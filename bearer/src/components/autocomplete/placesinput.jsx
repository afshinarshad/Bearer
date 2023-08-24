import React, { useRef } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { ref } from "firebase/storage";


const libraries = ["places"];

const PlacesInput = (props) => {
  const inputRef = useRef();


  const handlePlaceChange = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_addres);
      console.log(place.geometry.location.let());
      console.log(place.geometry.location.lng());
    }
  };

  return (
    // <LoadScript
    //   googleMapsApiKey="AIzaSyAIFDAL0i0bMpGe8DIaP8xCBtoqNMyg718"
    //   libraries={libraries}
    // >
      <StandaloneSearchBox
        onLoad={ref => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChange}
      >
        <input
        id="autocomplete"
          type="text"
          className="form-control"
          placseholder={props.placseholder}
        />
      </StandaloneSearchBox>
    // </LoadScript>
  );
};
export default PlacesInput;
