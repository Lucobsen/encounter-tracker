import { Stack, useTheme } from "@mui/material";
import { ConditionIcon } from "./ConditionIcon";
import { useSnackbar } from "notistack";
import BlindIcon from "@mui/icons-material/Blind";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SignLanguageIcon from "@mui/icons-material/SignLanguage";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import HearingDisabledIcon from "@mui/icons-material/HearingDisabled";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import BoltIcon from "@mui/icons-material/Bolt";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ScienceIcon from "@mui/icons-material/Science";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LinkIcon from "@mui/icons-material/Link";
import HighlightIcon from "@mui/icons-material/Highlight";
import AirlineSeatIndividualSuiteIcon from "@mui/icons-material/AirlineSeatIndividualSuite";

type Condition = {
  label: string;
  icon: JSX.Element;
};

const useConditions = (): Condition[] => {
  const { palette } = useTheme();

  return [
    {
      label: "BLINDED",
      icon: (
        <BlindIcon
          sx={{
            fontSize: 16,
            color: palette.mode === "light" ? "#000" : "#fff",
          }}
        />
      ),
    },
    {
      label: "CHARMED",
      icon: (
        <FavoriteIcon sx={{ fontSize: 16, color: palette.secondary.main }} />
      ),
    },
    {
      label: "DEAFENED",
      icon: <HearingDisabledIcon sx={{ fontSize: 16, color: "#7d7d7d" }} />,
    },
    {
      label: "EXHAUSTED",
      icon: (
        <HeartBrokenIcon sx={{ fontSize: 16, color: palette.error.main }} />
      ),
    },
    {
      label: "FRIGHTENED",
      icon: <CoronavirusIcon sx={{ fontSize: 16, color: "#7400d4" }} />,
    },
    {
      label: "GRAPPLED",
      icon: (
        <SignLanguageIcon sx={{ fontSize: 16, color: palette.success.main }} />
      ),
    },
    {
      label: "INCAPACITATED",
      icon: (
        <PsychologyAltIcon sx={{ fontSize: 16, color: palette.primary.dark }} />
      ),
    },
    {
      label: "INVISIBLE",
      icon: (
        <PeopleOutlineIcon
          sx={{ fontSize: 16, color: palette.primary.light }}
        />
      ),
    },
    {
      label: "PARALYZED",
      icon: <BoltIcon sx={{ fontSize: 16, color: "#dbb435" }} />,
    },
    {
      label: "PETRIFIED",
      icon: (
        <AccessibilityIcon
          sx={{
            fontSize: 16,
            color:
              palette.mode === "light" ? palette.grey[800] : palette.grey[400],
          }}
        />
      ),
    },
    {
      label: "POISONED",
      icon: <ScienceIcon sx={{ fontSize: 16, color: palette.success.light }} />,
    },
    {
      label: "PRONE",
      icon: <KeyboardArrowDownIcon sx={{ fontSize: 16, color: "#de8410" }} />,
    },
    {
      label: "RESTRAINED",
      icon: <LinkIcon sx={{ fontSize: 16, color: "#850922" }} />,
    },
    {
      label: "STUNNED",
      icon: <HighlightIcon sx={{ fontSize: 16, color: "#c3ff00" }} />,
    },
    {
      label: "UNCONCIOUS",
      icon: (
        <AirlineSeatIndividualSuiteIcon
          sx={{ fontSize: 16, color: "##572203" }}
        />
      ),
    },
  ];
};

interface IConditionProps {
  name: string;
  currentConditions: string[];
  onUpdate: (condition: string) => void;
}

export const Conditions = ({
  name,
  currentConditions,
  onUpdate,
}: IConditionProps) => {
  const conditions = useConditions();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Stack direction="row" justifyContent="space-between">
      {conditions.map(({ label, icon }, index) => (
        <ConditionIcon
          key={`${label}-${index}`}
          label={label}
          icon={icon}
          isActive={currentConditions.includes(label)}
          updateCondition={() => {
            enqueueSnackbar(
              `${name} is ${
                !currentConditions.includes(label) ? "now" : "no longer"
              } ${label}`,
              { variant: "info" }
            );
            onUpdate(label);
          }}
        />
      ))}
    </Stack>
  );
};
