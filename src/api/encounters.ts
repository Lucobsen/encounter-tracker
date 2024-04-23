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

const ENCOUNTERS_KEY = "encounters";

export const getEncounters = (): IEncounter[] => {
  const localEncounters = localStorage.getItem(ENCOUNTERS_KEY);

  if (localEncounters === null) return [];

  return JSON.parse(localEncounters);
};

export const getEncounterById = (id: string): IEncounter | undefined => {
  const encounters = getEncounters();

  return encounters.find((encounter) => encounter.id === id);
};

export const setEncounters = (value: IEncounter[]) =>
  localStorage.setItem(ENCOUNTERS_KEY, JSON.stringify(value));
