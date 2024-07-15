import { AppBar, Toolbar } from "@mui/material";
import { ICreature } from "../../../api/encounters";
import { InitialState } from "./InitialState";
import { ActiveState } from "./ActiveState";

interface INewCreatureRowProps {
  onAdd: (newCreature: ICreature) => void;
  changeTurn: (step: -1 | 1) => void;
  inProgress: boolean;
}

export const NewCreatureRow = ({
  onAdd,
  changeTurn,
  inProgress,
}: INewCreatureRowProps) => (
  <AppBar
    position="fixed"
    sx={{
      top: "auto",
      boxShadow: "none",
      bottom: 0,
      borderTop: ({ palette }) =>
        `1px solid ${
          palette.mode === "light" ? palette.common.black : palette.common.white
        }`,
    }}
  >
    <Toolbar
      sx={{
        backgroundColor: ({ palette }) =>
          palette.mode === "light" ? palette.common.white : "#121212",
      }}
    >
      {inProgress ? (
        <ActiveState changeTurn={changeTurn} onAdd={onAdd} />
      ) : (
        <InitialState onAdd={onAdd} />
      )}
    </Toolbar>
  </AppBar>
);
