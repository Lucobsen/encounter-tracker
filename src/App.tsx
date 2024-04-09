import {
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface Creature {
  initative: string;
  name: string;
  hp?: string;
}

const creatures: Creature[] = [
  {
    initative: "12",
    name: "Gobo",
    hp: "7",
  },
  {
    initative: "21",
    name: "Hero Abel",
    hp: "102",
  },
  {
    initative: "9",
    name: "Hero Cain",
    hp: "73",
  },
];

const App = () => {
  const [creatureList, setCreatureList] = useState(creatures);
  const [newCreature, setNewCreature] = useState("");

  const handleInitativeChange = (
    newValue: string,
    name: string,
    initative: string
  ) => {
    const tempCreatures = [...creatureList];
    const index = tempCreatures.findIndex(
      (creature) => creature.name === name && creature.initative === initative
    );

    if (index >= 0) {
      tempCreatures[index] = {
        ...tempCreatures[index],
        initative: newValue,
      };

      setCreatureList(tempCreatures);
    }
  };

  const handleNameChange = (
    newValue: string,
    name: string,
    initative: string
  ) => {
    const tempCreatures = [...creatureList];
    const index = tempCreatures.findIndex(
      (creature) => creature.name === name && creature.initative === initative
    );

    if (index >= 0) {
      tempCreatures[index] = {
        ...tempCreatures[index],
        name: newValue,
      };

      setCreatureList(tempCreatures);
    }
  };

  const handleDelete = (name: string, initative: string) => {
    const tempList = creatureList.filter(
      (creature) => creature.name !== name && creature.initative !== initative
    );

    setCreatureList(tempList);
  };

  const handleAdd = () => {
    setCreatureList([
      ...creatureList,
      {
        name: newCreature,
        initative: "0",
      },
    ]);

    setNewCreature("");
  };

  return (
    <Container sx={{ p: 2 }}>
      <Typography variant="h5">TTRPG Combat Tracker</Typography>
      <List>
        {creatureList.map(({ name, initative }, index) => (
          <ListItem key={`${initative}-${name}-${index}`} disableGutters>
            <Grid container direction="row" spacing={1} alignItems="center">
              <Grid item xs={2}>
                <TextField
                  size="small"
                  type="number"
                  fullWidth
                  onChange={({ target }) =>
                    handleInitativeChange(target.value, name, initative)
                  }
                  value={initative}
                  variant="outlined"
                  placeholder="Update creature initative"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  size="small"
                  type="text"
                  fullWidth
                  onChange={({ target }) =>
                    handleNameChange(target.value, name, initative)
                  }
                  value={name}
                  variant="outlined"
                  placeholder="Update creature name"
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => handleDelete(name, initative)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
        ))}
        <Stack direction="row">
          <TextField
            size="small"
            fullWidth
            value={newCreature}
            onChange={({ target }) => setNewCreature(target.value)}
            variant="outlined"
            placeholder="Add new creature"
          />
          <IconButton onClick={() => handleAdd()}>
            <AddIcon />
          </IconButton>
        </Stack>
      </List>
    </Container>
  );
};

export default App;
