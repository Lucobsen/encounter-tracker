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
  const [creatureList] = useLocalStorage<ICreature[]>("encounter", []);

  const importedList: IEncounter[] =
    creatureList.length > 0
      ? [
          {
            id: crypto.randomUUID(),
            name: "Encounter One",
            creatures: creatureList,
            createdOn: new Date().toISOString(),
            lastUpdatedOn: new Date().toISOString(),
            round: 1,
            activeCreatureId: "",
          },
        ]
      : [];

  const [encounterList, setEncounterList] = useLocalStorage<IEncounter[]>(
    "encounterList",
    importedList
  );

  return [encounterList, setEncounterList] as const;
};

export const useEncounterById = (id: string) => {
  const [creatureList] = useLocalStorage<ICreature[]>("encounter", []);

  const importedList: IEncounter[] =
    creatureList.length > 0
      ? [
          {
            id: crypto.randomUUID(),
            name: "Encounter One",
            creatures: creatureList,
            createdOn: new Date().toISOString(),
            lastUpdatedOn: new Date().toISOString(),
            round: 1,
            activeCreatureId: "",
          },
        ]
      : [];

  const [encounterList, setEncounterList] = useLocalStorage<IEncounter[]>(
    "encounterList",
    importedList
  );

  const currentEncounter = encounterList.find(
    (encounter) => encounter.id === id
  );

  return { encounter: currentEncounter, setEncounterList } as const;
};
