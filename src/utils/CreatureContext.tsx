import { Dispatch, ReactNode, useMemo, useState } from "react";
import { createContextUtil } from "./context";
import { ICreature } from "../api/encounters";

interface ICreatureContextInterface {
  creature: ICreature;
  setCreature: Dispatch<React.SetStateAction<ICreature>>;
  resetCreature: () => void;
  isAddDisabled: boolean;
}

export const [useCreatureContext, ProviderCreatureContext] =
  createContextUtil<ICreatureContextInterface>();

interface ICreatureContextProviderProps {
  children: ReactNode;
}

export const CreatureContextProvider = ({
  children,
}: ICreatureContextProviderProps) => {
  const initalState: ICreature = {
    id: crypto.randomUUID(),
    name: "",
    initative: "",
    isHidden: false,
    conditions: [],
  };

  const [creature, setCreature] = useState<ICreature>(initalState);

  const resetCreature = () => setCreature(initalState);

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
      resetCreature,
      isAddDisabled: noInit || noName,
    }),
    [creature, setCreature, resetCreature, noInit, noName]
  );

  return (
    <ProviderCreatureContext value={value}>{children}</ProviderCreatureContext>
  );
};
