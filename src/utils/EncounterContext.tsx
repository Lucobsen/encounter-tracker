import { ReactNode, useMemo, useState } from "react";
import { createContextUtil } from "./context";
import { getEncounters, IEncounter, setEncounters } from "../api/encounters";
import { isBefore } from "date-fns";

const sortEncounters = (encounters: IEncounter[]) =>
  encounters.sort((encounterA, encounterB) =>
    isBefore(encounterA.lastUpdatedOn, encounterB.lastUpdatedOn) ? 1 : -1
  );

interface IEncounterContextInterface {
  encounters: IEncounter[];
  updateEncounters: (updatedList: IEncounter[]) => void;
  updateSelectedEncounter: (updatedEncounter: IEncounter) => void;
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
    const sortedList = sortEncounters(updatedList);

    setEncounterList(sortedList);
    setEncounters(sortedList);
  };

  const updateSelectedEncounter = (updatedEncounter: IEncounter) => {
    const otherEncounters = encounters.filter(
      ({ id }) => id !== updatedEncounter.id
    );
    const updatedList = [...otherEncounters, updatedEncounter];
    const sortedList = sortEncounters(updatedList);

    setEncounterList(sortedList);
    setEncounters(sortedList);
  };

  const value = useMemo(
    () => ({
      encounters,
      updateEncounters,
      updateSelectedEncounter,
    }),
    [encounters, updateEncounters]
  );

  return (
    <ProviderEncounterContext value={value}>
      {children}
    </ProviderEncounterContext>
  );
};
