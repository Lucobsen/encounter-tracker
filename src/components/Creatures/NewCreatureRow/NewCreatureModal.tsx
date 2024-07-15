import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface INewCreatureModalProps {
  onAdd: () => void;
  updateInitative: (init: string) => void;
  updateName: (name: string) => void;
  updateHp: (hp: string) => void;
  onClose: () => void;
  isAddDisabled: boolean;
  initative: string;
  name: string;
  hp: string;
  isOpen: boolean;
}

export const NewCreatureModal = ({
  onAdd,
  updateInitative,
  updateName,
  updateHp,
  isAddDisabled,
  initative,
  name,
  hp,
  isOpen,
  onClose,
}: INewCreatureModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        width="80%"
        p={2}
        borderRadius={2}
        sx={{
          bgcolor: ({ palette }) => palette.background.default,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          textAlign="center"
          variant="h6"
          mb={2}
          color={({ palette }) => palette.text.primary}
        >
          Enter New Creature Details
        </Typography>

        <Stack alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TextField
              size="small"
              type="number"
              required
              fullWidth
              onChange={({ target }) => updateInitative(target.value)}
              value={initative}
              variant="outlined"
              placeholder="Init"
            />

            <TextField
              size="small"
              type="number"
              fullWidth
              onChange={({ target }) => updateHp(target.value)}
              value={hp}
              variant="outlined"
              placeholder="HP"
            />
          </Stack>

          <TextField
            size="small"
            type="text"
            required
            fullWidth
            onChange={({ target }) => updateName(target.value)}
            value={name}
            variant="outlined"
            placeholder="Name"
          />

          <Stack direction="row" alignItems="center" spacing={1} width="100%">
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={isAddDisabled}
              variant="contained"
              fullWidth
              color="success"
              onClick={() => {
                onAdd();
                onClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};
