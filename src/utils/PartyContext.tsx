import { ReactNode, useMemo, useState } from "react";
import { getParties, IParty, setParties } from "../api/parties";
import { createContextUtil } from "./context";

interface IPartyContextInterface {
  partyList: IParty[];
  updatePartyList: (updatedList: IParty[]) => void;
}

export const [usePartyContext, ProviderPartyContext] =
  createContextUtil<IPartyContextInterface>();

interface IPartyContextProviderProps {
  children: ReactNode;
}

export const PartyContextProvider = ({
  children,
}: IPartyContextProviderProps) => {
  const [partyList, setPartyList] = useState<IParty[]>(getParties());

  const updatePartyList = (updatedList: IParty[]) => {
    setPartyList(updatedList);
    setParties(updatedList);
  };

  const value = useMemo(
    () => ({
      partyList,
      updatePartyList,
    }),
    [partyList, updatePartyList]
  );

  return <ProviderPartyContext value={value}>{children}</ProviderPartyContext>;
};
