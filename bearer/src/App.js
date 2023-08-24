import React, { useContext } from "react";
import { AppContext } from "./context/AppContext.jsx";
import AppMap from "./components/map/map.jsx";
import Tabs from "./components/tabs/tabs.jsx";
import './App.css'

function App() {
  // const { originData, setOrifinData,
  //     destinationData, setDestinationData,
  //     parcelData, setParcelData,
  //     transportData, setTransportData,
  //      handleDestinationChange, handleOriginChange } =
  //   useContext(AppContext);

  return (
    <main className="app-container">
      <article className="tabs">
        <Tabs />
      </article>
      <div className="map">
        <AppMap />
      </div>
     
    </main>
  );
}

export default App;
