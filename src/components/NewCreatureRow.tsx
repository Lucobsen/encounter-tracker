import {
  AppBar,
  Grid,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { ICreature } from "./Creature";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface INewCreatureRowProps {
  onAdd: (newCreature: ICreature) => void;
  changeTurn: (step: -1 | 1) => void;
}

export const NewCreatureRow = ({ onAdd, changeTurn }: INewCreatureRowProps) => {
  const initalState: ICreature = {
    id: crypto.randomUUID(),
    name: "",
    initative: "",
    isHidden: false,
    conditions: [],
  };

  const { palette } = useTheme();
  const [newCreature, setNewCreature] = useState<ICreature>(initalState);

  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        borderTop: `1px solid ${palette.mode === "light" ? "#000" : "#fff"}`,
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: palette.mode === "light" ? "#fff" : "#121212",
        }}
      >
        <Grid container direction="row" alignItems="center">
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

          <Grid item xs={0.25}></Grid>

          <Grid item xs={5}>
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
            />
          </Grid>

          <Grid item xs={0.25}></Grid>

          <Grid item xs={2}>
            <TextField
              size="small"
              type="number"
              fullWidth
              onChange={({ target }) =>
                setNewCreature({ ...newCreature, hp: target.value })
              }
              value={newCreature?.hp ?? ""}
              variant="outlined"
              placeholder="HP"
            />
          </Grid>

          <Grid item xs={0.25}></Grid>

          <Grid item xs={1}>
            <IconButton
              disabled={!newCreature}
              sx={{ color: palette.success.main }}
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

          <Grid item xs={0.25}></Grid>

          <Grid item xs={1}>
            <Stack>
              <IconButton
                sx={{ color: palette.primary.main, p: 0 }}
                onClick={() => changeTurn(-1)}
              >
                <ArrowDropUpIcon />
              </IconButton>

              <IconButton
                onClick={() => changeTurn(1)}
                sx={{ color: palette.primary.main, p: 0 }}
              >
                <ArrowDropDownIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
