import {
  Box,
  Button,
  Grid,
  IconButton,
  ListItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Conditions } from "./Conditions";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export interface ICreature {
  initative: string;
  name: string;
  hp?: string;
}

interface ICreatureProps {
  creature: ICreature;
  onDelete: (initative: string, name: string) => void;
}

export const Creature = ({ creature, onDelete }: ICreatureProps) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [creatureState, setCreatureState] = useState(creature);

  // TODO: need to sort on update
  const handleInitativeChange = (newValue: string) =>
    setCreatureState({
      ...creatureState,
      initative: newValue,
    });

  // TODO: need to sort on update
  const handleNameChange = (newValue: string) =>
    setCreatureState({
      ...creatureState,
      name: newValue,
    });

  return (
    <>
      <ListItem
        disableGutters
        disablePadding
        sx={{ pb: 2, opacity: isHidden ? 0.2 : 1 }}
      >
        <Box border="1px solid black" borderRadius={2} p={1}>
          <Grid container direction="row">
            <Grid item xs={2}>
              <TextField
                size="small"
                type="number"
                fullWidth
                onChange={({ target }) => handleInitativeChange(target.value)}
                value={creatureState.initative}
                variant="standard"
                placeholder="Init"
              />
            </Grid>

            <Grid item xs={0.5}></Grid>

            <Grid item xs={7.5}>
              <TextField
                size="small"
                type="text"
                fullWidth
                onChange={({ target }) => handleNameChange(target.value)}
                value={creatureState.name}
                variant="standard"
                placeholder="Update creature name"
              />
            </Grid>

            <Grid item xs={1}>
              <IconButton
                sx={{
                  color: "#1976d2",
                }}
                onClick={() => setIsHidden(!isHidden)}
              >
                {isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </Grid>

            <Grid item xs={1}>
              <IconButton
                sx={{ color: "#d60202" }}
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Conditions name={creature.name} />
        </Box>
      </ListItem>

      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <Box
          width="80%"
          p={2}
          borderRadius={2}
          sx={{
            bgcolor: "#fff",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography textAlign="center" variant="h6" mb={2}>
            {`Do you wish to delete ${creature.name}?`}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              variant="contained"
              fullWidth
              color="info"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              No
            </Button>
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={() => {
                onDelete(creatureState.name, creatureState.initative);
                setIsDeleteModalOpen(false);
              }}
            >
              Yes
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
