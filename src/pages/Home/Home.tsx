import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import "./home.sass";

const Home = () => {
  return (
    <>
    <Header />
      <main className="home">
        <Container />
      </main>
    </>
  );
};

export default Home;
