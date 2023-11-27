import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { openModal } from "../../store/modal";
import './index.css'

const NavBar = () => {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={"/events"}>All Events</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/events/new"}>Create an Event</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <div className="links-div">
            <button className="signup-button" onClick={() => dispatch(openModal("signup"))}>Signup</button>
            <button className="login-button"onClick={() => dispatch(openModal("login"))}>Login</button>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <nav className="nav-bar">
        <h1 className="nav-bar-header">Bonjour World</h1>
        <div className="nav-links">{getLinks()}</div>
      </nav>
    </>
  );
};

export default NavBar;
