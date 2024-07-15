import { Button, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { NewCreatureModal } from "./NewCreatureModal";

interface IActiveStateProps {
  changeTurn: (step: -1 | 1) => void;
  onAdd: () => void;
  updateInitative: (init: string) => void;
  updateName: (name: string) => void;
  updateHp: (hp: string) => void;
  resetCreature: () => void;
  isAddDisabled: boolean;
  initative: string;
  name: string;
  hp: string;
}

export const ActiveState = ({
  changeTurn,
  onAdd,
  updateInitative,
  updateName,
  updateHp,
  resetCreature,
  isAddDisabled,
  initative,
  name,
  hp,
}: IActiveStateProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
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
          onClick={() => setIsAddModalOpen(true)}
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

      <NewCreatureModal
        onAdd={onAdd}
        updateInitative={updateInitative}
        updateName={updateName}
        updateHp={updateHp}
        isAddDisabled={isAddDisabled}
        initative={initative}
        name={name}
        hp={hp}
        isOpen={isAddModalOpen}
        onClose={() => {
          resetCreature();
          setIsAddModalOpen(false);
        }}
      />
    </>
  );
};
