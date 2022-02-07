import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionPart = (props) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{props.item.label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.item.label}
        <br/>
        {props.item.value}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionPart;
