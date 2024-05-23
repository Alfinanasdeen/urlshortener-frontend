import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/login";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import UrlShortener from "./components/urlShortener";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/forget-password" element={<ForgetPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword/>}></Route>
          <Route path="/shortUrls" element={<UrlShortener />}></Route>
          <Route path="/:shortUrl" element={<UrlShortener />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
