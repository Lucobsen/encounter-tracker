import { Container, Stack } from "@mui/material";
import { useLocalStorage } from "usehooks-ts";
import { ICreature } from "../Creature/Creature";
import { EmptyState } from "./EmptyState";
import { EncounterItem } from "../EncounterItem/EncounterItem";
import { useNavigate } from "react-router-dom";

interface Encounter {
  creatures: ICreature[];
  id: string;
  name: string;
  createdOn: string;
  lastUpdatedOn: string;
}

export const EncounterList = () => {
  const [creatureList] = useLocalStorage<ICreature[]>("encounter", []);
  const navigate = useNavigate();

  const importedList: Encounter[] =
    creatureList.length > 0
      ? [
          {
            id: crypto.randomUUID(),
            name: "Encounter One",
            creatures: creatureList,
            createdOn: new Date().toISOString(),
            lastUpdatedOn: new Date().toISOString(),
          },
        ]
      : [];

  const [encounterList, setEncounterList] = useLocalStorage<Encounter[]>(
    "encounterList",
    importedList
  );

  const handleNameChange = (newName: string, id: string) => {
    const tempList = [...encounterList];
    const index = tempList.findIndex((item) => item.id === id);

    if (index >= 0) {
      tempList[index].name = newName;
      setEncounterList(tempList);
    }
  };

  const handleOnCreate = (newName: string) => {
    const newEncounter: Encounter = {
      id: crypto.randomUUID(),
      name: newName,
      creatures: [],
      createdOn: new Date().toISOString(),
      lastUpdatedOn: new Date().toISOString(),
    };

    setEncounterList([...encounterList, newEncounter]);
    navigate(newEncounter.id);
  };

  return (
    <Container sx={{ px: 2, pt: 9, pb: 8 }}>
      {encounterList.length > 0 ? (
        <Stack alignItems="center">
          {encounterList.map(({ name, id }) => (
            <EncounterItem
              key={id}
              id={id}
              name={name}
              onUpdate={(newName) => handleNameChange(newName, id)}
            />
          ))}
        </Stack>
      ) : (
        <EmptyState onCreate={handleOnCreate} />
      )}
    </Container>
  );
};
