import { Button, Container, Stack, useTheme } from "@mui/material";
import { useLocalStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import { ICreature } from "../Creature/Creature";
import { EmptyState } from "./EmptyState";

interface Encounter {
  creatures: ICreature[];
  id: string;
  name: string;
  createdOn: string;
  lastUpdatedOn: string;
}

export const EncounterList = () => {
  const { palette } = useTheme();
  const [creatureList, setCreatureList] = useLocalStorage<ICreature[]>(
    "encounter",
    []
  );

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

  const navigate = useNavigate();

  return (
    <Container sx={{ px: 2, pt: 9, pb: 8 }}>
      {encounterList.length > 0 ? (
        <Stack alignItems="center">
          {encounterList.map(({ name, id }) => (
            <Button
              key={id}
              variant="contained"
              color="info"
              onClick={() => navigate(`/${id}`)}
              sx={{
                color: palette.text.primary,
                border: `1px solid ${palette.text.primary}`,
              }}
            >
              {name}
            </Button>
          ))}
        </Stack>
      ) : (
        <EmptyState />
      )}
    </Container>
  );
};
