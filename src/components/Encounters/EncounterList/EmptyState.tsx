import { Button, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { NamingModal } from "../../shared/Modals/NamingModal";

interface IEmptyStateProps {
  onCreate: (newEncounterName: string) => void;
}

export const EmptyState = ({ onCreate }: IEmptyStateProps) => {
  const { palette } = useTheme();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <Stack
        position="absolute"
        left="50%"
        top="30%"
        justifyContent="center"
        width="60%"
        spacing={2}
        sx={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          variant="h6"
          alignSelf="center"
          textAlign="center"
          color={palette.text.primary}
        >
          Nat 1, no encounters found!
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{ fontWeight: "bold" }}
          onClick={() => setIsAddModalOpen(true)}
        >
          Create new encounter
        </Button>
      </Stack>

      <NamingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        placeholder="Enter encounter name"
        label="Encounter Name"
        onCreate={(newName) => onCreate(newName)}
      />
    </>
  );
};
