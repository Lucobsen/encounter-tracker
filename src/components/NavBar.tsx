import { useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const NavBar = () => {
  const { palette } = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{
          color: palette.mode === "light" ? "#000" : "#fff",
          borderBottom: `2px solid ${
            palette.mode === "light" ? "#000" : "#fff"
          }`,
        }}
      >
        <Toolbar>
          <Typography variant="h5">TTRPG Combat Tracker</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
