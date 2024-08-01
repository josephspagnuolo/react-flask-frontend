import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/button";
import '../App.css';

const Home = () => {
  const navigate = useNavigate();

  function goTo() {
    navigate("/edit");
  }

  return (
    <main className="home">
      <h2>Welcome</h2>
      <PrimaryButton text="Edit Contact Info" func={goTo} />
    </main>
  );
};

export default Home;
