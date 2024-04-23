import { Button, Link, Stack, Typography, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { TextModal } from "../../shared/Modals/TextModal";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface INavBar {
  round: number;
  hasCreatures: boolean;
  onReset: () => void;
  encounterName: string;
}

export const NavBar = ({
  encounterName,
  round,
  hasCreatures,
  onReset,
}: INavBar) => {
  const { palette } = useTheme();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  return (
    <>
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
              <Typography
                variant="h5"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {encounterName}
              </Typography>
            </Stack>

            {hasCreatures && (
              <Button
                sx={{ maxHeight: 32, whiteSpace: "nowrap", minWidth: 82 }}
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
