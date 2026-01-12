import Offer from "../components/Offer";

export default function Dashboard() {
  return (
    <>
      <h1>Cześć {currentUser.username}</h1>
      <Offer />
    </>
  );
}
