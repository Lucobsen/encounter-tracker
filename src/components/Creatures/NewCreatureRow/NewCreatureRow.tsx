import { AppBar, Toolbar } from "@mui/material";
import { ICreature } from "../../../api/encounters";
import { InitialState } from "./InitialState";
import { ActiveState } from "./ActiveState";
import { useState } from "react";

// TODO: add a context provider for NEWCREATURE
interface INewCreatureRowProps {
  onAdd: (newCreature: ICreature) => void;
  changeTurn: (step: -1 | 1) => void;
  inProgress: boolean;
}

export const NewCreatureRow = ({
  onAdd,
  changeTurn,
  inProgress,
}: INewCreatureRowProps) => {
  const initalState: ICreature = {
    id: crypto.randomUUID(),
    name: "",
    initative: "",
    isHidden: false,
    conditions: [],
  };

  const [newCreature, setNewCreature] = useState<ICreature>(initalState);

  const isAddDisabled = () => {
    const noInit =
      newCreature.initative === undefined ||
      newCreature.initative === null ||
      newCreature.initative === "";

    const noName =
      newCreature.name === undefined ||
      newCreature.name === null ||
      newCreature.name === "";

    return noInit || noName;
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        boxShadow: "none",
        bottom: 0,
        borderTop: ({ palette }) =>
          `1px solid ${
            palette.mode === "light"
              ? palette.common.black
              : palette.common.white
          }`,
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: ({ palette }) =>
            palette.mode === "light" ? palette.common.white : "#121212",
        }}
      >
        {inProgress ? (
          <ActiveState
            resetCreature={() => setNewCreature(initalState)}
            changeTurn={changeTurn}
            onAdd={() => {
              onAdd(newCreature);
              setNewCreature(initalState);
            }}
            isAddDisabled={isAddDisabled()}
            initative={newCreature?.initative ?? ""}
            name={newCreature?.name ?? ""}
            hp={newCreature?.hp ?? ""}
            updateInitative={(initative) =>
              setNewCreature({ ...newCreature, initative })
            }
            updateName={(name) => setNewCreature({ ...newCreature, name })}
            updateHp={(hp) => setNewCreature({ ...newCreature, hp })}
          />
        ) : (
          <InitialState
            onAdd={() => {
              onAdd(newCreature);
              setNewCreature(initalState);
            }}
            isAddDisabled={isAddDisabled()}
            initative={newCreature?.initative ?? ""}
            name={newCreature?.name ?? ""}
            hp={newCreature?.hp ?? ""}
            updateInitative={(initative) =>
              setNewCreature({ ...newCreature, initative })
            }
            updateName={(name) => setNewCreature({ ...newCreature, name })}
            updateHp={(hp) => setNewCreature({ ...newCreature, hp })}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};
