import { Button, Divider, Stack, Typography, useTheme } from "@mui/material";
import { getParties } from "../../../api/parties";

export const EmptyState = () => {
  const { palette } = useTheme();
  const parties = getParties();

  const hasPartyHeros = parties.some(({ heroes }) => heroes.length > 0);

  return (
    <Stack
      position="absolute"
      left="50%"
      top="40%"
      justifyContent="center"
      width="80%"
      spacing={1}
      sx={{
        transform: "translate(-50%, -50%)",
      }}
    >
      <Typography
        textAlign="center"
        variant="h6"
        alignSelf="center"
        color={palette.text.primary}
      >
        Add creatures below to populate your encounter.
      </Typography>
      <Typography
        textAlign="center"
        variant="h6"
        alignSelf="center"
        color={palette.text.primary}
      >
        Creatures with HP will be tracked as ENEMIES!
      </Typography>
      {hasPartyHeros && (
        <Stack alignItems="center">
          <Divider
            orientation="horizontal"
            color={palette.divider}
            sx={{ my: 2, width: "100%" }}
          />
          <Typography
            textAlign="center"
            variant="h6"
            alignSelf="center"
            color={palette.text.primary}
          >
            You can also
          </Typography>

          <Button
            size="small"
            variant="contained"
            color="success"
            sx={{ width: "fit-content" }}
          >
            <b>IMPORT</b>
          </Button>

          <Typography
            textAlign="center"
            variant="h6"
            alignSelf="center"
            color={palette.text.primary}
          >
            a party to quickly populate your encounter.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
