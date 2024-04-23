import {
  AppBar,
  Box,
  Link,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const PartyNavBar = () => {
  const { palette } = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: "none",
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
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            overflow="hidden"
          >
            <Link href="/" color={palette.text.primary} underline="none">
              <ArrowBackIosIcon fontSize="small" />
            </Link>
            <Typography variant="h5">Parties</Typography>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
