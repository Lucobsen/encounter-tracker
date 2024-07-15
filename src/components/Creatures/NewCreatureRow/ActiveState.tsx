import { Button, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { NewCreatureModal } from "./NewCreatureModal";
import { useCreatureContext } from "../../../utils/CreatureContext";

interface IActiveStateProps {
  changeTurn: (step: -1 | 1) => void;
  onAdd: () => void;
}

export const ActiveState = ({ changeTurn, onAdd }: IActiveStateProps) => {
  const { resetCreature } = useCreatureContext();
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
        isOpen={isAddModalOpen}
        onClose={() => {
          resetCreature();
          setIsAddModalOpen(false);
        }}
      />
    </>
  );
};
