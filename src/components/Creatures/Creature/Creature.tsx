import {
  Box,
  Grid,
  IconButton,
  ListItem,
  TextField,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Conditions } from "../Conditions/Conditions";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TextModal } from "../../shared/Modals/TextModal";
import { ICreature } from "../../../api/encounters";
import { useDebounce } from "../../../utils/debouce";

interface ICreatureProps {
  creature: ICreature;
  onDelete: (deletedCreatureId: string) => void;
  onUpdate: (updatedCreature: ICreature) => void;
  hasCurrentTurn: boolean;
}

export const Creature = ({
  onUpdate,
  creature,
  onDelete,
  hasCurrentTurn = false,
}: ICreatureProps) => {
  const { id, conditions, name, initative, isHidden, hp, isEnemy } = creature;

  const listItemRef = useRef<HTMLLIElement>(null);
  const { palette } = useTheme();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const debouncedChangeHandler = useDebounce(onUpdate, 1000);

  const handleUpdate = (updatedCreature: ICreature) =>
    debouncedChangeHandler(updatedCreature);

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

  useEffect(() => {
    if (hasCurrentTurn === true)
      window.scrollTo({
        top: listItemRef.current?.offsetTop,
        behavior: "smooth",
      });
  }, [hasCurrentTurn]);

  return (
    <>
      <ListItem
        ref={listItemRef}
        disableGutters
        disablePadding
        sx={{ pb: 2, opacity: isHidden ? 0.2 : 1 }}
      >
        <Box
          minHeight={60}
          width="100%"
          bgcolor={palette.background.default}
          border={`1px solid ${
            palette.mode === "light"
              ? palette.common.black
              : palette.common.white
          }`}
          borderRadius={2}
          p={1}
          boxShadow={
            hasCurrentTurn
              ? `0 0 8px 2px ${
                  isEnemy ? palette.error.main : palette.primary.main
                }`
              : "none"
          }
        >
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
                  color: palette.primary.main,
                }}
                onClick={() => onUpdate({ ...creature, isHidden: !isHidden })}
              >
                {isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </Grid>

            <Grid item xs={1}>
              <IconButton
                sx={{ color: palette.error.main }}
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

      <TextModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          onDelete(id);
          setIsDeleteModalOpen(false);
        }}
        content={`Do you wish to delete ${name}?`}
      />
    </>
  );
};
