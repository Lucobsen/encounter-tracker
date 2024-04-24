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

interface IPartyItem {
  name: string;
  heroes: IHero[];
  onAdd: (newHeroName: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (heroIndex: number, updatedHeroName: string) => void;
}

export const PartyItem = ({
  name,
  heroes,
  onAdd,
  onDelete,
  onUpdate,
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
        {/* TODO: BUG HERE ON UPDATE */}
        <TextField
          size="small"
          type="text"
          fullWidth
          defaultValue={name}
          variant="standard"
          placeholder="Update party name"
        />
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
