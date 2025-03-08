
import { Metadata } from "next";
import WaitingPageDetails from "./_component/waiting-page-details";

export const metadata: Metadata = {
  title: "Waitlist | Megha Express Panel",
};





const WaitingPage = () => {
  return (
    <WaitingPageDetails />
  );
};

export default WaitingPage;
