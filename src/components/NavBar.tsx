import { useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface INavBar {
  round: number;
  hasCreatures: boolean;
}

export const NavBar = ({ round, hasCreatures }: INavBar) => {
  const { palette } = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          color: palette.text.primary,
          borderBottom: `1px solid ${palette.text.primary}`,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            backgroundColor: palette.background.paper,
          }}
        >
          <Typography variant="h5">Combat Chronicle</Typography>
          {hasCreatures && (
            <Typography color={palette.error.main} variant="body1">
              Round {round}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
