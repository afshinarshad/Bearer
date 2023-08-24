// import React, { useState, useEffect, useContext } from "react";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import AppMap from '../map/map';
// import { AppContext } from "../../context/AppContext";

// const Destination = () => {
//   const { destinationData, setDestinationData } = useContext(AppContext);
//   const [address, setAddress] = useState("");
//   const [details, setDetails] = useState("");
//   const [phone, setPhone] = useState("");
//   const [name, setName] = useState("");
//   const [destination, setDestination] = useState({ lat: null, lng: null });

//   const handleSelect = async (selectedAddress) => {
//     try {
//       const results = await getGeocode(selectedAddress);
//       const latLng = await getLatLng(results[0]);
//       const { lat, lng } = latLng;
//       setDestination({ lat, lng });
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setAddress(e.target.value);
//   };

//   const handleDetailsChange = (e) => {
//     setDetails(e.target.value);
//   };

//   const handlePhoneChange = (e) => {
//     setPhone(e.target.value);
//   };

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   useEffect(() => {
//     setDestinationData({
//       address,
//       details,
//       phone,
//       name,
//       destination,
//     });

//     return () => {
//       // Cleanup function when the component is unmounted
//       // You can cancel any ongoing asynchronous operations here if needed
//     };
//   }, [address, details, phone, name, destination, setDestinationData]);

//   const {
//     ready,
//     value,
//     suggestions: { data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const handleInputChange = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSelectSuggestion = ({ description }) => {
//     setAddress(description);
//     setValue(description, false);
//     clearSuggestions();
//   };

//   return (
//     <div>
//       <div>
//         <label htmlFor="address">Address</label>
//         <input
//           type="text"
//           id="address"
//           value={value}
//           onChange={handleInputChange}
//           placeholder="Enter destination address"
//         />
//         {data.length > 0 && (
//           <ul>
//             {data.map((suggestion, index) => (
//               <li
//                 key={index}
//                 onClick={() => handleSelectSuggestion(suggestion)}
//               >
//                 {suggestion.description}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <div>
//         <label htmlFor="details">Details</label>
//         <input
//           type="text"
//           id="details"
//           value={details}
//           onChange={handleDetailsChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="phone">Phone</label>
//         <input
//           type="text"
//           id="phone"
//           value={phone}
//           onChange={handlePhoneChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="name">Name</label>
//         <input type="text" id="name" value={name} onChange={handleNameChange} />
//       </div>
//       <div>
//         Delivery Approval by:
//         <input type="radio" value="SMS Confirmation" name="Delivery" /> SMS Confirmation
//         <input type="radio" value="Recipient's Signature" name="Delivery" /> Recipient's Signature
//       </div>
//       <button onClick={() => setDestinationData(destinationData)}>Choose from Favourites</button>
//       <button onClick={() => setDestinationData(destinationData)}>Destination Choose</button>
//     </div>
//   );
// };

// export default Destination;

//TODO: YOU CAN ALSO UNCOMMENT ABOVE CODE AND COMMENT BELOW (DO IT ON ORIGIN COMPONENT TOO!)


import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
// import AddressInput from "../autocomplete/addressInput";
// import LocationInput from "../autocomplete/locationInput";
import PlacesInput from "../autocomplete/placesinput";
import "./destination.css";
const Destination = (props) => {
  const { setDestinationData, calculateRoute } = useContext(AppContext);
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDestinationChange = (event) => {
    const destination = event.target.value;
    setDestinationData(destination);
  };

  const handleButtonClick = () => {
    calculateRoute();
  };

  const handleDestinationChooseButton= () => {
    props.onConfirm();
  };


  return (
    <main className="destination-container">
      <article className="address&deatails">
        {
        //TODO: uncomment addressinput import and this class then comment two other
        // classes
        /* <AddressInput
        onSelectAddress={setDestinationData}
        label="Destination"
        placeholder="Destination"
      /> */}
        {
        //TODO: uncomment LocationInput import and this class then comment two other
        // classes
        /* <LocationInput
        onChange={setDestinationData}
        label="Destination"
        placeholder="Destination"
      /> */}
        <PlacesInput
      //NOTICE: only one component from autocomplete folder can be active at the same time.
          onChange={setDestinationData}
          label="destination"
          placeholder="Destination"
        />
        <input
          type="text"
          id="details"
          value={details}
          onChange={handleDetailsChange}
          placeholder="details"
        />
      </article>
      <section className="phone&name">
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="phone"
        />
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="name"
        />
      </section>

      <section className="delivery">
        <p id="del">Delivery Approval by: </p>

        <label htmlFor="sms">
          <input
            id="sms"
            type="radio"
            value="SMS Confirmation"
            name="Delivery"
          />
          <p id="sms">
            SMS Confirmation
          </p>
          
        </label>

        <label htmlFor="sing">
          <input type="radio" value="Recipient's Signature" name="Delivery" />
         <p id="del"> Recipient's Signature </p> 
        </label>
      </section>
      <footer className="sign">
        <button onSelect={setDestinationData} >Choose from Favourites</button>
        <button onSelect={setDestinationData}onClick={handleDestinationChooseButton}>Destination Choose</button>
      </footer>
    </main>
  );
};

export default Destination;
