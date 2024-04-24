import { Box, Button, Modal, Stack, TextField, useTheme } from "@mui/material";
import { useState } from "react";

interface INamingModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeholder: string;
  label: string;
  onCreate: (newName: string) => void;
}

export const NamingModal = ({
  isOpen,
  onClose,
  placeholder,
  label,
  onCreate,
}: INamingModalProps) => {
  const { palette } = useTheme();
  const [newNameValue, setNewNameValue] = useState("");

  return (
    <Modal open={isOpen} onClose={onClose}>
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
            placeholder={placeholder}
            defaultValue=""
            label={label}
            onChange={({ target }) => setNewNameValue(target.value)}
          />

          <Button
            disabled={newNameValue === ""}
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
  );
};
