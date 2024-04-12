import { Container, List } from "@mui/material";
import { Creature, ICreature } from "./Creature";

interface ICreatureList {
  creatureList: ICreature[];
  activeCreatureId: string;
  onUpdate: (updatedCreature: ICreature) => void;
  onDelete: (deletedCreatureId: string) => void;
}

export const CreatureList = ({
  creatureList,
  activeCreatureId,
  onDelete,
  onUpdate,
}: ICreatureList) => (
  <Container sx={{ px: 2, pt: 9, pb: 8 }}>
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
  </Container>
);
