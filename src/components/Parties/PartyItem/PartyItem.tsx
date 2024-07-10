import {
  Box,
  Collapse,
  IconButton,
  List,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IHero } from "../../../api/parties";
import { HeroItem } from "../HeroItem/HeroItem";
import { NewHeroItem } from "../NewHeroItem/NewHeroItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface IPartyItem {
  name: string;
  heroes: IHero[];
  onAdd: (newHeroName: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (heroIndex: number, updatedHeroName: string) => void;
  onUpdatePartyName: (newName: string) => void;
  onDeleteParty: () => void;
}

export const PartyItem = ({
  name,
  heroes,
  onAdd,
  onDelete,
  onUpdate,
  onUpdatePartyName,
  onDeleteParty,
}: IPartyItem) => {
  const { palette } = useTheme();
  const [isHeroListOpen, setIsHeroListOpen] = useState(false);

  return (
    <Box
      width="100%"
      border={`1px solid ${
        palette.mode === "light" ? palette.common.black : palette.common.white
      }`}
      bgcolor={palette.background.default}
      borderRadius={2}
      p={1}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton
          size="small"
          onClick={() => setIsHeroListOpen(!isHeroListOpen)}
          sx={{
            color:
              palette.mode === "light"
                ? palette.common.black
                : palette.common.white,
          }}
        >
          {isHeroListOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <TextField
          size="small"
          type="text"
          fullWidth
          defaultValue={name}
          onChange={({ target }) => onUpdatePartyName(target.value)}
          variant="standard"
          placeholder="Update party name"
        />
        <IconButton size="small" onClick={onDeleteParty} color="error">
          <DeleteOutlineIcon />
        </IconButton>
      </Stack>

      <Collapse in={isHeroListOpen} timeout="auto" unmountOnExit>
        <List>
          {heroes.map(({ id, name }, index) => (
            <HeroItem
              key={id}
              name={name}
              onDelete={() => onDelete(id)}
              onUpdate={(updatedHeroName) => onUpdate(index, updatedHeroName)}
            />
          ))}

          <NewHeroItem onAdd={onAdd} />
        </List>
      </Collapse>
    </Box>
  );
};
