import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";

function ForgetPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  //for cookies
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${config.apiBaseUrl}/forget-password`, {
        email,
      })
      .then((res) => {
        if (res.data.status === "success") {
          navigate("/Login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Forget Password</h4>
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
          <button type="submit" className="btn btn-primary w-100 rounded-0">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
export default ForgetPassword;
