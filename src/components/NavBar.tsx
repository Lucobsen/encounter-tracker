import { Divider, Stack, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface INavBar {
  round: number;
}

export const NavBar = ({ round }: INavBar) => {
  const { palette } = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          color: palette.text.primary,
          borderBottom: `2px solid ${
            palette.mode === "light" ? "#000" : "#fff"
          }`,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            backgroundColor: palette.mode === "light" ? "#fff" : "#121212",
          }}
        >
          <Typography variant="h5">Combat Chronicle</Typography>
          <Divider
            orientation="vertical"
            sx={{
              height: "40px",
              borderColor: palette.mode === "light" ? "#000" : "#fff",
            }}
          />
          <Typography color={palette.error.main} variant="body1">
            Round {round}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
