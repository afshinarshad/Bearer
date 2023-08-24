import React, { useContext } from "react";
import { Marker } from "@react-google-maps/api";
import { AppContext } from "../context/AppContext";


function PinMarker() {
  const { originData, destinationData } = useContext(AppContext);

  return (
    <>
      {originData && (
        <Marker
          position={origin}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      )}
      {destinationData && (
        <Marker
          position={destination}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
          }}
        />
      )}
    </>
  );
}

export default PinMarker;
