import {
  Container,
  List,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { Creature, ICreature } from "./components/Creature";
import { NewCreatureRow } from "./components/NewCreatureRow";
import { NavBar } from "./components/NavBar";
import { SnackbarProvider } from "notistack";
import { useLocalStorage } from "usehooks-ts";
import { useMemo } from "react";

interface IRound {
  round: number;
  activeCreatureId: string;
}

const sortCreatures = (creatures: ICreature[]) =>
  creatures.sort(
    (creatureA, creatureB) =>
      Number.parseInt(creatureB.initative) -
      Number.parseInt(creatureA.initative)
  );

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const mainTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const [creatureList, setCreatureList] = useLocalStorage<ICreature[]>(
    "encounter",
    []
  );
  const [combatRound, setCombatRound] = useLocalStorage<IRound>("round", {
    round: 1,
    activeCreatureId: "",
  });

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

  const handleTurnChange = (step: -1 | 1) => {
    const activeCreatureId = combatRound.activeCreatureId;
    const firstCreatureId = creatureList[0].id;

    // if there is no active creature, set the first creature
    if (!activeCreatureId) {
      if (firstCreatureId)
        setCombatRound({ ...combatRound, activeCreatureId: firstCreatureId });
    } else {
      const index = creatureList.findIndex(({ id }) => id === activeCreatureId);

      if (index > 0) {
        setCombatRound({
          ...combatRound,
          activeCreatureId: creatureList[index + step]?.id ?? firstCreatureId,
        });
      } else if (index === 0) {
        setCombatRound({
          ...combatRound,
          activeCreatureId:
            creatureList[step === -1 ? creatureList.length - 1 : step]?.id ??
            firstCreatureId,
        });
      }
    }
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <SnackbarProvider maxSnack={2} autoHideDuration={3000}>
        <NavBar round={combatRound.round} />
        <Container sx={{ px: 2, pt: 9, pb: 8 }}>
          <List disablePadding>
            {creatureList.map((creature) => (
              <Creature
                hasCurrentTurn={combatRound.activeCreatureId === creature.id}
                key={creature.id}
                creature={creature}
                onUpdate={(updatedCreature) => handleUpdate(updatedCreature)}
                onDelete={(deletedCreatureId) =>
                  handleDelete(deletedCreatureId)
                }
              />
            ))}
          </List>
        </Container>
        <NewCreatureRow
          changeTurn={handleTurnChange}
          onAdd={(newCreature) => handleAdd(newCreature)}
        />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
