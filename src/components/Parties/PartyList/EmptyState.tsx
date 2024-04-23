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
  onCreate: (newPartyName: string) => void;
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
          No parties found
        </Typography>
        <Button
          variant="contained"
          color="info"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add party
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
              placeholder="Enter party name"
              defaultValue=""
              label="Party Name"
              onChange={({ target }) => setNewNameValue(target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              color="success"
              onClick={() => {
                onCreate(newNameValue);
                setIsAddModalOpen(false);
              }}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
