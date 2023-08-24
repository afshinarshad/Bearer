import React, { useState, useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Origin from "../origin/origin.jsx";
import Destination from "../destination/destination.jsx";
import Parcel from "../parcels type/parcel.jsx";
import Transport from "../transport options/transport.jsx";
import "./tabs.css";

function Tabs() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const handleChange = (index) => {
    setExpandedIndex(index);
  };

  const handleOriginChooseClick = () => {
    handleChange(1); // Move to the Destination tab (index 1)
  };

  const handleDestinationChooseButton = () => {
    handleChange(2); // Move to the Parcel's Type tab (index 2)
  };

  const handleConfirmParcelClick = () => {
    handleChange(3); // Move to the Transport Options tab (index 3)
  };

  return (
    <div className="tabs-container">
      <Accordion
        expanded={expandedIndex === 0}
        onChange={() => handleChange(0)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Origin</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Origin onConfirm={handleOriginChooseClick} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedIndex === 1}
        onChange={() => handleChange(1)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Destination</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Destination onConfirm={handleDestinationChooseButton} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedIndex === 2}
        onChange={() => handleChange(2)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Parcel's Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Parcel onConfirm={handleConfirmParcelClick} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedIndex === 3}
        onChange={() => handleChange(3)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography>Transport Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Transport />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Tabs;
