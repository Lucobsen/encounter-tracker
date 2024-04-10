import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="success">
        <Toolbar>
          <Typography variant="h5">TTRPG Combat Tracker</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
