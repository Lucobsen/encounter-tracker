import { Stack } from "@mui/material";
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
import { ConditionIcon } from "./ConditionIcon";
import { useSnackbar } from "notistack";

type Condition = {
  label: string;
  icon: JSX.Element;
};

const conditions: Condition[] = [
  {
    label: "Blinded",
    icon: <BlindIcon sx={{ fontSize: 16, color: "#000" }} />,
  },
  {
    label: "Charmed",
    icon: <FavoriteIcon sx={{ fontSize: 16, color: "#fc03f0" }} />,
  },
  {
    label: "Deafened",
    icon: <HearingDisabledIcon sx={{ fontSize: 16, color: "#7d7d7d" }} />,
  },
  {
    label: "Exhausted",
    icon: <HeartBrokenIcon sx={{ fontSize: 16, color: "#fc0303" }} />,
  },
  {
    label: "Frightened",
    icon: <CoronavirusIcon sx={{ fontSize: 16, color: "#7400d4" }} />,
  },
  {
    label: "Grappled",
    icon: <SignLanguageIcon sx={{ fontSize: 16, color: "#00701a" }} />,
  },
  {
    label: "Incapacitated",
    icon: <PsychologyAltIcon sx={{ fontSize: 16, color: "#050bb3" }} />,
  },
  {
    label: "Invisible",
    icon: <PeopleOutlineIcon sx={{ fontSize: 16, color: "#81ccf7" }} />,
  },
  {
    label: "Paralyzed",
    icon: <BoltIcon sx={{ fontSize: 16, color: "#dbb435" }} />,
  },
  {
    label: "Petrified",
    icon: <AccessibilityIcon sx={{ fontSize: 16, color: "#404040" }} />,
  },
  {
    label: "Poisoned",
    icon: <ScienceIcon sx={{ fontSize: 16, color: "#538222" }} />,
  },
  {
    label: "Prone",
    icon: <KeyboardArrowDownIcon sx={{ fontSize: 16, color: "#de8410" }} />,
  },
  {
    label: "Restrained",
    icon: <LinkIcon sx={{ fontSize: 16, color: "#850922" }} />,
  },
  {
    label: "Stunned",
    icon: <HighlightIcon sx={{ fontSize: 16, color: "#c3ff00" }} />,
  },
  {
    label: "Unconscious",
    icon: (
      <AirlineSeatIndividualSuiteIcon
        sx={{ fontSize: 16, color: "##572203" }}
      />
    ),
  },
];

interface IConditionProps {
  name: string;
}

export const Conditions = ({ name }: IConditionProps) => {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Stack direction="row" justifyContent="space-between">
      {conditions.map(({ label, icon }, index) => (
        <ConditionIcon
          key={`${label}-${index}`}
          label={label}
          name={name}
          icon={icon}
          updateCondition={(message) =>
            enqueueSnackbar(message, { variant: "info" })
          }
        />
      ))}
    </Stack>
  );
};
