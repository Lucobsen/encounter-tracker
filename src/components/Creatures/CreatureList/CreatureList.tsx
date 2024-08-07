import { Container, List } from "@mui/material";
import { Creature } from "../Creature/Creature";
import { EmptyState } from "./EmptyState";
import { ICreature } from "../../../api/encounters";
import { IHero } from "../../../api/parties";

interface ICreatureList {
  creatureList: ICreature[];
  activeCreatureId: string;
  onUpdate: (updatedCreature: ICreature) => void;
  onDelete: (deletedCreatureId: string) => void;
  onImport: (heroes: IHero[]) => void;
}

export const CreatureList = ({
  creatureList,
  activeCreatureId,
  onDelete,
  onUpdate,
  onImport,
}: ICreatureList) => {
  const hasCreatures = creatureList.length > 0;

  return (
    <Container sx={{ px: 2, pt: 9, pb: 10 }}>
      {hasCreatures ? (
        <List disablePadding>
          {creatureList.map((creature) => (
            <Creature
              hasCurrentTurn={activeCreatureId === creature.id}
              key={creature.id}
              creature={creature}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </List>
      ) : (
        <EmptyState onImport={onImport} />
      )}
    </Container>
  );
};
