import Offer from "../components/Offer";

export default function Dashboard() {
  return (
    <>
      <Offer showAdd={true} showDelete={true} currentUserId={1} />
    </>
  );
}
