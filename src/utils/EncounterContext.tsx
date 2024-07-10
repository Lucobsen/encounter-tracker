import { ReactNode, useMemo, useState } from "react";
import { createContextUtil } from "./context";
import { getEncounters, IEncounter, setEncounters } from "../api/encounters";

// TODO: add sorting
// const sortEncounters = (encounters: IEncounter[]) =>
//   encounters.sort(
//     (encounterA, encounterB) =>
//       Number.parseInt(encounterB.lastUpdatedOn) -
//       Number.parseInt(encounterA.lastUpdatedOn)
//   );

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
    setEncounterList(updatedList);
    setEncounters(updatedList);
  };

  const updateSelectedEncounter = (updatedEncounter: IEncounter) => {
    const otherEncounters = encounters.filter(
      ({ id }) => id !== updatedEncounter.id
    );
    const updatedList = [...otherEncounters, updatedEncounter];

    setEncounterList(updatedList);
    setEncounters(updatedList);
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
