import React, { useContext, useEffect, useMemo, useState, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
// import PinMarker from "./pinMarker";
// import RouteArc from './routeArc'

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { AppContext } from "../../context/AppContext";
import "./map.css";

const containerStyle = {
  width: "190vh",
  height: "100vh", // Use "100vh" for full viewport height
};

const libraries = ["places"];

function AppMap(props) {
  const [map, setMap] = useState(null);
  // <LoadScript
  // googleMapsApiKey= "AIzaSyAIFDAL0i0bMpGe8DIaP8xCBtoqNMyg718"
  // libraries={["places"]}/>

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "AIzaSyAIFDAL0i0bMpGe8DIaP8xCBtoqNMyg718",
  //   libraries
  // });

  // if (!isLoaded) return <div>loading</div>;
  return <Map />;
}

function Map() {
  const { originData, destinationData } = useContext(AppContext);
  //coordinate of melbourne
  const center = useMemo(() => ({ lat: -37.840935, lng: 144.946457 }), []);
  return (
    <main className="map-container">
      <GoogleMap
        style={{ width: "100%", height: "100%" }}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        {originData.lat && originData.lng && (
          <Marker position={originData.origin} label="Origin" />
        )}
        {destinationData.lat && destinationData.lng && (
          <Marker position={destinationData.destination} label="Destination" />
        )}
      </GoogleMap>
    </main>
  );
}

export default AppMap;

// Map.js

// import React, { useRef, useEffect, useContext } from "react";
// import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
// import { AppContext } from "../../context/AppContext";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// function Map() {
//   const { originData, destinationData } = useContext(AppContext);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (originData && destinationData) {
//       calculateDirections();
//     }
//   }, [originData, destinationData]);

//   const calculateDirections = () => {
//     const directionsService = new window.google.maps.DirectionsService();
//     const directionsRenderer = new window.google.maps.DirectionsRenderer({
//       suppressMarkers: true,
//     });

//     directionsRenderer.setMap(mapRef.current);

//     const originLatLng = new window.google.maps.LatLng(
//       originData.lat,
//       originData.lng
//     );
//     const destinationLatLng = new window.google.maps.LatLng(
//       destinationData.lat,
//       destinationData.lng
//     );

//     const request = {
//       origin: originLatLng,
//       destination: destinationLatLng,
//       travelMode: window.google.maps.TravelMode.DRIVING,
//     };

//     directionsService.route(request, (response, status) => {
//       if (status === window.google.maps.DirectionsStatus.OK) {
//         directionsRenderer.setDirections(response);
//       }
//     });
//   };

//   return (
//     <GoogleMap mapContainerStyle={containerStyle} center={origin} zoom={10} ref={mapRef}>
//       {originData && <Marker position={originData} />}
//       {destinationData && <Marker position={destinationData} />}
//     </GoogleMap>
//   );
// }

// export default Map;
