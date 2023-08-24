// import React, { useState, useEffect, useContext } from "react";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import AppMap from '../map/map';
// // import useOnclickOutside from "react-cool-onclickoutside";
// import { AppContext } from "../../context/AppContext";
// import "./origin.css";

// const Origin = (props) => {
//   const { originData, setOriginData } = useContext(AppContext);

//   const [address, setAddress] = useState("");
//   const [details, setDetails] = useState("");
//   const [phone, setPhone] = useState("");
//   const [name, setName] = useState("");
//   const [origin, setOrigin] = useState({ lat: null, lng: null });

//   const handleSelect = async (selectedAddress) => {
//     try {
//       const results = await getGeocode(selectedAddress);
//       const latLng = await getLatLng(results[0]);
//       const { lat, lng } = latLng;
//       setOrigin({ lat, lng });
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleChange = (selectedAddress) => {
//     setAddress(selectedAddress);
//   };

//   const handleDetailsChange = (event) => {
//     setDetails(event.target.value);
//   };

//   const handlePhoneChange = (event) => {
//     setPhone(event.target.value);
//   };

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   useEffect(() => {
//     // update context (state managment)
//     setOriginData({
//       address,
//       details,
//       phone,
//       name,
//       origin,
//     });
//     return () => {
//       // Cleanup function when the component is unmounted
//       // You can cancel any ongoing asynchronous operations here if needed
//     };
//   }, [address, details, phone, name, origin, setOriginData]);

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
//     <div className="container">
//       <div>
//         <label htmlFor="address">Address</label>
//         <input
//           type="text"
//           id="address"
//           value={value}
//           onChange={handleInputChange}
//           // disabled={!ready}
//           placeholder=" origin "
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
//       <div className="button-container">
//         <button onClick={setOriginData}>Choose from Favourites</button>
//         <button onClick={setOriginData}>Origin Choose</button>
//       </div>
//     </div>
//   );
// };

// export default Origin;

//TODO: YOU CAN ALSO UNCOMMENT ABOVE CODE AND COMMENT BELOW (DO IT ON DESTINATION COMPONENT TOO!)

import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import AddressInput from "../autocomplete/addressInput";
import LocationInput from "../autocomplete/locationInput";
import PlacesInput from "../autocomplete/placesinput";
import "./origin.css";

const Origin = (props) => {
  const { setOriginData, calculateRoute } = useContext(AppContext);

  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const handleOriginChange = (event) => {
    const origin = event.target.value;
    setOriginData(origin);
  };

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleButtonClick = () => {
    calculateRoute();
  };

  const handleDestinationChooseButton= () => {
    props.onConfirm();
  };


  return (
    <main className="origin-container">
      <article className="address&details">
        {
        //TODO: uncomment addressinput import and this class then comment two
        // other classes.
        /* <AddressInput
        onSelectAddress={setOriginData}
        label="Origin"
        placeholder="Origin"
      /> */}
       
        { //TODO: uncomment LocationInput import and this class then comment two
        // other classes.
        /* <LocationInput
        onChange={setOriginData}
        label="Origin"
        placeholder="Origin"
      /> */}
       
        <PlacesInput
         //NOTICE: only one component from autocomplete folder can be active at
        //  the same time.
          onChange={setOriginData}
          label="Origin"
          placeholder="Origin"
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
          placeholder="name"
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
        />
      </section>

      <footer className="btn">
        <button onSelect={setOriginData}>Choose from Favourites</button>
        <button onSelect={setOriginData} onClick={handleDestinationChooseButton} >Origin Choose</button>
      </footer>
    </main>
  );
};

export default Origin;
