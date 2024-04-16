import {
  AppBar,
  Box,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { EncounterList } from "../components/EncounterList/EncounterList";
import { DesktopWarning } from "../components/DesktopWarning/DesktopWarning";
import { useIsMobile } from "../hooks/is-mobile.hook";
import BookIcon from "@mui/icons-material/Book";

export const EncountersPage = () => {
  const { palette } = useTheme();
  const isMobile = useIsMobile();

  if (!isMobile) return <DesktopWarning />;

  return (
    <>
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

      <EncounterList />
    </>
  );
};
