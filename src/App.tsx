import { Container, List, Typography } from "@mui/material";
import { useState } from "react";
import { Creature, ICreature } from "./components/Creature";
import { NewCreatureRow } from "./components/NewCreatureRow";

const App = () => {
  const [creatureList, setCreatureList] = useState<ICreature[]>([]);

  const handleAdd = (newCreature: ICreature) =>
    setCreatureList(
      [...creatureList, newCreature].sort(
        (creatureA, creatureB) =>
          Number.parseInt(creatureB.initative) -
          Number.parseInt(creatureA.initative)
      )
    );

  const handleDelete = (name: string, initative: string) => {
    const tempList = creatureList.filter(
      (creature) => creature.name !== name && creature.initative !== initative
    );

    setCreatureList(
      tempList.sort(
        (creatureA, creatureB) =>
          Number.parseInt(creatureB.initative) -
          Number.parseInt(creatureA.initative)
      )
    );
  };

  return (
    <Container sx={{ p: 2 }}>
      <Typography variant="h5">TTRPG Combat Tracker</Typography>
      <List>
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
  );
};

export default App;
