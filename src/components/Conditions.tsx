import { IconButton, Snackbar, Stack } from "@mui/material";
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

type Condition = {
  label: string;
  icon?: JSX.Element;
};

const conditions: Condition[] = [
  { label: "Blinded", icon: <BlindIcon sx={{ fontSize: 10 }} /> },
  { label: "Charmed", icon: <FavoriteIcon sx={{ fontSize: 10 }} /> },
  { label: "Deafened", icon: <HearingDisabledIcon sx={{ fontSize: 10 }} /> },
  { label: "Exhausted", icon: <HeartBrokenIcon sx={{ fontSize: 10 }} /> },
  { label: "Frightened", icon: <CoronavirusIcon sx={{ fontSize: 10 }} /> },
  { label: "Grappled", icon: <SignLanguageIcon sx={{ fontSize: 10 }} /> },
  { label: "Incapacitated", icon: <PsychologyAltIcon sx={{ fontSize: 10 }} /> },
  { label: "Invisible", icon: <PeopleOutlineIcon sx={{ fontSize: 10 }} /> },
  { label: "Paralyzed", icon: <BoltIcon sx={{ fontSize: 10 }} /> },
  { label: "Petrified", icon: <AccessibilityIcon sx={{ fontSize: 10 }} /> },
  { label: "Poisoned", icon: <ScienceIcon sx={{ fontSize: 10 }} /> },
  { label: "Prone", icon: <KeyboardArrowDownIcon sx={{ fontSize: 10 }} /> },
  { label: "Restrained", icon: <LinkIcon sx={{ fontSize: 10 }} /> },
  { label: "Stunned", icon: <HighlightIcon sx={{ fontSize: 10 }} /> },
  {
    label: "Unconscious",
    icon: <AirlineSeatIndividualSuiteIcon sx={{ fontSize: 10 }} />,
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
        {conditions.map(({ label, icon }) => (
          <IconButton
            size="small"
            title={label}
            onClick={() => setNewCondition(`${name} is now ${label}`)}
            sx={{ border: "1px solid #000", height: 16, width: 16 }}
          >
            {icon}
          </IconButton>
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
