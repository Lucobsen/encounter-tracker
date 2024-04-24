import { Container, Stack } from "@mui/material";
import { EmptyState } from "./EmptyState";
import { useState } from "react";
import { IHero, IParty, getParties, setParties } from "../../../api/parties";
import { PartyItem } from "../PartyItem/PartyItem";

export const PartyList = () => {
  const [partyList, setPartyList] = useState<IParty[]>(getParties());

  const handleOnCreate = (newPartyName: string) => {
    const updatedList = [
      ...partyList,
      { id: crypto.randomUUID(), heroes: [], name: newPartyName },
    ];

    setPartyList(updatedList);
    setParties(updatedList);
  };

  const handleOnAdd = (partyIndex: number, updatedHeroes: IHero[]) => {
    const tempList = [...partyList];
    tempList[partyIndex].heroes = updatedHeroes;

    setPartyList(tempList);
    setParties(tempList);
  };

  const handleOnDelete = (partyIndex: number, deletedHeroId: string) => {
    const tempList = [...partyList];
    const updatedList = tempList[partyIndex].heroes.filter(
      ({ id }) => id !== deletedHeroId
    );

    tempList[partyIndex].heroes = updatedList;

    setPartyList(tempList);
    setParties(tempList);
  };

  const handleOnUpdate = (
    partyIndex: number,
    heroIndex: number,
    updatedHeroName: string
  ) => {
    const tempList = [...partyList];
    tempList[partyIndex].heroes[heroIndex].name = updatedHeroName;

    setPartyList(tempList);
    setParties(tempList);
  };

  return (
    <Container sx={{ px: 2, pt: 9, pb: 8 }}>
      {partyList.length > 0 ? (
        <Stack alignItems="center">
          {partyList.map(({ name, heroes, id }, index) => (
            <PartyItem
              name={name}
              heroes={heroes}
              key={id}
              onAdd={(newHeroName) =>
                handleOnAdd(index, [
                  ...heroes,
                  { id: crypto.randomUUID(), name: newHeroName },
                ])
              }
              onDelete={(heroId) => handleOnDelete(index, heroId)}
              onUpdate={(heroIndex, updatedHeroName) =>
                handleOnUpdate(index, heroIndex, updatedHeroName)
              }
            />
          ))}
        </Stack>
      ) : (
        <EmptyState onCreate={handleOnCreate} />
      )}
    </Container>
  );
};
