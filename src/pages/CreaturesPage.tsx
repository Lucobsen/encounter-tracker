import { DesktopWarning } from "../components/shared/DesktopWarning/DesktopWarning";
import { NavBar } from "../components/Creatures/CreatureNavBar/CreatureNavBar";
import { CreatureList } from "../components/Creatures/CreatureList/CreatureList";
import { NewCreatureRow } from "../components/Creatures/NewCreatureRow/NewCreatureRow";
import { useIsMobile } from "../hooks/is-mobile.hook";
import { ICreature } from "../api/encounters";
import { IHero } from "../api/parties";
import { useEncounterContext } from "../utils/EncounterContext";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { CreatureContextProvider } from "../utils/CreatureContext";

const sortCreatures = (creatures: ICreature[]) =>
  creatures.sort(
    (creatureA, creatureB) =>
      Number.parseInt(creatureB.initative) -
      Number.parseInt(creatureA.initative)
  );

export const CreaturesPage = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const { encounters, updateSelectedEncounter } = useEncounterContext();

  if (!isMobile) return <DesktopWarning />;

  const selectedEncounter = encounters.find(
    ({ id: encounterId }) => id === encounterId
  );

  if (selectedEncounter === undefined)
    return <Typography color="error">Something went wrong...</Typography>;

  const handleImport = (heroes: IHero[]) =>
    updateSelectedEncounter({
      ...selectedEncounter,
      lastUpdatedOn: new Date().toISOString(),
      creatures: heroes.map<ICreature>(({ id, name }) => ({
        conditions: [],
        id,
        name,
        isHidden: false,
        initative: " 0",
      })),
    });

  const handleAdd = (newCreature: ICreature) =>
    updateSelectedEncounter({
      ...selectedEncounter,
      lastUpdatedOn: new Date().toISOString(),
      creatures: sortCreatures([...selectedEncounter.creatures, newCreature]),
    });

  const handleDelete = (deletedCreatureId: string) => {
    const tempList = selectedEncounter.creatures.filter(
      (creature) => creature.id !== deletedCreatureId
    );

    if (tempList.length === 0) {
      updateSelectedEncounter({
        ...selectedEncounter,
        lastUpdatedOn: new Date().toISOString(),
        creatures: [],
        round: 1,
        activeCreatureId: "",
      });
    } else {
      updateSelectedEncounter({
        ...selectedEncounter,
        lastUpdatedOn: new Date().toISOString(),
        creatures: sortCreatures(tempList),
      });
    }
  };

  const handleUpdate = (updatedCreature: ICreature) => {
    const tempList = selectedEncounter.creatures;

    const index = tempList.findIndex(
      (creature) => creature.id === updatedCreature.id
    );

    if (index >= 0) {
      tempList[index] = updatedCreature;

      updateSelectedEncounter({
        ...selectedEncounter,
        lastUpdatedOn: new Date().toISOString(),
        creatures: sortCreatures(tempList),
      });
    }
  };

  const incrementTurn = (
    currentIndex: number,
    creatureCount: number,
    firstCreatureId: string
  ) => {
    const nextCreatureId =
      selectedEncounter.creatures[currentIndex + 1]?.id ?? firstCreatureId;

    const round =
      currentIndex + 1 === creatureCount
        ? selectedEncounter.round + 1
        : selectedEncounter.round;

    updateSelectedEncounter({
      ...selectedEncounter,
      round,
      activeCreatureId: nextCreatureId,
      lastUpdatedOn: new Date().toISOString(),
    });
  };

  const decrementTurn = (currentIndex: number, creatureCount: number) => {
    const newRound =
      currentIndex === 0
        ? selectedEncounter.round - 1
        : selectedEncounter.round;

    const nextCreatureId =
      currentIndex === 0
        ? selectedEncounter.creatures[creatureCount - 1]?.id
        : selectedEncounter.creatures[currentIndex - 1]?.id;

    if (newRound === 0) return;

    updateSelectedEncounter({
      ...selectedEncounter,
      round: newRound,
      activeCreatureId: nextCreatureId,
      lastUpdatedOn: new Date().toISOString(),
    });
  };

  const handleTurnChange = (step: -1 | 1) => {
    const creatureCount = selectedEncounter.creatures.length;

    // is there a list of creatures
    if (creatureCount === 0)
      return updateSelectedEncounter({
        ...selectedEncounter,
        round: 1,
        activeCreatureId: "",
        lastUpdatedOn: new Date().toISOString(),
      });

    const activeCreatureId = selectedEncounter.activeCreatureId;
    const firstCreatureId = selectedEncounter.creatures[0].id;

    // is the current saved ID present in the list of creatures
    if (
      selectedEncounter.creatures.find(({ id }) => id === activeCreatureId) ===
      undefined
    )
      return updateSelectedEncounter({
        ...selectedEncounter,
        activeCreatureId: firstCreatureId,
        lastUpdatedOn: new Date().toISOString(),
      });

    const currentIndex = selectedEncounter.creatures.findIndex(
      ({ id }) => id === activeCreatureId
    );

    // on increment
    if (step === 1) incrementTurn(currentIndex, creatureCount, firstCreatureId);

    // on decrement
    if (step === -1) decrementTurn(currentIndex, creatureCount);
  };

  const handleReset = () =>
    updateSelectedEncounter({
      ...selectedEncounter,
      round: 1,
      lastUpdatedOn: new Date().toISOString(),
      activeCreatureId: selectedEncounter.creatures[0]?.id ?? "",
      inProgress: true,
    });

  const handleStartEncounter = () =>
    updateSelectedEncounter({
      ...selectedEncounter,
      round: 1,
      lastUpdatedOn: new Date().toISOString(),
      activeCreatureId: selectedEncounter.creatures[0]?.id ?? "",
      inProgress: true,
    });

  return (
    <>
      <NavBar
        onReset={handleReset}
        encounterName={selectedEncounter.name}
        round={selectedEncounter.round}
        hasCreatures={selectedEncounter.creatures.length > 0}
        startEncounter={handleStartEncounter}
        inProgress={selectedEncounter.inProgress}
      />
      <CreatureList
        activeCreatureId={selectedEncounter.activeCreatureId}
        creatureList={selectedEncounter.creatures}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onImport={handleImport}
      />
      <CreatureContextProvider>
        <NewCreatureRow
          changeTurn={handleTurnChange}
          onAdd={handleAdd}
          inProgress={selectedEncounter.inProgress}
        />
      </CreatureContextProvider>
    </>
  );
};
