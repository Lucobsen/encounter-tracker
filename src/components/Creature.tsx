import { Box, Grid, IconButton, ListItem, TextField } from "@mui/material";
import { useState } from "react";
import { Conditions } from "./Conditions";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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
      <Box border="1px solid black" borderRadius={2} p={1}>
        <Grid container direction="row" spacing={1} alignItems="center">
          <Grid item xs={2} p={0}>
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
          <Grid item xs={8}>
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
          <Grid item xs={2}>
            <IconButton
              sx={{ color: "#d60202" }}
              onClick={() =>
                onDelete(creatureState.name, creatureState.initative)
              }
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Conditions name={creature.name} />
      </Box>
    </ListItem>
  );
};
