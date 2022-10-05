import Login from "../components/Login";
import WrapperCenterContent from "../components/WrapperCenterContent";
import Heading2 from "../components/subcomponents/texts/Heading2";
import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="login--all-content-wrapper">
      {/* <div className="login--grey-box-decoration"></div> */}
      <WrapperCenterContent styles="login--background-img">
        <Heading2 text="Log ind" styles="login--form-heading"/>
        <Login />
      </WrapperCenterContent>
    </div>
  );
};

export default LoginPage;
