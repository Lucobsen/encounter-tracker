import {
  AppBar,
  Box,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";

export const EncountersNavBar = () => {
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
            backgroundColor: palette.background.paper,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <BookIcon />
            <Typography variant="h5">Combat Chronicle</Typography>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
