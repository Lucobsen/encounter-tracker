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
import { DeleteModal } from "./DeleteModal";

export interface ICreature {
  id: string;
  initative: string;
  name: string;
  hp?: string;
  isHidden: boolean;
}

interface ICreatureProps {
  creature: ICreature;
  onDelete: (deletedCreatureId: string) => void;
  onUpdate: (updatedCreature: ICreature) => void;
}

export const Creature = ({ onUpdate, creature, onDelete }: ICreatureProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [creatureState, setCreatureState] = useState(creature);

  const handleInitativeChange = (newValue: string) =>
    setCreatureState({
      ...creatureState,
      initative: newValue,
    });

  const handleNameChange = (newValue: string) =>
    setCreatureState({
      ...creatureState,
      name: newValue,
    });

  const handleHpChange = (newValue: string) =>
    setCreatureState({
      ...creatureState,
      hp: newValue,
    });

  return (
    <>
      <ListItem
        disableGutters
        disablePadding
        sx={{ pb: 2, opacity: creature.isHidden ? 0.2 : 1 }}
      >
        <Box border="1px solid black" borderRadius={2} p={1}>
          <Grid container direction="row">
            <Grid item xs={1}>
              <TextField
                size="small"
                type="number"
                fullWidth
                onChange={({ target }) => handleInitativeChange(target.value)}
                value={creatureState.initative}
                variant="standard"
                placeholder="Init"
                onBlur={() => onUpdate(creatureState)}
              />
            </Grid>

            <Grid item xs={0.5}></Grid>

            <Grid item xs={creature.hp !== undefined ? 7 : 8.5}>
              <TextField
                size="small"
                type="text"
                fullWidth
                onChange={({ target }) => handleNameChange(target.value)}
                value={creatureState.name}
                variant="standard"
                placeholder="Update creature name"
                onBlur={() => onUpdate(creatureState)}
              />
            </Grid>

            {creature.hp !== undefined && (
              <>
                <Grid item xs={0.5}></Grid>

                <Grid item xs={1}>
                  <TextField
                    size="small"
                    type="number"
                    fullWidth
                    onChange={({ target }) => handleHpChange(target.value)}
                    value={creatureState.hp}
                    variant="standard"
                    placeholder="HP"
                    onBlur={() => onUpdate(creatureState)}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={1}>
              <IconButton
                sx={{
                  color: "#1976d2",
                }}
                onClick={() =>
                  onUpdate({ ...creature, isHidden: !creature.isHidden })
                }
              >
                {creature.isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
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

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          onDelete(creatureState.id);
          setIsDeleteModalOpen(false);
        }}
        name={creature.name}
      />
    </>
  );
};
