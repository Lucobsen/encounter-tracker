import { DesktopWarning } from "../components/shared/DesktopWarning/DesktopWarning";
import { useIsMobile } from "../hooks/is-mobile.hook";
import { PartyNavBar } from "../components/Parties/PartyNavBar/PartyNavBar";
import { PartyList } from "../components/Parties/PartyList/PartyList";

export const PartyPage = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return <DesktopWarning />;

  return (
    <>
      <PartyNavBar />
      <PartyList />
    </>
  );
};
