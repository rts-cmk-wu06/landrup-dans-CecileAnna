import HomeIcon from "../components/subcomponents/icons/HomeIcon";
import CalendarIcon from "../components/subcomponents/icons/CalendarIcon";
import SearchIcon from "../components/subcomponents/icons/SearchIcon";
import MenuBtn from "./MenuBtn";
import { Link } from "react-router-dom";

const FooterMenu = (props) => {
  return (
    <footer className="footer-menu">
      <Link to="/activities" className={`link-style-reset ${props.linkStyles}`}>
        <MenuBtn icon={<HomeIcon />} />
      </Link>
      <Link to="/search" className={`link-style-reset ${props.linkStyles}`}>
        <MenuBtn icon={<SearchIcon />} />
      </Link>
      <Link to="/calendar" className={`link-style-reset ${props.linkStyles}`}>
        <MenuBtn icon={<CalendarIcon />} />
      </Link>
    </footer>
  );
};

export default FooterMenu;
