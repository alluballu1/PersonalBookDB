import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';


const actions = [
  { icon: <FileCopyIcon />, name: 'Log Out', funct:"Log Out"},
  { icon: <SaveIcon />, name: 'Save', funct:"Save" },
  { icon: <PrintIcon />, name: 'Print',funct:"Print" },
  { icon: <ShareIcon />, name: 'Share',funct: "Share" },
];


export default function BasicSpeedDial(props) {

  const functionHandler = (value) => {
    switch (value) {
      case "Log Out":
        props.logOut()
        console.log(value)
        break
      default:
        return
    }
  }
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1, position:"fixed", bottom:0, right:0 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16}}
        icon={<SpeedDialIcon />}
        FabProps={{
            sx: {
              backgroundColor: "black",
              ":hover": { backgroundColor: "white", color:"black" },
            },
          }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            
            onClick={() => functionHandler(action.funct)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
