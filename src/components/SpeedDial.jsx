import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const actions = [
  { icon: <LogoutIcon />, name: 'Log Out', funct:"Log Out"},
  { icon: <AddIcon />, name: 'Add Book', funct:"Add Book" },
  { icon: <DeleteIcon />, name: 'Delete Book',funct:"Delete Book" },
  { icon: <EditIcon />, name: 'Edit Book Info',funct: "Edit Book Info" },
];


export default function BasicSpeedDial(props) {

  const functionHandler = (value) => {
    switch (value) {
      case "Log Out":
        props.logOut()
        break
      case "Add Book":
        props.openBookModal()
        break
      case "Delete Book":
        props.setDeletion()
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
        icon={<SpeedDialIcon /* sx={{":hover":{color:"white"}}} *//>}
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
