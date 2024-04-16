import { DesktopWarning } from "../components/DesktopWarning/DesktopWarning";
import { NavBar } from "../components/NavBar/NavBar";
import { CreatureList } from "../components/CreatureList/CreatureList";
import { NewCreatureRow } from "../components/NewCreatureRow/NewCreatureRow";
import { useIsMobile } from "../hooks/is-mobile.hook";
import { useParams } from "react-router-dom";
import { ICreature, useEncounterById } from "../api/use-encounters";

const sortCreatures = (creatures: ICreature[]) =>
  creatures.sort(
    (creatureA, creatureB) =>
      Number.parseInt(creatureB.initative) -
      Number.parseInt(creatureA.initative)
  );

export const CreaturesPage = () => {
  let { id } = useParams();
  const isMobile = useIsMobile();

  const { encounter, setEncounterList } = useEncounterById(id ?? "");

  if (encounter === undefined) return null;
  if (!isMobile) return <DesktopWarning />;

  const handleAdd = (newCreature: ICreature) =>
    setEncounterList([
      {
        ...encounter,
        creatures: sortCreatures([...encounter.creatures, newCreature]),
      },
    ]);

  const handleDelete = (deletedCreatureId: string) => {
    const tempList = encounter.creatures.filter(
      (creature) => creature.id !== deletedCreatureId
    );

    if (tempList.length === 0) {
      setEncounterList([
        { ...encounter, creatures: [], round: 1, activeCreatureId: "" },
      ]);
    } else {
      setEncounterList([
        {
          ...encounter,
          creatures: sortCreatures(tempList),
        },
      ]);
    }
  };

  const handleUpdate = (updatedCreature: ICreature) => {
    const tempList = [...encounter.creatures];

    const index = tempList.findIndex(
      (creature) => creature.id === updatedCreature.id
    );

    if (index >= 0) {
      tempList[index] = updatedCreature;
      setEncounterList([
        {
          ...encounter,
          creatures: sortCreatures(tempList),
        },
      ]);
    }
  };

  const incrementTurn = (
    currentIndex: number,
    creatureCount: number,
    firstCreatureId: string
  ) => {
    const nextCreatureId =
      encounter.creatures[currentIndex + 1]?.id ?? firstCreatureId;

    const round =
      currentIndex + 1 === creatureCount
        ? encounter.round + 1
        : encounter.round;

    setEncounterList([
      { ...encounter, round, activeCreatureId: nextCreatureId },
    ]);
  };

  const decrementTurn = (currentIndex: number, creatureCount: number) => {
    const newRound = currentIndex === 0 ? encounter.round - 1 : encounter.round;

    const nextCreatureId =
      currentIndex === 0
        ? encounter.creatures[creatureCount - 1]?.id
        : encounter.creatures[currentIndex - 1]?.id;

    if (newRound === 0) return;

    setEncounterList([
      { ...encounter, round: newRound, activeCreatureId: nextCreatureId },
    ]);
  };

  const handleTurnChange = (step: -1 | 1) => {
    const creatureCount = encounter.creatures.length;

    // is there a list of creatures
    if (creatureCount === 0)
      return setEncounterList([
        { ...encounter, round: 1, activeCreatureId: "" },
      ]);

    const activeCreatureId = encounter.activeCreatureId;
    const firstCreatureId = encounter.creatures[0].id;

    // is the current saved ID present in the list of creatures
    if (
      encounter.creatures.find(({ id }) => id === activeCreatureId) ===
      undefined
    )
      return setEncounterList([
        { ...encounter, activeCreatureId: firstCreatureId },
      ]);

    const currentIndex = encounter.creatures.findIndex(
      ({ id }) => id === activeCreatureId
    );

    // on increment
    if (step === 1) incrementTurn(currentIndex, creatureCount, firstCreatureId);

    // on decrement
    if (step === -1) decrementTurn(currentIndex, creatureCount);
  };

  return (
    <>
      <NavBar
        onReset={() =>
          setEncounterList([
            {
              ...encounter,
              round: 1,
              activeCreatureId: encounter.creatures[0]?.id ?? "",
            },
          ])
        }
        encounterName={encounter.name}
        round={encounter.round}
        hasCreatures={encounter.creatures.length > 0}
      />
      <CreatureList
        activeCreatureId={encounter.activeCreatureId}
        creatureList={encounter.creatures}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <NewCreatureRow
        disableNavigation={encounter.creatures.length === 0}
        changeTurn={handleTurnChange}
        onAdd={(newCreature) => handleAdd(newCreature)}
      />
    </>
  );
};
