import { EncounterList } from "../components/Encounters/EncounterList/EncounterList";
import { DesktopWarning } from "../components/shared/DesktopWarning/DesktopWarning";
import { useIsMobile } from "../hooks/is-mobile.hook";
import { EncountersNavBar } from "../components/Encounters/EncountersNavBar/EncountersNavBar";
import { PartyNavBar } from "../components/Parties/PartyNavBar/PartyNavBar";

export const PartyPage = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return <DesktopWarning />;

  return (
    <>
      <PartyNavBar />
    </>
  );
};
