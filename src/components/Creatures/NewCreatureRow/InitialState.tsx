import { IconButton, Stack, TextField, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { ICreature } from "../../../api/encounters";

interface IInitialStateProps {
  onAdd: (newCreature: ICreature) => void;
}

export const InitialState = ({ onAdd }: IInitialStateProps) => {
  const initalState: ICreature = {
    id: crypto.randomUUID(),
    name: "",
    initative: "",
    isHidden: false,
    conditions: [],
  };
  const [newCreature, setNewCreature] = useState<ICreature>(initalState);

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

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <TextField
        size="small"
        type="number"
        sx={{ width: "40%" }}
        onChange={({ target }) =>
          setNewCreature({ ...newCreature, initative: target.value })
        }
        value={newCreature?.initative ?? ""}
        variant="outlined"
        placeholder="Init"
        required
      />

      <TextField
        size="small"
        type="text"
        fullWidth
        onChange={({ target }) =>
          setNewCreature({ ...newCreature, name: target.value })
        }
        value={newCreature?.name ?? ""}
        variant="outlined"
        placeholder="Name"
        required
      />

      <TextField
        size="small"
        type="number"
        sx={{ width: "40%" }}
        onChange={({ target }) =>
          setNewCreature({ ...newCreature, hp: target.value })
        }
        value={newCreature?.hp ?? ""}
        variant="outlined"
        placeholder="HP"
      />

      <IconButton
        disabled={isAddDisabled()}
        sx={{ color: ({ palette }) => palette.success.main }}
        onClick={() => {
          onAdd(newCreature);
          setNewCreature(initalState);
        }}
      >
        <AddIcon />
      </IconButton>
    </Stack>
  );
};
