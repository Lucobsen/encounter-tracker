import { IconButton } from "@mui/material";
import { useState } from "react";

interface IConditionIconProps {
  icon: JSX.Element;
  label: string;
  name: string;
  updateCondition: (message: string) => void;
}

export const ConditionIcon = ({
  label,
  updateCondition,
  icon,
  name,
}: IConditionIconProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (newActiveStatus: boolean) => {
    updateCondition(
      `${name} is ${newActiveStatus ? "now" : "no longer"} ${label}`
    );
    setIsActive(newActiveStatus);
  };

  return (
    <IconButton
      size="small"
      title={label}
      onClick={() => handleClick(!isActive)}
      sx={{
        height: 16,
        width: 16,
        opacity: isActive ? 1 : 0.5,
      }}
    >
      {icon}
    </IconButton>
  );
};
