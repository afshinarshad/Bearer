import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [originData, setOriginData] = useState({
    address: "",
    details: "",
    phone: "",
    name: "",
    origin: { lat: null, lng: null },
  });

  const [destinationData, setDestinationData] = useState({
    address: "",
    details: "",
    phone: "",
    name: "",
    destination: { lat: null, lng: null },
  });

  const [parcelData, setParcelData] = useState({
    parcel_type: "",
    parcel_description: "",
    parcel_min_weight: "",
    parcel_max_weight: "",
    vehicle_type: {
      walking: "",
      driving: "",
      bicycling: "",
    },
  });

  const [transportData, setTransportData] = useState({
    origin: {
      lat: "",
      lng: "",
    },
    destination: {
      lat: "",
      lng: "",
    },
    vehicle_type: {
      walking: "",
      driving: "",
      cycling: "",
    },
    parcel_type: "",
    parcel_description: "",
    parcel_min_weight: "",
    parcel_max_weight: "",
  });

  const contextValues = {
    originData,
    setOriginData,
    destinationData,
    setDestinationData,
    parcelData,
    setParcelData,
    transportData,
    setTransportData,
    
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
