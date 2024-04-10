import { Snackbar, Stack } from "@mui/material";
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
import { useState } from "react";
import { ConditionIcon } from "./ConditionIcon";

type Condition = {
  label: string;
  icon: JSX.Element;
};

const conditions: Condition[] = [
  {
    label: "Blinded",
    icon: <BlindIcon sx={{ fontSize: 12 }} />,
  },
  {
    label: "Charmed",
    icon: <FavoriteIcon sx={{ fontSize: 12 }} style={{ color: "pink" }} />,
  },
  {
    label: "Deafened",
    icon: <HearingDisabledIcon sx={{ fontSize: 12 }} />,
  },
  {
    label: "Exhausted",
    icon: <HeartBrokenIcon sx={{ fontSize: 12 }} style={{ color: "red" }} />,
  },
  {
    label: "Frightened",
    icon: <CoronavirusIcon sx={{ fontSize: 12 }} style={{ color: "purple" }} />,
  },
  {
    label: "Grappled",
    icon: <SignLanguageIcon sx={{ fontSize: 12 }} style={{ color: "green" }} />,
  },
  {
    label: "Incapacitated",
    icon: <PsychologyAltIcon sx={{ fontSize: 12 }} />,
  },
  {
    label: "Invisible",
    icon: (
      <PeopleOutlineIcon sx={{ fontSize: 12 }} style={{ color: "lightBlue" }} />
    ),
  },
  {
    label: "Paralyzed",
    icon: <BoltIcon sx={{ fontSize: 12 }} style={{ color: "gold" }} />,
  },
  {
    label: "Petrified",
    icon: (
      <AccessibilityIcon sx={{ fontSize: 12 }} style={{ color: "darkGrey" }} />
    ),
  },
  {
    label: "Poisoned",
    icon: <ScienceIcon sx={{ fontSize: 12 }} />,
  },
  {
    label: "Prone",
    icon: <KeyboardArrowDownIcon sx={{ fontSize: 12 }} />,
  },
  {
    label: "Restrained",
    icon: <LinkIcon sx={{ fontSize: 12 }} />,
  },
  {
    label: "Stunned",
    icon: <HighlightIcon sx={{ fontSize: 12 }} />,
  },
  {
    label: "Unconscious",
    icon: <AirlineSeatIndividualSuiteIcon sx={{ fontSize: 12 }} />,
  },
];

interface IConditionProps {
  name: string;
}

export const Conditions = ({ name }: IConditionProps) => {
  const [newCondition, setNewCondition] = useState("");

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        {conditions.map(({ label, icon }, index) => (
          <ConditionIcon
            key={`${label}-${index}`}
            label={label}
            name={name}
            icon={icon}
            updateCondition={(message) => setNewCondition(message)}
          />
        ))}
      </Stack>
      <Snackbar
        open={newCondition !== ""}
        autoHideDuration={3000}
        onClose={() => setNewCondition("")}
        message={newCondition}
      />
    </>
  );
};
