import { Box, Grid, IconButton, Link, useTheme } from "@mui/material";
import { useState } from "react";
import { RenameModal } from "../../shared/Modals/RenameModal";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TextModal } from "../../shared/Modals/TextModal";

interface IEncounterItemProps {
  id: string;
  name: string;
  onUpdate: (newName: string) => void;
  onDelete: (id: string) => void;
}

export const EncounterItem = ({
  id,
  name,
  onUpdate,
  onDelete,
}: IEncounterItemProps) => {
  const { palette } = useTheme();
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <Box
        width="80%"
        bgcolor={palette.info.main}
        color={palette.text.primary}
        border={`1px solid ${palette.text.primary}`}
        borderRadius={2}
        p={1}
      >
        <Grid container alignItems="center">
          <Grid item xs={9} overflow="hidden " textOverflow="ellipsis">
            <Link
              textAlign="center"
              noWrap
              href={id}
              underline="hover"
              color="inherit"
              variant="h6"
            >
              {name}
            </Link>
          </Grid>

          <Grid item xs={1.5}>
            <IconButton onClick={() => setIsRenameOpen(true)} color="inherit">
              <DriveFileRenameOutlineIcon />
            </IconButton>
          </Grid>

          <Grid item xs={1.5}>
            <IconButton onClick={() => setIsDeleteOpen(true)} color="inherit">
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <RenameModal
        isOpen={isRenameOpen}
        onClose={(newName) => {
          onUpdate(newName);
          setIsRenameOpen(false);
        }}
        name={name}
      />

      <TextModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          onDelete(id);
          setIsDeleteOpen(false);
        }}
        content={`Do you wish to delete "${name}"?`}
      />
    </>
  );
};
