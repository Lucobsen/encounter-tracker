import { AppBar, Box, Toolbar, Typography, useTheme } from "@mui/material";
import { EncounterList } from "../components/EncounterList/EncounterList";
import { DesktopWarning } from "../components/DesktopWarning/DesktopWarning";
import { useIsMobile } from "../hooks/is-mobile.hook";

export const EncounterListPage = () => {
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
              justifyContent: "space-between",
              backgroundColor: palette.background.paper,
            }}
          >
            <Typography variant="h5">Combat Chronicle</Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <EncounterList />
    </>
  );
};
