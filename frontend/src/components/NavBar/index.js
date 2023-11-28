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
        <div className="logged-in-links">
          <Link className="all-events" to={"/events"}>All Events</Link>
          <Link to={"/events/new"}>Create an Event</Link>
          <Link to={"/profile"}>Profile</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
          <div className="logged-out-links">
            <button
              className="signup-button"
              onClick={() => dispatch(openModal("signup"))}
            >
              Signup
            </button>
            <button
              className="login-button"
              onClick={() => dispatch(openModal("login"))}
            >
              Login
            </button>
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
