import { Container, List } from "@mui/material";
import { useState } from "react";
import { Creature, ICreature } from "./components/Creature";
import { NewCreatureRow } from "./components/NewCreatureRow";
import { NavBar } from "./components/AppBar";
import { SnackbarProvider } from "notistack";

const sortCreatures = (creatures: ICreature[]) =>
  creatures.sort(
    (creatureA, creatureB) =>
      Number.parseInt(creatureB.initative) -
      Number.parseInt(creatureA.initative)
  );

const App = () => {
  const [creatureList, setCreatureList] = useState<ICreature[]>([]);

  const handleAdd = (newCreature: ICreature) =>
    setCreatureList(sortCreatures([...creatureList, newCreature]));

  const handleDelete = (name: string, initative: string) => {
    const tempList = creatureList.filter(
      (creature) => creature.name !== name && creature.initative !== initative
    );

    setCreatureList(sortCreatures(tempList));
  };

  return (
    <SnackbarProvider maxSnack={2} autoHideDuration={3000}>
      <NavBar />
      <Container sx={{ px: 2, pt: 9 }}>
        <List disablePadding>
          {creatureList.map((creature, index) => (
            <Creature
              key={`${creature.initative}-${creature.name}-${index}`}
              creature={creature}
              onDelete={(name, initative) => handleDelete(name, initative)}
            />
          ))}
          <NewCreatureRow onAdd={(newCreature) => handleAdd(newCreature)} />
        </List>
      </Container>
    </SnackbarProvider>
  );
};

export default App;
