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
    <ListItem disableGutters disablePadding sx={{ pb: 2 }}>
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

          <Grid item xs={8.5}>
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
