import Btn from "../components/Btn";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <main className="welcome--main-wrapper welcome--background-img">
        <div className="welcome--logo-text">
          <h1 className="welcome--title">
            Landrup
            <span className="welcome--title-span">Dans</span>
          </h1>
        </div>
        <Link to={`/activities`} style={{ textDecoration: "none" }}>
          <Btn text="Kom i gang" styles="welcome--btn" />
        </Link>
      </main>
    </>
  );
};

export default Welcome;
