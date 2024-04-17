import { Container, Stack } from "@mui/material";
import { EmptyState } from "./EmptyState";
import { EncounterItem } from "../EncounterItem/EncounterItem";
import { useNavigate } from "react-router-dom";
import {
  IEncounter,
  getEncounters,
  setEncounters,
} from "../../../api/encounters";
import { useState } from "react";

export const EncounterList = () => {
  const navigate = useNavigate();
  const [encounterList, setEncounterList] = useState<IEncounter[]>(
    getEncounters()
  );

  const handleNameChange = (newName: string, id: string) => {
    const tempList = [...encounterList];
    const index = tempList.findIndex((item) => item.id === id);

    if (index >= 0) {
      tempList[index].name = newName;
      setEncounterList(tempList);
      setEncounters(tempList);
    }
  };

  const handleOnCreate = (newName: string) => {
    const newEncounter: IEncounter = {
      id: crypto.randomUUID(),
      name: newName,
      creatures: [],
      createdOn: new Date().toISOString(),
      lastUpdatedOn: new Date().toISOString(),
      round: 1,
      activeCreatureId: "",
    };

    setEncounterList([...encounterList, newEncounter]);
    setEncounters([...encounterList, newEncounter]);
    navigate(newEncounter.id);
  };

  const handleOnDelete = (deletedId: string) => {
    const filteredEncounters = encounterList.filter(
      ({ id }) => id !== deletedId
    );

    setEncounterList(filteredEncounters);
    setEncounters(filteredEncounters);
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
              onDelete={handleOnDelete}
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
