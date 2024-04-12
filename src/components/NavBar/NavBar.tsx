import { Button, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TextModal } from "../Modals/TextModal";
import { useState } from "react";

interface INavBar {
  round: number;
  hasCreatures: boolean;
  onReset: () => void;
}

export const NavBar = ({ round, hasCreatures, onReset }: INavBar) => {
  const { palette } = useTheme();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

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
            {hasCreatures && (
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => setIsResetModalOpen(true)}
              >
                Round {round}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <TextModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={() => {
          onReset();
          setIsResetModalOpen(false);
        }}
        content="Do you wish to reset this encounter?"
      />
    </>
  );
};
