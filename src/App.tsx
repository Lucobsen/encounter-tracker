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
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

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
    activeCreatureId: creatureList[0]?.id ?? "",
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

  const incrementTurn = (
    currentIndex: number,
    creatureCount: number,
    firstCreatureId: string
  ) => {
    const nextCreatureId =
      creatureList[currentIndex + 1]?.id ?? firstCreatureId;

    const round =
      currentIndex + 1 === creatureCount
        ? combatRound.round + 1
        : combatRound.round;

    setCombatRound({
      round,
      activeCreatureId: nextCreatureId,
    });
  };

  const decrementTurn = (currentIndex: number, creatureCount: number) => {
    const newRound =
      currentIndex === 0 ? combatRound.round - 1 : combatRound.round;

    const nextCreatureId =
      currentIndex === 0
        ? creatureList[creatureCount - 1]?.id
        : creatureList[currentIndex - 1]?.id;

    if (newRound === 0) return;

    setCombatRound({
      activeCreatureId: nextCreatureId,
      round: newRound,
    });
  };

  const handleTurnChange = (step: -1 | 1) => {
    const creatureCount = creatureList.length;

    // is there a list of creatures
    if (creatureCount === 0)
      return setCombatRound({
        round: 1,
        activeCreatureId: "",
      });

    const activeCreatureId = combatRound.activeCreatureId;
    const firstCreatureId = creatureList[0].id;

    // is the current saved ID present in the list of creatures
    if (creatureList.find(({ id }) => id === activeCreatureId) === undefined)
      return setCombatRound({
        ...combatRound,
        activeCreatureId: firstCreatureId,
      });

    const currentIndex = creatureList.findIndex(
      ({ id }) => id === activeCreatureId
    );

    // on increment
    if (step === 1) incrementTurn(currentIndex, creatureCount, firstCreatureId);

    // on decrement
    if (step === -1) decrementTurn(currentIndex, creatureCount);
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
          disableNavigation={creatureList.length === 0}
          changeTurn={handleTurnChange}
          onAdd={(newCreature) => handleAdd(newCreature)}
        />
        <Analytics />
        <SpeedInsights />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
