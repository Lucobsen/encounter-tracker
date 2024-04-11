import {
  Box,
  Grid,
  IconButton,
  ListItem,
  TextField,
  debounce,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Conditions } from "./Conditions";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DeleteModal } from "./DeleteModal";

export interface ICreature {
  id: string;
  initative: string;
  name: string;
  hp?: string;
  isHidden: boolean;
  conditions: string[];
}

interface ICreatureProps {
  creature: ICreature;
  onDelete: (deletedCreatureId: string) => void;
  onUpdate: (updatedCreature: ICreature) => void;
}

export const Creature = ({ onUpdate, creature, onDelete }: ICreatureProps) => {
  const { id, conditions, name, initative, isHidden, hp } = creature;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const debouncedChangeHandler = useCallback(debounce(onUpdate, 1000), []);

  const handleUpdate = (updatedCreature: ICreature) =>
    debouncedChangeHandler(updatedCreature);

  // TODO: better way to add/remove elements from an array???
  const handleConditionChange = (condition: string) => {
    const tempConditions = [...conditions];
    const index = tempConditions.findIndex(
      (currentCondition) => currentCondition === condition
    );

    const newConditions =
      index >= 0
        ? tempConditions.filter(
            (currentCondition) => condition !== currentCondition
          )
        : [...tempConditions, condition];

    onUpdate({
      ...creature,
      conditions: newConditions,
    });
  };

  return (
    <>
      <ListItem
        disableGutters
        disablePadding
        sx={{ pb: 2, opacity: isHidden ? 0.2 : 1 }}
      >
        <Box border="1px solid black" borderRadius={2} p={1}>
          <Grid container direction="row">
            <Grid item xs={1}>
              <TextField
                size="small"
                type="number"
                fullWidth
                onChange={({ target }) =>
                  handleUpdate({ ...creature, initative: target.value })
                }
                defaultValue={initative}
                variant="standard"
                placeholder="Init"
              />
            </Grid>

            <Grid item xs={0.5}></Grid>

            <Grid item xs={hp !== undefined ? 7 : 8.5}>
              <TextField
                size="small"
                type="text"
                fullWidth
                onChange={({ target }) =>
                  handleUpdate({ ...creature, name: target.value })
                }
                defaultValue={name}
                variant="standard"
                placeholder="Update creature name"
              />
            </Grid>

            {hp !== undefined && (
              <>
                <Grid item xs={0.5}></Grid>

                <Grid item xs={1}>
                  <TextField
                    size="small"
                    type="number"
                    fullWidth
                    onChange={({ target }) =>
                      handleUpdate({ ...creature, hp: target.value })
                    }
                    defaultValue={hp}
                    variant="standard"
                    placeholder="HP"
                  />
                </Grid>
              </>
            )}

            <Grid item xs={1}>
              <IconButton
                sx={{
                  color: "#1976d2",
                }}
                onClick={() => onUpdate({ ...creature, isHidden: !isHidden })}
              >
                {isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </Grid>

            <Grid item xs={1}>
              <IconButton
                sx={{ color: "#d60202" }}
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Conditions
            currentConditions={conditions}
            name={name}
            onUpdate={(condition) => handleConditionChange(condition)}
          />
        </Box>
      </ListItem>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          onDelete(id);
          setIsDeleteModalOpen(false);
        }}
        name={name}
      />
    </>
  );
};
