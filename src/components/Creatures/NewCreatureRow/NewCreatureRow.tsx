import { AppBar, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { ICreature } from "../../../api/encounters";
import { InitialState } from "./InitialState";
import AddIcon from "@mui/icons-material/Add";

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
        <Stack direction="row" alignItems="center" spacing={2} width="100%">
          <Button
            variant="contained"
            color="info"
            fullWidth
            onClick={() => changeTurn(-1)}
          >
            PREV
          </Button>

          <IconButton
            sx={{ color: ({ palette }) => palette.success.main }}
            onClick={() => {}}
          >
            <AddIcon />
          </IconButton>

          <Button
            variant="contained"
            color="info"
            fullWidth
            onClick={() => changeTurn(1)}
          >
            NEXT
          </Button>
        </Stack>
      ) : (
        <InitialState onAdd={onAdd} />
      )}
    </Toolbar>
  </AppBar>
);
