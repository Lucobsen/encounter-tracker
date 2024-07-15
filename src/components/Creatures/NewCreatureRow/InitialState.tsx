import { IconButton, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface IInitialStateProps {
  onAdd: () => void;
  updateInitative: (init: string) => void;
  updateName: (name: string) => void;
  updateHp: (hp: string) => void;
  isAddDisabled: boolean;
  initative: string;
  name: string;
  hp: string;
}

export const InitialState = ({
  onAdd,
  updateInitative,
  updateName,
  updateHp,
  isAddDisabled,
  initative,
  name,
  hp,
}: IInitialStateProps) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <TextField
        size="small"
        type="number"
        sx={{ width: "40%" }}
        onChange={({ target }) => updateInitative(target.value)}
        value={initative}
        variant="outlined"
        placeholder="Init"
        required
      />

      <TextField
        size="small"
        type="text"
        fullWidth
        onChange={({ target }) => updateName(target.value)}
        value={name}
        variant="outlined"
        placeholder="Name"
        required
      />

      <TextField
        size="small"
        type="number"
        sx={{ width: "40%" }}
        onChange={({ target }) => updateHp(target.value)}
        value={hp}
        variant="outlined"
        placeholder="HP"
      />

      <IconButton
        disabled={isAddDisabled}
        sx={{ color: ({ palette }) => palette.success.main }}
        onClick={onAdd}
      >
        <AddIcon />
      </IconButton>
    </Stack>
  );
};
