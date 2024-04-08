import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { useEffect } from "react";
import { deleteUser, getAllUsers } from "../../Redux/apiRequest";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../Redux/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userData = useSelector((state) => state.user.users?.allUsers);
  const msg = useSelector((state) => state.user.msg);
  const JWTaxios = createAxios(user, dispatch, loginSuccess);

  const handleDelete = (id) => {
    deleteUser(user?.accessToken, dispatch, id, JWTaxios);
  };

  //DUMMY DATA
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      const accessToken = user?.accessToken;
      getAllUsers(accessToken, dispatch, JWTaxios);
    }
  }, [userData]);

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your Role is: ${user?.admin ? "Admin" : "User"}`}
      </div>
      <div className="home-userlist">
        {userData?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.userName}</div>
              <div
                className="delete-user"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </div>
            </div>
          );
        })}
      </div>
      <div className="error-msg">{msg}</div>
    </main>
  );
};

export default HomePage;
