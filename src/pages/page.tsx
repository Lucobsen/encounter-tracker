import { ICreature } from "../components/Creature";
import { useLocalStorage } from "usehooks-ts";
import { DesktopWarning } from "../components/DesktopWarning";
import { NavBar } from "../components/NavBar";
import { CreatureList } from "../components/CreatureList/CreatureList";
import { NewCreatureRow } from "../components/NewCreatureRow";
import { useIsMobile } from "../hooks/is-mobile.hook";

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

export const Page = () => {
  const isMobile = useIsMobile();

  const [creatureList, setCreatureList] = useLocalStorage<ICreature[]>(
    "encounter",
    []
  );

  const [combatRound, setCombatRound] = useLocalStorage<IRound>("round", {
    round: 1,
    activeCreatureId: creatureList[0]?.id ?? "",
  });

  if (!isMobile) return <DesktopWarning />;

  const handleAdd = (newCreature: ICreature) =>
    setCreatureList(sortCreatures([...creatureList, newCreature]));

  const handleDelete = (deletedCreatureId: string) => {
    const tempList = creatureList.filter(
      (creature) => creature.id !== deletedCreatureId
    );

    setCreatureList(sortCreatures(tempList));

    if (tempList.length === 0) {
      setCombatRound({
        round: 1,
        activeCreatureId: "",
      });
    }
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
    <>
      <NavBar
        round={combatRound.round}
        hasCreatures={creatureList.length > 0}
      />
      <CreatureList
        activeCreatureId={combatRound.activeCreatureId}
        creatureList={creatureList}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <NewCreatureRow
        disableNavigation={creatureList.length === 0}
        changeTurn={handleTurnChange}
        onAdd={(newCreature) => handleAdd(newCreature)}
      />
    </>
  );
};
