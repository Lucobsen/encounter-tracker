import { IconButton, ListItem, Stack, TextField } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";

interface IHeroItemProps {
  onDelete: () => void;
  //onUpdate: () => void;
  name: string;
}

export const HeroItem = ({ onDelete, name }: IHeroItemProps) => {
  const [heroName, setHeroName] = useState(name);

  // TODO: add update logic for hero names
  // const debouncedChangeHandler = useDebounce(onUpdate, 1000);

  // const handleUpdate = (updatedHero: IHero) =>
  //   debouncedChangeHandler(updatedHero);

  return (
    <ListItem disableGutters sx={{ width: "100%" }}>
      <Stack direction="row" width="100%" spacing={1}>
        <IconButton size="small" onClick={onDelete} color="error">
          <DeleteOutlineIcon />
        </IconButton>
        <TextField
          size="small"
          type="text"
          value={heroName}
          onChange={({ target }) => setHeroName(target.value)}
          fullWidth
          variant="standard"
          placeholder="Update hero name"
        />
      </Stack>
    </ListItem>
  );
};
