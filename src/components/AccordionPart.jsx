import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionPart = () => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Accordion 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <table>
          <tbody>
            <tr>
              <th>this</th>
              <th>this</th>
              <th>this</th>
            </tr>
            <tr>
              <td>Pog</td>
              <td>Pog</td>
              <td>Pog</td>
            </tr>
          </tbody>
        </table>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionPart;
