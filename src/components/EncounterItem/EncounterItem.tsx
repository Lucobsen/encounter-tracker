import {
  Box,
  Grid,
  IconButton,
  Link,
  Modal,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";

interface IEncounterItemProps {
  id: string;
  name: string;
  onUpdate: (newName: string) => void;
}

export const EncounterItem = ({ id, name, onUpdate }: IEncounterItemProps) => {
  const { palette } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newNameValue, setNewNameValue] = useState(name);

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
          <Grid item xs={10} overflow="hidden " textOverflow="ellipsis">
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

          <Grid item xs={2}>
            <IconButton onClick={() => setIsSettingsOpen(true)} color="inherit">
              <SettingsIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <Modal
        open={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false);
          onUpdate(newNameValue);
        }}
      >
        <Box
          width="80%"
          p={2}
          borderRadius={2}
          bgcolor={palette.background.default}
          position="absolute"
          left="50%"
          top="50%"
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Stack spacing={2}>
            <TextField
              multiline
              placeholder="Enter encounter name"
              defaultValue={name}
              label="Encounter Name"
              onChange={({ target }) => setNewNameValue(target.value)}
            />

            {/* <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={() => {}}
            >
              Delete Encounter
            </Button> */}
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
