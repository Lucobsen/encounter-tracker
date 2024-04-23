import {
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { IHero, getParties } from "../../../api/parties";
import { useState } from "react";

interface IEmptyStateProps {
  onImport: (heroes: IHero[]) => void;
}

export const EmptyState = ({ onImport }: IEmptyStateProps) => {
  const { palette } = useTheme();
  const parties = getParties();
  const [isPartyModalOpen, setIsPartyModalOpen] = useState(false);

  const partiesWithHeros = parties.filter(({ heroes }) => heroes.length > 0);

  const handleOnImport = (heroes: IHero[]) => {
    onImport(heroes);
    setIsPartyModalOpen(false);
  };

  return (
    <>
      <Stack
        position="absolute"
        left="50%"
        top="40%"
        justifyContent="center"
        width="80%"
        spacing={1}
        sx={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          textAlign="center"
          variant="h6"
          alignSelf="center"
          color={palette.text.primary}
        >
          Add creatures below to populate your encounter.
        </Typography>
        <Typography
          textAlign="center"
          variant="h6"
          alignSelf="center"
          color={palette.text.primary}
        >
          Creatures with HP will be tracked as ENEMIES!
        </Typography>

        {partiesWithHeros.length > 0 && (
          <Stack alignItems="center">
            <Divider
              orientation="horizontal"
              color={palette.divider}
              sx={{ my: 2, width: "100%" }}
            />
            <Typography
              textAlign="center"
              variant="h6"
              alignSelf="center"
              color={palette.text.primary}
            >
              You can also
            </Typography>

            <Button
              size="small"
              variant="contained"
              color="success"
              sx={{ width: "fit-content" }}
              onClick={() => setIsPartyModalOpen(true)}
            >
              <b>IMPORT</b>
            </Button>

            <Typography
              textAlign="center"
              variant="h6"
              alignSelf="center"
              color={palette.text.primary}
            >
              a party to quickly populate your encounter.
            </Typography>
          </Stack>
        )}
      </Stack>

      <Modal open={isPartyModalOpen} onClose={() => setIsPartyModalOpen(false)}>
        <Box
          width="80%"
          p={2}
          borderRadius={2}
          sx={{
            bgcolor: palette.background.default,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Stack alignItems="center" spacing={1}>
            <Typography
              sx={{ textDecoration: "underline" }}
              color={palette.text.primary}
            >
              Select Party to Import
            </Typography>
            {partiesWithHeros.map(({ name, heroes }, index) => (
              <Button
                key={`party-${name}-${index}`}
                variant="text"
                color="info"
                onClick={() => handleOnImport(heroes)}
              >
                {name}
              </Button>
            ))}
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
