import AuthDialogModal from "../../components/modal/AuthDialogModal";
import AuthModal from "../../components/modal/AuthModal";
import Nav from "../../components/nav/Nav";
import { useModal } from "../../hooks/useModal";
import "./home.css";

const Home = () => {
  const { modalOpen } = useModal();

  return (
    <div className="home__wrapper">
      <Nav />
      <main>
        <section className="hero__section">
          <div className="hero__left">
            <h1 className="hero__title"> Generic Landing Page </h1>
            <p className="hero__text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
              delectus voluptas voluptates saepe. Ex autem ut iure ipsam minima
              est?
            </p>
            <a href="#" className="btn hero__btn">
              Learn More
            </a>
          </div>
          <div className="hero__right">
            <div className="hero__img-wrapper">
              <img alt="hero__img" src="/img/hero_img.jpg" />
            </div>
          </div>
        </section>

        {/* 
          // Custom dialog Element  
          {modalOpen && <AuthModal />}  
        */}

        {/* Native dialog Element */}
        <AuthDialogModal />
      </main>
    </div>
  );
};

export default Home;
