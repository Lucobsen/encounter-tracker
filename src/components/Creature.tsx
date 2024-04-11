import { Box, Grid, IconButton, ListItem, TextField } from "@mui/material";
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
  conditions: string[];
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

  const handleConditionChange = (condition: string) => {
    const tempConditions = [...creature.conditions];
    const index = tempConditions.findIndex(
      (currentCondition) => currentCondition === condition
    );

    const newConditions =
      index >= 0
        ? tempConditions.filter(
            (currentCondition) => condition !== currentCondition
          )
        : [...tempConditions, condition];

    onUpdate({
      ...creature,
      conditions: newConditions,
    });
  };

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

          <Conditions
            currentConditions={creature.conditions}
            name={creature.name}
            onUpdate={(condition) => handleConditionChange(condition)}
          />
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
