import Offer from "../components/Offer";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <>
      <Offer showAdd={true} showDelete={true} currentUserId={1} />
      <Footer />
    </>
  );
}
