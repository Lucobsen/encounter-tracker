import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useMemo } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EncountersPage } from "./pages/EncountersPage";
import { CreaturesPage } from "./pages/CreaturesPage";

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
        <BrowserRouter>
          <Routes>
            <Route element={<CreaturesPage />} path=":id" />
            <Route element={<EncountersPage />} path="" />
          </Routes>
        </BrowserRouter>
        <Analytics />
        <SpeedInsights />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
