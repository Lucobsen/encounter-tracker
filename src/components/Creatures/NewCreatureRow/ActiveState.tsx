import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { ICreature } from "../../../api/encounters";

interface IActiveStateProps {
  changeTurn: (step: -1 | 1) => void;
  onAdd: (newCreature: ICreature) => void;
}

export const ActiveState = ({ changeTurn, onAdd }: IActiveStateProps) => {
  const initalState: ICreature = {
    id: crypto.randomUUID(),
    name: "",
    initative: "",
    isHidden: false,
    conditions: [],
  };
  const [newCreature, setNewCreature] = useState<ICreature>(initalState);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const isAddDisabled = () => {
    const noInit =
      newCreature.initative === undefined ||
      newCreature.initative === null ||
      newCreature.initative === "";

    const noName =
      newCreature.name === undefined ||
      newCreature.name === null ||
      newCreature.name === "";

    return noInit || noName;
  };

  const resetModal = () => {
    setNewCreature(initalState);
    setIsAddModalOpen(false);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2} width="100%">
        <Button
          variant="contained"
          color="info"
          fullWidth
          onClick={() => changeTurn(-1)}
        >
          PREV
        </Button>

        <IconButton
          sx={{ color: ({ palette }) => palette.success.main }}
          onClick={() => setIsAddModalOpen(true)}
        >
          <AddIcon />
        </IconButton>

        <Button
          variant="contained"
          color="info"
          fullWidth
          onClick={() => changeTurn(1)}
        >
          NEXT
        </Button>
      </Stack>

      <Modal open={isAddModalOpen} onClose={resetModal}>
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
                onChange={({ target }) =>
                  setNewCreature({ ...newCreature, initative: target.value })
                }
                value={newCreature?.initative ?? ""}
                variant="outlined"
                placeholder="Init"
              />

              <TextField
                size="small"
                type="number"
                fullWidth
                onChange={({ target }) =>
                  setNewCreature({ ...newCreature, hp: target.value })
                }
                value={newCreature?.hp ?? ""}
                variant="outlined"
                placeholder="HP"
              />
            </Stack>

            <TextField
              size="small"
              type="text"
              required
              fullWidth
              onChange={({ target }) =>
                setNewCreature({ ...newCreature, name: target.value })
              }
              value={newCreature?.name ?? ""}
              variant="outlined"
              placeholder="Name"
            />

            <Stack direction="row" alignItems="center" spacing={1} width="100%">
              <Button
                variant="contained"
                fullWidth
                color="error"
                onClick={resetModal}
              >
                Cancel
              </Button>
              <Button
                disabled={isAddDisabled()}
                variant="contained"
                fullWidth
                color="success"
                onClick={() => {
                  onAdd(newCreature);
                  setNewCreature(initalState);
                  setIsAddModalOpen(false);
                }}
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
