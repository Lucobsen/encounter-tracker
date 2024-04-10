import { Grid, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { ICreature } from "./Creature";

interface INewCreatureRowProps {
  onAdd: (newCreature: ICreature) => void;
}

export const NewCreatureRow = ({ onAdd }: INewCreatureRowProps) => {
  const initalState = {
    name: "",
    initative: "",
  };

  const [newCreature, setNewCreature] = useState<ICreature>(initalState);

  return (
    <Grid container direction="row" spacing={1} alignItems="center">
      <Grid item xs={2}>
        <TextField
          size="small"
          type="number"
          fullWidth
          onChange={({ target }) =>
            setNewCreature({ ...newCreature, initative: target.value })
          }
          value={newCreature?.initative ?? ""}
          variant="outlined"
          placeholder="Init"
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          size="small"
          type="text"
          fullWidth
          onChange={({ target }) =>
            setNewCreature({ ...newCreature, name: target.value })
          }
          value={newCreature?.name ?? ""}
          variant="outlined"
          placeholder="Add creature name"
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton
          disabled={!newCreature}
          sx={{ color: "green" }}
          onClick={() => {
            const noInit =
              newCreature.initative === undefined ||
              newCreature.initative === null ||
              newCreature.initative === "";

            const noName =
              newCreature.name === undefined ||
              newCreature.name === null ||
              newCreature.name === "";

            if (noName || noInit) return;

            onAdd(newCreature);

            setNewCreature(initalState);
          }}
        >
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
