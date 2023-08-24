import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import bike from '../../asset/bike.png'
import motor from '../../asset/motor.png'
import walk2 from '../../asset/walk2.png'
import { appFirebase } from "../../firebase/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import './transport.css'

const Transport = (props) => {
  const [vehicleType, setVehicleType] = useState(null);
  const [price, setPrice] = useState(null);
  const [time, setTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { parcelData, transportData, setTransportData } = useContext(AppContext);

  const functions = getFunctions(appFirebase);
  const pricing = httpsCallable(functions, "pricing");

console.log(parcelData)

  useEffect(() => {
    if (vehicleType) {
      // Prepare the data body for the pricing function
      const transportData = {
        origin: {
          lat: "",
          lng: "",
        },
        destination: {
          lat: "",
          lng: "",
        },
        vehicle_type: {
          [vehicleType]: true,
        },
        parcel_type: transportData.parcel_type,
        parcel_description: transportData.parcel_description,
        parcel_min_weight: transportData.parcel_min_weight,
        parcel_max_weight: transportData.parcel_max_weight,
      };


      // Make a POST request to the pricing function
      pricing(transportData)
        .then((result) => {
          // Read result of the Cloud Function
          const priceData = result.data;
          console.log(priceData)

          if (priceData.status === "success") {
            // Extract the price and time for the selected vehicle type
            const selectedPrice = priceData[vehicleType].price;
            const selectedTime = priceData[vehicleType].time;

            // Update the state variables with the selected price and time
            setPrice(selectedPrice);
            setTime(selectedTime);
          } else if (priceData.status === "error") {
            // Handle error response from the pricing function
            setErrorMessage(priceData.message);
          }
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error("Error occurred during pricing request", error);
        });
    }
  }, [vehicleType]);



  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Perform any necessary validation before proceeding
    if (!vehicleType) {
      setErrorMessage("Please select a vehicle type.");
      return;
    }
  
    // Save the selected vehicle type in the context or state, if needed
    if (setTransportData) {
      setTransportData((prevTransportData) => ({
        ...prevTransportData,
        vehicleType,
      }));
    }
  
    // Proceed to the next step or perform any other desired action
    // (e.g., navigate to the next component)
  };


  return (
    <main>
      <form onSubmit={handleFormSubmit}>
        <div className="transport-container">
         
          <article
            className={`transport-option ${
              vehicleType === "driving" ? "selected" : ""
            }`}
            onClick={() => setVehicleType("driving")}
          >
            <img src={motor} alt="" />
            {price && time && (
              <div>
                <p>Estimated Price: {price}</p>
                <p>Estimated Time: {time}</p>
              </div>
            )}
          </article>
          <article
            className={`transport-option ${
              vehicleType === "cycling" ? "selected" : ""
            }`}
            onClick={() => setVehicleType("cycling")}
          >
            <img src={bike} alt="" />
            {price && time && (
              <div>
                <p>Estimated Price: {price}</p>
                <p>Estimated Time: {time}</p>
              </div>
            )}
          </article>
          <article
            className={`transport-option ${
              vehicleType === "walking" ? "selected" : ""
            }`}
            onClick={() => setVehicleType("walking")}
          >
           <img src={walk2} alt="" />
            {price && time && (
              <div>
                <p>Estimated Price: {price}</p>
                <p>Estimated Time: {time}</p>
              </div>
            )}
          </article>

        </div>
        <button type="submit">Confirm</button>
      </form>
  
      {errorMessage && <p>Error: {errorMessage}</p>}
    </main>
  );
};

export default Transport;