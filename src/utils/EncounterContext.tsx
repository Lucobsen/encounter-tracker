import { ReactNode, useMemo, useState } from "react";
import { createContextUtil } from "./context";
import { getEncounters, IEncounter, setEncounters } from "../api/encounters";

interface IEncounterContextInterface {
  encounters: IEncounter[];
  updateEncounters: (updatedList: IEncounter[]) => void;
}

export const [useEncounterContext, ProviderEncounterContext] =
  createContextUtil<IEncounterContextInterface>();

interface IEncounterContextProviderProps {
  children: ReactNode;
}

export const EncounterContextProvider = ({
  children,
}: IEncounterContextProviderProps) => {
  const [encounters, setEncounterList] = useState<IEncounter[]>(
    getEncounters()
  );

  const updateEncounters = (updatedList: IEncounter[]) => {
    setEncounterList(updatedList);
    setEncounters(updatedList);
  };

  const value = useMemo(
    () => ({
      encounters,
      updateEncounters,
    }),
    [encounters, updateEncounters]
  );

  return (
    <ProviderEncounterContext value={value}>
      {children}
    </ProviderEncounterContext>
  );
};
