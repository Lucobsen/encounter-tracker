import { ReactNode, useMemo, useState } from "react";
import { getParties, IParty, setParties } from "../api/parties";
import { createContextUtil } from "./context";

type PartyContextProps = {
  partyList: IParty[];
  updatePartyList: (updatedList: IParty[]) => void;
};

export const [usePartyContext, ProviderPartyContext] =
  createContextUtil<PartyContextProps>();

type PartyContextProviderProps = {
  children: ReactNode;
};

export const PartyContextProvider = ({
  children,
}: PartyContextProviderProps) => {
  const [partyList, setPartyList] = useState<IParty[]>(getParties());

  const value = useMemo(
    () => ({
      partyList,
      updatePartyList: (updatedList: IParty[]) => {
        setPartyList(updatedList);
        setParties(updatedList);
      },
    }),
    [partyList]
  );

  return <ProviderPartyContext value={value}>{children}</ProviderPartyContext>;
};
