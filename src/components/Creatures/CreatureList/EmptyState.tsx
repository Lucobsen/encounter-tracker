import { Stack, Typography, useTheme } from "@mui/material";

export const EmptyState = () => {
  const { palette } = useTheme();

  return (
    <Stack
      position="absolute"
      left="50%"
      top="30%"
      justifyContent="center"
      width="80%"
      spacing={1}
      sx={{
        transform: "translate(-50%, -50%)",
      }}
    >
      <Typography
        variant="h6"
        alignSelf="center"
        textAlign="center"
        color={palette.text.primary}
      >
        Seems quiet, too quiet...
      </Typography>
      <Typography
        textAlign="center"
        variant="h6"
        alignSelf="center"
        color={palette.text.primary}
      >
        Add creatures below to populate your encounter!
      </Typography>
      <Typography
        textAlign="center"
        variant="h6"
        alignSelf="center"
        color={palette.text.primary}
      >
        Creatures with HP will be tracked as ENEMIES!
      </Typography>
    </Stack>
  );
};
