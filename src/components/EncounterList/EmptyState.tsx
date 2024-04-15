import { Typography, useTheme } from "@mui/material";

export const EmptyState = () => {
  const { palette } = useTheme();

  return (
    <Typography color={palette.text.primary}>Create New Encounters</Typography>
  );
};
