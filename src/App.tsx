import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EncountersPage } from "./pages/EncountersPage";
import { CreaturesPage } from "./pages/CreaturesPage";
import { PartyPage } from "./pages/PartyPage";
import { PartyContextProvider } from "./utils/PartyContext";
import { EncounterContextProvider } from "./utils/EncounterContext";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

  const firebaseConfig = {
    apiKey: "AIzaSyD5a2tJLd-yEofQHE_ZRaORMTIn2LicM_M",
    authDomain: "combat-chronicle.firebaseapp.com",
    projectId: "combat-chronicle",
    storageBucket: "combat-chronicle.appspot.com",
    messagingSenderId: "412434927610",
    appId: "1:412434927610:web:aadcc1faf5ae1a0e699e43",
    measurementId: "G-MS3DY19SVX",
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

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
          </SnackbarProvider>
        </EncounterContextProvider>
      </PartyContextProvider>
    </ThemeProvider>
  );
};

export default App;
