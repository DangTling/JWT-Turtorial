import { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Redux/apiRequest";
const Register = () => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const user = {
      userName: userName,
      password: password,
      email: email,
    };
    registerUser(user, dispatch, navigate);
    // console.log(newUser);
  };
  return (
    <section className="register-container">
      <div className="register-title"> Sign up </div>
      <form onSubmit={handleRegister}>
        <label>EMAIL</label>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>USERNAME</label>
        <input
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>PASSWORD</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit"> Create account </button>
      </form>
    </section>
  );
};

export default Register;
