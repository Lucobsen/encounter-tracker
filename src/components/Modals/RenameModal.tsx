import { Box, Modal, TextField, useTheme } from "@mui/material";
import { useState } from "react";

interface IRenameModalProps {
  isOpen: boolean;
  name: string;
  onClose: (newName: string) => void;
}

export const RenameModal = ({ isOpen, name, onClose }: IRenameModalProps) => {
  const { palette } = useTheme();
  const [newNameValue, setNewNameValue] = useState(name);

  return (
    <Modal open={isOpen} onClose={() => onClose(newNameValue)}>
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
        <TextField
          fullWidth
          multiline
          placeholder="Enter encounter name"
          defaultValue={name}
          label="Encounter Name"
          onChange={({ target }) => setNewNameValue(target.value)}
        />
      </Box>
    </Modal>
  );
};
