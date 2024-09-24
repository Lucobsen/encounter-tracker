import { Dispatch, ReactNode, useMemo, useState } from "react";
import { createContextUtil } from "./context";
import { ICreature } from "../api/encounters";

type CreatureContextProps = {
  creature: ICreature;
  setCreature: Dispatch<React.SetStateAction<ICreature>>;
  resetCreature: () => void;
  isAddDisabled: boolean;
};

export const [useCreatureContext, ProviderCreatureContext] =
  createContextUtil<CreatureContextProps>();

type CreatureContextProviderProps = {
  children: ReactNode;
};

export const CreatureContextProvider = ({
  children,
}: CreatureContextProviderProps) => {
  const initalState: ICreature = {
    id: crypto.randomUUID(),
    name: "",
    initative: "",
    isHidden: false,
    conditions: [],
    isEnemy: true,
  };

  const [creature, setCreature] = useState<ICreature>(initalState);

  const noInit =
    creature.initative === undefined ||
    creature.initative === null ||
    creature.initative === "";

  const noName =
    creature.name === undefined ||
    creature.name === null ||
    creature.name === "";

  const value = useMemo(
    () => ({
      creature,
      setCreature,
      resetCreature: () => setCreature(initalState),
      isAddDisabled: noInit || noName,
    }),
    [creature, setCreature, noInit, noName]
  );

  return (
    <ProviderCreatureContext value={value}>{children}</ProviderCreatureContext>
  );
};
