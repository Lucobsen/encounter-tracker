import { IconButton, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useCreatureContext } from "../../../utils/CreatureContext";

interface IInitialStateProps {
  onAdd: () => void;
}

export const InitialState = ({ onAdd }: IInitialStateProps) => {
  const { creature, isAddDisabled, setCreature } = useCreatureContext();

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <TextField
        size="small"
        type="number"
        sx={{ width: "40%" }}
        onChange={({ target }) =>
          setCreature({ ...creature, initative: target.value })
        }
        value={creature.initative}
        variant="outlined"
        placeholder="Init"
        required
      />

      <TextField
        size="small"
        type="text"
        fullWidth
        onChange={({ target }) =>
          setCreature({ ...creature, name: target.value })
        }
        value={creature.name}
        variant="outlined"
        placeholder="Name"
        required
      />

      <TextField
        size="small"
        type="number"
        sx={{ width: "40%" }}
        onChange={({ target }) =>
          setCreature({ ...creature, hp: target.value })
        }
        value={creature.hp ?? ""}
        variant="outlined"
        placeholder="HP"
      />

      <IconButton disabled={isAddDisabled} color="success" onClick={onAdd}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
};
