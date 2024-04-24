import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

interface IEmptyStateProps {
  onCreate: (newEncounterName: string) => void;
}

export const EmptyState = ({ onCreate }: IEmptyStateProps) => {
  const { palette } = useTheme();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newNameValue, setNewNameValue] = useState("");

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

      <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <Box
          width="80%"
          p={2}
          borderRadius={2}
          bgcolor={palette.background.default}
          position="absolute"
          left="50%"
          top="50%"
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Stack spacing={2}>
            <TextField
              placeholder="Enter encounter name"
              defaultValue=""
              label="Encounter Name"
              onChange={({ target }) => setNewNameValue(target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              color="success"
              sx={{ fontWeight: "bold" }}
              onClick={() => onCreate(newNameValue)}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
