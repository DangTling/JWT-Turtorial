import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logoutSuccess } from "../../Redux/authSlice";
const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const JWTaxios = createAxios(user, dispatch, logoutSuccess);
  const handleLogout = () => {
    logoutUser(user?.accessToken, dispatch, user?._id, JWTaxios);
    navigate("/login");
  };

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home">
        Home
      </Link>
      {user ? (
        <>
          <p className="navbar-user">
            Hi, <span> {user.userName} </span>
          </p>
          <Link className="navbar-logout" onClick={handleLogout}>
            Log out
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login">
            Login
          </Link>
          <Link to="/register" className="navbar-register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
