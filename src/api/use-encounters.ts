import { useLocalStorage } from "usehooks-ts";

export interface ICreature {
  id: string;
  initative: string;
  name: string;
  hp?: string;
  isHidden: boolean;
  conditions: string[];
}

export interface IEncounter {
  creatures: ICreature[];
  id: string;
  name: string;
  createdOn: string;
  lastUpdatedOn: string;
  round: number;
  activeCreatureId: string;
}

export const useEncounters = () => {
  const [encounterList, setEncounterList] = useLocalStorage<IEncounter[]>(
    "encounters",
    []
  );

  return [encounterList, setEncounterList] as const;
};

export const useEncounterById = (id: string) => {
  const [encounterList, setEncounterList] = useEncounters();

  const currentEncounter = encounterList.find(
    (encounter) => encounter.id === id
  );

  return { encounter: currentEncounter, setEncounterList } as const;
};
