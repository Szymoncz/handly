import Offer from "../components/Offer";
import AddOffer from "../components/AddOffer";

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard for logged in</h1>
      <AddOffer />
      <Offer />
    </>
  );
}
