import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useMemo } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Page } from "./pages/page";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const mainTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={mainTheme}>
      <SnackbarProvider maxSnack={2} autoHideDuration={3000}>
        <Page />
        <Analytics />
        <SpeedInsights />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
