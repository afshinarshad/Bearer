

import React, { useContext } from "react";
import { DirectionsRenderer } from "@react-google-maps/api";
import { AppContext } from "../../context/AppContext";

function RouteArc() {
  const { originData, destinationData } = useContext(AppContext);

  const calculateDirections = (directionsService, directionsRenderer) => {
    const originLatLng = new window.google.maps.LatLng(origin.lat, origin.lng);
    const destinationLatLng = new window.google.maps.LatLng(destination.lat, destination.lng);

    const request = {
      origin: originLatLng,
      destination: destinationLatLng,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (response, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(response);
      }
    });
  };

  return (
    <DirectionsRenderer
      options={{
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
        },
      }}
      directions={origin && destination ? { routes: [] } : null}
      onLoad={(directionsRenderer) => {
        const directionsService = new window.google.maps.DirectionsService();
        calculateDirections(directionsService, directionsRenderer);
      }}
    />
  );
}

export default RouteArc;