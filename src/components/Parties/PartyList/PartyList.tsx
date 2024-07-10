import { Button, Container, Stack } from "@mui/material";
import { EmptyState } from "./EmptyState";
import { useState } from "react";
import { IHero, IParty, getParties, setParties } from "../../../api/parties";
import { PartyItem } from "../PartyItem/PartyItem";
import { NamingModal } from "../../shared/Modals/NamingModal";

export const PartyList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  const handleOnUpdatePartyName = (id: string, updatedPartyName: string) => {
    const party = partyList.find((party) => party.id === id);

    if (party === undefined) return;

    party.name = updatedPartyName;

    setPartyList(partyList);
    setParties(partyList);
  };

  const handleOnDeleteParty = (deletedId: string) => {
    const updatedList = partyList.filter(({ id }) => id !== deletedId);

    setPartyList(updatedList);
    setParties(updatedList);
  };

  return (
    <>
      <Container sx={{ px: 2, pt: 9, pb: 8 }}>
        {partyList.length > 0 ? (
          <>
            <Stack alignItems="center" spacing={2}>
              {partyList.map(({ name, heroes, id }, index) => (
                <PartyItem
                  name={name}
                  heroes={heroes}
                  key={id}
                  onDeleteParty={() => handleOnDeleteParty(id)}
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
                  onUpdatePartyName={(updatedPartyName) =>
                    handleOnUpdatePartyName(id, updatedPartyName)
                  }
                />
              ))}
            </Stack>
            <Button
              disabled={partyList.length >= 6}
              variant="contained"
              color="success"
              sx={{
                fontWeight: "bold",
                position: "fixed",
                bottom: "5%",
                left: "50%",
                width: "60%",
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => setIsAddModalOpen(true)}
            >
              Add party
            </Button>
          </>
        ) : (
          <EmptyState openModal={() => setIsAddModalOpen(true)} />
        )}
      </Container>

      <NamingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        placeholder="Enter party name"
        label="Party Name"
        onCreate={(newName) => {
          handleOnCreate(newName);
          setIsAddModalOpen(false);
        }}
      />
    </>
  );
};
