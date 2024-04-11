import { Container, List } from "@mui/material";
import { Creature, ICreature } from "./components/Creature";
import { NewCreatureRow } from "./components/NewCreatureRow";
import { NavBar } from "./components/NavBar";
import { SnackbarProvider } from "notistack";
import { useLocalStorage } from "usehooks-ts";

const sortCreatures = (creatures: ICreature[]) =>
  creatures.sort(
    (creatureA, creatureB) =>
      Number.parseInt(creatureB.initative) -
      Number.parseInt(creatureA.initative)
  );

const App = () => {
  const [creatureList, setCreatureList] = useLocalStorage<ICreature[]>(
    "encounter",
    []
  );

  const handleAdd = (newCreature: ICreature) =>
    setCreatureList(sortCreatures([...creatureList, newCreature]));

  const handleDelete = (deletedCreatureId: string) => {
    const tempList = creatureList.filter(
      (creature) => creature.id !== deletedCreatureId
    );

    setCreatureList(sortCreatures(tempList));
  };

  const handleUpdate = (updatedCreature: ICreature) => {
    const tempList = [...creatureList];

    const index = tempList.findIndex(
      (creature) => creature.id === updatedCreature.id
    );

    if (index >= 0) {
      tempList[index] = updatedCreature;
      setCreatureList(sortCreatures(tempList));
    }
  };

  return (
    <SnackbarProvider maxSnack={2} autoHideDuration={3000}>
      <NavBar />
      <Container sx={{ px: 2, pt: 9 }}>
        <List disablePadding>
          {creatureList.map((creature) => (
            <Creature
              key={creature.id}
              creature={creature}
              onUpdate={(updatedCreature) => handleUpdate(updatedCreature)}
              onDelete={(deletedCreatureId) => handleDelete(deletedCreatureId)}
            />
          ))}
          <NewCreatureRow onAdd={(newCreature) => handleAdd(newCreature)} />
        </List>
      </Container>
    </SnackbarProvider>
  );
};

export default App;
