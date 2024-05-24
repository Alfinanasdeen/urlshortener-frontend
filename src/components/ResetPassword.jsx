import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../config"; 

function ResetPassword() {
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { id, token } = useParams();

  //for cookies
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${config.apiBaseUrl}/reset-password/${id}/${token}`, {
        password,
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
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Password">
              <strong>New Password</strong>
            </label>
            <input
              type="Password"
              placeholder="Enter New Password"
              autoComplete="off"
              name="Password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-0">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
export default ResetPassword;
