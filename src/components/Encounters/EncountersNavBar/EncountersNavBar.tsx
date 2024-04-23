import {
  AppBar,
  Box,
  Chip,
  IconButton,
  Stack,
  SvgIcon,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import Groups3Icon from "@mui/icons-material/Groups3";
import { useNavigate } from "react-router-dom";

export const EncountersNavBar = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          color: palette.text.primary,
          borderBottom: `1px solid ${palette.text.primary}`,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            backgroundColor: palette.background.paper,
          }}
        >
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            overflow="hidden"
          >
            <SvgIcon>
              <BookIcon />
            </SvgIcon>
            <Typography variant="h5">Combat Chronicle</Typography>
            <Chip
              variant={palette.mode === "dark" ? "outlined" : "filled"}
              size="small"
              label="BETA"
              color="success"
              sx={{ fontSize: 10 }}
            />
          </Stack>

          <IconButton onClick={() => navigate("parties")}>
            <SvgIcon>
              <Groups3Icon />
            </SvgIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
