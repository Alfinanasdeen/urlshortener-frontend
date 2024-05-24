import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import config from "../config";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  //for cookies
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${config.apiBaseUrl}/`, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.Status === "success") {
          localStorage.setItem("token", res.data.token); // Set token in localStorage
          
          navigate("/shortUrls ");
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-0">
            Login
          </button>
        </form>
        <p>
          Already have an Account
          <br></br>
          <Link to="/forget-password">Forget Password</Link>
        </p>
        <Link
          to="/registration"
          className="btn btn-default border w-100 bg-light rounded-0"
        >
          Registration
        </Link>
      </div>
    </div>
  );
}
export default Login;
