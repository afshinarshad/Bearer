import React,{useRef, useState} from "react";
import getGoogleMapsApiClient from '../../services/googleCloud';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function LocationInput({ value, onChange, onLocationSelected, placeholder }) {
  const [suggestions, setSuggestions] = useState([]);
  const [placeDetail, setPlaceDetail] = useState();

  // let's add a timeout ref here, so we can debounce the calls
  const timeoutRef = useRef();

  // session token is a string to group autocomplete service requests with get place detail requests
  // it's for billing purposes. See the docs: https://developers.google.com/maps/documentation/places/web-service/session-tokens
  const sessionTokenRef = useRef();

  const loadSuggestions = async (inputValue) => {
    clearTimeout(timeoutRef.current);

    // don't load suggestions if not enough characters
    if (!inputValue || inputValue.trim().length <= 3) {
      setSuggestions([]);
      return;
    }

    // debounce the loading of suggestions to reduce usage of the Google API
    timeoutRef.current = setTimeout(async () => {
      const google = await getGoogleMapsApiClient();
      if (!sessionTokenRef.current) {
        sessionTokenRef.current =
          new google.maps.places.AutocompleteSessionToken();
      }

      // @see https://developers.google.com/maps/documentation/javascript/place-autocomplete
      new google.maps.places.AutocompleteService().getPlacePredictions(
        {
          input: inputValue,
          sessionToken: sessionTokenRef.current,
        },
        (predictions, status) => {
          // when the status is 'ZERO_RESULTS', we treat it as if there are 0 suggestions, no error
          // you could change this behavior if you require users to pick a suggestion
          if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            setSuggestions([]);
            return;
          }
          if (
            status !== google.maps.places.PlacesServiceStatus.OK ||
            !predictions
          ) {
            // if you allow your users to enter arbitrary locations that aren't autocompleted,
            // then you can fail silently here and track the error (with Sentry for example)
            return;
          }
          setSuggestions(predictions);
        }
      );
    }, 350);
  };

  const handleSuggestionSelected = async (suggestion) => {
    // update the text in the input to the full selected suggestion text
    onChange(suggestion.description);

    // clear suggestion list
    setSuggestions([]);

    const google = await getGoogleMapsApiClient();

    // Clear the session token, it can only be used in one request
    const sessionToken = sessionTokenRef.current;
    sessionTokenRef.current = undefined;

    // @see https://developers.google.com/maps/documentation/javascript/places
    new google.maps.places.PlacesService(
      // this is the node to populate attribution details on
      document.getElementById("googlemaps-attribution-container")
    ).getDetails(
      {
        placeId: suggestion.place_id,
        fields: [
          // you can pick the fields you want for your application
          // @see https://developers.google.com/maps/documentation/javascript/place-data-fields
          "formatted_address",
          "name",
          "geometry.location",
          "place_id",
        ],
        // pass the session token so all autocomplete requests are counted as part of this places request
        sessionToken,
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // set the place detail in this state component
          // you can use this info to show the detail in the UI, or maybe a checkmark
          setPlaceDetail(place);

          // notify up the tree that a location is selected
          onLocationSelected(place);
        } else {
          // silently fail here and track it with an error tracker like Sentry
          // or fail loudly if users are required to use a suggestion from the list
        }
      }
    );
  };

  // the JSX implementation will vary depending on which UI lib you're using
  return (
    <>
      <input
       id="autocomplete"
      placeholder={placeholder}
        value={value}
        onChange={(event) => {
          const newValue = event.target.value;

          // update controlled input value
          onChange(newValue);

          // clear any previously loaded place details
          setPlaceDetail(undefined);

          // trigger the load of suggestions
          loadSuggestions(newValue);
        }}
      />
        <ul>
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.place_id}
            onClick={() => handleSuggestionSelected(suggestion)}
          >
            {suggestion.description}
          </li>
        ))}
      </ul>
      {/* <Autocomplete
        suggestions={suggestions}
        onSuggestionSelected={handleSuggestionSelected}
        disablePortal
        id="combo-box-demo"
        options={suggestions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Address" />}
      /> */}
      <div id="googlemaps-attribution-container"></div>
    </>
  );
}

export default LocationInput ;