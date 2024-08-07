import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useMemo } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EncountersPage } from "./pages/EncountersPage";
import { CreaturesPage } from "./pages/CreaturesPage";
import { PartyPage } from "./pages/PartyPage";
import { PartyContextProvider } from "./utils/PartyContext";
import { EncounterContextProvider } from "./utils/EncounterContext";

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
      <PartyContextProvider>
        <EncounterContextProvider>
          <SnackbarProvider maxSnack={2} autoHideDuration={3000}>
            <BrowserRouter>
              <Routes>
                <Route element={<EncountersPage />} path="" />
                <Route element={<CreaturesPage />} path=":id" />
                <Route element={<PartyPage />} path="parties" />
              </Routes>
            </BrowserRouter>
            <Analytics />
            <SpeedInsights />
          </SnackbarProvider>
        </EncounterContextProvider>
      </PartyContextProvider>
    </ThemeProvider>
  );
};

export default App;
