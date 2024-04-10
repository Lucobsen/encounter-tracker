import { Grid, IconButton, ListItem, TextField } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

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

  return (
    <ListItem disableGutters>
      <Grid container direction="row" spacing={1} alignItems="center">
        <Grid item xs={2}>
          <TextField
            size="small"
            type="number"
            fullWidth
            onChange={({ target }) => handleInitativeChange(target.value)}
            value={creatureState.initative}
            variant="outlined"
            placeholder="Init"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            size="small"
            type="text"
            fullWidth
            onChange={({ target }) => handleNameChange(target.value)}
            value={creatureState.name}
            variant="outlined"
            placeholder="Update creature name"
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton
            onClick={() =>
              onDelete(creatureState.name, creatureState.initative)
            }
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </ListItem>
  );
};
