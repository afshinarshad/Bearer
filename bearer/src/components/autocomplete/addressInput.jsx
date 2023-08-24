import React, { useContext } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { AppContext } from "../../context/AppContext";

function AddressInput({ onSelectAddress, label, placeholder }) {
  const { setOriginData, setDestinationData } = useContext(AppContext);

  const handleSelect = async (address) => {
    try {
      const results = await getGeocode(address);
      const { lat, lng } = await getLatLng(results[0]);

      if (label === "Origin") {
        setOriginData({ lat, lng });
      } else if (label === "Destination") {
        setDestinationData({ lat, lng });
      }

      onSelectAddress({ lat, lng });
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  const handleChange = (event) => {
    // Handle input change here
  };

  return (
    <>
      <label>{label}</label>
      <input
        id="autocomplete"
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        onSelect={handleSelect}
      />
    </>
  );
}

export default AddressInput;
